package net.javaproject.skillsharingapplication.Controller;

import org.springframework.web.bind.annotation.RestController;

import net.javaproject.skillsharingapplication.Repository.CommentRepo;

import net.javaproject.skillsharingapplication.model.Comment;
import net.javaproject.skillsharingapplication.model.ErrorResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class MainController {

    @Autowired
    private CommentRepo commentRepo;

    @PostMapping("/addComment")
    public void addComment(@RequestBody Comment comment) {
        commentRepo.save(comment);
    }

    @GetMapping("/getComment/{id}")
    public ResponseEntity<?> getComment(@PathVariable String id) {
        return commentRepo.findById(id)
                .<ResponseEntity<?>>map(comment -> ResponseEntity.ok(comment)) // Found the comment
                .orElseGet(() -> ResponseEntity.status(404)
                        .body(new ErrorResponse("Comment with ID " + id + " not found"))); // Not found
    }

    @GetMapping("/getAllComments")
public ResponseEntity<?> getAllComments() {
    List<Comment> comments = commentRepo.findAll();
    if (comments.isEmpty()) {
        // Return a custom error response if no comments are found
        ErrorResponse errorResponse = new ErrorResponse( "No comments found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
    // Return list of comments if found
    return ResponseEntity.ok(comments);
}

    
    
    

}
