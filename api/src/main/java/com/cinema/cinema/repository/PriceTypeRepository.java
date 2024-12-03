package com.cinema.cinema.repository;

import com.cinema.cinema.model.PriceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PriceTypeRepository extends JpaRepository<PriceType, Long> {
    
}