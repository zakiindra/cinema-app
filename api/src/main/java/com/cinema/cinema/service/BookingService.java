package com.cinema.cinema.service;

import com.cinema.cinema.model.Booking;
import com.cinema.cinema.model.Seat;
import com.cinema.cinema.repository.BookingRepository;
import com.cinema.cinema.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> null);
    }

//    public Booking createBooking(Booking booking) {
//        return bookingRepository.save(booking);
//    }

    public Booking createBooking(Booking booking, List<Long> seatIds) {
        // Validate credit card, user, and promotion
        if (booking.getCreditCard() == null || booking.getUser() == null || booking.getShow() == null) {
            throw new IllegalArgumentException("Invalid booking details.");
        }

        // Check seat availability
        List<Seat> seats = seatRepository.findAllById(seatIds);
        if (seats.size() != seatIds.size()) {
            throw new IllegalArgumentException("Some seats are unavailable.");
        }

        // Assign seats to the booking
        booking.setSeats(seats);

        // Save the booking
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking booking) {
        Booking existingBooking = getBookingById(id);
        existingBooking.setStatus(booking.getStatus());
        return bookingRepository.save(existingBooking);
    }
}