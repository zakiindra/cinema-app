package com.cinema.cinema.controller;

import com.cinema.cinema.dto.BookingDTO;
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

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

//    @PostMapping
//    public Booking createBooking(@RequestBody Booking booking) {
//        return bookingService.createBooking(booking);
//    }

    @PostMapping
    public Booking createBooking(@RequestBody BookingDTO bookingDTO) {
        return bookingService.createBooking(
                bookingDTO.getBooking(),
                bookingDTO.getSeatIds()
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking bookingDetails) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDetails);
        return ResponseEntity.ok(updatedBooking);
    }

}