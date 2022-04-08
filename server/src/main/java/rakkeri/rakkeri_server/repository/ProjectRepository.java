package rakkeri.rakkeri_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rakkeri.rakkeri_server.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}