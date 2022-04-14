package rakkeri.rakkeri_server.entity;

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
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;
    @Column(name = "start_time")
    private Timestamp startTime;
    @Column(name = "end_time")
    private Timestamp endTime;

    public Tracking(Task task, Timestamp startTime, Timestamp endTime) {
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
}
