package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.entity.Task;
import rakkeri.rakkeri_server.service.PersonService;
import rakkeri.rakkeri_server.service.ProjectService;
import rakkeri.rakkeri_server.service.TaskService;

@RestController
public class Tasks {

    private final ProjectService projectService;
    private final PersonService personService;
    private final TaskService taskService;

    public Tasks(ProjectService projectService, PersonService personService,
                 TaskService taskService) {
        this.projectService = projectService;
        this.personService = personService;
        this.taskService = taskService;
    }

    @PostMapping("/api/projects/{projectId}/tasks")
    public Project createTask(@RequestHeader("Authorization") String authorizationToken,
                              @PathVariable("projectId") Long projectId,
                              @RequestBody Task task) {
        Project project = personService.getProject(authorizationToken, projectId);
        project.getTasks().add(task);
        return projectService.update(project);
    }

    @PutMapping("/api/projects/{projectId}/tasks/{taskId}")
    public void updateTask(@RequestHeader("Authorization") String authorizationToken,
                           @PathVariable("projectId") Long projectId,
                           @PathVariable("taskId") Long taskId,
                           @RequestBody Task task) {
        Task oldTask = taskService.getTask(authorizationToken, projectId, taskId);
        oldTask.setName(task.getName());
        taskService.update(oldTask);
    }

}
