package com.cinema.cinema.repository;

import com.cinema.cinema.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByGenre(String genre);
    List<Movie> findByReleaseDate(LocalDate releaseDate);
}