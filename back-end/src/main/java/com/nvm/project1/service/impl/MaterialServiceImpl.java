package com.nvm.project1.service.impl;


import com.nvm.project1.entity.Material;
import com.nvm.project1.repository.MaterialRepository;
import com.nvm.project1.request.MaterialRequest;
import com.nvm.project1.response.MaterialResponse;
import com.nvm.project1.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;


    @Override
    public List<MaterialResponse> getAll() {
        return materialRepository.getAll();
    }

    @Override
    public MaterialResponse add(MaterialRequest materialRequest) {
        Material materialAdd=new Material();
        if(materialRepository.getTop1()==null){
            materialAdd.setCode("Material1");
        }else{
            String code=materialRepository.getTop1().getCode();
            materialAdd.setCode(code.substring(0,8)+((Integer.parseInt(code.substring(8)))+1));
        }
        materialAdd.setName(materialRequest.getName());
        materialAdd.setStatus(materialRequest.getStatus());
        materialAdd.setCreated_at(new Date());
        materialAdd.setUpdated_at(new Date());
        materialAdd.setCreated_by(Long.valueOf(1));
        materialAdd.setUpdated_by(Long.valueOf(1));
        Material material = materialRepository.save(materialAdd);
        return new MaterialResponse(material.getId(),material.getName(),material.getUpdated_at(),material.getStatus());
    }

    @Override
    public List<MaterialResponse> getAllPaging(Pageable pageable) {
        return materialRepository.getAllPaging(pageable);
    }

    @Override
    public Double getAllTotalPage() {
        int totalPage=materialRepository.getAllTotalPage().size();
        return Math.ceil(totalPage/3.0);
    }

    @Override
    public MaterialResponse getById(Long id) {
        Material material=materialRepository.getReferenceById(id);
        return new MaterialResponse(material.getId(),material.getName(),material.getUpdated_at(),material.getStatus());
    }

    @Override
    public MaterialResponse update(Long id, MaterialRequest materialRequest) {
        Material materialEdit=materialRepository.getReferenceById(id);
        materialEdit.setName(materialRequest.getName());
        materialEdit.setStatus(materialRequest.getStatus());
        materialEdit.setUpdated_at(new Date());
        materialEdit.setUpdated_by(Long.valueOf(1));
        Material material = materialRepository.save(materialEdit);
        return new MaterialResponse(material.getId(),material.getName(),material.getUpdated_at(),material.getStatus());
    }

    @Override
    public List<MaterialResponse> findByAll(String name, Boolean status, Pageable pageable) {
        return materialRepository.findByAll(name,status,pageable);
    }

    @Override
    public Double findAllTotalPage(String name, Boolean status) {
        int totalPage=materialRepository.findAllTotalPage(name,status).size();
        return Math.ceil(totalPage/3.0);
    }
}
