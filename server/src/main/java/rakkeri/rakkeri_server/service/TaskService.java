package rakkeri.rakkeri_server.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.entity.Task;
import rakkeri.rakkeri_server.repository.TaskRepository;


@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final PersonService personService;

    public TaskService(TaskRepository taskRepository, PersonService personService) {
        this.taskRepository = taskRepository;
        this.personService = personService;
    }

    public Task update(Task task) {
        return taskRepository.save(task);
    }

    public Task getTask(String authorizationToken, Long projectId, Long taskId) {
        Project project = personService.getProject(authorizationToken, projectId);
        return project.getTasks().stream()
                .filter(t -> taskId.equals(t.getId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }

}
