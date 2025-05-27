// src/main/java/com/questflow/config/DataInitializer.java
package com.questflow.config;

import com.questflow.model.Mission;
import com.questflow.model.Role;
import com.questflow.model.User;
import com.questflow.model.Difficulty;
import com.questflow.repository.MissionRepository;
import com.questflow.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final MissionRepository missionRepo;

    public DataInitializer(
        UserRepository userRepo,
        PasswordEncoder passwordEncoder,
        MissionRepository missionRepo
    ) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.missionRepo = missionRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedMissions();
    }

    private void seedAdminUser() {
        // 1) Si ya existe un “admin” saltamos
        if (userRepo.existsByUsername("admin")) {
            return;
        }

        // 2) Creamos al admin con TODOS los campos NO nulos
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setEmail("admin@questflow.com");
        admin.setAvatarClass("Guerrero");    // O cualquier clase por defecto
        admin.setRole(Role.ADMIN);           // Asignamos rol ADMIN
        admin.setCoins(0);
        admin.setWeeklyTitle("Maestro");
        admin.setWeeklyTasks(0);
        admin.setLevel(1);
        admin.setXp(0);
        admin.setXpToNext(100);
        admin.setGuildRank(0);
        admin.setGuildSize(1);

        userRepo.save(admin);
        System.out.println("⏺ Usuario ADMIN inicializado con usuario=admin / pass=admin123");
    }

    private void seedMissions() {
        if (missionRepo.count() > 0) {
            return;
        }

        // --- Misión 1 ---
        Mission m1 = new Mission();
        m1.setTitle("Revisar informe mensual");
        m1.setDescription("Analizar y validar los KPI del mes pasado");
        m1.setXpReward(50);
        m1.setCoinsReward(10);
        m1.setDifficulty(Difficulty.MEDIUM.name());
        m1.setDueDate(LocalDate.now().plusDays(7));
        missionRepo.save(m1);

        // --- Misión 2 ---
        Mission m2 = new Mission();
        m2.setTitle("Plan de marketing Q2");
        m2.setDescription("Diseñar la estrategia de marketing para el próximo trimestre");
        m2.setXpReward(80);
        m2.setCoinsReward(20);
        m2.setDifficulty(Difficulty.HARD.name());
        m2.setDueDate(LocalDate.now().plusDays(14));
        missionRepo.save(m2);

        System.out.println("⏺ Misiones de prueba inicializadas");
    }
}
