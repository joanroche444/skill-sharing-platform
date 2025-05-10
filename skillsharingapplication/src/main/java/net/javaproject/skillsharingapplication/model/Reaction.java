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
public class Reaction {
     @Id
    private String id;

    private String postId;
    private String userId;
    private ReactionType type;

}
