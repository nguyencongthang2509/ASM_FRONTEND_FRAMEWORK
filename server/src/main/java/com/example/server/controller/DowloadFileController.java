package com.example.server.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
        return false;
//        Path source = Paths.get(filePath);
//        Path destination = Paths.get("\\Ass\\Assignment\\assets\\img\\" + UUID.randomUUID() + ".png");
//        try {
//            Files.copy(source, destination);
//            return true;
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }
}




