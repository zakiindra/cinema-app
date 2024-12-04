package com.cinema.cinema.service;


import com.cinema.cinema.model.Booking;
import com.cinema.cinema.model.Ticket;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import com.cinema.cinema.repository.ShowRepository;
import com.cinema.cinema.dto.BookingRequest;
import com.cinema.cinema.model.Seat;
import com.cinema.cinema.model.Show;
import com.cinema.cinema.repository.SeatRepository;

import java.math.BigDecimal;
import java.util.List;


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

    public void sendPasswordChangedEmail(String toEmail) {

        String subject = "Password Updated";
        String body = "Hello,\n\nYour password has been successfully updated.";

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

    public void sendResetPasswordEmail(String recipient, String token) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(recipient);
        helper.setSubject("Reset Password");
        helper.setText(createResetPasswordEmailContent(recipient, token), true);

        mailSender.send(message);
    }

    private String createResetPasswordEmailContent(String email, String token) {
        String link = "http://localhost:8001/auth/resetPassword.html?email=%s&token=%s".formatted(email, token);

        return """
        <html>
            <body>
                <h2>C7 Cinema - Reset Your Password</h2>
                <p>Please follow the link below to reset your password:</p>
                <p><a href="%s">Reset Password</a></p>
                <p>This link will expire in 24 hours.</p>
                <p>If you did not request password reset, please ignore this email.</p>
            </body>
        </html>
        """.formatted(link);
    }

    public void sendPromotionalEmail(String toEmail, String promoDetails) {
        String subject = "Exciting New Promotion!";
        String body = """
            Hello,
            
            We have an exciting new promotion for you:
            %s
            
            Don't miss out!
            
            Best regards,
            C7 Cinema Team
            """.formatted(promoDetails);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("your-email@gmail.com");

        mailSender.send(message);
    }

    public void sendBookingConfirmationEmail(Booking booking) {

        String seats = booking.getTickets().stream()
                .map(ticket -> ticket.getSeat().getRowNumber() + ticket.getSeat().getSeatNumber())
                .collect(Collectors.joining(", "));

        String body = """
                "Dear Customer,
                
                Your booking has been confirmed! Here are your booking details.
                Movie: %s.
                Theater: %s.
                Date: %s.
                Time: %s.
                Seats: %s.
                
                Promotion Applied: %s.
                Total Paid: %.2f
                
                Thank you for choosing our cinema!
                Please arrive at least 15 minutes before the show time.
                
                Best regards,
                Your Cinema Team
                """.formatted(
                        booking.getShow().getMovie().getTitle(),
                        booking.getShow().getTheater().getName(),
                        booking.getShow().getDate(),
                        booking.getShow().getTimeslot().getStartTime(),
                        seats,
                        booking.getPromotion().getCode(),
                        booking.getTotalAmount()
                );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(booking.getUser().getEmail());
        message.setSubject("Booking Confirmation - " + booking.getShow().getMovie().getTitle());
        message.setText(body);

        mailSender.send(message);
    }

//    public void sendBookingConfirmationEmail(String toEmail, BookingRequest bookingRequest, BigDecimal totalAmount, Long bookingId) {
//
//        Show show = showRepository.findById(bookingRequest.getShowId())
//            .orElseThrow(() -> new RuntimeException("Show not found"));
//
//
//        List<Seat> seats = seatRepository.findAllById(
//            bookingRequest.getSeatBookings().stream()
//                .map(seatBooking -> seatBooking.getSeatId())
//                .collect(Collectors.toList())
//        );
//
//
//        String seatNumbers = seats.stream()
//            .map(seat -> seat.getRowNumber() + seat.getSeatNumber())
//            .collect(Collectors.joining(", "));
//
//        StringBuilder body = new StringBuilder();
//        body.append("Dear Customer,\n\n");
//        body.append("Your booking has been confirmed! Here are your booking details:\n\n");
//        body.append("Booking ID: ").append(bookingId).append("\n");
//        body.append("Movie: ").append(show.getMovie().getTitle()).append("\n");
//        body.append("Theater: ").append(show.getTheater().getName()).append("\n");
//        body.append("Date: ").append(show.getDate()).append("\n");
//        body.append("Time: ").append(show.getTimeslot().getStartTime()).append("\n");
//        body.append("Seats: ").append(seatNumbers).append("\n");
//
//        if (bookingRequest.getPromotionCode() != null && !bookingRequest.getPromotionCode().isEmpty()) {
//            body.append("Promotion Applied: ").append(bookingRequest.getPromotionCode()).append("\n");
//        }
//
//        body.append("\nTotal Amount: $").append(String.format("%.2f", totalAmount)).append("\n\n");
//        body.append("Thank you for choosing our cinema!\n");
//        body.append("Please arrive at least 15 minutes before the show time.\n\n");
//        body.append("Best regards,\nYour Cinema Team");
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setSubject("Booking Confirmation - " + show.getMovie().getTitle());
//        message.setText(body.toString());
//
//        mailSender.send(message);
//    }

}
