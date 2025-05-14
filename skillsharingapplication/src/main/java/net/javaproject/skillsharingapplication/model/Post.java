package net.javaproject.skillsharingapplication.model;

import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
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

    // URL pointing to the uploaded image or video
    private String mediaUrl;

    // Media type like "image/jpeg", "video/mp4"
    private String mediaType;

    private String createdBy;

    private Long createdAt;
}
