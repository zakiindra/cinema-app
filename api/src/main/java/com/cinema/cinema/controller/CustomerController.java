package com.cinema.cinema.controller;

import com.cinema.cinema.dto.CreditCardDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Customer;
import com.cinema.cinema.service.CreditCardService;
import com.cinema.cinema.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    CreditCardService creditCardService;

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

    @PostMapping("/{id}/creditCard")
    public ResponseEntity<CreditCard> addCreditCard(@PathVariable Long id, @RequestBody CreditCardDTO creditCardDTO) {

        CreditCard creditCard;

        try {
            creditCard = creditCardService.addCreditCard(id, creditCardDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(creditCard);
    }

    @GetMapping("/{id}/creditCard")
    public ResponseEntity<List<CreditCardDTO>> getCustomerCreditCards(@PathVariable Long id) {
        List<CreditCardDTO> cards = creditCardService.getCustomerCreditCards(id);
        return ResponseEntity.ok(cards);
    }

    @PutMapping("/{id}/creditCard/{cardId}")
    public ResponseEntity<CreditCard> updateCreditCard(@PathVariable Long id, @PathVariable Long cardId, @RequestBody CreditCardDTO creditCardDTO) {
        CreditCard creditCard;
        try {
           creditCard = creditCardService.updateCreditCard(id, cardId, creditCardDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(creditCard);
    }

    @DeleteMapping("/{id}/creditCard/{cardId}")
    public ResponseEntity<?> deleteCreditCard(
            @PathVariable Long id,
            @PathVariable Long cardId) {
        try {
            creditCardService.deleteCreditCard(id, cardId);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }

}