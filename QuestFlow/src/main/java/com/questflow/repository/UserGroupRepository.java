package com.questflow.repository;

import com.questflow.model.UserGroup;
import com.questflow.model.UserGroupId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserGroupRepository extends JpaRepository<UserGroup, UserGroupId> {
  // Busca todos los UserGroup cuyo EmbeddedId.userId coincida
  List<UserGroup> findByIdUserId(Long userId);
}
