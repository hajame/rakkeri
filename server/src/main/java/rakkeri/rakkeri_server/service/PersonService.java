package rakkeri.rakkeri_server.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.repository.PersonRepository;

import java.util.List;
import java.util.Objects;


@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final JwtService jwtService;

    public PersonService(PersonRepository personRepository, JwtService jwtService) {
        this.personRepository = personRepository;
        this.jwtService = jwtService;
    }

    public Person saveNew(Person person) {
        person.setPassword(new BCryptPasswordEncoder().encode(person.getPassword()));
        return personRepository.save(person);
    }

    public Person update(Person person) {
        return personRepository.save(person);
    }

    public List<Person> findByUsername(Person person) {
        return personRepository.findByUsername(person.getUsername());
    }

    public boolean isValidPassword(Person person, Person foundPerson) {
        return new BCryptPasswordEncoder().matches(person.getPassword(), foundPerson.getPassword());
    }

    public Person findOne(Long personId) {
        return personRepository.findById(personId).get();
    }

    public Person authenticatePerson(String authorizationToken, Long userId) {
        Person person;
        try {
            person = jwtService.parseToken(authorizationToken, userId);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
        return findOne(person.getId());
    }

    public Person authenticatePerson(String authorizationToken) {
        Person person;
        try {
            person = jwtService.parseToken(authorizationToken);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
        return findOne(person.getId());
    }

    public Project getProject(String authorizationToken, Long projectId) {
        Person person = authenticatePerson(authorizationToken);
        return person.getProjects().stream()
                .filter(proj -> Objects.equals(proj.getId(), projectId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }

}
