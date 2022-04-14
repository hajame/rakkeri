package rakkeri.rakkeri_server.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.entity.Task;
import rakkeri.rakkeri_server.service.PersonService;
import rakkeri.rakkeri_server.service.ProjectService;

import java.util.Objects;

@RestController
public class Tasks {

    private final ProjectService projectService;
    private final PersonService personService;

    public Tasks(ProjectService projectService, PersonService personService) {
        this.projectService = projectService;
        this.personService = personService;
    }
    
    @PostMapping("/api/projects/{projectId}/tasks")
    public Project createTask(@RequestHeader("Authorization") String authorizationToken,
                              @PathVariable("projectId") Long projectId, @RequestBody Task task) {
        Person person = personService.getPerson(authorizationToken);
        Project project = person.getProjects().stream()
                .filter(proj -> Objects.equals(proj.getId(), projectId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        project.getTasks().add(task);
        return projectService.update(project);
    }
}
