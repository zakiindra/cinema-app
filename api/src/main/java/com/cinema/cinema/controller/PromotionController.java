package com.cinema.cinema.controller;

import com.cinema.cinema.model.Promotion;
import com.cinema.cinema.model.Theater;
import com.cinema.cinema.service.PromotionService;
import com.cinema.cinema.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotion")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping
    public List<Promotion> getAllPromotions() {
        return promotionService.getAllPromotions();
    }

    @PostMapping
    public Promotion createPromotion(@RequestBody Promotion promotion) {
        return promotionService.addPromotion(promotion);
    }
}
