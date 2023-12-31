package com.nvm.project1.utils;

import lombok.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileUpload {

    public static void saveFile(String fileName, MultipartFile multipartFile) throws Exception{
        Path path= Paths.get("src/main/java/com/nvm/project1/uploads");
        if(!Files.exists(path)){
            Files.createDirectories(path);
        }
        try(InputStream inputStream=multipartFile.getInputStream()){
            Path filePath=path.resolve(fileName);
            Files.copy(inputStream,filePath, StandardCopyOption.REPLACE_EXISTING);
        }catch (Exception e){
            throw new IOException("Loi"+fileName);
        }
    }
}
