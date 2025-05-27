// src/main/java/com/questflow/service/impl/UserMissionServiceImpl.java
package com.questflow.service.impl;

import com.questflow.dto.MissionDto;
import com.questflow.dto.UserMissionDto;
import com.questflow.mapper.MissionMapper;
import com.questflow.model.Mission;
import com.questflow.model.User;
import com.questflow.model.UserMission;
import com.questflow.repository.MissionRepository;
import com.questflow.repository.UserMissionRepository;
import com.questflow.repository.UserRepository;
import com.questflow.service.UserMissionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserMissionServiceImpl implements UserMissionService {

	private final UserMissionRepository umRepo;
	private final UserRepository userRepo;
	private final MissionRepository missionRepo;
	private final MissionMapper missionMapper;

	public UserMissionServiceImpl(UserMissionRepository umRepo, UserRepository userRepo, MissionRepository missionRepo,
			MissionMapper missionMapper) {
		this.umRepo = umRepo;
		this.userRepo = userRepo;
		this.missionRepo = missionRepo;
		this.missionMapper = missionMapper;
	}

	/*** ADMIN FLOWS ***/

	@Override
	@Transactional(readOnly = true)
	public List<MissionDto> findMissionsByUser(Long userId) {
		// devuelve las misiones NO completadas
		return umRepo.findByUser_IdAndCompletedAtIsNull(userId).stream().map(UserMission::getMission)
				.map(missionMapper::toDto).collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public List<UserMissionDto> findCompletedByUser(Long userId) {
		// devuelve las misiones COMPLETADAS
		return umRepo.findByUser_IdAndCompletedAtIsNotNull(userId).stream().map(um -> {
			UserMissionDto dto = new UserMissionDto();
			dto.setMissionId(um.getMission().getId());
			dto.setMissionTitle(um.getMission().getTitle());
			dto.setCompletedAt(um.getCompletedAt());
			dto.setWorkDescription(um.getWorkDescription());
			dto.setAttachmentUrl(um.getAttachmentUrl());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void assignMissionToUser(Long userId, Long missionId) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + userId));
		Mission mission = missionRepo.findById(missionId)
				.orElseThrow(() -> new IllegalArgumentException("Misión no encontrada: " + missionId));
		UserMission um = new UserMission(user, mission);
		um.setCompletedAt(null); // asignada pero no completada
		umRepo.save(um);
	}

	@Override
	@Transactional
	public void revokeMissionFromUser(Long userId, Long missionId) {
		// borra la asignación (pendiente o completada)
		UserMission.UserMissionId pk = new UserMission.UserMissionId(userId, missionId);
		umRepo.deleteById(pk);
	}

	/*** PLAYER (ROLE_USER) FLOWS ***/

	@Override
	@Transactional(readOnly = true)
	public List<MissionDto> listPendingForUsername(String username) {
		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + username));
		return umRepo.findByUser_IdAndCompletedAtIsNull(user.getId()).stream().map(UserMission::getMission)
				.map(missionMapper::toDto).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void completeByUsername(String username, Long missionId, String workDescription, String attachmentUrl)
			throws IOException {

		User user = userRepo.findByUsername(username)
				.orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + username));
		Mission mission = missionRepo.findById(missionId)
				.orElseThrow(() -> new IllegalArgumentException("Misión no encontrada: " + missionId));

		UserMission um = umRepo.findByUser_IdAndMission_IdAndCompletedAtIsNull(user.getId(), missionId)
				.orElseThrow(() -> new IllegalStateException("Misión no asignada o ya completada"));

		// marcaremos completada y guardamos descripción/adjunto
		um.setCompletedAt(LocalDateTime.now());
		um.setWorkDescription(workDescription);
		um.setAttachmentUrl(attachmentUrl);
		umRepo.save(um);

		// sumamos recompensas al usuario
		user.setXp(user.getXp() + mission.getXpReward());
		user.setCoins(user.getCoins() + mission.getCoinsReward());
		userRepo.save(user);
	}
}
