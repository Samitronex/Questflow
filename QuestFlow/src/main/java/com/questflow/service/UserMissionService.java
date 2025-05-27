package com.questflow.service;

import com.questflow.dto.MissionDto;
import com.questflow.dto.UserMissionDto;

import java.io.IOException;
import java.util.List;

public interface UserMissionService {
	// Admin: listar misiones asignadas (pendientes)
	List<MissionDto> findMissionsByUser(Long userId);

	// Admin: listar completadas
	List<UserMissionDto> findCompletedByUser(Long userId);

	// Admin: asignar
	void assignMissionToUser(Long userId, Long missionId);

	// Admin: revocar
	void revokeMissionFromUser(Long userId, Long missionId);

	// User: listar pendientes
	List<MissionDto> listPendingForUsername(String username);

	// User: completar
	void completeByUsername(String username, Long missionId, String workDescription, String attachmentUrl)
			throws IOException;
}