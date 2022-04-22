package rakkeri.rakkeri_server.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
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

    public Tracking findOne(Long id) {
        return trackingRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Tracking update(Tracking tracking) {
        return trackingRepository.save(tracking);
    }

    public Tracking getTracking(String authorizationToken, Long projectId, Long taskId, Long trackingId) {
        return null;
    }

    public boolean exists(Long id) {
        return trackingRepository.findById(id).isPresent();
    }
}
