package com.cinema.cinema.controller;

import com.cinema.cinema.model.Seat;
import com.cinema.cinema.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/show")
public class ShowController {
    @Autowired
    ShowService showService;

    @GetMapping("/{id}/availableSeat")
    public List<Seat> getAvailableSeat(@PathVariable Long id) {
        return showService.getAvailableSeatByShowId(id);
    }
}
