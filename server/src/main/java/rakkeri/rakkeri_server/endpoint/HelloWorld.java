package rakkeri.rakkeri_server.endpoint;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import rakkeri.rakkeri_server.entity.Greeting;

@RestController
public class HelloWorld {

    @GetMapping("/hello")
    public Greeting helloWorld() {
        return new Greeting();
    }

}