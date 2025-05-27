package com.questflow.service;

import com.questflow.model.UserRanking;
import com.questflow.repository.RankingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService {
    private final RankingRepository repo;
    public RankingService(RankingRepository repo) {
        this.repo = repo;
    }
    public List<UserRanking> listAll() { return repo.findAll(); }
    public List<UserRanking> findByUser(Long userId) {
        return repo.findByUserId(userId);
    }
}
