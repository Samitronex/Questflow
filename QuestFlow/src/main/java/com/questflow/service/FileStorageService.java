// src/main/java/com/questflow/service/FileStorageService.java
package com.questflow.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    /**
     * Guarda el fichero renombrado con UUID y devuelve la ruta pública.
     */
    public String store(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Fichero vacío");
        }
        try {
            // Crear carpeta si no existe
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            // Nombre único con extensión
            String original = file.getOriginalFilename();
            String ext = "";
            if (original != null && original.contains(".")) {
                ext = original.substring(original.lastIndexOf('.'));
            }
            String filename = UUID.randomUUID().toString() + ext;

            // Copiar el fichero
            Path target = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            // URL pública relativa
            return "/uploads/" + filename;
        } catch (Exception e) {
            throw new RuntimeException("Error guardando fichero: " + e.getMessage(), e);
        }
    }
}
