package net.javaproject.skillsharingapplication.controller;

import net.javaproject.skillsharingapplication.model.LearningProgress;
import net.javaproject.skillsharingapplication.repository.LearningProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RestController
@RequestMapping("/learning-progress")
public class LearningProgressController {

    @Autowired
    private LearningProgressRepository learningProgressRepository;

    // Create a progress update
    @PostMapping
    public LearningProgress createProgressUpdate(@RequestBody LearningProgress learningProgress) {
        return learningProgressRepository.save(learningProgress);
    }

    // Get all progress updates
    @GetMapping
    public List<LearningProgress> getAllProgressUpdates() {
        return learningProgressRepository.findAll();
    }

    // Get progress updates for a specific user or learning plan
    @GetMapping("/user/{userId}")
    public List<LearningProgress> getProgressByUser(@PathVariable String userId) {
        return learningProgressRepository.findByUserId(userId);
    }

    @GetMapping("/learning-plan/{learningPlanId}")
    public List<LearningProgress> getProgressByLearningPlan(@PathVariable String learningPlanId) {
        return learningProgressRepository.findByLearningPlanId(learningPlanId);
    }

    // ✅ Delete a progress update by ID
    @DeleteMapping("/{id}")
    public void deleteProgressUpdate(@PathVariable String id) {
        learningProgressRepository.deleteById(id);
    }
}
