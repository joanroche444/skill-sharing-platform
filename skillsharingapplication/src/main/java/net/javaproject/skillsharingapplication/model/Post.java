package net.javaproject.skillsharingapplication.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    private String postid;

    private String title;

    private String description;

    private String mediaUrl;  // Link to image or video

    private String mediaType; // "image" or "video"

    private String createdBy; // Username or user id

    private Long createdAt;   // Timestamp

}
