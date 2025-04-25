package net.javaproject.skillsharingapplication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Welcomecontroller {
    
    @GetMapping("/welcome")
    public String welcome() {
        return "welcome to spring boot world year 3 project";
    }
}
