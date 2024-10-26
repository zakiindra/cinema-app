package com.cinema.cinema.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "encryption")
public class EncryptionConfig {
    private String secretKey;
    private String salt;
}