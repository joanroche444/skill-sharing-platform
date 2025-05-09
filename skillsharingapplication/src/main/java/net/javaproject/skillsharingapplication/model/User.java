package net.javaproject.skillsharingapplication.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
   
    @Id
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String role = "USER";  // Default role is USER
    private String password;
    

}