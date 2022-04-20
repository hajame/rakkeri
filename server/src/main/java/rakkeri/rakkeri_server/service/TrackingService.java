package rakkeri.rakkeri_server.service;

import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Tracking;
import rakkeri.rakkeri_server.repository.TrackingRepository;


@Service
public class TrackingService {

    private final TrackingRepository trackingRepository;
    private final TaskService taskService;

    public TrackingService(TrackingRepository trackingRepository, TaskService taskService) {
        this.trackingRepository = trackingRepository;
        this.taskService = taskService;
    }

    public Tracking save(Tracking tracking) {
        return trackingRepository.save(tracking);
    }

    public Tracking update(Tracking tracking) {
        return trackingRepository.save(tracking);
    }

    public Tracking getTracking(String authorizationToken, Long projectId, Long taskId, Long trackingId) {
        return null;
    }

}
