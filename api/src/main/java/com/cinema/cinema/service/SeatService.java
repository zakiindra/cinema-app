package com.cinema.cinema.service;

import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.Seat;
import com.cinema.cinema.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public Seat getById(Long id) throws ResourceNotFoundException {
        return seatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found"));
    }
}
