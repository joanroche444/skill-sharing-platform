package net.javaproject.skillsharingapplication.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "learning_progress_updates")
public class LearningProgress {

    @Id
    private String id;

    private String learningPlanId; // Link to the Learning Plan
    private String title; // Update title (e.g., "Completed JavaScript Basics")
    private String description; // Detailed description of the progress
    private Date createdAt; // Timestamp of the update
    private String userId; // User who posted the update

    public LearningProgress() {
        this.createdAt = new Date(); // Default to current time
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLearningPlanId() {
        return learningPlanId;
    }

    public void setLearningPlanId(String learningPlanId) {
        this.learningPlanId = learningPlanId;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
