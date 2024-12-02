package com.cinema.cinema.repository;

import com.cinema.cinema.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
//    List<Seat> findByTheaterIdAndRowNumberAndSeatNumber(Long theaterId, String rowNumber, String seatNumber);
//
//    boolean existsByIdAndTheaterId(Long seatId, Long theaterId);
}
