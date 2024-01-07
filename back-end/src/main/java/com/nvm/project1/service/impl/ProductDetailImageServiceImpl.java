package com.nvm.project1.service.impl;

import com.nvm.project1.entity.ProductDetailImage;
import com.nvm.project1.repository.ProductDetailImageRepository;
import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.service.ProductDetailImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductDetailImageServiceImpl implements ProductDetailImageService {

    @Autowired
    private ProductDetailImageRepository productDetailImageRepository;

    @Override
    public void add(ProductDetailImageRequest productDetailImageRequest) {
        ProductDetailImage productDetailImageAdd=new ProductDetailImage();
        productDetailImageAdd.setProductDetail_id(productDetailImageRequest.getProductDetail_id());
        productDetailImageAdd.setImage(productDetailImageRequest.getImage());
        productDetailImageRepository.save(productDetailImageAdd);
    }
}
