package rakkeri.rakkeri_server.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.repository.PersonRepository;

import java.util.List;


@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void save(Person person) {
        person.setPassword(new BCryptPasswordEncoder().encode(person.getPassword()));
        personRepository.save(person);
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
}
