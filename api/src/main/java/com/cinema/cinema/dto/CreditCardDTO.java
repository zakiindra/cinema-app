package com.cinema.cinema.dto;

import lombok.Data;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.Pattern;
//import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class CreditCardDTO {

    private Long id;

//    @NotBlank(message = "Card type is required")
    private String cardType;

//    @NotBlank(message = "Cardholder name is required")
    private String name;

//    @NotBlank(message = "Card number is required")
//    @Pattern(regexp = "^[0-9]{16}$", message = "Invalid card number")
    private String cardNumber;

//    @NotBlank(message = "CVV is required")
//    @Pattern(regexp = "^[0-9]{3,4}$", message = "Invalid CVV")
    private String cvv;

//    @NotBlank(message = "Expiration date is required")
    private LocalDate expirationDate;

//    @NotBlank(message = "Billing address is required")
    private String billingAddress;
}