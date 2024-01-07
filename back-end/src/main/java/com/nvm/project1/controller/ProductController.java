package com.nvm.project1.controller;

import com.nvm.project1.request.ProductRequest;
import com.nvm.project1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ProductRequest productRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.add(productRequest));
    }
}
