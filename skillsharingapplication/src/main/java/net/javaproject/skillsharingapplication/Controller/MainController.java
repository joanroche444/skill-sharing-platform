package net.javaproject.skillsharingapplication.controller;

import org.springframework.web.bind.annotation.RestController;

import net.javaproject.skillsharingapplication.Repository.commentRepo;

import net.javaproject.skillsharingapplication.repository.commentRepo;
import net.javaproject.skillsharingapplication.model.Comment;
import net.javaproject.skillsharingapplication.response.ErrorResponse;
import net.javaproject.skillsharingapplication.response.SuccessResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class MainController {

    @Autowired
    private commentRepo commentRepo;

    @PostMapping("/addComment")
    public ResponseEntity<?> addComment(@RequestBody Comment comment) {
        // Save the comment
        Comment savedComment = commentRepo.save(comment);

        // Return success response with the saved comment
        SuccessResponse successResponse = new SuccessResponse("Thank you! Your comment has been successfully added. 😊", savedComment);
        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("/getComment/{id}")
    public ResponseEntity<?> getComment(@PathVariable String id) {
        // Check if comment exists
        Comment comment = commentRepo.findById(id).orElse(null);
    
        if (comment != null) {
            // If found, return a success response with the comment and a happy face emoji
            SuccessResponse successResponse = new SuccessResponse("Here is your comment 😊", comment);
            return ResponseEntity.ok(successResponse);
        } else {
            // If not found, return an error response with a sad face emoji
            ErrorResponse errorResponse = new ErrorResponse("Oops! Comment with ID " + id + " not found 😞");
            return ResponseEntity.status(404).body(errorResponse);
        }
    }
    


    @GetMapping("/getAllComments")
public ResponseEntity<?> getAllComments() {
    List<Comment> comments = commentRepo.findAll();
    if (comments.isEmpty()) {
        // Return a custom error response if no comments are found
        ErrorResponse errorResponse = new ErrorResponse("No comments found 😞");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
    // Return list of comments with a happy face emoji if found
    SuccessResponse successResponse = new SuccessResponse("Here are all the comments 😊", comments);
    return ResponseEntity.ok(successResponse);
}




@PutMapping("/updateComment/{id}")
public ResponseEntity<SuccessResponse> updateComment(@PathVariable String id, @RequestBody Comment comment) {
    // Look for the comment by its ID directly
    Comment existingComment = commentRepo.findById(id).orElse(null);

    // If the comment exists, update it and save
    if (existingComment != null) {
        // Update fields
        existingComment.setPostno(comment.getPostno());
        existingComment.setName(comment.getName());
        existingComment.setDescription(comment.getDescription());

        // Save the updated comment
        Comment updatedComment = commentRepo.save(existingComment);

        // Create a success response message
        SuccessResponse successResponse = new SuccessResponse("Thank you! Your comment has been successfully updated. 😊", updatedComment);

        // Return the success response with 200 OK and the updated comment
        return ResponseEntity.ok(successResponse);
    }

    // If comment is not found, return a success message
    SuccessResponse successResponse = new SuccessResponse("The comment could not be updated, it was not found .", null);
    return ResponseEntity.status(HttpStatus.OK).body(successResponse);
}


@DeleteMapping("/deleteComment/{id}")
public ResponseEntity<?> deleteComment(@PathVariable String id) {
    // Find the comment by its ID
    Comment existingComment = commentRepo.findById(id).orElse(null);

    // If the comment exists, delete it and return a success message
    if (existingComment != null) {
        commentRepo.delete(existingComment);

        // Return a success message
        SuccessResponse successResponse = new SuccessResponse("Your comment has been successfully deleted. 😊", null);
        return ResponseEntity.ok(successResponse);
    }

    // If the comment does not exist, return an error response
    ErrorResponse errorResponse = new ErrorResponse("Comment with ID " + id + " not found 😞.");
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
}






    
    
    

}
