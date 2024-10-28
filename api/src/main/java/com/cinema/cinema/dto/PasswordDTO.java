package com.cinema.cinema.dto;

import lombok.Data;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.Pattern;
//import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class PasswordDTO {
//    @NotBlank(message = "Card type is required")
    private String currentPassword;

//    @NotBlank(message = "Cardholder name is required")
    private String newPassword;

//    @NotBlank(message = "Card number is required")
//    @Pattern(regexp = "^[0-9]{16}$", message = "Invalid card number")
    private String confirmNewPassword;
}