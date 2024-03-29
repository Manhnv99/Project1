package com.nvm.project1.controller;

import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.service.ProductDetailImageService;
import com.nvm.project1.utils.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin
@RestController
@RequestMapping("/product-detail-image")
public class ProductDetailImageController {


    @Autowired
    private ProductDetailImageService productDetailImageService;


    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ProductDetailImageRequest productDetailImageRequest){
        productDetailImageService.add(productDetailImageRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @PostMapping("/product-upload")
    public ResponseEntity<?> hanldeFileUpload(@RequestPart("file") MultipartFile multipartFile) throws Exception {
        try {
            String fileName= StringUtils.cleanPath(multipartFile.getOriginalFilename());
            FileUpload.saveFileProduct(fileName,multipartFile);
            return ResponseEntity.status(HttpStatus.OK).body("sucsess");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file");
        }
    }


    @GetMapping("/list/{id}")
    public ResponseEntity<?> getAllById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(productDetailImageService.getAllById(id));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getDetailById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(productDetailImageService.getDetailById(id));
    }

    @GetMapping("/img/{image}")
    public ResponseEntity<?> getAll(@PathVariable String image){
        try {
            Path imagePath = Paths.get("src/main/java/com/nvm/project1/productimages").resolve(image);
            Resource file = new UrlResource(imagePath.toUri());
            if (file.exists() && file.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(imagePath))
                        .body(file);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @GetMapping("/listImage/{id}")
    public ResponseEntity<?> getListImageById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(productDetailImageService.getListImageById(id));
    }

}
