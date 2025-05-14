package net.javaproject.skillsharingapplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.javaproject.skillsharingapplication.model.Comment;

public interface commentRepo extends MongoRepository<Comment,String> {
    

}
