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
public class Comment {

    @Id
    private String commentid;

    private String postid; // Reference to the Post

    private String name;

    private String description;

    @CreatedDate
    private LocalDateTime createdDate;
}
