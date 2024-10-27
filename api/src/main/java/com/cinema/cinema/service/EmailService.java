package com.cinema.cinema.service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;
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

    public void sendProfileUpdatedEmail(String toEmail, String firstName) {

        String subject = "Profile Information Updated";
        String body = "Hello,\n\nYour profile information has been successfully updated.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("your-email@gmail.com");

        mailSender.send(message);
    }

    public void sendVerificationEmail(String recipient, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(recipient);
        helper.setSubject("Email Verification");
        helper.setText(createVerificationEmailContent(recipient, token), true);

        mailSender.send(message);
    }

    private String createVerificationEmailContent(String email, String token) {
        String link = "http://localhost:8001/auth/verify.html?email=%s&token=%s".formatted(email, token);

        return """
        <html>
            <body>
                <h2>C7 Cinema - Verify Your Email Address</h2>
                <p>Thank you for registering. Please click the link below to verify your email address:</p>
                <p><a href="%s">Verify Email</a></p>
                <p>This link will expire in 24 hours.</p>
                <p>If you did not create an account, please ignore this email.</p>
            </body>
        </html>
        """.formatted(link);
    }
}
