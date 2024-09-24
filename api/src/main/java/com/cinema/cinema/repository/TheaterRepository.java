package com.cinema.cinema.repository;

import com.cinema.cinema.model.Theater;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheaterRepository extends JpaRepository<Theater, Long> {
}
