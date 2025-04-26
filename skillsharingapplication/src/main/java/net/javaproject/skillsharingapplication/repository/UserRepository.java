package net.javaproject.skillsharingapplication.repository;

import net.javaproject.skillsharingapplication.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email); // Used for login
}
