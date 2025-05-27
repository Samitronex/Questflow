// src/main/java/com/questflow/controller/admin/MissionsAdminController.java
package com.questflow.controller.admin;

import com.questflow.dto.MissionCreateDto;
import com.questflow.model.Mission;
import com.questflow.service.MissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/missions")
@PreAuthorize("hasRole('ADMIN')")
public class MissionsAdminController {

	private final MissionService missionService;

	public MissionsAdminController(MissionService missionService) {
		this.missionService = missionService;
	}

	/**
	 * GET /api/admin/missions List all missions.
	 */
	@GetMapping
	public ResponseEntity<List<Mission>> getAllMissions() {
		List<Mission> missions = missionService.listarTodas();
		return ResponseEntity.ok(missions);
	}

	/**
	 * POST /api/admin/missions Create a new mission.
	 */
	@PostMapping
	public ResponseEntity<Mission> createMission(@RequestBody MissionCreateDto dto) {
		Mission created = missionService.createFromDto(dto);
		return ResponseEntity.status(201).body(created);
	}

	/**
	 * PUT /api/admin/missions/{id} Update an existing mission.
	 */
	@PutMapping("/{id}")
	public ResponseEntity<Mission> updateMission(@PathVariable Long id, @RequestBody MissionCreateDto dto) {
		Mission updated = missionService.updateFromDto(id, dto);
		return ResponseEntity.ok(updated);
	}

	/**
	 * DELETE /api/admin/missions/{id} Delete a mission.
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteMission(@PathVariable Long id) {
		missionService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
