package com.cinema.cinema.dto;

import com.cinema.cinema.model.Booking;
import com.cinema.cinema.model.Ticket;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {
    public BookingResponse toDTO(Booking booking) {
        BookingResponse dto = new BookingResponse();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
//        dto.setShowId(booking.getShow().getId());
//        dto.setCreditCardId(booking.getCreditCard().getId());
        dto.setShow(booking.getShow());
        dto.setCreditCard(booking.getCreditCard());
        if (booking.getPromotion() != null) {
//            dto.setPromotionId(booking.getPromotion().getId());
            dto.setPromotion(booking.getPromotion());
        }
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setUpdatedAt(booking.getUpdatedAt());

        if (booking.getTickets() != null) {
            dto.setTickets(
                    booking.getTickets()
                            .stream()
                            .map(this::toTicketDTO)
                            .toList()
            );
        }

        return dto;
    }

    private TicketDTO toTicketDTO(Ticket ticket) {
        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId());
//        dto.setSeatId(ticket.getSeat().getId());
//        if (ticket.getPriceType() != null) {
//            dto.setPriceTypeId(ticket.getPriceType().getId());
//        }
        dto.setSeat(ticket.getSeat());
        dto.setPriceType(ticket.getPriceType());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());
        return dto;
    }
}
