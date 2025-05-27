// src/main/java/com/questflow/controller/RankingController.java
package com.questflow.controller;

import com.questflow.model.UserRanking;
import com.questflow.service.RankingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
public class RankingController {
    private final RankingService service;
    public RankingController(RankingService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserRanking> all() {
        return service.listAll();
    }
}
