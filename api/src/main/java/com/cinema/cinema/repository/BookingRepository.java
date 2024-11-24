package com.cinema.cinema.repository;

import com.cinema.cinema.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}