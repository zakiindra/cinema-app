
package com.cinema.cinema.controller;

import com.cinema.cinema.dto.LoginRequest;
import com.cinema.cinema.model.Customer;
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
    

}
