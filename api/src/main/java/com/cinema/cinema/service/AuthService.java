// AuthService.java
package com.cinema.cinema.service;

import com.cinema.cinema.exception.ResourceNotFoundException;
//import com.cinema.cinema.model.Customer;
//import com.cinema.cinema.model.Customer;
import com.cinema.cinema.model.Otp;
import com.cinema.cinema.model.User;
import com.cinema.cinema.model.VerificationToken;
//import com.cinema.cinema.repository.CustomerRepository;
import com.cinema.cinema.repository.OtpRepository;
import com.cinema.cinema.repository.UserRepository;
import com.cinema.cinema.repository.VerificationTokenRepository;
import jakarta.mail.MessagingException;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
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
    private OtpRepository otpRepository;

    @Autowired
    private PasswordService passwordService;

//    @Transactional
//    public boolean verifyEmail(String email, String token) {
//        return tokenRepository.findByToken(token)
//                .map(verificationToken -> {
//
//                    if (verificationToken.isExpired()) {
//                        tokenRepository.delete(verificationToken);
//                        return false;
//                    }
//
//                    Customer customer = verificationToken.getCustomer();
//                    if (!verificationToken.getCustomer().getEmail().equals(email)) {
//                        return false;
//                    }
//
//                    customer.setActive(true);
//                    customerRepository.save(customer);
//                    tokenRepository.delete(verificationToken);
//                    return true;
//                }).orElse(false);
//    }


    @Transactional
    public boolean forgotPassword(String email, int otp, String newPassword) throws ResourceNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Otp otpRecord = otpRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("OTP code not found or invalid"));

        if (otpRecord != null && otpRecord.getOtp() == otp) {
            user.setEncryptedPassword(passwordService.hashPassword(newPassword));
            userRepository.save(user);
            otpRepository.delete(otpRecord);
            return true;
        }

        return false;
    }

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