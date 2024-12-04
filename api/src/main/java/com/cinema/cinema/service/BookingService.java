package com.cinema.cinema.service;

import com.cinema.cinema.dto.BookingRequest;
import com.cinema.cinema.dto.BookingResponse;
import com.cinema.cinema.dto.SeatBooking;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.*;
import com.cinema.cinema.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ShowService showService;

    @Autowired
    private CreditCardService creditCardService;

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private SeatService seatService;

    @Autowired
    private PriceTypeService priceTypeService;

    @Autowired
    private EmailService emailService;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> null);
    }

    public List<Booking> getAllBookingsByUserId(Long userId) throws ResourceNotFoundException {
        User user = userService.getById(userId);

        return bookingRepository.findAllByUser(user);
    }

    private BigDecimal calculateTotalAmount(Booking booking) {
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (Ticket ticket : booking.getTickets()) {
            totalAmount = totalAmount.add(ticket.getPriceType().getAmount());
        }

        if (booking.getPromotion() != null) {
            totalAmount = totalAmount.subtract(booking.getPromotion().getPromotionValue());
            if (totalAmount.compareTo(BigDecimal.ZERO) < 0) {
                totalAmount = BigDecimal.ZERO;
            }
        }

        return totalAmount;
    }

    // TODO: proper validation of booking form
    @Transactional
    public Booking createBooking(BookingRequest bookingRequest) throws ResourceNotFoundException {
        Booking booking = new Booking();
        booking.setUser(userService.getById(bookingRequest.getUserId()));
        booking.setShow(showService.getShowById(bookingRequest.getShowId())); // TODO: check show is valid, still playing or upcoming
        booking.setCreditCard(creditCardService.getById(bookingRequest.getCreditCardId())); // TODO: check credit card belongs to user
        booking.setPromotion(promotionService.getByCode(bookingRequest.getPromotionCode())); // TODO: check promotion used more than once
        booking.setStatus("COMPLETED");

        // TODO: check duplicate seats
        List<Ticket> tickets = new ArrayList<>();
        for (SeatBooking seatBooking : bookingRequest.getSeatBookings()) {
            Ticket ticket = new Ticket();
            ticket.setBooking(booking);
            ticket.setSeat(seatService.getById(seatBooking.getSeatId())); // TODO: check seat already booked for the show
            ticket.setPriceType(priceTypeService.getById(seatBooking.getPriceTypeId()));
            tickets.add(ticket);
        }
        booking.setTickets(tickets);

        BigDecimal totalAmount = calculateTotalAmount(booking);
        booking.setTotalAmount(totalAmount);

        Booking savedBooking = bookingRepository.save(booking);

        emailService.sendBookingConfirmationEmail(savedBooking);

        return savedBooking;
    }

    public Booking updateBooking(Long id, Booking booking) {
        Booking existingBooking = getBookingById(id);
        existingBooking.setStatus(booking.getStatus());
        return bookingRepository.save(existingBooking);
    }
}