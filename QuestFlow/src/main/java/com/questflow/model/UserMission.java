// src/main/java/com/questflow/model/UserMission.java
package com.questflow.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "user_missions")
public class UserMission {

	@EmbeddedId
	private UserMissionId id;

	@MapsId("userId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@MapsId("missionId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mission_id", nullable = false)
	private Mission mission;

	/** Fecha y hora en que se completó la misión; NULL hasta la finalización */
	@Column(name = "completed_at", nullable = true)
	private LocalDateTime completedAt;

	@Column(name = "work_description", columnDefinition = "TEXT")
	private String workDescription;

	@Column(name = "attachment_url", length = 255)
	private String attachmentUrl;

	// ================= EmbeddedId =================

	@Embeddable
	public static class UserMissionId implements Serializable {
		@Column(name = "user_id")
		private Long userId;

		@Column(name = "mission_id")
		private Long missionId;

		public UserMissionId() {
		}

		public UserMissionId(Long userId, Long missionId) {
			this.userId = userId;
			this.missionId = missionId;
		}

		@Override
		public boolean equals(Object o) {
			if (this == o)
				return true;
			if (!(o instanceof UserMissionId))
				return false;
			UserMissionId that = (UserMissionId) o;
			return Objects.equals(userId, that.userId) && Objects.equals(missionId, that.missionId);
		}

		@Override
		public int hashCode() {
			return Objects.hash(userId, missionId);
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public Long getMissionId() {
			return missionId;
		}

		public void setMissionId(Long missionId) {
			this.missionId = missionId;
		}
	}

	// ================ Constructors ================

	public UserMission() {
	}

	/**
	 * Constructor para asignar una misión al usuario. completedAt queda en NULL
	 * hasta que la complete.
	 */
	public UserMission(User user, Mission mission) {
		this.id = new UserMissionId(user.getId(), mission.getId());
		this.user = user;
		this.mission = mission;
		this.completedAt = null; // explícito pero opcional
	}

	// ================= Getters/Setters =================

	public UserMissionId getId() {
		return id;
	}

	public void setId(UserMissionId id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Mission getMission() {
		return mission;
	}

	public void setMission(Mission mission) {
		this.mission = mission;
	}

	public LocalDateTime getCompletedAt() {
		return completedAt;
	}

	public void setCompletedAt(LocalDateTime completedAt) {
		this.completedAt = completedAt;
	}

	public String getWorkDescription() {
		return workDescription;
	}

	public void setWorkDescription(String workDescription) {
		this.workDescription = workDescription;
	}

	public String getAttachmentUrl() {
		return attachmentUrl;
	}

	public void setAttachmentUrl(String attachmentUrl) {
		this.attachmentUrl = attachmentUrl;
	}
}
