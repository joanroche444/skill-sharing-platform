package net.javaproject.skillsharingapplication.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;  // Import PostMapping
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;  // Import RequestBody

import net.javaproject.skillsharingapplication.Repository.postRepo;
import net.javaproject.skillsharingapplication.model.Post;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    postRepo PostRepo;

    @PostMapping("/add")  // Handle POST request to add a post
    public void addPost(@RequestBody Post post) {
        PostRepo.save(post);
    }

    // New GET endpoint to fetch post by ID
    @GetMapping("/{postid}")
    public Post getPostById(@PathVariable String postid) {
        return PostRepo.findById(postid)
                       .orElseThrow(() -> new RuntimeException("Post not found"));
    }
}


