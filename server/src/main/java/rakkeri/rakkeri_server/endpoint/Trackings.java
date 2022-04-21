package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
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
        Person person = personService.authenticatePerson(authorizationToken, trackingDTO.getUser().getId());
        Task task = taskService.getTask(trackingDTO.getTask().getId());
        Project project = projectService.findOne(trackingDTO.getProject().getId());

        Tracking tracking = new Tracking(person, project, task, trackingDTO.getStartTime(), trackingDTO.getEndTime());
        Tracking savedTracking = trackingService.save(tracking);
        return TrackingDTO.toDTO(savedTracking);
    }

    @PutMapping("/api/projects/{projectId}/tasks/{taskId}/trackings/{trackingId}")
    public void updateTracking(@RequestHeader("Authorization") String authorizationToken,
                               @PathVariable("projectId") Long projectId,
                               @PathVariable("taskId") Long taskId,
                               @PathVariable("trackingId") Long trackingId,
                               @RequestBody Tracking tracking) {
        Tracking oldTracking = trackingService.getTracking(authorizationToken, projectId, taskId, trackingId);
        oldTracking.setStartTime(tracking.getStartTime());
        oldTracking.setEndTime(tracking.getEndTime());
        trackingService.update(oldTracking);
    }

}
