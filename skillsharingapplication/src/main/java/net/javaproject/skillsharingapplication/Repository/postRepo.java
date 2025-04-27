package net.javaproject.skillsharingapplication.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import net.javaproject.skillsharingapplication.model.Post;
import java.util.Optional;

public interface postRepo extends MongoRepository<Post, String> {

    // Custom method to find a post by its postid
    Optional<Post> findById(String postid);
}
