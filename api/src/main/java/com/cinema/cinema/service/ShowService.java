package com.cinema.cinema.service;

import com.cinema.cinema.dto.NewShowDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.*;
import com.cinema.cinema.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class ShowService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private TheaterRepository theaterRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TimeslotRepository timeslotRepository;

    public List<Show> getAllShow() {
        return showRepository.findAll();
    }

    public Show getShowById(Long id) throws ResourceNotFoundException {
        return showRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found"));
    }

    public boolean isNowPlaying(Show show, LocalDateTime now) {
        LocalDateTime dt = LocalDateTime.of(show.getDate(), show.getTimeslot().getStartTime());
        return dt.isAfter(now) && dt.isBefore(now.plusDays(7));
    }

    public List<Show> getNowPlayingByMovieId(Long movieId) {
        LocalDateTime now = LocalDateTime.now();
        return getAllShow()
                .stream()
                .filter(show -> show.getMovie().getId().equals(movieId))
                .filter(show -> isNowPlaying(show, now))
                .toList();
    }

    public List<Show> getNowPlayingShow() {
        LocalDateTime now = LocalDateTime.now();
        return getAllShow()
                .stream()
                .filter(show -> isNowPlaying(show, now))
                .toList();
    }

    public List<Show> getUpcomingShow() {
        LocalDateTime now = LocalDateTime.now();
        return getAllShow()
                .stream()
                .filter(show -> LocalDateTime.of(show.getDate(), show.getTimeslot().getStartTime())
                        .isAfter(now.plusDays(7)))
                .toList();
    }

    @Transactional
    public Show createShow(NewShowDTO newShowDTO) throws ResourceNotFoundException {
        Movie movie = movieRepository.findById(newShowDTO.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        Theater theater = theaterRepository.findById(newShowDTO.getTheaterId())
                .orElseThrow(() -> new ResourceNotFoundException("Theater not found"));

        Timeslot timeslot = timeslotRepository.findById(newShowDTO.getTimeslotId())
                .orElseThrow(() -> new ResourceNotFoundException("Timeslot not found"));

        LocalDate date = LocalDate.parse(newShowDTO.getDate());

        Show show = new Show();
        show.setMovie(movie);
        show.setTheater(theater);
        show.setDate(date);
        show.setTimeslot(timeslot);

        return showRepository.save(show);
    }

    public List<Show> getShowByMovieId(Long movieId) throws ResourceNotFoundException {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        return showRepository.findAllByMovie(movie);
    }

    public void deleteShow(Long id) throws ResourceNotFoundException {
        Show show = getShowById(id);
        showRepository.delete(show);
    }

    public List<Timeslot> getAllTimeslot() {
        return timeslotRepository.findAll();
    }

    public List<Timeslot> getAvailableTimeslot(Long movieId, String dateStr, Long theaterId) throws ResourceNotFoundException {
        LocalDate date = LocalDate.parse(dateStr);

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));

        Theater theater = theaterRepository.findById(theaterId)
                .orElseThrow(() -> new ResourceNotFoundException("Theater not found"));

        List<Timeslot> occupiedTimeslot = showRepository.findAllByMovieAndDateAndTheater(movie, date, theater)
                .stream()
                .map(Show::getTimeslot)
                .toList();

        return timeslotRepository.findAll()
                .stream()
                .filter(timeslot -> !occupiedTimeslot.contains(timeslot))
                .toList();
    }

    public List<Timeslot> getAvailableTimeslot(String dateStr, Long theaterId) throws ResourceNotFoundException {
        LocalDate date = LocalDate.parse(dateStr);

        Theater theater = theaterRepository.findById(theaterId)
                .orElseThrow(() -> new ResourceNotFoundException("Theater not found"));

        List<Timeslot> occupiedTimeslot = showRepository.findAllByDateAndTheater(date, theater)
                .stream()
                .map(Show::getTimeslot)
                .toList();

        return timeslotRepository.findAll()
                .stream()
                .filter(timeslot -> !occupiedTimeslot.contains(timeslot))
                .toList();
    }

    public List<Seat> getOccupiedSeatByShowId(Long id) throws ResourceNotFoundException {
        Show show = getShowById(id);

        Theater theater = theaterRepository
                .findById(show.getTheater().getId())
                .orElse(null);

        if (theater == null) {
            return Collections.emptyList();
        }

        List<Long> bookingIds = bookingRepository.findAll()
                .stream()
                .filter(booking -> booking.getShowId().equals(show.getId())) 
                .map(Booking::getId)
                .toList();

        List<Long> occupiedSeatIds = ticketRepository.findAll()
                .stream()
                .filter(ticket -> bookingIds.contains(ticket.getBookingId()))
                .map(Ticket::getSeatId)
                .toList();

        return seatRepository.findAll()
                .stream()
                .filter(seat -> seat.getTheaterId().equals(theater.getId()))
                .filter(seat -> occupiedSeatIds.contains(seat.getId()))
                .toList();
    }

}