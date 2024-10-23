
package com.cinema.cinema.controller;

//import com.cinema.cinema.controller.CustomerController.ApiResponse;
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

//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@RequestBody Customer customer) {
//        if (customerService.registerUser(customer.getFirstName(), customer.getLastName(), customer.getUsername(), customer.getEmail(), customer.getPassword(), customer.getSubscribePromo()) != null) {
//            return ResponseEntity.ok().body(new ApiResponse("User registered successfully!"));
//        } else {
//            return ResponseEntity.badRequest().body(new ApiResponse("User registration failed!"));
//        }
//    }

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
