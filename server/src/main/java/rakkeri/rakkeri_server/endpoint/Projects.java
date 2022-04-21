package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
import rakkeri.rakkeri_server.DTO.ProjectDTO;
import rakkeri.rakkeri_server.DTO.TaskDTO;
import rakkeri.rakkeri_server.DTO.TrackingDTO;
import rakkeri.rakkeri_server.DTO.UserWithoutTokenDTO;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.service.PersonService;

import java.util.ArrayList;
import java.util.HashSet;
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
        Person person = personService.authenticatePerson(authorizationToken, userId);
        Set<Project> projects = person.getProjects();
        List<ProjectDTO> projectDTOs = new ArrayList<>();

        for (Project p : projects) {
            Set<TrackingDTO> trackingDTOs = new HashSet<>();
            p.getTrackings().forEach(tracking -> trackingDTOs.add(
                    new TrackingDTO(
                            tracking.getId(),
                            tracking.getStartTime(),
                            tracking.getEndTime(),
                            new UserWithoutTokenDTO(tracking.getPerson().getId(), tracking.getPerson().getUsername()),
                            new TaskDTO(tracking.getTask().getId(), tracking.getTask().getName()),
                            new ProjectDTO(p.getId(), p.getName())
                    )
            ));
            projectDTOs.add(
                    new ProjectDTO(p.getId(), p.getName(), trackingDTOs)
            );
        }
        return projectDTOs;
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
