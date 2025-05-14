package net.javaproject.skillsharingapplication.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor


public class AuthResponse {
     private String token;
    private String id;
    private String email;
    private String firstname;
    private String lastname;
    private String role;
}
