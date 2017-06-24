package com.example.demo;

public class FileMetadata {
    private final String id;
    private final boolean conversionFinished;

    public FileMetadata(String id, boolean conversionFinished) {
        this.id = id;
        this.conversionFinished = conversionFinished;
    }

    public String getId() {
        return id;
    }

    public boolean isConversionFinished() {
        return conversionFinished;
    }
    
    
}
