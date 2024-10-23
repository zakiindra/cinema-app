package com.cinema.cinema.controller;

import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customer> registerCubstomer(@RequestBody Customer customer) {
        if (customerService.getByEmail(customer.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
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
        if (customerService.getCustomerById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        Customer updatedCustomer = customerService.updateCustomer(id, customer);
        return ResponseEntity.ok(updatedCustomer);
    }

    @GetMapping("/{id}/creditCard")
    public List<CreditCard> getCreditCards(@PathVariable Long id) {
        return customerService.getAllCreditCardByCustomerId(id);
    }

    @PostMapping("/{id}/creditCard")
    public CreditCard addCreditCard(@PathVariable Long id, @RequestBody CreditCard creditCard) {
        return customerService.addCreditCard(id, creditCard);
    }

    @PutMapping("/{id}/creditCard/{cardId}")
    public CreditCard updateCreditCard(@PathVariable Long id, @PathVariable Long cardId, @RequestBody CreditCard creditCard) {
        return customerService.updateCreditCard(id, cardId, creditCard);
    }

// /// ---------------------------------------------Changes by Abhishek-----------------------------------------------------------
//    static class ApiResponse {
//        private String message;
//
//        public ApiResponse(String message) {
//            this.message = message;
//        }
//
//        public String getMessage() {
//            return message;
//        }
//    }
}