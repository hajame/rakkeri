package rakkeri.rakkeri_server.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "tracking")
public class Tracking {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "tracking_sequence")
    @SequenceGenerator(name = "tracking_sequence", sequenceName = "tracking_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("personId")
    private Person person;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("projectId")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JoinColumn(name = "task_id", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("taskId")
    private Task task;


    public Tracking(Person person, Project project, Task task, Timestamp startTime, Timestamp endTime) {
        this.person = person;
        this.project = project;
        this.task = task;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Tracking(Task task) {
        this.task = task;
    }

    public Tracking() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
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

    @Override
    public String toString() {
        return "Tracking{" +
                "id=" + id +
                ", task=" + task +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                '}';
    }
}
