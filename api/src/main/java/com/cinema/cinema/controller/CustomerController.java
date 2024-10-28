package com.cinema.cinema.controller;

import com.cinema.cinema.dto.CreditCardDTO;
import com.cinema.cinema.dto.CustomerDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.CreditCard;
//import com.cinema.cinema.model.Customer;
import com.cinema.cinema.service.CreditCardService;
import com.cinema.cinema.service.CustomerProfileService;
//import com.cinema.cinema.service.CustomerService;
import com.cinema.cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/customer")
public class CustomerController {
//    @Autowired
//    private CustomerService customerService;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerProfileService customerProfileService;

    @Autowired
    private
    CreditCardService creditCardService;

//    @PostMapping
//    public ResponseEntity<Customer> registerCubstomer(@RequestBody Customer customer) {
//        if (customerService.getByEmail(customer.getEmail()) != null) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).build();
//        }
//        Customer newCustomer = customerService.addCustomer(customer);
//        return ResponseEntity.ok(newCustomer);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
//        Customer customer = customerService.getCustomerById(id);
//        if (customer == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(customer);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
//        if (customerService.getCustomerById(id) == null) {
//            return ResponseEntity.notFound().build();
//        }
//        Customer updatedCustomer = customerService.updateCustomer(id, customer);
//        return ResponseEntity.ok(updatedCustomer);
//    }

    @PostMapping
    public ResponseEntity<CustomerDTO> registerCustomer(@RequestBody CustomerDTO customerDTO) {
        if (userService.getUserByEmail(customerDTO.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        CustomerDTO newCustomerDTO = customerProfileService.addCustomer(customerDTO);

        return ResponseEntity.ok(newCustomerDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable Long id) {
        CustomerDTO customerDTO;

        try {
            customerDTO = customerProfileService.getProfileByUserId(id);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(customerDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO) {
        CustomerDTO updatedCustomerDTO;
        try {
            updatedCustomerDTO = customerProfileService.updateProfile(id, customerDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedCustomerDTO);
    }

    @PostMapping("/{id}/creditCard")
    public ResponseEntity<CreditCardDTO> addCreditCard(@PathVariable Long id, @RequestBody CreditCardDTO creditCardDTO) {
        try {
            System.out.println(creditCardDTO);
            List<CreditCardDTO> creditCardDTOs = creditCardService.getCreditCards(id);
            if (creditCardDTOs.size() > 4) {
                return ResponseEntity.badRequest().build();
            }

            CreditCardDTO body = creditCardService.addCreditCard(id, creditCardDTO);
            return ResponseEntity.ok(body);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/creditCard")
    public ResponseEntity<List<CreditCardDTO>> getCreditCards(@PathVariable Long id) {
        try {
            List<CreditCardDTO> cards = creditCardService.getCreditCards(id);
            return ResponseEntity.ok(cards);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
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
    public ResponseEntity<?> deleteCreditCard(@PathVariable Long id, @PathVariable Long cardId) {
        try {
            creditCardService.deleteCreditCard(id, cardId);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }

}