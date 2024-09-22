package com.cinema.cinema.service;

import com.cinema.cinema.model.Promotion;
import com.cinema.cinema.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    public Promotion addPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

}
