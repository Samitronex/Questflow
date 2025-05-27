// src/main/java/com/questflow/dto/RegisterDto.java
package com.questflow.dto;

public class RegisterDto {
    private String username;
    private String password;
    private String email;
    private String avatarClass;   

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAvatarClass() { return avatarClass; }
    public void setAvatarClass(String avatarClass) { this.avatarClass = avatarClass; }
}
