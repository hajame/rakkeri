package rakkeri.rakkeri_server.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "task_sequence")
    @SequenceGenerator(name = "task_sequence", sequenceName = "task_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false)
    private Long id;
    @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(255)")
    private String name;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "tasks")
    Set<Project> projects = new HashSet<>();
    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Tracking> trackings = new HashSet<>();

    public Task(String name, Project project) {
        this.name = name;
        this.projects.add(project);
    }

    public Task() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<Tracking> getTrackings() {
        return trackings;
    }

    public void setTrackings(Set<Tracking> trackings) {
        this.trackings = trackings;
    }
}
