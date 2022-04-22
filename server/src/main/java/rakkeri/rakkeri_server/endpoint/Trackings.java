package rakkeri.rakkeri_server.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.DTO.TrackingDTO;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.entity.Task;
import rakkeri.rakkeri_server.entity.Tracking;
import rakkeri.rakkeri_server.service.PersonService;
import rakkeri.rakkeri_server.service.ProjectService;
import rakkeri.rakkeri_server.service.TaskService;
import rakkeri.rakkeri_server.service.TrackingService;

@RestController
public class Trackings {

    private final TrackingService trackingService;
    private final TaskService taskService;
    private final PersonService personService;
    private final ProjectService projectService;

    public Trackings(TrackingService trackingService, TaskService taskService,
                     PersonService personService, ProjectService projectService) {
        this.trackingService = trackingService;
        this.taskService = taskService;
        this.personService = personService;
        this.projectService = projectService;
    }

    @PostMapping("/api/trackings")
    public TrackingDTO createTracking(@RequestHeader("Authorization") String authorizationToken,
                                      @RequestBody TrackingDTO trackingDTO) {
        Person person = personService.authenticateAndGetPerson(authorizationToken, trackingDTO.getUser().getId());
        Task task = taskService.getTask(trackingDTO.getTask().getId());
        Project project = projectService.findOne(trackingDTO.getProject().getId());
        Tracking tracking = new Tracking(person, project, task, trackingDTO.getStartTime(), trackingDTO.getEndTime());
        Tracking savedTracking = trackingService.save(tracking);
        return TrackingDTO.toDTO(savedTracking);
    }

    @PutMapping("/api/trackings/{trackingId}")
    public TrackingDTO updateTracking(@RequestHeader("Authorization") String authorizationToken,
                                      @PathVariable("trackingId") Long trackingId,
                                      @RequestBody TrackingDTO trackingDTO) {
        Person person = personService.authenticateAndGetPerson(authorizationToken);
        Tracking tracking = trackingService.findOne(trackingId);
        boolean isProjectOwner = person.getProjects().stream()
                .anyMatch(project -> tracking.getProject().getId().equals(project.getId()));
        if (!isProjectOwner) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
        }
        // TODO: setPerson, setTask, setProject
        tracking.setStartTime(trackingDTO.getStartTime());
        tracking.setEndTime(trackingDTO.getEndTime());
        Tracking savedTracking = trackingService.save(tracking);
        return TrackingDTO.toDTO(savedTracking);
    }

}
