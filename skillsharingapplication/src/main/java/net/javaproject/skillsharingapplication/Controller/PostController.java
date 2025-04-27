package net.javaproject.skillsharingapplication.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;       // Import PutMapping
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;

import net.javaproject.skillsharingapplication.Repository.postRepo;
import net.javaproject.skillsharingapplication.model.Post;

import java.util.List;

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

    // Get all posts
    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return PostRepo.findAll();
    }

    // Update a post
    @PutMapping("/update/{postid}")
    public Post updatePost(@PathVariable String postid, @RequestBody Post updatedPost) {
        Post post = PostRepo.findById(postid)
                            .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setTitle(updatedPost.getTitle());
        post.setDescription(updatedPost.getDescription());
        post.setMediaUrl(updatedPost.getMediaUrl());
        post.setMediaType(updatedPost.getMediaType());
        post.setCreatedBy(updatedPost.getCreatedBy());
        post.setCreatedAt(updatedPost.getCreatedAt());

        return PostRepo.save(post);
    }

    // Delete post by ID
    @DeleteMapping("/delete/{postid}")
    public void deletePost(@PathVariable String postid) {
        Post post = PostRepo.findById(postid)
                            .orElseThrow(() -> new RuntimeException("Post not found"));

        PostRepo.deleteById(postid);
    }
}






