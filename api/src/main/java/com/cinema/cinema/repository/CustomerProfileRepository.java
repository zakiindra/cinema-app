package com.cinema.cinema.repository;

import com.cinema.cinema.model.CustomerProfile;
import com.cinema.cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Long> {

    Optional<CustomerProfile> findByUser(User user);
}
