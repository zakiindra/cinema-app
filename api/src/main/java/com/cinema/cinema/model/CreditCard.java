//// CreditCard.java
//package com.cinema.cinema.model;
//
//import lombok.Data;
//import jakarta.persistence.*;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "credit_card")
//public class CreditCard {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "customer_id", nullable = false)
//    private Customer customer;
//
//    private String cardType;
//    private String name;
//    private String cardNumber;
//    private String cvv;
//    private LocalDate expirationDate;
//    private String billingAddress;
//
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdAt;
//
//    @Column(nullable = false)
//    private LocalDateTime updatedAt;
//
//    @PrePersist
//    protected void onCreate() {
//        createdAt = updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        updatedAt = LocalDateTime.now();
//    }
//}

package com.cinema.cinema.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "credit_card")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "customer_id", nullable = false)
//    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(name = "card_type", nullable = false)
    private String cardType;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "encrypted_card_number", length = 512, nullable = false)
    private String encryptedCardNumber;

    // Store last 4 digits for display purposes
    @Column(name = "last_four_digits", nullable = false)
    private String lastFourDigits;

    @Column(name = "encrypted_cvv", length = 512, nullable = false)
    private String encryptedCvv;

    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

    @Column(name = "encrypted_billing_address", length = 512, nullable = false)
    private String encryptedBillingAddress;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Transient
    public String getMaskedCardNumber() {
        return String.format("************%s", lastFourDigits);
    }

}
