package com.cinema.cinema.repository;

import com.cinema.cinema.model.Booking;
import com.cinema.cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findAllByUser(User user);
}