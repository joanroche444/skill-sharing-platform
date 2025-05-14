package net.javaproject.skillsharingapplication.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import net.javaproject.skillsharingapplication.model.Post;

import java.util.List;
import java.util.Optional;

public interface postRepo extends MongoRepository<Post, String> {

    // Get post by ID
    Optional<Post> findById(String postid);

    // Get all posts
    List<Post> findAll();

    // Delete post by ID
    void deleteById(String postid);

    // Save or create a post (inherited from MongoRepository)
    // Post save(Post post); // No need to add explicitly — already available
}


