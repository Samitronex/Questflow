// src/main/java/com/questflow/controller/UserMissionController.java
package com.questflow.controller;

import com.questflow.dto.MissionDto;
import com.questflow.service.FileStorageService;
import com.questflow.service.UserMissionService;
import org.springframework.http.MediaType; // <<<<<<<<<<<<<<<<<
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users/me/missions")
@PreAuthorize("hasAnyRole('USER','ADMIN')")
public class UserMissionController {

	private final UserMissionService userMissionService;
	private final FileStorageService fileStorageService;

	public UserMissionController(UserMissionService userMissionService, FileStorageService fileStorageService) {
		this.userMissionService = userMissionService;
		this.fileStorageService = fileStorageService;
	}

	/** 1) Listar pendientes */
	@GetMapping
	public ResponseEntity<List<MissionDto>> listPending(Principal principal) {
		List<MissionDto> pendientes = userMissionService.listPendingForUsername(principal.getName());
		return ResponseEntity.ok(pendientes);
	}

	/**
	 * 2) Completar misión con desc. y adjunto opcional. POST
	 * /api/users/me/missions/{missionId}/complete
	 */
	@PostMapping(value = "/{missionId}/complete", consumes = MediaType.MULTIPART_FORM_DATA_VALUE // ahora sí resuelve
	)
	public ResponseEntity<Void> complete(@PathVariable Long missionId, Principal principal,
			@RequestParam(name = "description", required = false) String description,
			@RequestParam(name = "attachment", required = false) MultipartFile attachment) throws IOException {
		String url = null;
		if (attachment != null && !attachment.isEmpty()) {
			url = fileStorageService.store(attachment);
		}

		userMissionService.completeByUsername(principal.getName(), missionId, description, url);
		return ResponseEntity.noContent().build();
	}
}
