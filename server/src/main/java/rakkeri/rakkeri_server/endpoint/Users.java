package rakkeri.rakkeri_server.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.service.PersonService;

@RestController
public class Users {

    @Autowired
    private PersonService personService;

    @PostMapping("/api/users")
    public void create(@RequestBody Person person) {
        System.out.println(person);
        personService.save(person);
    }

}
