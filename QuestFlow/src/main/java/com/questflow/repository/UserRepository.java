package com.questflow.repository;

import com.questflow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Si tu principal.getName() devuelve el campo username:
    Optional<User> findByUsername(String username);

 
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
}
