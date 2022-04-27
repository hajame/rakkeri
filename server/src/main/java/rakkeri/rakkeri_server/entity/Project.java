package rakkeri.rakkeri_server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "project_sequence")
    @SequenceGenerator(name = "project_sequence", sequenceName = "project_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false)
    private Long id;
    @Column(name = "name", nullable = false, columnDefinition = "VARCHAR(255)")
    private String name;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "projects")
    Set<Person> persons = new HashSet<>();
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "project_tasks",
            joinColumns = {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "task_id")}
    )
    private Set<Task> tasks = new HashSet<>();
    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Tracking> trackings = new HashSet<>();

    public Project(String name) {
        this.name = name;
    }

    public Project() {
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

    public Set<Person> getPersons() {
        return persons;
    }

    public void setPersons(Set<Person> persons) {
        this.persons = persons;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Set<Tracking> getTrackings() {
        return trackings;
    }

    public void setTrackings(Set<Tracking> trackings) {
        this.trackings = trackings;
    }
}
