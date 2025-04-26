package net.javaproject.skillsharingapplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaproject.skillsharingapplication.model.User;
import net.javaproject.skillsharingapplication.repository.UserRepository;



@Service
public class UserService {
    @Autowired
    private UserRepository repo;



    public User saveUser(User user) {


        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public Optional<User> getUserById(String uid) {
        return repo.findById(uid);
    }

    public void deleteUser(String uid) {
        repo.deleteById(uid);
    }
}
