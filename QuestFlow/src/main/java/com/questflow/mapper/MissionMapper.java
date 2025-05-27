// src/main/java/com/questflow/mapper/MissionMapper.java
package com.questflow.mapper;

import com.questflow.dto.MissionDto;
import com.questflow.model.Mission;
import org.springframework.stereotype.Component;

@Component
public class MissionMapper {
    public MissionDto toDto(Mission mission) {
        if (mission == null) return null;
        MissionDto dto = new MissionDto();
        dto.setId(mission.getId());
        dto.setTitle(mission.getTitle());
        dto.setDescription(mission.getDescription());
        dto.setDifficulty(mission.getDifficulty());
        dto.setXpReward(mission.getXpReward());
        dto.setCoinsReward(mission.getCoinsReward());
        dto.setDueDate(mission.getDueDate());
        return dto;
    }
}
