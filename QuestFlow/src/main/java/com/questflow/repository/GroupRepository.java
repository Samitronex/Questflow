// src/main/java/com/questflow/repository/GroupRepository.java
package com.questflow.repository;

import com.questflow.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Integer> {
}
