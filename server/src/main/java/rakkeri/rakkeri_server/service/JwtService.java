package rakkeri.rakkeri_server.service;

import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Person;

@Service
public class JwtService {

    public String createToken(Person person) {
        return "this is a token placeholder";
    }
}
