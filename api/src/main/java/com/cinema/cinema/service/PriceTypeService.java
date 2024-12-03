package com.cinema.cinema.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cinema.cinema.model.PriceType;
import com.cinema.cinema.model.Promotion;
import com.cinema.cinema.dto.SeatBooking;
import com.cinema.cinema.repository.PriceTypeRepository;
import com.cinema.cinema.repository.PromotionRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PriceTypeService {
    
    @Autowired
    private PriceTypeRepository priceTypeRepository;
    
    @Autowired
    private PromotionRepository promotionRepository;
    
    public BigDecimal calculateTotalAmount(List<SeatBooking> seatBookings, String promoCode) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        for (SeatBooking booking : seatBookings) {
            Optional<PriceType> priceType = priceTypeRepository.findById(booking.getPriceTypeId());
            if (priceType.isPresent()) {
                totalAmount = totalAmount.add(BigDecimal.valueOf(priceType.get().getPrice()));
            } else {
                throw new RuntimeException("Price type not found for id: " + booking.getPriceTypeId());
            }
        }
        
        if (promoCode != null && !promoCode.trim().isEmpty()) {
            Optional<Promotion> promotion = promotionRepository.findByCode(promoCode);
            if (promotion.isPresent()) {
                totalAmount = totalAmount.subtract(promotion.get().getPromotionValue());
                if (totalAmount.compareTo(BigDecimal.ZERO) < 0) {
                    totalAmount = BigDecimal.ZERO;
                }
            }
        }
        
        return totalAmount;
    }
}