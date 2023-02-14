package com.example.server.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author thangncph26123
 */
@RestController
@RequestMapping("/dowload")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class DowloadFileController {

    @PostMapping()
    public boolean create(@RequestBody MultipartFile file) {
        String currentDirectory = System.getProperty("user.dir");
        String absoluteFilePath = currentDirectory + "/src/main/resources/static/image/";
        String fileName = file.getOriginalFilename();
        String filePath = absoluteFilePath + fileName;
        try {
            file.transferTo(new File(filePath));
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
//        Path source = Paths.get(filePath);
//        Path destination = Paths.get("\\Ass\\Assignment\\assets\\img\\" + UUID.randomUUID() + ".png");
//        try {
//            Files.copy(source, destination);
//            return true;
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return false;
    }
}




