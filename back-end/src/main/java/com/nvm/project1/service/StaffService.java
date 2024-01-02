package com.nvm.project1.service;


import com.nvm.project1.entity.Staff;
import com.nvm.project1.request.StaffRequest;
import com.nvm.project1.response.StaffResponse;

import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;


public interface StaffService {

    StaffResponse addStaff(StaffRequest staffRequest);


    List<StaffResponse> getAll();

    List<StaffResponse> getAllPaging(Pageable pageable);

    List<StaffResponse> FindByAllPaging(String input, Boolean status, LocalDate ageFrom, LocalDate ageTo,Pageable pageable);

    Double totalPage();

    Integer FindByAllTotalPage(String input,Boolean status, LocalDate ageFrom, LocalDate ageTo);


    StaffResponse getStaffById(Long id);

    StaffResponse updateStaffById(Long id,StaffRequest staffRequest);

}
