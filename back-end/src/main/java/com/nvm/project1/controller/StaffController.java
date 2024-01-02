package com.nvm.project1.controller;

import com.nvm.project1.request.StaffRequest;
import com.nvm.project1.service.StaffService;
import com.nvm.project1.utils.FileUpload;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

@CrossOrigin
@RestController
@RequestMapping("/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;


    @PostMapping("/staff-upload")
    public ResponseEntity<?> hanldeFileUpload(@RequestPart("file") MultipartFile multipartFile) throws Exception {
        try {
            String fileName= StringUtils.cleanPath(multipartFile.getOriginalFilename());
            FileUpload.saveFile(fileName,multipartFile);
            return ResponseEntity.status(HttpStatus.OK).body("sucsess");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file");
        }
    }


    @PostMapping("/add")
    public ResponseEntity<?> handleAddStaff(@RequestBody StaffRequest staffRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(staffService.addStaff(staffRequest));
    }

    @GetMapping("/list")
    public ResponseEntity<?> handleGetAll(){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getAll());
    }

    @GetMapping("/list/{page}")
    public ResponseEntity<?> handleGetAllPaging(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getAllPaging(pageRequest));
    }

    @GetMapping("/list/find")
    public ResponseEntity<?> FindByAllPaging(@RequestParam(value = "input",required = false) String input,
                                             @RequestParam(value = "status",required = false) Boolean status, @RequestParam(value = "ageFrom",required = false) LocalDate ageFrom,
                                             @RequestParam(value = "ageTo",required = false) LocalDate ageTo, @RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(staffService.FindByAllPaging(input,status, ageFrom,ageTo,pageRequest));
    }

    @GetMapping("/findTotalPage/find")
    public ResponseEntity<?> totalPage(@RequestParam(value = "input",required = false) String input,
                                       @RequestParam(value = "status",required = false) Boolean status, @RequestParam(value = "ageFrom",required = false) LocalDate ageFrom,
                                       @RequestParam(value = "ageTo",required = false) LocalDate ageTo){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.FindByAllTotalPage(input,status,ageFrom,ageTo));
    }


    @GetMapping("/totalPage")
    public ResponseEntity<?> totalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.totalPage());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getStaffById(id));
    }



    @GetMapping("/img/{image}")
    public ResponseEntity<?> getAll(@PathVariable String image){
        try {
            Path imagePath = Paths.get("src/main/java/com/nvm/project1/uploads").resolve(image);
            Resource file = new UrlResource(imagePath.toUri());
            if (file.exists() && file.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(imagePath))
                        .body(file);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id,@RequestBody StaffRequest staffRequest){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.updateStaffById(id,staffRequest));
    }



}
