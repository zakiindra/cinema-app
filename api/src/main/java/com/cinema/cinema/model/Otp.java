package com.cinema.cinema.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Otp {
    
    @Id
    private String emailId; 
    
    private int otp;

    public Otp() {}

    public Otp(String emailId, int otp) {
        this.emailId = emailId;
        this.otp = otp;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public int getOtp() {
        return otp;
    }

    public void setOtp(int otp) {
        this.otp = otp;
    }
}

