package com.questflow.config;

import com.questflow.model.Role;
import com.questflow.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  private final UserRepository userRepo;
  public SecurityConfig(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      // 1) CSRF desactivado para APIs REST
      .csrf(csrf -> csrf.disable())
      // 2) CORS habilitado (CorsConfig)
      .cors(cors -> {})
      // 3) reglas de autorización
      .authorizeHttpRequests(auth -> auth
        // 3.0) permitir OPTIONS para CORS
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        // 3.1) registro y login (no autenticados)
        .requestMatchers(HttpMethod.POST, "/api/users", "/api/users/authenticate").permitAll()
        // 3.2) admin-only
        .requestMatchers("/api/admin/**").hasRole(Role.ADMIN.name())
        // 3.3) endpoints “me” y misiones/recompensas requieren auth
        .requestMatchers("/api/users/me/**", "/api/users/me/missions/**",
                         "/api/rewards/**", "/api/rankings").authenticated()
        // 3.4) resto público
        .anyRequest().permitAll()
      )
      // 4) HTTP Basic para test
      .httpBasic();

    return http.build();
  }

  @Bean
  public UserDetailsService userDetailsService() {
    return username -> {
      var u = userRepo.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

      return org.springframework.security.core.userdetails.User
        .withUsername(u.getUsername())
        .password(u.getPassword())
        .roles(u.getRole().name())   // convierte ADMIN → ROLE_ADMIN
        .build();
    };
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
