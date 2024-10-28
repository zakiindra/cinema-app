package com.cinema.cinema.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_type")
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true, nullable = false, length = 10)
    String name;

}
