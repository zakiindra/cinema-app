
package com.cinema.cinema.controller;

import com.cinema.cinema.dto.LoginRequest;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.service.AuthService;
import com.cinema.cinema.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();  
        String password = loginRequest.getPassword();
        Customer customer = customerService.getByUsername(username);

        if (customer != null && customerService.validatePassword(customer, password)) {
            return ResponseEntity.ok(customer);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String email, @RequestParam String token) {
        boolean verified = authService.verifyEmail(email, token);
        if (verified) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

//    @PostMapping("/resend-verification")
//    public ResponseEntity<?> resendVerificationEmail(@RequestBody EmailRequest request) {
//        try {
//            authService.resendVerificationEmail(request.getEmail());
//            return ResponseEntity.ok().body(new MessageResponse("Verification email sent successfully"));
//        } catch (MessagingException e) {
//            return ResponseEntity.internalServerError().body(new MessageResponse("Failed to send verification email"));
//        }
//    }
//

}
