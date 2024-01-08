package com.nvm.project1.controller;

import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.service.ProductDetailImageService;
import com.nvm.project1.utils.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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


    @GetMapping("/list")
    public ResponseEntity<?> getAllById(){
        return ResponseEntity.status(HttpStatus.OK).body(productDetailImageService.getAllById());
    }
}
