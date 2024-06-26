package com.nvm.project1.controller;


import com.nvm.project1.request.ProductDetailRequest;
import com.nvm.project1.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/productdetail")
public class ProductDetailController {

    @Autowired
    private ProductDetailService productDetailService;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ProductDetailRequest productDetailRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productDetailService.add(productDetailRequest));
    }


    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(productDetailService.getAll());
    }


    @PutMapping("/update-price-quantity/{id}")
    public ResponseEntity<?> updatePriceandQuantityById(@PathVariable Long id,@RequestBody ProductDetailRequest productDetailRequest){
        productDetailService.updatePriceandQuantityById(id,productDetailRequest.getPrice(),productDetailRequest.getQuantity());
        return ResponseEntity.status(HttpStatus.OK).body("succeess");
    }
}
