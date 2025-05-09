package net.javaproject.skillsharingapplication.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.javaproject.skillsharingapplication.model.Comment;

public interface commentRepo extends MongoRepository<Comment, String> {
    List<Comment> findByPostid(String postid);
}