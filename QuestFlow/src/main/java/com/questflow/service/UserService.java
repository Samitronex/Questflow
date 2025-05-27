// src/main/java/com/questflow/service/UserService.java
package com.questflow.service;

import com.questflow.dto.UserDto;
import com.questflow.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
	List<UserDto> findAllUsers(); // Para listar como DTO

	boolean existsByUsername(String username); // Para registro

	User save(User user); // Para registro

	User findByUsername(String username); // Para login y perfil

	Optional<User> findById(Long id); // Para consulta por ID
}
