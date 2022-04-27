package rakkeri.rakkeri_server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import rakkeri.rakkeri_server.entity.Task;

public class TaskDTO {
    @JsonProperty("id")
    private Long id;
    private String name;

    public TaskDTO() {
    }

    public TaskDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

    public static TaskDTO toDTO(Task task) {
        return new TaskDTO(task.getId(), task.getName());
    }
}
