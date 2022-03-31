package rakkeri.rakkeri_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rakkeri.rakkeri_server.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
}