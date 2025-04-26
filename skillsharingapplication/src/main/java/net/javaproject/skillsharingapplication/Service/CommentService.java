package net.javaproject.skillsharingapplication.Service;

import net.javaproject.skillsharingapplication.Repository.CommentRepo;
import net.javaproject.skillsharingapplication.model.Comment;
import net.javaproject.skillsharingapplication.response.ErrorResponse;
import net.javaproject.skillsharingapplication.response.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    // Add a new comment
    public SuccessResponse addComment(Comment comment) {
        Comment savedComment = commentRepo.save(comment);
        return new SuccessResponse("Thank you! Your comment has been successfully added. 😊", savedComment);
    }

    // Get a comment by ID
    public Object getCommentById(String id) {
        Optional<Comment> comment = commentRepo.findById(id);
        if (comment.isPresent()) {
            return comment.get();
        } else {
            return new ErrorResponse("Oops! Comment with ID " + id + " not found 😞");
        }
    }

    // Get all comments
    public Object getAllComments() {
        List<Comment> comments = commentRepo.findAll();
        if (comments.isEmpty()) {
            return new ErrorResponse("No comments found");
        }
        return comments;
    }

    // Update an existing comment
    public SuccessResponse updateComment(String id, Comment updatedComment) {
        Optional<Comment> existingCommentOpt = commentRepo.findById(id);
        if (existingCommentOpt.isPresent()) {
            Comment existingComment = existingCommentOpt.get();
            existingComment.setPostno(updatedComment.getPostno());
            existingComment.setName(updatedComment.getName());
            existingComment.setDescription(updatedComment.getDescription());
            Comment savedComment = commentRepo.save(existingComment);
            return new SuccessResponse("Thank you! Your comment has been successfully updated. 😊", savedComment);
        } else {
            return new SuccessResponse("The comment could not be updated, it was not found 😞.", null);
        }
    }

    // Delete a comment
    public Object deleteComment(String id) {
        Optional<Comment> existingCommentOpt = commentRepo.findById(id);
        if (existingCommentOpt.isPresent()) {
            Comment existingComment = existingCommentOpt.get();
            commentRepo.delete(existingComment);
            return new SuccessResponse("Your comment has been successfully deleted. 😊", null);
        } else {
            return new ErrorResponse("Comment with ID " + id + " not found 😞.");
        }
    }
}
