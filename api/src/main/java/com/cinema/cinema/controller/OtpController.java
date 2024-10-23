package com.cinema.cinema.controller;

import com.cinema.cinema.model.*;
import com.cinema.cinema.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final OtpService otpService;

    @Autowired
    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateOtp(@RequestParam String emailId) {
        Otp otp = otpService.generateOtp(emailId);

        return ResponseEntity.ok("OTP sent to " + emailId);
    }
}

