package rakkeri.rakkeri_server.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.DTO.EmailDTO;
import rakkeri.rakkeri_server.DTO.ResetPasswordDTO;
import rakkeri.rakkeri_server.DTO.UserDTO;
import rakkeri.rakkeri_server.entity.PasswordResetToken;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.service.*;

import java.sql.Timestamp;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@RestController
public class Users {

    private final PersonService personService;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final PasswordResetTokenService passwordResetTokenService;

    public Users(PersonService personService, JwtService jwtService, EmailService emailService,
                 PasswordResetTokenService passwordResetTokenService) {
        this.personService = personService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.passwordResetTokenService = passwordResetTokenService;
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

    @PostMapping("/api/users/reset-password-email")
    public HttpStatus sendResetEmail(@RequestBody EmailDTO emailDTO) {
        List<Person> people = personService.findByEmail(emailDTO.getEmail());
        Person person;
        try {
            person = getUnique(people);
        } catch (Exception e) {
            System.err.println("Sending reset password mail for email [" + emailDTO.getEmail() + "] failed.");
            // Return success message anyway to protect from user enumeration attacks.
            return HttpStatus.OK;
        }
        System.out.println("Sending reset password email for [" + person.getEmail() + "]");
        Timestamp expirationDate = Timestamp.from(Instant.now(Clock.systemUTC()).plus(10, ChronoUnit.MINUTES));
        String token = Cryptography.generateToken();

        PasswordResetToken passwordResetToken;
        if (person.getPasswordResetToken() == null) {
            passwordResetToken = new PasswordResetToken(person, token, expirationDate);
            passwordResetTokenService.save(passwordResetToken);
        } else {
            passwordResetToken = person.getPasswordResetToken();
            passwordResetToken.setToken(token);
            passwordResetToken.setExpirationDate(expirationDate);
            passwordResetTokenService.update(passwordResetToken);
        }
        person.setPasswordResetToken(passwordResetToken);
        personService.update(person);
        emailService.sendSimpleMessage(person, token);
        return HttpStatus.OK;
    }

    @PostMapping("/api/users/reset-password")
    public void resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        PasswordResetToken passwordResetToken = passwordResetTokenService.findByToken(resetPasswordDTO.getToken());
        personService.updatePassword(passwordResetToken.getPerson(), resetPasswordDTO.getPassword());
        passwordResetTokenService.delete(passwordResetToken);
        System.out.println("Password for username [" + passwordResetToken.getPerson().getUsername() + "] was reset.");
    }

    private Person getUnique(List<Person> people) {
        if (people.size() != 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
        return people.get(0);
    }

}
