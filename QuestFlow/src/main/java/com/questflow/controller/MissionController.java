package com.questflow.controller;

import com.questflow.model.Mission;
import com.questflow.model.User;
import com.questflow.repository.UserRepository;
import com.questflow.service.FileStorageService;
import com.questflow.service.MissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

	private final MissionService missionService;
	private final FileStorageService fileStorageService;
	private final UserRepository userRepo;

	public MissionController(MissionService missionService, FileStorageService fileStorageService,
			UserRepository userRepo) {
		this.missionService = missionService;
		this.fileStorageService = fileStorageService;
		this.userRepo = userRepo;
	}

	/** 1) LISTAR todas las misiones */
	@GetMapping
	public List<Mission> listAll() {
		return missionService.listarTodas();
	}

	/** 2) OBTENER una misión por ID */
	@GetMapping("/{id}")
	public ResponseEntity<Mission> getById(@PathVariable Long id) {
		return missionService.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	/**
	 * 3) COMPLETAR misión (descripcion opcional + adjunto). Recibe userId explícito
	 * para evitar NPE de Principal.
	 */
	@PostMapping(value = "/{missionId}/complete", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> completeMission(@PathVariable Long missionId, @RequestParam("userId") Long userId,
			@RequestParam(name = "description", required = false) String description,
			@RequestParam(name = "attachment", required = false) MultipartFile attachment) {
		try {
			// 1) Guardar adjunto si existe
			String url = null;
			if (attachment != null && !attachment.isEmpty()) {
				url = fileStorageService.store(attachment);
			}

			// 2) Cargar usuario por ID
			User user = userRepo.findById(userId)
					.orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + userId));

			// 3) Completar misión
			missionService.completeMission(user.getId(), missionId, LocalDateTime.now(), description, url);

			return ResponseEntity.ok().build();

		} catch (Exception ex) {
			ex.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", ex.getMessage()));
		}
	}
}
