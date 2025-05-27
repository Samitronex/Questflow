// src/main/java/com/questflow/model/Mission.java
package com.questflow.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "missions")
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "xp_reward", nullable = false)
    private Integer xpReward;

    @Column(name = "coins_reward", nullable = false)
    private Integer coinsReward;

    @Column(nullable = false, length = 20)
    private String difficulty;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getXpReward() {
		return xpReward;
	}

	public void setXpReward(Integer xpReward) {
		this.xpReward = xpReward;
	}

	public Integer getCoinsReward() {
		return coinsReward;
	}

	public void setCoinsReward(Integer coinsReward) {
		this.coinsReward = coinsReward;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

  
}
