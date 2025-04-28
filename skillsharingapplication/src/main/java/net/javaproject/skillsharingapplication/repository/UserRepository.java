package net.javaproject.skillsharingapplication.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import net.javaproject.skillsharingapplication.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
