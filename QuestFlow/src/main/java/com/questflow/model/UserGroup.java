// src/main/java/com/questflow/model/UserGroup.java
package com.questflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_groups")
public class UserGroup {
    @EmbeddedId
    private UserGroupId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @MapsId("groupId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    public UserGroup() {}
    public UserGroup(User user, Group group) {
        this.user = user;
        this.group = group;
        this.id   = new UserGroupId(user.getId(), group.getId());
    }

    // getters / setters
    public UserGroupId getId() { return id; }
    public void setId(UserGroupId id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Group getGroup() { return group; }
    public void setGroup(Group group) { this.group = group; }
}
