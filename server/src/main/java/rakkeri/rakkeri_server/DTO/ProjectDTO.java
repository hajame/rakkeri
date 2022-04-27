package rakkeri.rakkeri_server.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import rakkeri.rakkeri_server.entity.Project;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ProjectDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("users")
    private Set<UserWithoutTokenDTO> users;
    @JsonProperty("tasks")
    private Set<TaskDTO> tasks = new HashSet<>();
    @JsonProperty("trackings")
    private Set<TrackingDTO> trackings = new HashSet<>();

    public ProjectDTO() {
    }

    public ProjectDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProjectDTO(Long id, String name, Set<UserWithoutTokenDTO> users, Set<TaskDTO> tasks,
                      Set<TrackingDTO> trackings) {
        this(id, name);
        this.users = users;
        this.tasks = tasks;
        this.trackings = trackings;
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

    public Set<UserWithoutTokenDTO> getUsers() {
        return users;
    }

    public void setUsers(Set<UserWithoutTokenDTO> users) {
        this.users = users;
    }

    public Set<TrackingDTO> getTrackings() {
        return trackings;
    }

    public void setTrackings(Set<TrackingDTO> trackings) {
        this.trackings = trackings;
    }

    public static List<ProjectDTO> toProjectDTOs(Set<Project> projects) {
        List<ProjectDTO> projectDTOs = new ArrayList<>();

        for (Project p : projects) {
            Set<UserWithoutTokenDTO> userDTOs = p.getPersons().stream()
                    .map(UserWithoutTokenDTO::toDTO)
                    .collect(Collectors.toSet());
            Set<TaskDTO> taskDTOs = p.getTasks().stream()
                    .map(TaskDTO::toDTO)
                    .collect(Collectors.toSet());
            Set<TrackingDTO> trackingDTOs = p.getTrackings().stream()
                    .map(TrackingDTO::toDTO)
                    .collect(Collectors.toSet());
            projectDTOs.add(
                    new ProjectDTO(p.getId(), p.getName(), userDTOs, taskDTOs, trackingDTOs)
            );
        }
        return projectDTOs;
    }

    @Override
    public String toString() {
        return "ProjectDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", users=" + users +
                ", tasks=" + tasks +
                ", trackings=" + trackings +
                '}';
    }
}
