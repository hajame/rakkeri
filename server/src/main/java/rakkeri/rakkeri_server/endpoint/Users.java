package rakkeri.rakkeri_server.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.service.PersonService;

import java.util.List;

@RestController
public class Users {

    @Autowired
    private PersonService personService;

    @PostMapping("/api/users")
    public void create(@RequestBody Person person) {
        System.out.println(person);
        personService.save(person);
    }

    @PostMapping("/api/login")
    public String login(@RequestBody Person person) {
        System.out.println(person);

        List<Person> people = personService.findByUsername(person);
        Person foundPerson = getUnique(people);
        if (personService.isValidPassword(person, foundPerson)) {
            return "this is a token placeholder";
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
