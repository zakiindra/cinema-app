package com.cinema.cinema.service;

import com.cinema.cinema.dto.ResetPasswordDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
//import com.cinema.cinema.model.Customer;
import com.cinema.cinema.model.ResetPasswordToken;
import com.cinema.cinema.model.User;
//import com.cinema.cinema.repository.CustomerRepository;
import com.cinema.cinema.repository.ResetPasswordTokenRepository;
import com.cinema.cinema.repository.UserRepository;
import com.cinema.cinema.repository.VerificationTokenRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

//    @Autowired
//    private CustomerRepository customerRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResetPasswordTokenRepository passwordTokenRepository;

    @Autowired
    private PasswordService passwordService;

    @Transactional
    public boolean verifyEmail(String email, String token) {
        return tokenRepository.findByToken(token)
            .map(verificationToken -> {

                if (verificationToken.isExpired()) {
                    tokenRepository.delete(verificationToken);
                    return false;
                }

                User user = verificationToken.getUser();
                if (!verificationToken.getUser().getEmail().equals(email)) {
                    return false;
                }

                user.setActive(true);
                userRepository.save(user);
                tokenRepository.delete(verificationToken);
                return true;
            }).orElse(false);
    }

    public void handleForgotPassword(String email) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = UUID.randomUUID().toString();
        ResetPasswordToken resetPasswordToken = new ResetPasswordToken();
        resetPasswordToken.setUser(user);
        resetPasswordToken.setToken(token);
        resetPasswordToken.setExpirationTime(LocalDateTime.now().plusDays(1));
        passwordTokenRepository.save(resetPasswordToken);

        try {
            emailService.sendResetPasswordEmail(email, token);
        } catch (MessagingException e) {
            System.out.println(e);
        }
    }

    @Transactional
    public boolean resetPassword(ResetPasswordDTO resetPasswordDTO) throws ResourceNotFoundException {
        return passwordTokenRepository.findByToken(resetPasswordDTO.getToken())
            .map(resetPasswordToken -> {
                if (resetPasswordToken.isExpired()) {
                    passwordTokenRepository.delete(resetPasswordToken);
                    return false;
                }

                User user = resetPasswordToken.getUser();
                if (!resetPasswordToken.getUser().getEmail().equals(resetPasswordDTO.getEmail())) {
                    return false;
                }

                user.setEncryptedPassword(passwordService.hashPassword(resetPasswordDTO.getNewPassword()));
                userRepository.save(user);
                passwordTokenRepository.delete(resetPasswordToken);
                return true;
            }).orElse(false);
    }


//    @Transactional
//    public void resendVerificationEmail(Long customerId) throws MessagingException, ResourceNotFoundException {
//        Customer customer = customerRepository.findById(customerId)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        if (customer.getActive()) {
//            return;
//        }
//
//        // Delete existing token if any
//        List<VerificationToken> verificationTokens = tokenRepository.findByCustomer(customer);
//        tokenRepository.deleteAll(verificationTokens);
//
//        // Create new verification token
//        String token = UUID.randomUUID().toString();
//        VerificationToken verificationToken = new VerificationToken();
//        verificationToken.setCustomer(customer);
//        verificationToken.setToken(token);
//        verificationToken.setExpirationTime(LocalDateTime.now().plusDays(1));
//        tokenRepository.save(verificationToken);
//
//        // Send new verification email
//        emailService.sendVerificationEmail(customer.getEmail(), token);
//    }
}