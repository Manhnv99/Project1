package com.nvm.project1.service.impl;

import com.nvm.project1.entity.Brand;
import com.nvm.project1.repository.BrandRepository;
import com.nvm.project1.request.BrandRequest;
import com.nvm.project1.response.BrandResponse;
import com.nvm.project1.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;


    @Override
    public BrandResponse add(BrandRequest brandRequest) {
        Brand brandAdd=new Brand();
        if(brandRepository.getTop1()==null){
            brandAdd.setCode("Brand1");
        }else{
            String code=brandRepository.getTop1().getCode();
            brandAdd.setCode(code.substring(0,5)+((Integer.parseInt(code.substring(5)))+1));
        }
        brandAdd.setName(brandRequest.getName());
        brandAdd.setStatus(brandRequest.getStatus());
        brandAdd.setCreated_at(new Date());
        brandAdd.setUpdated_at(new Date());
        brandAdd.setCreated_by(Long.valueOf(1));
        brandAdd.setUpdated_by(Long.valueOf(1));
        Brand brand = brandRepository.save(brandAdd);
        return new BrandResponse(brand.getId(),brand.getName(),brand.getUpdated_at(),brand.getStatus());
    }

    @Override
    public List<BrandResponse> getAllPaging(Pageable pageable) {
        return brandRepository.getAllPaging(pageable);
    }

    @Override
    public Double getAllTotalPage() {
        int totalPage=brandRepository.getAllTotalPage().size();
        return Math.ceil(totalPage/3.0);
    }

    @Override
    public BrandResponse getById(Long id) {
        Brand brand=brandRepository.getReferenceById(id);
        return new BrandResponse(brand.getId(),brand.getName(),brand.getUpdated_at(),brand.getStatus());
    }

    @Override
    public BrandResponse update(Long id, BrandRequest brandRequest) {
        Brand brandEdit=brandRepository.getReferenceById(id);
        brandEdit.setName(brandRequest.getName());
        brandEdit.setStatus(brandRequest.getStatus());
        brandEdit.setUpdated_at(new Date());
        brandEdit.setUpdated_by(Long.valueOf(1));
        Brand brand = brandRepository.save(brandEdit);
        return new BrandResponse(brand.getId(),brand.getName(),brand.getUpdated_at(),brand.getStatus());
    }

    @Override
    public List<BrandResponse> findByAll(String name, Boolean status, Pageable pageable) {
        return brandRepository.findByAll(name,status,pageable);
    }

    @Override
    public Double findAllTotalPage(String name, Boolean status) {
        int totalPage=brandRepository.findAllTotalPage(name,status).size();
        return Math.ceil(totalPage/3.0);
    }
}
