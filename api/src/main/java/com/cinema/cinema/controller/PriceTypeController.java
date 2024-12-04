package com.cinema.cinema.controller;

import com.cinema.cinema.model.PriceType;
import com.cinema.cinema.service.PriceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/price-type")
public class PriceTypeController {

    @Autowired
    private PriceTypeService priceTypeService;

    @GetMapping
    public List<PriceType> getAllPriceTypes() {
        return priceTypeService.getAllPriceTypes();
    }

}
