package com.cinema.cinema.service;

import com.cinema.cinema.dto.BookingRequest;
import com.cinema.cinema.dto.SeatBooking;
import com.cinema.cinema.model.Booking;
import com.cinema.cinema.model.Ticket;
import com.cinema.cinema.repository.BookingRepository;
import com.cinema.cinema.repository.PromotionRepository;
import com.cinema.cinema.repository.TicketRepository;
import com.cinema.cinema.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private PriceTypeService priceTypeService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public String processBooking(BookingRequest bookingRequest) {
        // Calculate total amount
        BigDecimal totalAmount = priceTypeService.calculateTotalAmount(
            bookingRequest.getSeatBookings(),
            bookingRequest.getPromotionCode()
        );

        // Create new booking entity
        Booking booking = new Booking();
        booking.setUserId(bookingRequest.getUserId());
        booking.setShowId(bookingRequest.getShowId());
        booking.setCreditCardId(bookingRequest.getCreditCardId());
        booking.setTotalAmount(totalAmount);
        booking.setStatus("CONFIRMED");

        // Set promotion ID if promotion code exists
        if (bookingRequest.getPromotionCode() != null && !bookingRequest.getPromotionCode().isEmpty()) {
            promotionRepository.findByCode(bookingRequest.getPromotionCode())
                .ifPresent(promotion -> booking.setPromotionId(promotion.getId()));
        }

        // Save the booking
        Booking savedBooking = bookingRepository.save(booking);

        // Create tickets for each seat booking
        List<Ticket> tickets = new ArrayList<>();
        for (SeatBooking seatBooking : bookingRequest.getSeatBookings()) {
            Ticket ticket = new Ticket();
            ticket.setBookingId(savedBooking.getId());
            ticket.setSeatId(seatBooking.getSeatId());
            tickets.add(ticket);
        }

        // Save all tickets
        ticketRepository.saveAll(tickets);

        String userEmail = userRepository.findById(bookingRequest.getUserId())
        .map(user -> user.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));

        emailService.sendBookingConfirmationEmail(userEmail, bookingRequest, totalAmount, savedBooking.getId());

        return "Booking processed successfully! Booking ID: " + savedBooking.getId();
    }
}