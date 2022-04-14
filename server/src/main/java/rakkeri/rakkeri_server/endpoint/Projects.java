package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.service.JwtService;
import rakkeri.rakkeri_server.service.PersonService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Projects {

    private final PersonService personService;

    public Projects(PersonService personService, JwtService jwtService) {
        this.personService = personService;
    }

    @GetMapping("/api/users/{userId}/projects")
    public List<Project> getProjects(@RequestHeader("Authorization") String authorizationToken, @PathVariable("userId") Long userId) {
        Person person = personService.getPerson(authorizationToken, userId);
        return new ArrayList<>(person.getProjects());
    }

    @PostMapping("/api/users/{userId}/projects")
    public Person createProjects(@RequestHeader("Authorization") String authorizationToken, @PathVariable("userId") Long userId, @RequestBody Project project) {
        Person person = personService.getPerson(authorizationToken, userId);
        person.getProjects().add(project);
        return personService.update(person);
    }
}
