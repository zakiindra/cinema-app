package com.cinema.cinema.repository;

import com.cinema.cinema.model.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

    List<CreditCard> findByCustomerId(Long customerId);

    Optional<CreditCard> findByCustomerIdAndId(Long customerId, Long id);

}
