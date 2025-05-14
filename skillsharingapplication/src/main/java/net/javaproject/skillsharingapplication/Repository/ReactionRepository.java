package net.javaproject.skillsharingapplication.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.javaproject.skillsharingapplication.model.Reaction;
import net.javaproject.skillsharingapplication.model.ReactionType;

public interface ReactionRepository extends MongoRepository<Reaction, String> {
    long countByPostIdAndType(String postId, ReactionType type);
    Optional<Reaction> findByPostIdAndUserId(String postId, String userId);

}
