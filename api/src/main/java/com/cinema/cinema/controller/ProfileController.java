package com.cinema.cinema.controller;

import com.cinema.cinema.controller.CustomerController.ApiResponse;
import com.cinema.cinema.dto.LoginRequest;

import com.cinema.cinema.model.Customer;
import com.cinema.cinema.service.CustomerService;
import com.cinema.cinema.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Autowired
    private ProfileService customerService;

    @GetMapping("/getProfile")
    public ResponseEntity<Customer> getProfile(@RequestParam String email) {
        Customer customer = customerService.getCustomerByEmail(email);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build(); // 404 if customer not found
        }
    }

    @PostMapping("/updateProfile")
    public ResponseEntity<ApiResponse> updateProfile(@RequestBody Customer updatedCustomer) {
        boolean isUpdated = customerService.updateCustomer(updatedCustomer);

        if (isUpdated) {
            return ResponseEntity.ok(new ApiResponse("Profile updated successfully!"));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse("Failed to update profile!"));
        }
    }
}
