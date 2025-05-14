package net.javaproject.skillsharingapplication.service;

import net.javaproject.skillsharingapplication.model.LearningPlan;
import net.javaproject.skillsharingapplication.repository.LearningPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LearningPlanService {

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    // Create a new learning plan
    public LearningPlan createLearningPlan(LearningPlan learningPlan) {
        return learningPlanRepository.save(learningPlan);
    }

    // Get all learning plans
    public List<LearningPlan> getAllLearningPlans() {
        return learningPlanRepository.findAll();
    }

    // Get a learning plan by id
    public Optional<LearningPlan> getLearningPlanById(String id) {
        return learningPlanRepository.findById(id);
    }

    // Update a learning plan
    public LearningPlan updateLearningPlan(String id, LearningPlan learningPlanDetails) {
        Optional<LearningPlan> learningPlan = learningPlanRepository.findById(id);
        if (learningPlan.isPresent()) {
            LearningPlan existingPlan = learningPlan.get();
            existingPlan.setTitle(learningPlanDetails.getTitle());
            existingPlan.setDescription(learningPlanDetails.getDescription());
            existingPlan.setSkill(learningPlanDetails.getSkill());
            existingPlan.setTasks(learningPlanDetails.getTasks());
            existingPlan.setTags(learningPlanDetails.getTags());
            existingPlan.setLearningPeriodInDays(learningPlanDetails.getLearningPeriodInDays());
            return learningPlanRepository.save(existingPlan);
        }
        return null; // or throw an exception
    }

    // Delete a learning plan
    public void deleteLearningPlan(String id) {
        learningPlanRepository.deleteById(id);
    }
}
