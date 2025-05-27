package com.questflow.service.impl;

import com.questflow.dto.UserDto;
import com.questflow.mapper.UserMapper;
import com.questflow.model.User;
import com.questflow.repository.UserRepository;
import com.questflow.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
	private final UserRepository repo;
	private final UserMapper mapper;

	public UserServiceImpl(UserRepository repo, UserMapper mapper) {
		this.repo = repo;
		this.mapper = mapper;
	}

	@Override
	public List<UserDto> findAllUsers() {
		return repo.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
	}

	@Override
	public boolean existsByUsername(String username) {
		return repo.findByUsername(username).isPresent();
	}

	@Override
	public User save(User u) {
		return repo.save(u);
	}

	@Override
	public User findByUsername(String username) {
		return repo.findByUsername(username).orElse(null);
	}

	@Override
	public Optional<User> findById(Long id) {
		return repo.findById(id);
	}
}
