package net.javaproject.skillsharingapplication.repository;

import net.javaproject.skillsharingapplication.model.LearningPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningPlanRepository extends MongoRepository<LearningPlan, String> {
    // You can add custom queries here if needed
}
