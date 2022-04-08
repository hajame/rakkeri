package rakkeri.rakkeri_server.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.DTO.UserDTO;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.service.JwtService;
import rakkeri.rakkeri_server.service.PersonService;

import java.util.List;

@RestController
public class Users {

    private final PersonService personService;
    private final JwtService jwtService;

    public Users(PersonService personService, JwtService jwtService) {
        this.personService = personService;
        this.jwtService = jwtService;
    }

    @PostMapping("/api/users")
    public void create(@RequestBody Person person) {
        personService.save(person);
    }

    @PostMapping("/api/login")
    public UserDTO login(@RequestBody Person person) {
        List<Person> people = personService.findByUsername(person);
        Person foundPerson = getUnique(people);
        if (personService.isValidPassword(person, foundPerson)) {
            String token = jwtService.createToken(foundPerson);
            return new UserDTO(foundPerson.getId(), foundPerson.getUsername(), token);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
    }

    private Person getUnique(List<Person> people) {
        if (people.size() != 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
        return people.get(0);
    }

}
