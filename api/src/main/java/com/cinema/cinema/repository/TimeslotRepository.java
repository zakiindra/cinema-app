package com.cinema.cinema.repository;

import com.cinema.cinema.model.Timeslot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeslotRepository extends JpaRepository<Timeslot, Long> {
}
