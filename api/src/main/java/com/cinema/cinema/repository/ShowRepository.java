package com.cinema.cinema.repository;

import com.cinema.cinema.model.Show;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Show, Long> {
}