package net.javaproject.skillsharingapplication.Controller;

import org.springframework.web.bind.annotation.RestController;

import net.javaproject.skillsharingapplication.Repository.commentRepo;
import net.javaproject.skillsharingapplication.model.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController

public class MainController {
@Autowired
commentRepo CommentRepo;


    @PostMapping("/addComment")
    public void addComment(@RequestBody Comment comment){
        CommentRepo.save(comment);

    }
    

}
