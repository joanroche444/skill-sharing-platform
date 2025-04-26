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

public class Comment {

 private String commentid;

 private Integer postno;

 private  String name;

 private String description;

}
