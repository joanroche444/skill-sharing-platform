package net.javaproject.skillsharingapplication.model;

public class Task {
    private String name;
    private String description;
    private boolean completed = false;

    // Constructors
    public Task() {
    }

    public Task(String name, String description) {
        this.name = name;
        this.description = description;
        this.completed = false;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
