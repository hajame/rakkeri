package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.*;
import rakkeri.rakkeri_server.entity.Task;
import rakkeri.rakkeri_server.entity.Tracking;
import rakkeri.rakkeri_server.service.TaskService;
import rakkeri.rakkeri_server.service.TrackingService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Trackings {

    private final TrackingService trackingService;
    private final TaskService taskService;

    public Trackings(TrackingService trackingService, TaskService taskService) {
        this.trackingService = trackingService;
        this.taskService = taskService;
    }

    @PostMapping("/api/projects/{projectId}/tasks/{taskId}/trackings")
    public List<Tracking> createTracking(@RequestHeader("Authorization") String authorizationToken,
                                         @PathVariable("projectId") Long projectId,
                                         @PathVariable("taskId") Long taskId,
                                         @RequestBody Tracking tracking) {
        Task task = taskService.getTask(authorizationToken, projectId, taskId);
        tracking.setTask(task);
        task.getTrackings().add(tracking);
        taskService.update(task);
        return new ArrayList<>(task.getTrackings());
    }

    @PutMapping("/api/projects/{projectId}/tasks/{taskId}/trackings/{trackingId}")
    public void updateTracking(@RequestHeader("Authorization") String authorizationToken,
                               @PathVariable("projectId") Long projectId,
                               @PathVariable("taskId") Long taskId,
                               @PathVariable("trackingId") Long trackingId,
                               @RequestBody Tracking tracking) {
        Tracking oldTracking = trackingService.getTracking(authorizationToken, projectId, taskId, trackingId);
        oldTracking.setStartTime(tracking.getStartTime());
        oldTracking.setEndTime(tracking.getEndTime());
        trackingService.update(oldTracking);
    }

}
