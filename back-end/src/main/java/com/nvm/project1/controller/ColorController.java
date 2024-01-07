package com.nvm.project1.controller;

import com.nvm.project1.request.ColorRequest;
import com.nvm.project1.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/color")
public class ColorController {

    @Autowired
    private ColorService colorService;

    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(colorService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ColorRequest colorRequest){
        return ResponseEntity.status(HttpStatus.OK).body(colorService.add(colorRequest));
    }
}
