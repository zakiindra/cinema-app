
package com.cinema.cinema.controller;

import com.cinema.cinema.dto.LoginRequest;
import com.cinema.cinema.dto.ResetPasswordDTO;
import com.cinema.cinema.dto.UserDTO;
import com.cinema.cinema.exception.ResourceNotFoundException;
import com.cinema.cinema.model.User;
import com.cinema.cinema.service.AuthService;
import com.cinema.cinema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.getUserByEmail(loginRequest.getEmail());
        if (user == null || !userService.validatePassword(user, loginRequest.getPassword())) {
            return ResponseEntity.badRequest().build();
        }

        if (!user.getActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Email has to be verified before logging in");
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserType(user.getUserType().getName());

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String email, @RequestParam String token) {
        boolean verified = authService.verifyEmail(email, token);
        if (verified) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            authService.handleForgotPassword(email);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        boolean passwordUpdated;
        try {
            passwordUpdated = authService.resetPassword(resetPasswordDTO);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }

        if (!passwordUpdated) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/resend-verification")
//    public ResponseEntity<?> resendVerificationEmail(@RequestBody EmailRequest request) {
//        try {
//            authService.resendVerificationEmail(request.getEmail());
//            return ResponseEntity.ok().body(new MessageResponse("Verification email sent successfully"));
//        } catch (MessagingException e) {
//            return ResponseEntity.internalServerError().body(new MessageResponse("Failed to send verification email"));
//        }
//    }
//

}
