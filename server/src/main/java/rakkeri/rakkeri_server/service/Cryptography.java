package rakkeri.rakkeri_server.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Cryptography {

    public static String encrypt(String string) {
        return new BCryptPasswordEncoder().encode(string);
    }
}
