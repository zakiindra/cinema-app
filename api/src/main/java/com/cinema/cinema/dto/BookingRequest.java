package com.cinema.cinema.dto;

import lombok.Data;
import java.util.List;

public class BookingRequest {
    private Long userId;
    private Long showId;
    private Long creditCardId;
    private String promotionCode;
    private List<SeatBooking> seatBookings;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public Long getCreditCardId() {
        return creditCardId;
    }

    public void setCreditCardId(Long creditCardId) {
        this.creditCardId = creditCardId;
    }

    public String getPromotionCode() {
        return promotionCode;
    }

    public void setPromotionCode(String promotionCode) {
        this.promotionCode = promotionCode;
    }

    public List<SeatBooking> getSeatBookings() {
        return seatBookings;
    }

    public void setSeatBookings(List<SeatBooking> seatBookings) {
        this.seatBookings = seatBookings;
    }
}