package com.cinema.cinema.controller;

import com.cinema.cinema.dto.NewShowDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.Seat;
import com.cinema.cinema.model.Show;
import com.cinema.cinema.model.Timeslot;
import com.cinema.cinema.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/show")
public class ShowController {
    @Autowired
    ShowService showService;

    @GetMapping("/{id}")
    public ResponseEntity<Show> getShow(@PathVariable Long id) {
        try {
            Show show = showService.getShowById(id);
            return ResponseEntity.ok(show);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/occupied-seat")
    public ResponseEntity<List<Seat>> getOccupiedSeat(@PathVariable Long id) {
        try {
            List<Seat> occupiedSeats = showService.getOccupiedSeatByShowId(id);
            return ResponseEntity.ok(occupiedSeats);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/available-timeslots")
    public ResponseEntity<List<Timeslot>> getAvailableTimeslot(@RequestParam String date,
                                                               @RequestParam Long theater) {
        try {
            List<Timeslot> timeslots = showService.getAvailableTimeslot(date, theater);
            return ResponseEntity.ok(timeslots);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/timeslot")
    public List<Timeslot> getAllTimeslot() {
        return showService.getAllTimeslot();
    }

    @PostMapping()
    public ResponseEntity<Show> addShow(@RequestBody NewShowDTO newShowDTO) {
        try {
            Show created = showService.createShow(newShowDTO);
            return ResponseEntity.ok(created);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShow(@PathVariable Long id) {
        try {
            showService.deleteShow(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
