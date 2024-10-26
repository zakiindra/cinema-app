package com.cinema.cinema.service;

import com.cinema.cinema.config.EncryptionConfig;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EncryptionService {
    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int GCM_IV_LENGTH = 12;
    private static final int GCM_TAG_LENGTH = 16;

    private final EncryptionConfig encryptionConfig;
    private SecretKey key;
    private final SecureRandom secureRandom;

    @Autowired
    public EncryptionService(EncryptionConfig encryptionConfig) {
        this.encryptionConfig = encryptionConfig;
        this.secureRandom = new SecureRandom();
    }

    @PostConstruct
    public void init() {
        this.key = new SecretKeySpec(
                deriveKey(
                        Base64.getDecoder().decode(encryptionConfig.getSecretKey()),
                        Base64.getDecoder().decode(encryptionConfig.getSalt())
                ),
                "AES"
        );
    }

    public String encrypt(String value) {
        try {
            byte[] iv = new byte[GCM_IV_LENGTH];
            secureRandom.nextBytes(iv);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv);
            cipher.init(Cipher.ENCRYPT_MODE, key, parameterSpec);

            byte[] cipherText = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));

            ByteBuffer byteBuffer = ByteBuffer.allocate(iv.length + cipherText.length);
            byteBuffer.put(iv);
            byteBuffer.put(cipherText);

            return Base64.getEncoder().encodeToString(byteBuffer.array());
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting value", e);
        }
    }

    public String decrypt(String encrypted) {
        try {
            byte[] decoded = Base64.getDecoder().decode(encrypted);
            ByteBuffer byteBuffer = ByteBuffer.wrap(decoded);

            byte[] iv = new byte[GCM_IV_LENGTH];
            byteBuffer.get(iv);

            byte[] cipherText = new byte[byteBuffer.remaining()];
            byteBuffer.get(cipherText);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv);
            cipher.init(Cipher.DECRYPT_MODE, key, parameterSpec);

            return new String(cipher.doFinal(cipherText), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting value", e);
        }
    }

    private byte[] deriveKey(byte[] key, byte[] salt) {
        byte[] derivedKey = new byte[32];
        for (int i = 0; i < derivedKey.length; i++) {
            derivedKey[i] = (byte) (key[i % key.length] ^ salt[i % salt.length]);
        }
        return derivedKey;
    }
}
