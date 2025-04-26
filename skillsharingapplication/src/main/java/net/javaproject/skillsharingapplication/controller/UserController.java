package net.javaproject.skillsharingapplication.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.javaproject.skillsharingapplication.model.User;
import net.javaproject.skillsharingapplication.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(service.saveUser(user));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/{uid}")
    public ResponseEntity<User> getUser(@PathVariable String uid) {
        return service.getUserById(uid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{uid}")
    public ResponseEntity<User> updateUser(@PathVariable String uid, @RequestBody User updatedUser) {
        updatedUser.setUid(uid);
        return ResponseEntity.ok(service.saveUser(updatedUser));
    }

    @DeleteMapping("/delete/{uid}")
    public ResponseEntity<Void> deleteUser(@PathVariable String uid) {
        service.deleteUser(uid);
        return ResponseEntity.noContent().build();
    }
}