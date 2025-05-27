// src/main/java/com/questflow/repository/UserMissionRepository.java
package com.questflow.repository;

import com.questflow.model.UserMission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserMissionRepository
    extends JpaRepository<UserMission, UserMission.UserMissionId> {

    // Misiones asignadas y NO completadas
    List<UserMission> findByUser_IdAndCompletedAtIsNull(Long userId);

    // Misiones completadas
    List<UserMission> findByUser_IdAndCompletedAtIsNotNull(Long userId);

    // Una misión pendiente concreta
    Optional<UserMission> findByUser_IdAndMission_IdAndCompletedAtIsNull(Long userId, Long missionId);
}
