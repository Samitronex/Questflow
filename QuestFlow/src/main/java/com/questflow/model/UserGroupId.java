// src/main/java/com/questflow/model/UserGroupId.java
package com.questflow.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserGroupId implements Serializable {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "group_id")
    private Integer groupId;

    public UserGroupId() {}

    public UserGroupId(Long userId, Integer groupId) {
        this.userId = userId;
        this.groupId = groupId;
    }

    // getters / setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Integer getGroupId() { return groupId; }
    public void setGroupId(Integer groupId) { this.groupId = groupId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserGroupId)) return false;
        UserGroupId that = (UserGroupId) o;
        return Objects.equals(userId, that.userId)
            && Objects.equals(groupId, that.groupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, groupId);
    }
}
