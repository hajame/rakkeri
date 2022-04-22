package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
import rakkeri.rakkeri_server.DTO.ProjectDTO;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.service.PersonService;

import java.util.List;
import java.util.Set;

@RestController
public class Projects {

    private final PersonService personService;

    public Projects(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/api/users/{userId}/projects")
    public List<ProjectDTO> getProjects(@RequestHeader("Authorization") String authorizationToken,
                                        @PathVariable("userId") Long userId) {
        Person person = personService.authenticateAndGetPerson(authorizationToken, userId);
        Set<Project> projects = person.getProjects();
        return ProjectDTO.toProjectDTOs(projects);
    }

    @PostMapping("/api/users/{userId}/projects")
    public List<ProjectDTO> createProject(@RequestHeader("Authorization") String authorizationToken,
                                          @PathVariable("userId") Long userId, @RequestBody Project project) {
        Person person = personService.authenticateAndGetPerson(authorizationToken, userId);
        person.getProjects().add(project);
        Person updatedPerson = personService.update(person);
        Set<Project> updatedProjects = updatedPerson.getProjects();
        return ProjectDTO.toProjectDTOs(updatedProjects);
    }
}
