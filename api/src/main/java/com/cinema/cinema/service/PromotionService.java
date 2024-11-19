package com.cinema.cinema.service;

import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.Promotion;
import com.cinema.cinema.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    public Promotion getPromotionById(Long id) throws ResourceNotFoundException {
        return promotionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Promotion not found"));
    }

    public Promotion addPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    @Transactional
    public Promotion editPromotion(Long id, Promotion promotion) throws ResourceNotFoundException {
        Promotion existingPromotion = getPromotionById(id);

        existingPromotion.setPromotionValue(promotion.getPromotionValue());
        existingPromotion.setDescription(promotion.getDescription());
        existingPromotion.setStartTime(promotion.getStartTime());
        existingPromotion.setEndTime(promotion.getEndTime());

        promotionRepository.save(existingPromotion);

        return existingPromotion;
    }

    public void deletePromotion(Long id) throws ResourceNotFoundException {
        Promotion promotion = getPromotionById(id);
        promotionRepository.delete(promotion);
    }

}
