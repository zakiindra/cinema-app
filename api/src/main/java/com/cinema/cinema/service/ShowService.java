package com.cinema.cinema.service;

import com.cinema.cinema.dto.NewShowDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.*;
import com.cinema.cinema.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    public Show getShowById(Long id) {
        return showRepository.findById(id)
                .orElseThrow(() -> null);
    }

    public List<Show> getUpcomingShowByMovieId(Long movieId) {
        LocalDateTime now = LocalDateTime.now();
        List<Show> shows = showRepository.findAll();

        return shows.stream()
                .filter(show -> show.getMovie().getId().equals(movieId))
                .filter(show -> {
                    LocalDateTime dt = LocalDateTime.of(show.getDate(), show.getTimeslot().getStartTime());

                    return dt.isAfter(now) && dt.isBefore(now.plusDays(3));
                })
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

//    public Show updateShow(Long id, Show updatedShow) {
//        Show existingShow = getShowById(id);
//
//        existingShow.setMovie(updatedShow.getMovie());
//        existingShow.setTheater(updatedShow.getTheater());
//        existingShow.setDate(updatedShow.getDate());
//        existingShow.setTimeslot(updatedShow.getTimeslot());
//
//        return showRepository.save(existingShow);
//    }
//
//    public void deleteShow(Long id) {
//        Show show = getShowById(id);
//        showRepository.delete(show);
//    }

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

    public List<Seat> getAvailableSeatByShowId(Long id) {
        Show show = getShowById(id);

        Theater theater = theaterRepository
                .findById(show.getTheater().getId())
                .orElse(null);

        if (theater == null) {
            return Collections.emptyList();
        }

        // TODO: change to findAll(Example) or findByShowId()
        List<Long> bookingIds = bookingRepository.findAll()
                .stream()
                .filter(booking -> booking.getShow().getId().equals(show.getId()))
                .map(Booking::getId)
                .toList();

        // TODO: change to findAll(Example)
        List<Long> occupiedSeatIds = ticketRepository.findAll()
                .stream()
                .filter(ticket -> bookingIds.contains(ticket.getBookingId()))
                .map(Ticket::getSeatId)
                .toList();

        // TODO: change to findAll(Example)
        return seatRepository.findAll()
                .stream()
                .filter(seat -> seat.getTheaterId().equals(theater.getId()))
                .filter(seat -> !occupiedSeatIds.contains(seat.getId()))
                .toList();
    }

    public List<Seat> getOccupiedSeatByShowId(Long id) {
        Show show = getShowById(id);

        Theater theater = theaterRepository
                .findById(show.getTheater().getId())
                .orElse(null);

        if (theater == null) {
            return Collections.emptyList();
        }

        List<Long> bookingIds = bookingRepository.findAll()
                .stream()
                .filter(booking -> booking.getShow().getId().equals(show.getId()))
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