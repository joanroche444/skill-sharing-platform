package net.javaproject.skillsharingapplication.controller;

import net.javaproject.skillsharingapplication.model.AuthRequest;
import net.javaproject.skillsharingapplication.model.AuthResponse;
import net.javaproject.skillsharingapplication.model.User;
import net.javaproject.skillsharingapplication.security.JwtUtil;
import net.javaproject.skillsharingapplication.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService service;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Check if the user already exists based on email 
        Optional<User> existingUser = service.findUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity
                    .status(409) // Conflict
                    .body("Error: Email already exists. Please use a different email.");
        }
        
        // Save the user
        User savedUser = service.saveUser(user);
        
        // Generate JWT token
        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        
        // Create and return response with token
        AuthResponse response = new AuthResponse(
            token,
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getFirstname(),
            savedUser.getLastname(),
            savedUser.getRole()
        );
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Login user with email and password
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            // Authenticate using Spring Security
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(),
                    authRequest.getPassword()
                )
            );
            
            // Authentication successful, generate token
            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
            String token = jwtUtil.generateToken(userDetails);
            
            // Get user details
            Optional<User> userOptional = service.findUserByEmail(authRequest.getEmail());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // Create and return response with token and user info
                AuthResponse response = new AuthResponse(
                    token,
                    user.getId(),
                    user.getEmail(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getRole()
                );
                
                return ResponseEntity.ok(response);
            } else {
                // This should not happen since authentication passed
                return ResponseEntity.status(500).body("User not found after authentication");
            }
        } catch (BadCredentialsException e) {
            // Authentication failed
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    
    /**
     * Legacy login endpoint for backward compatibility (can be removed later)
     */
    @PostMapping("/login-legacy")
    public ResponseEntity<?> loginUserLegacy(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        // Validate required fields
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }
        
        // Find user by email
        Optional<User> userOptional = service.findUserByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Check if password matches
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Generate JWT token
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                String token = jwtUtil.generateToken(userDetails);
                
                // Create response with token and user info
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("id", user.getId());
                response.put("email", user.getEmail());
                response.put("firstname", user.getFirstname());
                response.put("lastname", user.getLastname());
                response.put("role", user.getRole());
                
                return ResponseEntity.ok(response);
            }
        }
        
        // Authentication failed - invalid email or password
        return ResponseEntity.status(401).body("Invalid email or password");
    }
    
    /**
     * Validate token and get user info
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        // Extract token from header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtUtil.getUsernameFromToken(token);
            
            // Find user by email
            Optional<User> userOptional = service.findUserByEmail(username);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // Create response with user info (excluding password)
                Map<String, Object> response = new HashMap<>();
                response.put("id", user.getId());
                response.put("email", user.getEmail());
                response.put("firstname", user.getFirstname());
                response.put("lastname", user.getLastname());
                response.put("role", user.getRole());
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(401).body("Invalid or expired token");
    }

    /**
     * Get all users (protected endpoint)
     */
    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    /**
     * Get user by ID (protected endpoint)
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        return service.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Update user (protected endpoint)
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        updatedUser.setId(id);
        return ResponseEntity.ok(service.saveUser(updatedUser));
    }

    /**
     * Delete user (protected endpoint)
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}