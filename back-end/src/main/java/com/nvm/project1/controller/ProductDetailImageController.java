package com.nvm.project1.controller;

import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.request.ProductDetailRequest;
import com.nvm.project1.service.ProductDetailImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
