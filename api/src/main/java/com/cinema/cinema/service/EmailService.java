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

        System.out.println("HELLO3");

        String subject = "Account Registered Successfully";
        String body = "Hello,\n\nYour account has been successfully registered. Thank you for joining us!";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("your-email@gmail.com");

        System.out.println("HELLO4");
        mailSender.send(message);
    }
}
