package net.javaproject.skillsharingapplication.controller;

import net.javaproject.skillsharingapplication.model.User;
import net.javaproject.skillsharingapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Create a new user (signup)
    @PostMapping("/signup")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Get user by email (used for login)
    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Update user information (e.g., username, email)
    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        updatedUser.setId(id);
        return userRepository.save(updatedUser);
    }

    // Delete user (if needed)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
    }
}
