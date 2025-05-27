package com.questflow.service;

import com.questflow.model.Reward;
import com.questflow.repository.RewardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {
    private final RewardRepository repo;
    public RewardService(RewardRepository repo) {
        this.repo = repo;
    }
    public List<Reward> listAll() { return repo.findAll(); }
}
