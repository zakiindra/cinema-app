package com.cinema.cinema.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketDTO {
    private Long id;
    private Long seatId;
    private Long priceTypeId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

