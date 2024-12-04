package com.cinema.cinema.dto;

import com.cinema.cinema.model.PriceType;
import com.cinema.cinema.model.Seat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketDTO {
    private Long id;
//    private Long seatId;
//    private Long priceTypeId;
    private Seat seat;
    private PriceType priceType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

