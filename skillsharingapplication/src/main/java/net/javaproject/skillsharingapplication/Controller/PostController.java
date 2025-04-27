package net.javaproject.skillsharingapplication.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;  // Import PostMapping
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;  // Import RequestBody
import org.springframework.web.bind.annotation.DeleteMapping;  // Import DeleteMapping

import net.javaproject.skillsharingapplication.Repository.postRepo;
import net.javaproject.skillsharingapplication.model.Post;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    postRepo PostRepo;

    // Add a post
    @PostMapping("/add")  
    public void addPost(@RequestBody Post post) {
        PostRepo.save(post);
    }

    // Get post by ID
    @GetMapping("/{postid}")
    public Post getPostById(@PathVariable String postid) {
        return PostRepo.findById(postid)
                       .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    // Delete post by ID
    @DeleteMapping("/delete/{postid}")
    public void deletePost(@PathVariable String postid) {
        Post post = PostRepo.findById(postid)
                            .orElseThrow(() -> new RuntimeException("Post not found"));

        PostRepo.deleteById(postid);
    }
}




