package com.cinema.cinema.service;

import com.cinema.cinema.repository.*;
import com.cinema.cinema.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService; 
    private final Random random = new Random();

    @Autowired
    public OtpService(OtpRepository otpRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService; 
    }

    public Otp generateOtp(String emailId) {
        
        int otpValue = 1000 + random.nextInt(9000);
        Otp otp = new Otp(emailId, otpValue);

        
        emailService.sendOtpEmail(emailId, otpValue);

        
        otpRepository.save(otp);

        return otp; 
    }

    public Otp getOtp(String emailId) {
        return otpRepository.findById(emailId).orElse(null); 
    }
}