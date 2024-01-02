package com.nvm.project1.service.impl;

import com.nvm.project1.entity.Category;
import com.nvm.project1.repository.CategoryRepository;
import com.nvm.project1.request.CategoryRequest;
import com.nvm.project1.response.CategoryResponse;
import com.nvm.project1.service.CategoryService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public CategoryResponse add(CategoryRequest categoryRequest) {
        String code=categoryRepository.getTop1().getCode();
        Category categoryAdd=new Category();
        categoryAdd.setCode(code.substring(0,4)+((Integer.parseInt(code.substring(4)))+1));
        categoryAdd.setName(categoryRequest.getName());
        categoryAdd.setStatus(categoryRequest.getStatus());
        categoryAdd.setCreated_at(new Date());
        categoryAdd.setUpdated_at(new Date());
        categoryAdd.setCreated_by(Long.valueOf(1));
        categoryAdd.setUpdated_by(Long.valueOf(1));
        Category category = categoryRepository.save(categoryAdd);
        return new CategoryResponse(category.getId(),category.getName(),category.getUpdated_at(),category.getStatus());
    }

    @Override
    public List<CategoryResponse> getAllPaging(Pageable pageable) {
        return categoryRepository.getAllPaging(pageable);
    }

    @Override
    public Double getAllTotalPage() {
        int totalPage=categoryRepository.getAllTotalPage().size();
        return Math.ceil(totalPage/3.0);
    }

    @Override
    public CategoryResponse getById(Long id) {
        Category category=categoryRepository.getReferenceById(id);
        return new CategoryResponse(category.getId(),category.getName(),category.getUpdated_at(),category.getStatus());
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest categoryRequest) {
        Category categoryEdit=categoryRepository.getReferenceById(id);
        categoryEdit.setName(categoryRequest.getName());
        categoryEdit.setStatus(categoryRequest.getStatus());
        categoryEdit.setUpdated_at(new Date());
        categoryEdit.setUpdated_by(Long.valueOf(1));
        Category category = categoryRepository.save(categoryEdit);
        return new CategoryResponse(category.getId(),category.getName(),category.getUpdated_at(),category.getStatus());
    }

    @Override
    public List<CategoryResponse> findByAll(String name, Boolean status, Pageable pageable) {
        return categoryRepository.findByAll(name,status,pageable);
    }

    @Override
    public Double findAllTotalPage(String name, Boolean status) {
        int totalPage=categoryRepository.findAllTotalPage(name,status).size();
        return Math.ceil(totalPage/3.0);
    }


}
