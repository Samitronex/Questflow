// src/main/java/com/questflow/repository/MissionRepository.java
package com.questflow.repository;

import com.questflow.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission, Long> {}
