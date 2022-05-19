package rakkeri.rakkeri_server.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Base64.Encoder;

public class Cryptography {

    public static String encrypt(String string) {
        return new BCryptPasswordEncoder().encode(string);
    }

    public static String generateToken() {
        byte[] bytes = new byte[64];
        new SecureRandom().nextBytes(bytes);
        return getEncoder().encodeToString(bytes);
    }

    private static Encoder getEncoder() {
        return Base64.getUrlEncoder().withoutPadding();
    }
}
