package rakkeri.rakkeri_server.service;

import org.springframework.stereotype.Service;
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

    public Task save(Task task) {
        return taskRepository.save(task);
    }

}
