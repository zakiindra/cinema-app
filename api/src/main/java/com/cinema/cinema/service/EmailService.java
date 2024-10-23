package com.cinema.cinema.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String toEmail) {

        String subject = "Account Registered Successfully";
        String body = "Hello,\n\nYour account has been successfully registered. Thank you for joining us!";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("your-email@gmail.com");

        mailSender.send(message);
    }

    public void sendOtpEmail(String toEmail, int otp) {
        System.out.println("Sending OTP email...");

        String subject = "Your OTP Code";
        String body = "Hello,\n\nYour OTP code is: " + otp + "\n\nPlease use this code to verify your account.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("your-email@gmail.com");

        mailSender.send(message);

        System.out.println("OTP sent to " + toEmail);
    }
}
