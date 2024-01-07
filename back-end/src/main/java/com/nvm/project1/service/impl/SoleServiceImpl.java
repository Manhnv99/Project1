package com.nvm.project1.service.impl;


import com.nvm.project1.entity.Sole;
import com.nvm.project1.repository.SoleRepository;
import com.nvm.project1.request.SoleRequest;
import com.nvm.project1.response.SoleResponse;
import com.nvm.project1.service.SoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SoleServiceImpl implements SoleService {

    @Autowired
    private SoleRepository soleRepository;

    @Override
    public List<SoleResponse> getAll() {
        return soleRepository.getAll();
    }

    @Override
    public SoleResponse add(SoleRequest soleRequest) {
        Sole soleAdd=new Sole();
        if(soleRepository.getTop1()==null){
            soleAdd.setCode("Sole1");
        }else{
            String code=soleRepository.getTop1().getCode();
            soleAdd.setCode(code.substring(0,4)+((Integer.parseInt(code.substring(4)))+1));
        }
        soleAdd.setName(soleRequest.getName());
        soleAdd.setStatus(soleRequest.getStatus());
        soleAdd.setCreated_at(new Date());
        soleAdd.setUpdated_at(new Date());
        soleAdd.setCreated_by(Long.valueOf(1));
        soleAdd.setUpdated_by(Long.valueOf(1));
        Sole sole = soleRepository.save(soleAdd);
        return new SoleResponse(sole.getId(),sole.getName(),sole.getUpdated_at(),sole.getStatus());
    }

    @Override
    public List<SoleResponse> getAllPaging(Pageable pageable) {
        return soleRepository.getAllPaging(pageable);
    }

    @Override
    public Double getAllTotalPage() {
        int totalPage=soleRepository.getAllTotalPage().size();
        return Math.ceil(totalPage/3.0);
    }

    @Override
    public SoleResponse getById(Long id) {
        Sole sole=soleRepository.getReferenceById(id);
        return new SoleResponse(sole.getId(),sole.getName(),sole.getUpdated_at(),sole.getStatus());
    }

    @Override
    public SoleResponse update(Long id, SoleRequest soleRequest) {
        Sole soleEdit=soleRepository.getReferenceById(id);
        soleEdit.setName(soleRequest.getName());
        soleEdit.setStatus(soleRequest.getStatus());
        soleEdit.setUpdated_at(new Date());
        soleEdit.setUpdated_by(Long.valueOf(1));
        Sole sole = soleRepository.save(soleEdit);
        return new SoleResponse(sole.getId(),sole.getName(),sole.getUpdated_at(),sole.getStatus());
    }

    @Override
    public List<SoleResponse> findByAll(String name, Boolean status, Pageable pageable) {
        return soleRepository.findByAll(name,status,pageable);
    }

    @Override
    public Double findAllTotalPage(String name, Boolean status) {
        int totalPage=soleRepository.findAllTotalPage(name,status).size();
        return Math.ceil(totalPage/3.0);
    }
}
