package com.nvm.project1.controller;


import com.nvm.project1.request.SoleRequest;
import com.nvm.project1.service.SoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/sole")
public class SoleController {

    @Autowired
    private SoleService soleService;

    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody SoleRequest soleRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(soleService.add(soleRequest));
    }

    @GetMapping("/list/{page}")
    public ResponseEntity<?> getAllPaging(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getAllPaging(pageRequest));
    }

    @GetMapping("/totalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getAllTotalPage());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody SoleRequest soleRequest){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.update(id,soleRequest));
    }

    @GetMapping("/find")
    public ResponseEntity<?> findByAll(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status,@RequestParam Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(soleService.findByAll(name,status,pageRequest));
    }

    @GetMapping("/findTotalPage")
    public ResponseEntity<?> findByAllTotalPage(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.findAllTotalPage(name,status));
    }
}
