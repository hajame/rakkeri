package rakkeri.rakkeri_server.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import rakkeri.rakkeri_server.entity.Greeting;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.repository.PersonRepository;

@RestController
public class Test {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping("/test")
    public Person test() {
        return personRepository.findById(1L).get();
    }

}