package com.nvm.project1.controller;


import com.nvm.project1.request.SizeRequest;
import com.nvm.project1.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/size")
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(sizeService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody SizeRequest sizeRequest){
        return ResponseEntity.status(HttpStatus.OK).body(sizeService.add(sizeRequest));
    }
}
