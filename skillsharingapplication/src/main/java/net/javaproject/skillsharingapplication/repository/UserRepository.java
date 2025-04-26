package net.javaproject.skillsharingapplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import net.javaproject.skillsharingapplication.model.User;

public interface UserRepository extends MongoRepository<User, String> {

}
