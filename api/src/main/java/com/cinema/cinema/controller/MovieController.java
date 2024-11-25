package com.cinema.cinema.controller;

import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.Movie;
import com.cinema.cinema.model.Show;
import com.cinema.cinema.model.Timeslot;
import com.cinema.cinema.service.MovieService;
import com.cinema.cinema.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @Autowired
    private ShowService showService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);
        return ResponseEntity.ok(movie);
    }

    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieService.createMovie(movie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movieDetails) {
        Movie updatedMovie = movieService.updateMovie(id, movieDetails);
        return ResponseEntity.ok(updatedMovie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/upcoming-show")
    public List<Show> getUpcomingShow(@PathVariable Long id) {
        return showService.getNowPlayingByMovieId(id);
    }

    @GetMapping("/{id}/show")
    public ResponseEntity<List<Show>> getShowByMovieId(@PathVariable Long id) {
        try {
            List<Show> shows = showService.getShowByMovieId(id);
            return ResponseEntity.ok(shows);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/show/available-timeslots")
    public ResponseEntity<List<Timeslot>> getAvailableTimeslot(@PathVariable Long id,
                                                               @RequestParam String date,
                                                               @RequestParam Long theater) {
        try {
            List<Timeslot> timeslots = showService.getAvailableTimeslot(id, date, theater);
            return ResponseEntity.ok(timeslots);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("now-playing")
    public List<Movie> getNowPlaying() {
        return movieService.getNowPlaying();
    }

    @GetMapping("upcoming")
    public List<Movie> getUpcoming() {
        return movieService.getUpcoming();
    }

}