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

    private String mediaUrl;

    private String mediaType;

    private String createdBy;

    private Long createdAt;
}



