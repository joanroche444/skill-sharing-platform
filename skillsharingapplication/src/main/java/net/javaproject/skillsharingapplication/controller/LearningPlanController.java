package net.javaproject.skillsharingapplication.controller;

import net.javaproject.skillsharingapplication.model.LearningPlan;
import net.javaproject.skillsharingapplication.service.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
@RestController
@RequestMapping("/learning-plans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService learningPlanService;

    @PostMapping
    public LearningPlan createLearningPlan(@RequestBody LearningPlan learningPlan) {
        return learningPlanService.createLearningPlan(learningPlan);
    }

    @GetMapping
    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanService.getAllLearningPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPlan> getLearningPlanById(@PathVariable String id) {
        LearningPlan learningPlan = learningPlanService.getLearningPlanById(id).orElse(null);
        if (learningPlan != null) {
            return ResponseEntity.ok(learningPlan);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPlan> updateLearningPlan(@PathVariable String id,
            @RequestBody LearningPlan learningPlanDetails) {
        LearningPlan updatedPlan = learningPlanService.updateLearningPlan(id, learningPlanDetails);
        if (updatedPlan != null) {
            return ResponseEntity.ok(updatedPlan);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLearningPlan(@PathVariable String id) {
        learningPlanService.deleteLearningPlan(id);
        return ResponseEntity.ok("Learning plan deleted successfully!");
    }
}
