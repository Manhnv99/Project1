package com.nvm.project1.service.impl;

import com.nvm.project1.entity.Product;
import com.nvm.project1.repository.*;
import com.nvm.project1.request.ProductRequest;
import com.nvm.project1.response.ProductResponse;
import com.nvm.project1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private SoleRepository soleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductResponse add(ProductRequest productRequest) {
        Product productAdd=new Product();
        if(productRepository.getTop1()==null){
            productAdd.setCode("SP1");
        }else{
            String code=productRepository.getTop1().getCode();
            productAdd.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }
        productAdd.setName(productRequest.getName());
        productAdd.setGender(productRequest.getGender());
        productAdd.setDescription(productRequest.getDescription());
        productAdd.setBrand(brandRepository.getReferenceById(productRequest.getBrand_id()));
        productAdd.setMaterial(materialRepository.getReferenceById(productRequest.getMaterial_id()));
        productAdd.setSole(soleRepository.getReferenceById(productRequest.getSole_id()));
        productAdd.setCategory(categoryRepository.getReferenceById(productRequest.getCategory_id()));
        productAdd.setCreated_at(new Date());
        productAdd.setUpdated_at(new Date());
        productAdd.setCreated_by(Long.valueOf(1));
        productAdd.setUpdated_by(Long.valueOf(1));
        Product product=productRepository.save(productAdd);
        return new ProductResponse(product.getId());
    }
}
