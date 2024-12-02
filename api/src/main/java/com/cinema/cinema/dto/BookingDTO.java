package com.cinema.cinema.dto;

import com.cinema.cinema.model.Booking;
import lombok.Data;

import java.util.List;

@Data
public class BookingDTO {
    private Booking booking;
    private List<Long> seatIds;
}


