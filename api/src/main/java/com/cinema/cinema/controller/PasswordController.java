package com.cinema.cinema.controller;

import com.cinema.cinema.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/customer")
public class PasswordController {

    private final CustomerService customerService;

    @Autowired
    public PasswordController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestParam String email,
            @RequestParam int otp,
            @RequestParam String newPassword) {

        System.out.println("PASSWORD");
        boolean isUpdated = customerService.forgotPassword(email, otp, newPassword);
        System.out.println("IS UPDATED:=" + isUpdated);

        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(400).body("Failed to update password. Check email or OTP.");
        }
    }
}

