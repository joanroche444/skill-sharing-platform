package net.javaproject.skillsharingapplication.Repository;

import java.util.Optional;

import net.javaproject.skillsharingapplication.model.Reaction;
import net.javaproject.skillsharingapplication.model.ReactionType;

public interface ReactionRepository {
    long countByPostIdAndType(String postId, ReactionType type);
    Optional<Reaction> findByPostIdAndUserId(String postId, String userId);

}
