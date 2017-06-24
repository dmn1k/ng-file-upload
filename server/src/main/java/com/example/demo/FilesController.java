package com.example.demo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FilesController {
    
    @GetMapping("/metadata/{fileId}")
    public ResponseEntity<FileMetadata> getFileMetadata(@PathVariable String fileId) throws InterruptedException{
        Thread.sleep(1000);
        return ResponseEntity.ok(new FileMetadata(fileId, true));
    }
    
    @PostMapping("/")
    public ResponseEntity<FileMetadata> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException{
        Files.copy(file.getInputStream(), Paths.get("D:\\upload", file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        return ResponseEntity.ok(new FileMetadata("42", false));
    }
}
