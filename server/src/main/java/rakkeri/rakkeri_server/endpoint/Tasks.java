package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/api/tasks")
    public Task createTask(@RequestHeader("Authorization") String authorizationToken, @RequestBody Task task) {
        personService.authenticatePerson(authorizationToken);
        return taskService.save(task);
    }

    @PutMapping("/api/tasks/{taskId}")
    public void updateTask(@RequestHeader("Authorization") String authorizationToken,
                           @PathVariable("taskId") Long taskId,
                           @RequestBody Task task) {
        personService.authenticatePerson(authorizationToken);
        Task oldTask = taskService.getTask(taskId);
        oldTask.setName(task.getName());
        taskService.save(oldTask);
    }

}
