// src/main/java/com/questflow/controller/UserController.java
package com.questflow.controller;

import com.questflow.dto.LoginDto;
import com.questflow.dto.RegisterDto;
import com.questflow.model.Role;
import com.questflow.model.User;
import com.questflow.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService service, PasswordEncoder passwordEncoder) {
        this.service = service;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 1) Registro de usuario.
     *    - Valida DTO
     *    - Cifra la contraseña con BCrypt
     *    - Asigna ROLE_USER por defecto
     *    - Inicializa campos de gamificación
     */
    @PostMapping
    public ResponseEntity<User> register(@Valid @RequestBody RegisterDto dto) {
        if (service.existsByUsername(dto.getUsername())) {
            return ResponseEntity.badRequest().build();
        }

        User u = new User();
        u.setUsername(dto.getUsername());
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setEmail(dto.getEmail());
        u.setAvatarClass(dto.getAvatarClass());
        u.setRole(Role.USER);           // enum USER
        // valores iniciales de gamificación
        u.setCoins(0);
        u.setWeeklyTitle("Aprendiz");
        u.setWeeklyTasks(0);
        u.setLevel(1);
        u.setXp(0);
        u.setXpToNext(100);
        u.setGuildRank(0);
        u.setGuildSize(1);

        User saved = service.save(u);
        saved.setPassword(null);        // no devolvemos la contraseña
        return ResponseEntity.ok(saved);
    }

    /**
     * 2) Autenticación básica.
     *    Comprueba username + password (BCrypt) y devuelve 200 con User (sin pwd) o 401.
     */
    @PostMapping("/authenticate")
    public ResponseEntity<User> authenticate(@RequestBody LoginDto dto) {
        User u = service.findByUsername(dto.getUsername());
        if (u == null || !passwordEncoder.matches(dto.getPassword(), u.getPassword())) {
            return ResponseEntity.status(401).build();
        }
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    /**
     * 3) Obtener perfil propio (“me”) para HTTP Basic o JWT.
     *    Spring inyecta el Principal con el username autenticado.
     */
    @GetMapping("/me")
    public ResponseEntity<User> me(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        User u = service.findByUsername(principal.getName());
        if (u == null) {
            return ResponseEntity.notFound().build();
        }
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    /**
     * 4) Obtener cualquier usuario por ID (solo ADMIN o según tu RBAC).
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return service.findById(id)
                      .map(u -> {
                          u.setPassword(null);
                          return ResponseEntity.ok(u);
                      })
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
