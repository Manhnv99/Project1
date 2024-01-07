package com.nvm.project1.controller;

import com.nvm.project1.request.CategoryRequest;
import com.nvm.project1.request.MaterialRequest;
import com.nvm.project1.service.CategoryService;
import com.nvm.project1.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/material")
public class MaterialController {


    @Autowired
    private MaterialService materialService;


    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody MaterialRequest materialRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(materialService.add(materialRequest));
    }

    @GetMapping("/list/{page}")
    public ResponseEntity<?> getAllPaging(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getAllPaging(pageRequest));
    }

    @GetMapping("/totalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getAllTotalPage());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody MaterialRequest materialRequest){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.update(id,materialRequest));
    }

    @GetMapping("/find")
    public ResponseEntity<?> findByAll(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status,@RequestParam Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(materialService.findByAll(name,status,pageRequest));
    }

    @GetMapping("/findTotalPage")
    public ResponseEntity<?> findByAllTotalPage(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.findAllTotalPage(name,status));
    }
}
