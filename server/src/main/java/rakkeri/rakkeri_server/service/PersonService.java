package rakkeri.rakkeri_server.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.repository.PersonRepository;


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
}
