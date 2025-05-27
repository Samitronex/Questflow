// src/main/java/com/questflow/service/UserGroupService.java
package com.questflow.service;

import com.questflow.model.Group;
import com.questflow.model.User;
import com.questflow.model.UserGroup;
import com.questflow.model.UserGroupId;
import com.questflow.repository.GroupRepository;
import com.questflow.repository.UserGroupRepository;
import com.questflow.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class UserGroupService {
    private final UserGroupRepository ugRepo;
    private final UserRepository userRepo;
    private final GroupRepository groupRepo;

    public UserGroupService(UserGroupRepository ugRepo,
                            UserRepository userRepo,
                            GroupRepository groupRepo) {
        this.ugRepo    = ugRepo;
        this.userRepo  = userRepo;
        this.groupRepo = groupRepo;
    }

    @Transactional
    public void assignUserToGroup(Long userId, Integer groupId) {
        User user    = userRepo.findById(userId)
                          .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Group group  = groupRepo.findById(groupId)
                          .orElseThrow(() -> new IllegalArgumentException("Group not found"));
        ugRepo.save(new UserGroup(user, group));
    }

    @Transactional
    public void removeUserFromGroup(Long userId, Integer groupId) {
        ugRepo.deleteById(new UserGroupId(userId, groupId));
    }

    @Transactional(readOnly = true)
    public List<Group> getUserGroups(Long userId) {
        return ugRepo.findByIdUserId(userId)
                     .stream()
                     .map(UserGroup::getGroup)
                     .toList();
    }
}
