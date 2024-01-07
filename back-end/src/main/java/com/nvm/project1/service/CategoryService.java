package com.nvm.project1.service;

import com.nvm.project1.entity.Category;
import com.nvm.project1.request.CategoryRequest;
import com.nvm.project1.response.CategoryResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAll();

    CategoryResponse add(CategoryRequest categoryRequest);

    List<CategoryResponse> getAllPaging(Pageable pageable);

    Double getAllTotalPage();

    CategoryResponse getById(Long id);

    CategoryResponse update(Long id,CategoryRequest categoryRequest);

    List<CategoryResponse> findByAll(String name,Boolean status,Pageable pageable);

    Double findAllTotalPage(String name,Boolean status);
}
