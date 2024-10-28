package com.cinema.cinema.dto;

import lombok.Data;

@Data
public class CustomerDTO {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private Boolean subscribePromo;
}
