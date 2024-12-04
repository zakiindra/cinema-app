package com.cinema.cinema.dto;

import lombok.Data;
import java.util.List;

@Data
public class BookingRequest {
    private Long userId;
    private Long showId;
    private Long creditCardId;
    private String promotionCode;
    private List<SeatBooking> seatBookings;
}