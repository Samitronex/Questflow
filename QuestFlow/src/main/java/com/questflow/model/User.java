// src/main/java/com/questflow/model/User.java
package com.questflow.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    // Ahora usamos un enum para el rol, no un String
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private Integer coins;

    @Column(name="weekly_title", nullable = false)
    private String weeklyTitle;

    @Column(name="weekly_tasks", nullable = false)
    private Integer weeklyTasks;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Integer xp;

    @Column(name="xp_to_next", nullable = false)
    private Integer xpToNext;

    @Column(name="guild_rank", nullable = false)
    private Integer guildRank;

    @Column(name="guild_size", nullable = false)
    private Integer guildSize;

    @Column(name="avatar_class", nullable = false)
    private String avatarClass;

    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getCoins() {
        return coins;
    }

    public void setCoins(Integer coins) {
        this.coins = coins;
    }

    public String getWeeklyTitle() {
        return weeklyTitle;
    }

    public void setWeeklyTitle(String weeklyTitle) {
        this.weeklyTitle = weeklyTitle;
    }

    public Integer getWeeklyTasks() {
        return weeklyTasks;
    }

    public void setWeeklyTasks(Integer weeklyTasks) {
        this.weeklyTasks = weeklyTasks;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getXp() {
        return xp;
    }

    public void setXp(Integer xp) {
        this.xp = xp;
    }

    public Integer getXpToNext() {
        return xpToNext;
    }

    public void setXpToNext(Integer xpToNext) {
        this.xpToNext = xpToNext;
    }

    public Integer getGuildRank() {
        return guildRank;
    }

    public void setGuildRank(Integer guildRank) {
        this.guildRank = guildRank;
    }

    public Integer getGuildSize() {
        return guildSize;
    }

    public void setGuildSize(Integer guildSize) {
        this.guildSize = guildSize;
    }

    public String getAvatarClass() {
        return avatarClass;
    }

    public void setAvatarClass(String avatarClass) {
        this.avatarClass = avatarClass;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
