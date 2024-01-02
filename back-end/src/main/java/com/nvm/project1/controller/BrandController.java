package com.nvm.project1.controller;



import com.nvm.project1.request.BrandRequest;
import com.nvm.project1.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody BrandRequest brandRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.add(brandRequest));
    }

    @GetMapping("/list/{page}")
    public ResponseEntity<?> getAllPaging(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllPaging(pageRequest));
    }

    @GetMapping("/totalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllTotalPage());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody BrandRequest brandRequest){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.update(id,brandRequest));
    }

    @GetMapping("/find")
    public ResponseEntity<?> findByAll(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status,@RequestParam Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(brandService.findByAll(name,status,pageRequest));
    }

    @GetMapping("/findTotalPage")
    public ResponseEntity<?> findByAllTotalPage(@RequestParam(value = "name",required = false) String name,@RequestParam(value = "status",required = false) Boolean status){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.findAllTotalPage(name,status));
    }
}
