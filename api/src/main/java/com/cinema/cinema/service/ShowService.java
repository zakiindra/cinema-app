package com.cinema.cinema.service;

import com.cinema.cinema.model.*;
import com.cinema.cinema.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class ShowService {
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
                .filter(show -> show.getStartTime().isBefore(now))
                .toList();
    }

    public Show createShow(Show show) {
        return showRepository.save(show);
    }

    public Show updateShow(Long id, Show updatedShow) {
        Show existingShow = getShowById(id);

        existingShow.setMovie(updatedShow.getMovie());
        existingShow.setTheater(updatedShow.getTheater());
        existingShow.setStartTime(updatedShow.getStartTime());
        existingShow.setEndTime(updatedShow.getEndTime());
        existingShow.setPrice(updatedShow.getPrice());

        return showRepository.save(existingShow);
    }

    public void deleteShow(Long id) {
        Show show = getShowById(id);
        showRepository.delete(show);
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
                .map(Ticket::getSeatId)
                .filter(bookingIds::contains)
                .toList();

        // TODO: change to findAll(Example)
        return seatRepository.findAll()
                .stream()
                .filter(seat -> seat.getTheaterId().equals(theater.getId()))
                .filter(seat -> !occupiedSeatIds.contains(seat.getId()))
                .toList();
    }

}