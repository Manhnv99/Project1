package com.nvm.project1.service;

import com.nvm.project1.request.SoleRequest;
import com.nvm.project1.response.SoleResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SoleService {

    SoleResponse add(SoleRequest soleRequest);

    List<SoleResponse> getAllPaging(Pageable pageable);

    Double getAllTotalPage();

    SoleResponse getById(Long id);

    SoleResponse update(Long id,SoleRequest soleRequest);

    List<SoleResponse> findByAll(String name,Boolean status,Pageable pageable);

    Double findAllTotalPage(String name,Boolean status);
}
