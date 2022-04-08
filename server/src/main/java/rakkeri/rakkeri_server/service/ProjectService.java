package rakkeri.rakkeri_server.service;

import org.springframework.stereotype.Service;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.repository.PersonRepository;
import rakkeri.rakkeri_server.repository.ProjectRepository;

@Service
public class ProjectService {

    private ProjectRepository projectRepository;
    private PersonRepository personRepository;

    public ProjectService(ProjectRepository projectRepository, PersonRepository personRepository) {
        this.projectRepository = projectRepository;
        this.personRepository = personRepository;
    }

    public void createNew(Person person, String name) {
        Project newProject = new Project(name);
        person.getProjects().add(newProject);
        personRepository.save(person);
    }
}
