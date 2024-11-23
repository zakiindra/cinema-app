package com.cinema.cinema.service;

import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.CustomerProfile;
import com.cinema.cinema.model.Promotion;
import com.cinema.cinema.repository.CustomerProfileRepository;
import com.cinema.cinema.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private CustomerProfileRepository profileRepository;

    @Autowired
    private EmailService emailService;

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

    public Promotion getPromotionById(Long id) {
        return promotionRepository.findById(id)
                .orElseThrow(() -> null);
    }

    public Promotion addPromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    @Transactional
    public Promotion editPromotion(Long id, Promotion promotion) throws ResourceNotFoundException {
        Promotion existingPromotion = getPromotionById(id);

        existingPromotion.setCode(promotion.getCode());
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

    public void sendPromotionEmail(Long id) throws ResourceNotFoundException {
        Promotion promotion = getPromotionById(id);

        // TODO: properly handle getting subscribed users
        List<CustomerProfile> subscribedUsers = profileRepository.findBySubscribePromoTrue();

        String promoDetails = "New Promotion Added: " + promotion.getCode();
        subscribedUsers.forEach(user -> {
                System.out.println("Sending email for " + user.getUser().getEmail());
                emailService.sendPromotionalEmail(user.getUser().getEmail(), promoDetails);
            }
        );
    }

}
