package net.javaproject.skillsharingapplication.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import net.javaproject.skillsharingapplication.model.Comment;

public interface commentRepo extends MongoRepository<Comment,Integer> {

    

}
