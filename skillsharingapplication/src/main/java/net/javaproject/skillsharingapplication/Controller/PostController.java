package net.javaproject.skillsharingapplication.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;

import net.javaproject.skillsharingapplication.Repository.postRepo;
import net.javaproject.skillsharingapplication.model.Post;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend to access this
public class PostController {

    @Autowired
    private postRepo postRepo;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/add")
    public ResponseEntity<?> createPost(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "createdBy", required = false) String createdBy,
            @RequestParam(value = "mediaFile", required = false) MultipartFile mediaFile) {

        try {
            Post post = new Post();
            post.setTitle(title);
            post.setDescription(description);
            post.setCreatedBy(createdBy);
            post.setCreatedAt(System.currentTimeMillis());

            // Handle media file if uploaded
            if (mediaFile != null && !mediaFile.isEmpty()) {
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                String fileName = UUID.randomUUID().toString() + "_" + mediaFile.getOriginalFilename();
                File destFile = new File(UPLOAD_DIR + fileName);
                mediaFile.transferTo(destFile);

                String mediaUrl = "/uploads/" + fileName;
                String mediaType = mediaFile.getContentType();

                post.setMediaUrl(mediaUrl);
                post.setMediaType(mediaType != null && mediaType.contains("video") ? "video" : "image");
            }

            Post savedPost = postRepo.save(post);
            return ResponseEntity.ok(savedPost);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Failed to save post."));
        }
    }

    // Get all posts
    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postRepo.findAll();
        return posts.isEmpty()
                ? ResponseEntity.status(HttpStatus.NO_CONTENT).body(posts)
                : ResponseEntity.ok(posts);
    }

    // Get a specific post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        return postRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

@PutMapping("/update/{id}")
public ResponseEntity<?> updatePost(@PathVariable String id, @RequestBody Post updatedPost) {
    Optional<Post> optionalPost = postRepo.findById(id);
    if (optionalPost.isPresent()) {
        Post post = optionalPost.get();

        post.setTitle(updatedPost.getTitle());
        post.setDescription(updatedPost.getDescription());
        post.setMediaUrl(updatedPost.getMediaUrl());
        post.setMediaType(updatedPost.getMediaType());
        // post.setCreatedBy(post.getCreatedBy()); // Don't overwrite
        // post.setCreatedAt(post.getCreatedAt()); // Don't overwrite

        Post savedPost = postRepo.save(post);
        return ResponseEntity.ok(savedPost);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("message", "Post not found"));
    }
}

    // Delete a post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable String id) {
        if (postRepo.existsById(id)) {
            postRepo.deleteById(id);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Post deleted"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Post not found"));
        }
    }
}




