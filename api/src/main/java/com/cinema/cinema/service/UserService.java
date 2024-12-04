package com.cinema.cinema.service;

import com.cinema.cinema.dto.PasswordDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.User;
import com.cinema.cinema.model.UserType;
import com.cinema.cinema.model.VerificationToken;
import com.cinema.cinema.repository.UserRepository;
import com.cinema.cinema.repository.UserTypeRepository;
import com.cinema.cinema.repository.VerificationTokenRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {

    // TODO: change this into enum
    private static final String ADMIN = "ADMIN";
    private static final String CUSTOMER = "CUSTOMER";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Transactional
    public User addCustomerUser(String email, String password) {
        UserType customerType = userTypeRepository.findByName(CUSTOMER)
                .orElse(null);

        if (customerType == null) {
            customerType = new UserType();
            customerType.setName(CUSTOMER);
            userTypeRepository.save(customerType);
        }

        User user = new User();
        user.setEmail(email);
        user.setEncryptedPassword(passwordService.hashPassword(password));
        user.setUserType(customerType);

        user.setActive(false);
        userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpirationTime(LocalDateTime.now().plusDays(1));
        tokenRepository.save(verificationToken);

        try {
            emailService.sendVerificationEmail(email, token);
        } catch (MessagingException e) {
            System.out.println(e);
        }

        return user;
    }

    public User getById(Long id) throws ResourceNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public boolean validatePassword(User user, String password) {
        return passwordService.verifyPassword(password, user.getEncryptedPassword());
    }

    public boolean updatePassword(Long id, PasswordDTO passwordDTO) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        System.out.println(passwordDTO.getCurrentPassword());
        System.out.println(passwordDTO.getNewPassword());
        System.out.println(passwordDTO.getConfirmNewPassword());

        if (!this.validatePassword(user, passwordDTO.getCurrentPassword())) {
            return false;
        }

        if (!passwordDTO.getNewPassword().equals(passwordDTO.getConfirmNewPassword())) {
            return false;
        }

        user.setEncryptedPassword(passwordService.hashPassword(passwordDTO.getNewPassword()));
        userRepository.save(user);

        emailService.sendPasswordChangedEmail(user.getEmail());

        return true;
    }
}
