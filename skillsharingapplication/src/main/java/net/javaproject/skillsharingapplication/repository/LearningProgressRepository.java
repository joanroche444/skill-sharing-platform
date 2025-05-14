package net.javaproject.skillsharingapplication.repository;

import net.javaproject.skillsharingapplication.model.LearningProgress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningProgressRepository extends MongoRepository<LearningProgress, String> {
    List<LearningProgress> findByUserId(String userId);

    List<LearningProgress> findByLearningPlanId(String learningPlanId);
}
