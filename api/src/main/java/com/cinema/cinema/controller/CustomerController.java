package com.cinema.cinema.controller;

import com.cinema.cinema.dto.*;
import com.cinema.cinema.exception.BadRequestException;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.service.BookingService;
import com.cinema.cinema.service.CreditCardService;
import com.cinema.cinema.service.CustomerProfileService;
import com.cinema.cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerProfileService customerProfileService;

    @Autowired
    private CreditCardService creditCardService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingMapper bookingMapper;

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

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updateCustomerPassword(@PathVariable Long id, @RequestBody PasswordDTO passwordDTO) {
        boolean isPasswordChangeSuccessful = false;
        try {
            isPasswordChangeSuccessful = userService.updatePassword(id, passwordDTO);
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(isPasswordChangeSuccessful);
    }

    @PostMapping("/{id}/creditCard")
    public ResponseEntity<CreditCardDTO> addCreditCard(@PathVariable Long id, @RequestBody CreditCardDTO creditCardDTO) {
        try {
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

    @GetMapping("/{id}/booking")
    public ResponseEntity<List<BookingResponse>> getOrderHistory(@PathVariable Long id) {
        try {
            List<BookingResponse> bookingResponses = bookingService.getAllBookingsByUserId(id)
                    .stream()
                    .map(booking -> bookingMapper.toDTO(booking))
                    .toList();
            return ResponseEntity.ok(bookingResponses);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/promo/{code}")
    public ResponseEntity<?> checkPromoValid(@PathVariable Long id, @PathVariable String code) {
        try {
            bookingService.validatePromoByUserId(id, code);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }
}