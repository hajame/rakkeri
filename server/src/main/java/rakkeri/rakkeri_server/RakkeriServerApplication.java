package rakkeri.rakkeri_server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import rakkeri.rakkeri_server.entity.Person;
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
            personService.save(new Person("test", "test@example.com", "testpass"));
            System.out.println("____ Database is: ____ " + dbUrl);
        };
    }

}
