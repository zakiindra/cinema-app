package com.cinema.cinema.service;

import com.cinema.cinema.model.Theater;
import com.cinema.cinema.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TheaterService {
    @Autowired
    private TheaterRepository theaterRepository;

    public List<Theater> getAllTheaters() {
        return theaterRepository.findAll();
    }

    public Theater addTheater(Theater theater) {
        return theaterRepository.save(theater);
    }

}