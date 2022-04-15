package rakkeri.rakkeri_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rakkeri.rakkeri_server.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}