package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
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
    public TrackingDTO saveOrUpdateTracking(@RequestHeader("Authorization") String authorizationToken,
                                            @RequestBody TrackingDTO trackingDTO) {
        Person person = personService.authenticateAndGetPerson(authorizationToken);
        if (trackingDTO.getId() != null) {
            return updateExistingTracking(trackingDTO, person);
        }
        return saveNewTracking(trackingDTO, person);
    }

    private TrackingDTO saveNewTracking(TrackingDTO trackingDTO, Person person) {
        Project project = personService.getProject(person, trackingDTO.getProject().getId());
        Task task = taskService.getTask(trackingDTO.getTask().getId());
        Tracking tracking = new Tracking(person, project, task, trackingDTO.getStartTime(), trackingDTO.getEndTime());
        project.getTasks().add(task);
        projectService.update(project);
        Tracking savedTracking = trackingService.save(tracking);
        return TrackingDTO.toDTO(savedTracking);
    }

    private TrackingDTO updateExistingTracking(TrackingDTO trackingDTO, Person person) {
        Project project = personService.getProject(person, trackingDTO.getProject().getId());
        Tracking tracking = trackingService.findOne(trackingDTO.getId());
        Task task = taskService.getTask(trackingDTO.getTask().getId());

        // TODO: setPerson
        tracking.setProject(project);
        tracking.setTask(task);
        tracking.setStartTime(trackingDTO.getStartTime());
        tracking.setEndTime(trackingDTO.getEndTime());

        project.getTasks().add(task);
        projectService.update(project);
        
        Tracking savedTracking = trackingService.save(tracking);
        return TrackingDTO.toDTO(savedTracking);
    }

}
