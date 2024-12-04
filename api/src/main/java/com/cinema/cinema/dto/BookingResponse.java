package com.cinema.cinema.dto;

import com.cinema.cinema.model.CreditCard;
import com.cinema.cinema.model.Promotion;
import com.cinema.cinema.model.Show;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookingResponse {
    private Long id;
    private Long userId;
//    private Long showId;
//    private Long creditCardId;
//    private Long promotionId;
    private Show show;
    private CreditCard creditCard;
    private Promotion promotion;
    private List<TicketDTO> tickets;
    private BigDecimal totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
