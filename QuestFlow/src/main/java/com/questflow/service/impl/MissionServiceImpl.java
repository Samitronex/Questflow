// src/main/java/com/questflow/service/impl/MissionServiceImpl.java
package com.questflow.service.impl;

import com.questflow.dto.MissionCreateDto;
import com.questflow.model.Mission;
import com.questflow.model.User;
import com.questflow.model.UserMission;
import com.questflow.repository.MissionRepository;
import com.questflow.repository.UserMissionRepository;
import com.questflow.repository.UserRepository;
import com.questflow.service.MissionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class MissionServiceImpl implements MissionService {

	private final MissionRepository missionRepo;
	private final UserRepository userRepo;
	private final UserMissionRepository userMissionRepo;

	// Recompensas por dificultad
	private static final Map<String, int[]> REWARDS = Map.of("EASY", new int[] { 10, 5 }, "MEDIUM",
			new int[] { 25, 15 }, "HARD", new int[] { 50, 30 });

	public MissionServiceImpl(MissionRepository missionRepo, UserRepository userRepo,
			UserMissionRepository userMissionRepo) {
		this.missionRepo = missionRepo;
		this.userRepo = userRepo;
		this.userMissionRepo = userMissionRepo;
	}

	@Override
	public List<Mission> listarTodas() {
		return missionRepo.findAll();
	}

	@Override
	public Optional<Mission> buscarPorId(Long id) {
		return missionRepo.findById(id);
	}

	@Override
	public Mission createFromDto(MissionCreateDto dto) {
		int[] reward = REWARDS.get(dto.getDifficulty().toUpperCase());
		if (reward == null) {
			throw new IllegalArgumentException("Invalid difficulty: " + dto.getDifficulty());
		}

		Mission m = new Mission();
		m.setTitle(dto.getTitle());
		m.setDescription(dto.getDescription());
		m.setDifficulty(dto.getDifficulty().toUpperCase());
		m.setXpReward(reward[0]);
		m.setCoinsReward(reward[1]);

		// — asignar dueDate por defecto si viene null (1 semana desde hoy) —
		LocalDate dueDate = dto.getDueDate();
		if (dueDate == null) {
			dueDate = LocalDate.now().plusWeeks(1);
		}
		m.setDueDate(dueDate);

		return missionRepo.save(m);
	}

	@Override
	public Mission updateFromDto(Long id, MissionCreateDto dto) {
		Mission m = missionRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Mission not found: " + id));

		int[] reward = REWARDS.get(dto.getDifficulty().toUpperCase());
		if (reward == null) {
			throw new IllegalArgumentException("Invalid difficulty: " + dto.getDifficulty());
		}

		m.setTitle(dto.getTitle());
		m.setDescription(dto.getDescription());
		m.setDifficulty(dto.getDifficulty().toUpperCase());
		m.setXpReward(reward[0]);
		m.setCoinsReward(reward[1]);

		// — actualizar dueDate si viene en el DTO —
		if (dto.getDueDate() != null) {
			m.setDueDate(dto.getDueDate());
		}

		return missionRepo.save(m);
	}

	@Override
	public void delete(Long id) {
		missionRepo.deleteById(id);
	}

	@Override
	@Transactional
	public void completeMission(Long userId, Long missionId, LocalDateTime completedAt, String description,
			String attachmentUrl) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new NoSuchElementException("User not found: " + userId));
		Mission mission = missionRepo.findById(missionId)
				.orElseThrow(() -> new NoSuchElementException("Mission not found: " + missionId));

		// Crear y guardar el registro de UserMission
		UserMission um = new UserMission(user, mission);
		um.setCompletedAt(completedAt);
		um.setWorkDescription(description);
		um.setAttachmentUrl(attachmentUrl);
		userMissionRepo.save(um);

		// Sumar recompensas al usuario
		user.setXp(user.getXp() + mission.getXpReward());
		user.setCoins(user.getCoins() + mission.getCoinsReward());
		userRepo.save(user);
	}
}
