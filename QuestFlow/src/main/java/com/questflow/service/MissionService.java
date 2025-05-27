// src/main/java/com/questflow/service/MissionService.java
package com.questflow.service;

import com.questflow.dto.MissionCreateDto;
import com.questflow.model.Mission;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MissionService {
	List<Mission> listarTodas();

	Optional<Mission> buscarPorId(Long id);

	Mission createFromDto(MissionCreateDto dto);

	Mission updateFromDto(Long id, MissionCreateDto dto);

	void delete(Long id);

	// Añade el método para completar misión, porque lo usas en el controller
	void completeMission(Long userId, Long missionId, LocalDateTime completedAt, String description,
			String attachmentUrl);
}
