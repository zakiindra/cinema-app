package com.cinema.cinema.dto;

import lombok.Data;

@Data
public class NewShowDTO {
    Long movieId;
    Long theaterId;
    Long timeslotId;
    String date;
}
