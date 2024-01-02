package com.nvm.project1.service;

import com.nvm.project1.request.BrandRequest;
import com.nvm.project1.response.BrandResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BrandService {

    BrandResponse add(BrandRequest brandRequest);

    List<BrandResponse> getAllPaging(Pageable pageable);

    Double getAllTotalPage();

    BrandResponse getById(Long id);

    BrandResponse update(Long id,BrandRequest brandRequest);

    List<BrandResponse> findByAll(String name,Boolean status,Pageable pageable);

    Double findAllTotalPage(String name,Boolean status);
}
