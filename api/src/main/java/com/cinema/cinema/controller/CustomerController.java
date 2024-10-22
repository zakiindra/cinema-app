package com.cinema.cinema.controller;

import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    // @PostMapping("/signup")
    // public ResponseEntity<?> signup(@RequestBody Customer customer) {
    //     // Validate input (username, email, password)
    //     // Here you might want to add more validation logic

    //     if (customerService.registerUser(customer.getUsername(), customer.getEmail(), customer.getPassword()) != null) {
    //         return ResponseEntity.ok().body(new ApiResponse("User registered successfully!"));
    //     } else {
    //         return ResponseEntity.badRequest().body(new ApiResponse("User registration failed!"));
    //     }
    // }

    @PostMapping
    public ResponseEntity<Customer> registerCustomer(@RequestBody Customer customer) {
        Customer newCustomer = customerService.addCustomer(customer);
        return ResponseEntity.ok(newCustomer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        Customer updatedCustomer = customerService.updateCustomer(id, customer);
        return ResponseEntity.ok(updatedCustomer);
    }

    @GetMapping("/{id}/creditCard")
    public List<CreditCard> getCreditCards(@PathVariable Long id) {
        return customerService.getAllCreditCardByCustomerId(id);
    }

    // Create a simple response model to return messages
    static class ApiResponse {
        private String message;

        public ApiResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}