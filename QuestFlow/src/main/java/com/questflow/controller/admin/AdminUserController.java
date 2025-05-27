package com.questflow.controller.admin;

import com.questflow.dto.MissionDto;
import com.questflow.dto.UserDto;
import com.questflow.dto.UserMissionDto; 
import com.questflow.service.UserMissionService;
import com.questflow.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

	private final UserService userService;
	private final UserMissionService userMissionService;

	public AdminUserController(UserService userService, UserMissionService userMissionService) {
		this.userService = userService;
		this.userMissionService = userMissionService;
	}

	// 1) Listar usuarios
	@GetMapping
	public ResponseEntity<List<UserDto>> listUsers() {
		return ResponseEntity.ok(userService.findAllUsers());
	}

	// 2) Ver misiones pendientes
	@GetMapping("/{userId}/missions")
	public ResponseEntity<List<MissionDto>> listUserMissions(@PathVariable Long userId) {
		return ResponseEntity.ok(userMissionService.findMissionsByUser(userId));
	}

	// 3) Ver misiones completadas
	@GetMapping("/{userId}/missions/completed")
	public ResponseEntity<List<UserMissionDto>> listCompleted(@PathVariable Long userId) {
		return ResponseEntity.ok(userMissionService.findCompletedByUser(userId));
	}

	// 4) Revocar misión
	@DeleteMapping("/{userId}/missions/{missionId}")
	public ResponseEntity<Void> revoke(@PathVariable Long userId, @PathVariable Long missionId) {
		userMissionService.revokeMissionFromUser(userId, missionId);
		return ResponseEntity.noContent().build();
	}

	// 5) Asignar misión
	@PostMapping("/{userId}/missions/{missionId}/assign")
	public ResponseEntity<Void> assign(@PathVariable Long userId, @PathVariable Long missionId) {
		userMissionService.assignMissionToUser(userId, missionId);
		return ResponseEntity.ok().build();
	}
}
