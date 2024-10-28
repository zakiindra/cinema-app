package com.cinema.cinema.controller;

import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.service.AuthService;
//import com.cinema.cinema.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/customer")
public class PasswordController {

    @Autowired
    private AuthService authService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestParam String email,
            @RequestParam int otp,
            @RequestParam String newPassword) {

        boolean isUpdated = false;
        try {
            isUpdated = authService.forgotPassword(email, otp, newPassword);
        } catch (ResourceNotFoundException e) {
            ResponseEntity.notFound().build();
        }

        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(400).body("Failed to update password. Check email or OTP.");
        }
    }
}

