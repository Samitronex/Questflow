package com.questflow.repository;

import com.questflow.model.UserRanking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<UserRanking, Long> {
    List<UserRanking> findByUserId(Long userId);
}
