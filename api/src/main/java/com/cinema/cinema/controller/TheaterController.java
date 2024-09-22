package com.cinema.cinema.controller;

import com.cinema.cinema.model.Theater;
import com.cinema.cinema.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/theater")
public class TheaterController {

    @Autowired
    private TheaterService theaterService;

    @GetMapping
    public List<Theater> getTheaters() {
        return theaterService.getAllTheaters();
    }

    @PostMapping
    public Theater createTheater(@RequestBody Theater theater) {
        return theaterService.addTheater(theater);
    }


}
