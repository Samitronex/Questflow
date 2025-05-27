// src/main/java/com/questflow/controller/UserGroupController.java
package com.questflow.controller;

import com.questflow.model.Group;
import com.questflow.service.UserGroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/groups")
public class UserGroupController {
    private final UserGroupService service;

    public UserGroupController(UserGroupService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Group>> list(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getUserGroups(userId));
    }

    @PostMapping("/{groupId}")
    public ResponseEntity<Void> add(@PathVariable Long userId,
                                    @PathVariable Integer groupId) {
        service.assignUserToGroup(userId, groupId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> remove(@PathVariable Long userId,
                                       @PathVariable Integer groupId) {
        service.removeUserFromGroup(userId, groupId);
        return ResponseEntity.noContent().build();
    }
}
