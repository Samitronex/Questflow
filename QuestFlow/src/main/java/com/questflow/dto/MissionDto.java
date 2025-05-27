package com.questflow.dto;

import java.time.LocalDate;

public class MissionDto {
	private Long id;
	private String title;
	private String description;
	private String difficulty;
	private int xpReward;
	private int coinsReward;
	private LocalDate dueDate;

	// Getters y setters
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

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public int getXpReward() {
		return xpReward;
	}

	public void setXpReward(int xpReward) {
		this.xpReward = xpReward;
	}

	public int getCoinsReward() {
		return coinsReward;
	}

	public void setCoinsReward(int coinsReward) {
		this.coinsReward = coinsReward;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}
}
