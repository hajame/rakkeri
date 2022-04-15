package rakkeri.rakkeri_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rakkeri.rakkeri_server.entity.Tracking;

public interface TrackingRepository extends JpaRepository<Tracking, Long> {
}