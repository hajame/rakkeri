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
        person.setPassword(Cryptography.encrypt(person.getPassword()));
        return personRepository.save(person);
    }

    public Person update(Person person) {
        return personRepository.save(person);
    }

    public List<Person> findByUsername(Person person) {
        return personRepository.findByUsername(person.getUsername());
    }

    public List<Person> findByEmail(String email) {
        return personRepository.findByEmail(email);
    }


    public boolean isValidPassword(Person person, Person foundPerson) {
        return new BCryptPasswordEncoder().matches(person.getPassword(), foundPerson.getPassword());
    }

    public Person findOne(Long personId) {
        return personRepository.findById(personId).get();
    }

    public void authenticatePerson(String authorizationToken, Long userId) {
        try {
            jwtService.parseToken(authorizationToken, userId);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
    }

    public Person authenticateAndGetPerson(String authorizationToken, Long userId) {
        Person person;
        try {
            person = jwtService.parseToken(authorizationToken, userId);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
        return findOne(person.getId());
    }

    public Person authenticateAndGetPerson(String authorizationToken) {
        Person person;
        try {
            person = jwtService.parseToken(authorizationToken);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
        return findOne(person.getId());
    }

    public Project getProject(String authorizationToken, Long projectId) {
        Person person = authenticateAndGetPerson(authorizationToken);
        return person.getProjects().stream()
                .filter(proj -> Objects.equals(proj.getId(), projectId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }

    public Project getProject(Person person, Long projectId) {
        return person.getProjects().stream()
                .filter(p -> projectId.equals(p.getId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user"));
    }

    public void updatePassword(Person person, String password) {
        person.setPassword(Cryptography.encrypt(password));
        update(person);
    }
}
