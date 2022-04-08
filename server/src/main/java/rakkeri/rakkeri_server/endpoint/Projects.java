package rakkeri.rakkeri_server.endpoint;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rakkeri.rakkeri_server.entity.Person;
import rakkeri.rakkeri_server.entity.Project;
import rakkeri.rakkeri_server.service.JwtService;
import rakkeri.rakkeri_server.service.PersonService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Projects {

    private final PersonService personService;
    private final JwtService jwtService;

    public Projects(PersonService personService, JwtService jwtService) {
        this.personService = personService;
        this.jwtService = jwtService;
    }

    @GetMapping("/api/users/{userId}/projects")
    public List<Project> getProjects(@RequestHeader("Authorization") String authorizationToken, @PathVariable("userId") Long userId) {
        Person personFromToken;
        try {
            personFromToken = jwtService.parseToken(authorizationToken, userId);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", exception);
        }
        Person person = personService.findOne(personFromToken.getId());
        return new ArrayList<>(person.getProjects());
    }

}
