package com.cinema.cinema.controller;

import com.cinema.cinema.dto.BookingMapper;
import com.cinema.cinema.dto.BookingRequest;
import com.cinema.cinema.dto.BookingResponse;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.Booking;
import com.cinema.cinema.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingMapper bookingMapper;

    @GetMapping
    public List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookings()
                .stream()
                .map(booking -> bookingMapper.toDTO(booking))
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(bookingMapper.toDTO(booking));
    }

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest bookingRequest) {
        try {
            Booking createdBooking = bookingService.createBooking(bookingRequest);
            return ResponseEntity.ok(bookingMapper.toDTO(createdBooking));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponse> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDetails);
        return ResponseEntity.ok(bookingMapper.toDTO(updatedBooking));
    }

}
