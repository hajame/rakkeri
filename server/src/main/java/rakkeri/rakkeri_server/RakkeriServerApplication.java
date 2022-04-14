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
import rakkeri.rakkeri_server.service.PersonService;

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
    CommandLineRunner commandLineRunner(PersonService personService) {
        return args -> {
            Person newPerson = new Person("test", "test@example.com", "testpass");
            Project project = new Project("Best Test Project");
            Project secondProject = new Project("Second Project");
            Task cooking = new Task("cooking");
            Task coding = new Task("coding");
            project.getTasks().add(cooking);
            secondProject.getTasks().add(coding);
            secondProject.getTasks().add(cooking);
            newPerson.getProjects().add(project);
            newPerson.getProjects().add(secondProject);
            project.getPersons().add(newPerson);
            secondProject.getPersons().add(newPerson);

            personService.saveNew(newPerson);
            System.out.println("____ Database is: ____ " + dbUrl);
        };
    }

}
