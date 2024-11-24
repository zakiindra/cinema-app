package com.cinema.cinema.repository;

import com.cinema.cinema.model.Movie;
import com.cinema.cinema.model.Show;
import com.cinema.cinema.model.Theater;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {

    List<Show> findAllByMovie(Movie movie);

    List<Show> findAllByMovieAndDateAndTheater(Movie movie, LocalDate date, Theater theater);

    List<Show> findAllByDateAndTheater(LocalDate date, Theater theater);
}