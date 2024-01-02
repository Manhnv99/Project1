package com.nvm.project1.service;

import com.nvm.project1.request.MaterialRequest;
import com.nvm.project1.response.MaterialResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MaterialService {

    MaterialResponse add(MaterialRequest materialRequest);

    List<MaterialResponse> getAllPaging(Pageable pageable);

    Double getAllTotalPage();

    MaterialResponse getById(Long id);

    MaterialResponse update(Long id,MaterialRequest materialRequest);

    List<MaterialResponse> findByAll(String name,Boolean status,Pageable pageable);

    Double findAllTotalPage(String name,Boolean status);
}
