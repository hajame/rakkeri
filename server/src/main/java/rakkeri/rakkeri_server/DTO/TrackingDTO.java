package rakkeri.rakkeri_server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;

public class TrackingDTO {
    @JsonProperty("id")
    private final Long id;
    private Timestamp startTime;
    private Timestamp endTime;
    private UserWithoutTokenDTO user;
    private TaskDTO task;
    private ProjectDTO project;

    public TrackingDTO(Long id) {
        this.id = id;
    }

    public TrackingDTO(Long id, Timestamp startTime, Timestamp endTime, UserWithoutTokenDTO user, TaskDTO task,
                       ProjectDTO project) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.user = user;
        this.task = task;
        this.project = project;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public UserWithoutTokenDTO getUser() {
        return user;
    }

    public void setUser(UserWithoutTokenDTO user) {
        this.user = user;
    }

    public TaskDTO getTask() {
        return task;
    }

    public void setTask(TaskDTO task) {
        this.task = task;
    }

    public ProjectDTO getProject() {
        return project;
    }

    public void setProject(ProjectDTO project) {
        this.project = project;
    }

    @Override
    public String toString() {
        return "TrackingDTO{" +
                "id=" + id +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", user=" + user +
                ", task=" + task +
                ", project=" + project +
                '}';
    }
}
