package net.javaproject.skillsharingapplication.Controller;

import lombok.RequiredArgsConstructor;
import net.javaproject.skillsharingapplication.Repository.ReactionRepository;
import net.javaproject.skillsharingapplication.model.Reaction;
import net.javaproject.skillsharingapplication.model.ReactionType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/reactions")
@RequiredArgsConstructor
public class Reactioncontroller {

    private final ReactionRepository reactionRepository;

    @PostMapping("/{postId}/{userId}/toggle")
    public ResponseEntity<?> toggleReaction(@PathVariable String postId, @PathVariable String userId) {
        Optional<Reaction> existing = reactionRepository.findByPostIdAndUserId(postId, userId);

        if (existing.isPresent()) {
            reactionRepository.deleteById(existing.get().getId());
            return ResponseEntity.ok().body("Reaction removed");
        } else {
            Reaction reaction = new Reaction();
            reaction.setPostId(postId);
            reaction.setUserId(userId);
            reaction.setType(ReactionType.LIKE);
            reactionRepository.save(reaction);
            return ResponseEntity.ok().body("Reaction added");
        }
    }

    @GetMapping("/{postId}/count")
    public ResponseEntity<Long> getLikeCount(@PathVariable String postId) {
        long count = reactionRepository.countByPostIdAndType(postId, ReactionType.LIKE);
        return ResponseEntity.ok(count);
    }
}
