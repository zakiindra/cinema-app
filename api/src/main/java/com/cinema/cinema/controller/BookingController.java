package com.cinema.cinema.controller;

import com.cinema.cinema.dto.BookingRequest;
import com.cinema.cinema.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public String createBooking(@RequestBody BookingRequest bookingRequest) {
        return bookingService.processBooking(bookingRequest);
    }
}
