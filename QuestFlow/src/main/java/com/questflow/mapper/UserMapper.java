// src/main/java/com/questflow/mapper/UserMapper.java
package com.questflow.mapper;

import com.questflow.dto.UserDto;
import com.questflow.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
	public UserDto toDto(User user) {
		if (user == null)
			return null;
		UserDto dto = new UserDto();
		dto.setId(user.getId());
		dto.setUsername(user.getUsername());
		dto.setRole(user.getRole().name());
		dto.setXp(user.getXp());
		dto.setCoins(user.getCoins());
		return dto;
	}
}
