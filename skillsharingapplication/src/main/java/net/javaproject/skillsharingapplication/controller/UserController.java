package net.javaproject.skillsharingapplication.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.javaproject.skillsharingapplication.model.User;
import net.javaproject.skillsharingapplication.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {

        // Check if the user already exists based on email 
        Optional<User> existingUser = service.findUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity
                    .status(409) // Conflict
                    .body("Error: Email already exists. Please use a different email.");
        }
    
        return ResponseEntity.ok(service.saveUser(user));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        return service.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        updatedUser.setId(id);
        return ResponseEntity.ok(service.saveUser(updatedUser));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}