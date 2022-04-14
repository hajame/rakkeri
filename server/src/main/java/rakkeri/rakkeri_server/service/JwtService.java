package rakkeri.rakkeri_server.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.entity.Person;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    public String createToken(Person person) {
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

    public Person parseToken(String authenticationToken, Long personId) {
        if (!authenticationToken.startsWith("bearer")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secret.getBytes())
                .requireSubject(personId.toString())
                .build()
                .parseClaimsJws(getToken(authenticationToken))
                .getBody();

        return toPerson(claims);
    }
    
    public Person parseToken(String authenticationToken) {
        if (!authenticationToken.startsWith("bearer")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secret.getBytes())
                .build()
                .parseClaimsJws(getToken(authenticationToken))
                .getBody();

        return toPerson(claims);
    }

    private String getToken(String authenticationToken) {
        return authenticationToken.trim().split("\\s+")[1];
    }

    private Person toPerson(Claims claims) {
        Person person = new Person();
        person.setId(Long.parseLong(claims.getSubject()));
        person.setUsername(claims.get("username", String.class));
        return person;
    }
}
