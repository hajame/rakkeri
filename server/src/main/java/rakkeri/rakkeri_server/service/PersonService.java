package rakkeri.rakkeri_server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.repository.PersonRepository;


@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public void save(Person person) {
        person.setPassword(person.getPassword() + "_HASHED");
        personRepository.save(person);
    }
}
