package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.service.PersonService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Projects {

    private final PersonService personService;

    public Projects(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/api/users/{userId}/projects")
    public List<Project> getProjects(@RequestHeader("Authorization") String authorizationToken,
                                     @PathVariable("userId") Long userId) {
        Person person = personService.authenticatePerson(authorizationToken, userId);
        return new ArrayList<>(person.getProjects());
    }

    @PostMapping("/api/users/{userId}/projects")
    public List<Project> createProject(@RequestHeader("Authorization") String authorizationToken,
                                       @PathVariable("userId") Long userId, @RequestBody Project project) {
        Person person = personService.authenticatePerson(authorizationToken, userId);
        person.getProjects().add(project);
        Person updatedPerson = personService.update(person);
        return new ArrayList<>(updatedPerson.getProjects());
    }
}
