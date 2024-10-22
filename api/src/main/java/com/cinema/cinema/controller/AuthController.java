package com.cinema.cinema.controller;

import com.cinema.cinema.controller.CustomerController.ApiResponse;
import com.cinema.cinema.dto.LoginRequest;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerService customerService;

    // TODO: add validation logic
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Customer customer) {
        if (customerService.registerUser(customer.getUsername(), customer.getEmail(), customer.getPassword()) != null) {
            return ResponseEntity.ok().body(new ApiResponse("User registered successfully!"));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("User registration failed!"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if (customerService.validateUser(email, password)) {
            return ResponseEntity.ok("Login successful!"); // You can return more information like a token or user details
        } else {
            return ResponseEntity.status(401).body("Invalid email or password."); // Unauthorized
        }
    }

}
