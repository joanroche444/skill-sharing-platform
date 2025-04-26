package net.javaproject.skillsharingapplication.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;

import jakarta.validation.constraints.NotBlank;

@Document(collection = "learning_plans")
public class LearningPlan {

    @Id
    private String id;

    private String userId;

    @NotBlank
    private String title;

    private String description;

    private List<String> tags = new ArrayList<>();

    private String skill;

    private List<Task> tasks = new ArrayList<>();

    private boolean isPublic = false; // default to private

    private int learningPeriodInDays;

    private Date createdAt = new Date();

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public int getLearningPeriodInDays() {
        return learningPeriodInDays;
    }

    public void setLearningPeriodInDays(int learningPeriodInDays) {
        this.learningPeriodInDays = learningPeriodInDays;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
