package rakkeri.rakkeri_server.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.DTO.EmailDTO;
import rakkeri.rakkeri_server.DTO.UserDTO;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.service.EmailService;
import rakkeri.rakkeri_server.service.JwtService;
import rakkeri.rakkeri_server.service.PersonService;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@RestController
public class Users {

    private final PersonService personService;
    private final JwtService jwtService;
    private final EmailService emailService;

    public Users(PersonService personService, JwtService jwtService, EmailService emailService) {
        this.personService = personService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    @PostMapping("/api/users")
    public void create(@RequestBody Person person) {
        person.setUsername(person.getUsername().toLowerCase());
        personService.saveNew(person);
    }

    @PostMapping("/api/login")
    public UserDTO login(@RequestBody Person person) {
        person.setUsername(person.getUsername().toLowerCase());
        List<Person> people = personService.findByUsername(person);
        Person foundPerson = getUnique(people);
        if (personService.isValidPassword(person, foundPerson)) {
            Instant expirationInstant = Instant.now().plus(Duration.ofDays(14));
            String token = jwtService.createToken(foundPerson, Date.from(expirationInstant));
            return new UserDTO(
                    foundPerson.getId(),
                    foundPerson.getUsername(),
                    token,
                    Timestamp.from(expirationInstant)
            );
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
    }

    @PostMapping("/api/reset-password")
    public HttpStatus reset(@RequestBody EmailDTO emailDTO) {
        List<Person> people = personService.findByEmail(emailDTO.getEmail());
        Person unique;
        try {
            unique = getUnique(people);
        } catch (Exception e) {
            System.err.println("Password reset attempt for email [" + emailDTO.getEmail() + "] failed.");
            // Return success message anyway to protect from user enumeration attacks.
            return HttpStatus.OK;
        }
        System.out.println("Resetting password for [" + unique.getEmail() + "]");
        emailService.sendSimpleMessage();
        return HttpStatus.OK;
    }

    private Person getUnique(List<Person> people) {
        if (people.size() != 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
        return people.get(0);
    }

}
