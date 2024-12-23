package com.cinema.cinema.service;

import com.cinema.cinema.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cinema.cinema.model.PriceType;
import com.cinema.cinema.repository.PriceTypeRepository;
import com.cinema.cinema.repository.PromotionRepository;

import java.util.List;

@Service
public class PriceTypeService {
    
    @Autowired
    private PriceTypeRepository priceTypeRepository;

    public PriceType getById(Long id) throws ResourceNotFoundException {
        return priceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Price type not found"));
    }

    public List<PriceType> getAllPriceTypes() {
        return priceTypeRepository.findAll();
    }
}