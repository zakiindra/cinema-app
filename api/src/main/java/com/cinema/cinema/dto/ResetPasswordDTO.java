package com.cinema.cinema.dto;

import lombok.Data;

@Data
public class ResetPasswordDTO {
    String email;
    String token;
    String newPassword;
}
