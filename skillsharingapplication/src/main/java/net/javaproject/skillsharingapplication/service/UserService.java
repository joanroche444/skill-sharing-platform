package net.javaproject.skillsharingapplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.javaproject.skillsharingapplication.model.User;
import net.javaproject.skillsharingapplication.repository.UserRepository;



@Service
public class UserService {
    @Autowired
    private UserRepository repo;

     @Autowired
        private PasswordEncoder passwordEncoder;



    public User saveUser(User user) {

        String hashedPassword = passwordEncoder.encode(user.getPassword());
     user.setPassword(hashedPassword);
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public Optional<User> getUserById(String id) {
        return repo.findById(id);
    }

    public void deleteUser(String id) {
        repo.deleteById(id);
    }
}
