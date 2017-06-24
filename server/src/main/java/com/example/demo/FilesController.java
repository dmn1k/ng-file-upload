package com.example.demo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FilesController {
    private static AtomicInteger failedCount = new AtomicInteger(0);
    @GetMapping("/metadata/{fileId}")
    public ResponseEntity<FileMetadata> getFileMetadata(@PathVariable String fileId) throws InterruptedException{
        int count = failedCount.incrementAndGet();
        
        return ResponseEntity.ok(new FileMetadata(fileId, count % 10 == 0));
    }
    
    @PostMapping("/")
    public ResponseEntity<FileMetadata> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException{
        Files.copy(file.getInputStream(), Paths.get("D:\\upload", file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        return ResponseEntity.ok(new FileMetadata("42", false));
    }
}
