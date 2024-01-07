package com.nvm.project1.controller;

import com.nvm.project1.request.CategoryRequest;
import com.nvm.project1.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody CategoryRequest categoryRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.add(categoryRequest));
    }

    @GetMapping("/list/{page}")
    public ResponseEntity<?> getAllPaging(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllPaging(pageRequest));
    }

    @GetMapping("/totalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllTotalPage());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody CategoryRequest categoryRequest){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.update(id,categoryRequest));
    }

    @GetMapping("/find")
    public ResponseEntity<?> findByAll(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status,@RequestParam Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.findByAll(name,status,pageRequest));
    }

    @GetMapping("/findTotalPage")
    public ResponseEntity<?> findByAllTotalPage(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.findAllTotalPage(name,status));
    }
}
