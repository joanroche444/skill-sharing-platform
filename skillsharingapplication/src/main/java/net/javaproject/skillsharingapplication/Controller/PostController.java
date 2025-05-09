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
@CrossOrigin(origins = "http://localhost:3000") // adjust if frontend is hosted elsewhere
public class PostController {

    @Autowired
    private postRepo PostRepo;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/add")
    public ResponseEntity<?> createPost(
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "mediaFile", required = false) MultipartFile mediaFile
    ) {
        try {
            Post post = new Post();
            post.setDescription(description);
            post.setCreatedAt(System.currentTimeMillis());

            if (mediaFile != null && !mediaFile.isEmpty()) {
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                String fileName = UUID.randomUUID().toString() + "_" + mediaFile.getOriginalFilename();
                File destFile = new File(UPLOAD_DIR + fileName);
                mediaFile.transferTo(destFile);

                String mediaUrl = "/uploads/" + fileName;
                String mediaType = mediaFile.getContentType().startsWith("video") ? "video" : "image";

                post.setMediaUrl(mediaUrl);
                post.setMediaType(mediaType);
            }

            Post savedPost = PostRepo.save(post);
            return ResponseEntity.ok(savedPost);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Failed to save post."));
        }
    }

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return PostRepo.findAll();
    }
}







