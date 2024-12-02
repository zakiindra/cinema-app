package com.cinema.cinema.repository;

import com.cinema.cinema.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByBooking_Id(Long bookingId);
    List<Ticket> findBySeat_Id(Long seatId);
}
