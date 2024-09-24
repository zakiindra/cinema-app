// BookingRepository.java
package com.cinema.cinema.repository;

import com.cinema.cinema.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByShowId(Long showId);
}