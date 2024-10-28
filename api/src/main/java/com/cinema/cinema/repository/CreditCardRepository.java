package com.cinema.cinema.repository;

import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

    List<CreditCard> findByUser(User user);

    Optional<CreditCard> findByUserAndId(User user, Long id);

}
