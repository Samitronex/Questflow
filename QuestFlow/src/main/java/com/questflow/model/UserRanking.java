// src/main/java/com/questflow/model/UserRanking.java
package com.questflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rankings")
public class UserRanking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** FK al usuario */
    @Column(name = "user_id", nullable = false)
    private Long userId;

    /** Nombre o nick del usuario (auxiliar, opcional) */
    @Column(name = "username", nullable = false)
    private String username;

    /** Puntuación total de XP */
    @Column(name = "xp_total", nullable = false)
    private Integer xpTotal;

    /** Puntuación total de monedas */
    @Column(name = "coins_total", nullable = false)
    private Integer coinsTotal;

    /** Posición en el ranking */
    @Column(name = "rank_position", nullable = false)
    private Integer rankPosition;

    // Getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Integer getXpTotal() { return xpTotal; }
    public void setXpTotal(Integer xpTotal) { this.xpTotal = xpTotal; }

    public Integer getCoinsTotal() { return coinsTotal; }
    public void setCoinsTotal(Integer coinsTotal) { this.coinsTotal = coinsTotal; }

    public Integer getRankPosition() { return rankPosition; }
    public void setRankPosition(Integer rankPosition) { this.rankPosition = rankPosition; }
}
