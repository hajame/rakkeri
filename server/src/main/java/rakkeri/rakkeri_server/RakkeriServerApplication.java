package rakkeri.rakkeri_server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.entity.Task;
import rakkeri.rakkeri_server.entity.Tracking;
import rakkeri.rakkeri_server.service.PersonService;
import rakkeri.rakkeri_server.service.ProjectService;
import rakkeri.rakkeri_server.service.TaskService;
import rakkeri.rakkeri_server.service.TrackingService;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class RakkeriServerApplication {


    @Value("${spring.datasource.url}")
    private String dbUrl;

    public static void main(String[] args) {
        SpringApplication.run(RakkeriServerApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedHeaders("*");
            }
        };
    }

    @Bean
    CommandLineRunner commandLineRunner(PersonService personService, TaskService taskService,
                                        ProjectService projectService, TrackingService trackingService) {
        return args -> {
            Person newPerson = new Person("test", "test@example.com", "testpass");
            Project project = new Project("Best Test Project");
            Project secondProject = new Project("Second Project");
            Task cooking = new Task("cooking", project);
            project.getTasks().add(cooking);
            Task coding = new Task("coding", secondProject);
            secondProject.getTasks().add(coding);


            newPerson = personService.saveNew(newPerson);
            cooking = taskService.save(cooking);
            coding = taskService.save(coding);
            project = projectService.save(project);
            secondProject = projectService.save(secondProject);

            Set<Project> projectSet = new HashSet<>();
            projectSet.add(project);
            projectSet.add(secondProject);

            newPerson.setProjects(projectSet);
            personService.update(newPerson);

            Tracking first = new Tracking(
                    newPerson,
                    project,
                    cooking,
                    new Timestamp(ZonedDateTime.now().withZoneSameInstant(ZoneId.of("UTC")).toInstant().toEpochMilli()),
                    new Timestamp(ZonedDateTime.now().withZoneSameInstant(ZoneId.of("UTC"))
                            .plus(1, ChronoUnit.HOURS).toInstant().toEpochMilli())
            );
            Tracking second = new Tracking(
                    newPerson,
                    secondProject,
                    coding,
                    new Timestamp(ZonedDateTime.now().withZoneSameInstant(ZoneId.of("UTC"))
                            .plus(2, ChronoUnit.HOURS).toInstant().toEpochMilli()),
                    new Timestamp(ZonedDateTime.now().withZoneSameInstant(ZoneId.of("UTC"))
                            .plus(3, ChronoUnit.HOURS).toInstant().toEpochMilli())
            );
            trackingService.save(first);
            trackingService.save(second);
            System.out.println("____ Database is: ____ " + dbUrl);
        };
    }

}
