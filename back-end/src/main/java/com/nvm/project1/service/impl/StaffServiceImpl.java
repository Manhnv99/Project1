package com.nvm.project1.service.impl;

import com.nvm.project1.entity.Staff;
import com.nvm.project1.repository.StaffRepository;
import com.nvm.project1.request.StaffRequest;
import com.nvm.project1.response.StaffResponse;
import com.nvm.project1.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;


    @Override
    public StaffResponse addStaff(StaffRequest staffRequest) {
        if(staffRepository.getTop1()==null){
            staffRequest.setCode("NV1");
        }else{
            String code=staffRepository.getTop1().getCode();
            staffRequest.setCode(code.substring(0,2)+(Integer.parseInt(code.substring(2))+1));
        }
        Staff staff=new Staff();
        staff.setCode(staffRequest.getCode());
        staff.setName(staffRequest.getName());
        staff.setGender(staffRequest.getGender());
        staff.setBirthDay(staffRequest.getBirthDay());
        staff.setPhone(staffRequest.getPhone());
        staff.setEmail(staffRequest.getEmail());
        staff.setCccd(staffRequest.getCccd());
        staff.setRole(staffRequest.getRole());
        staff.setStatus(staffRequest.getStatus());
        staff.setStatus(staffRequest.getStatus());
        staff.setPassword(staffRequest.getPassword());
        staff.setImage(staffRequest.getImage());
        staff.setAddress(staffRequest.getAddress());
        staff.setThanhPho(staffRequest.getThanhPho());
        staff.setQuanHuyen(staffRequest.getQuanHuyen());
        staff.setPhuongXa(staffRequest.getPhuongXa());
        Staff staffAdd=staffRepository.save(staff);
        return new StaffResponse(staffAdd.getId(),staffAdd.getCode(),staffAdd.getName(),staffAdd.getGender(),staffAdd.getBirthDay(),staffAdd.getPhone(),staffAdd.getEmail(),staffAdd.getCccd(),
                staffAdd.getRole(),staffAdd.getStatus(),staffAdd.getPassword(),staffAdd.getImage(),staffAdd.getAddress(),staffAdd.getThanhPho(),staffAdd.getQuanHuyen(),staffAdd.getPhuongXa());
    }

    @Override
    public List<StaffResponse> getAll() {
        return staffRepository.getAll();
    }

    @Override
    public List<StaffResponse> getAllPaging(Pageable pageable) {
        return staffRepository.getAllPaging(pageable);
    }

    @Override
    public List<StaffResponse> FindByAllPaging(String input, Boolean status, LocalDate ageFrom, LocalDate ageTo, Pageable pageable) {
        return staffRepository.FindByAllPaging(input,status,ageFrom,ageTo,pageable);
    }

    @Override
    public Double totalPage() {
        Double totalPage=staffRepository.totalPage();
        return Math.ceil(totalPage/3.0);
    }

    @Override
    public Integer FindByAllTotalPage(String input, Boolean status, LocalDate ageFrom, LocalDate ageTo) {
        return staffRepository.FindByAllTotalPage(input,status,ageFrom,ageTo).size();
    }

    @Override
    public StaffResponse getStaffById(Long id) {
        return staffRepository.getStaffById(id);
    }

    @Override
    public StaffResponse updateStaffById(Long id,StaffRequest staffRequest) {
        Staff staff=staffRepository.getReferenceById(id);
        staff.setName(staffRequest.getName());
        staff.setGender(staffRequest.getGender());
        staff.setBirthDay(staffRequest.getBirthDay());
        staff.setPhone(staffRequest.getPhone());
        staff.setEmail(staffRequest.getEmail());
        staff.setCccd(staffRequest.getCccd());
        staff.setRole(staffRequest.getRole());
        staff.setStatus(staffRequest.getStatus());
        staff.setPassword(staffRequest.getPassword());
        staff.setImage(staffRequest.getImage());
        staff.setAddress(staffRequest.getAddress());
        staff.setThanhPho(staffRequest.getThanhPho());
        staff.setQuanHuyen(staffRequest.getQuanHuyen());
        staff.setPhuongXa(staffRequest.getPhuongXa());
        Staff staffUpdate=staffRepository.save(staff);
        return new StaffResponse(staffUpdate.getId(),staffUpdate.getCode(),staffUpdate.getName(),staffUpdate.getGender(),staffUpdate.getBirthDay(),staffUpdate.getPhone(),staffUpdate.getEmail(),staffUpdate.getCccd(),
                staffUpdate.getRole(),staffUpdate.getStatus(),staffUpdate.getPassword(),staffUpdate.getImage(),staffUpdate.getAddress(),staffUpdate.getThanhPho(),staffUpdate.getQuanHuyen(),staffUpdate.getPhuongXa());
    }


}
