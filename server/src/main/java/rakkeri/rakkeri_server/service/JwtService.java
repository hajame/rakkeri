package rakkeri.rakkeri_server.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Person;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    public String createToken(Person person) {
        String key = "this_is_just_a_test_this_is_just_a_test_this_is_just_a_test";

        Date issuedDate = new Date();

        String token = Jwts.builder()
                .setSubject(person.getId().toString())
                .claim("username", person.getUsername())
                .setIssuedAt(issuedDate)
                .setExpiration(Date.from(Instant.now().plus(Duration.ofDays(14))))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
        return token;
    }
}
