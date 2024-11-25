package com.cinema.cinema.controller;

import com.cinema.cinema.exception.BadRequestException;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.Promotion;
import com.cinema.cinema.model.Theater;
import com.cinema.cinema.service.PromotionService;
import com.cinema.cinema.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public ResponseEntity<Promotion> getPromotion(@PathVariable Long id) {
        Promotion promotion = promotionService.getPromotionById(id);
        return ResponseEntity.ok(promotion);
    }

    @PostMapping
    public Promotion createPromotion(@RequestBody Promotion promotion) {
        return promotionService.addPromotion(promotion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promotion> editPromotion(@PathVariable Long id, @RequestBody Promotion promotion) {
        try {
            Promotion updated = promotionService.editPromotion(id, promotion);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePromotion(@PathVariable Long id) {
        try {
            promotionService.deletePromotion(id);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/send-email")
    public ResponseEntity<?> sendPromotionEmail(@PathVariable Long id) {
        try {
            promotionService.sendPromotionEmail(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
