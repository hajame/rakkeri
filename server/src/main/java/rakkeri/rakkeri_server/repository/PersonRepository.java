package rakkeri.rakkeri_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rakkeri.rakkeri_server.entity.Person;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByUsername(String username);

    List<Person> findByEmail(String email);
}