package com.cinema.cinema.service;

import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.Movie;
import com.cinema.cinema.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> null);
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie updateMovie(Long id, Movie movieDetails) {
        Movie movie = getMovieById(id);
        movie.setTitle(movieDetails.getTitle());
        movie.setDescription(movieDetails.getDescription());
        movie.setDuration(movieDetails.getDuration());
        movie.setReleaseDate(movieDetails.getReleaseDate());
        movie.setGenre(movieDetails.getGenre());
        movie.setRating(movieDetails.getRating());
        return movieRepository.save(movie);
    }

    public void deleteMovie(Long id) {
        Movie movie = getMovieById(id);
        movieRepository.delete(movie);
    }
}