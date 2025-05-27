// src/main/java/com/questflow/controller/RewardController.java
package com.questflow.controller;

import com.questflow.model.Reward;
import com.questflow.service.RewardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {
    private final RewardService service;
    public RewardController(RewardService service) {
        this.service = service;
    }

    @GetMapping
    public List<Reward> all() {
        return service.listAll();
    }
}
