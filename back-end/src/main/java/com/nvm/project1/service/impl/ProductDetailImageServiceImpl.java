package com.nvm.project1.service.impl;

import com.nvm.project1.entity.ProductDetailImage;
import com.nvm.project1.repository.ProductDetailImageRepository;
import com.nvm.project1.repository.ProductDetailRepository;
import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.response.ListProductDetailImageResponse;
import com.nvm.project1.response.ProductDetailImageResponse;
import com.nvm.project1.service.ProductDetailImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailImageServiceImpl implements ProductDetailImageService {

    @Autowired
    private ProductDetailImageRepository productDetailImageRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Override
    public void add(ProductDetailImageRequest productDetailImageRequest) {
        ProductDetailImage productDetailImageAdd=new ProductDetailImage();
        productDetailImageAdd.setProductDetail_id(productDetailRepository.getReferenceById(productDetailImageRequest.getProductDetail_id()));
        productDetailImageAdd.setImage(productDetailImageRequest.getImage());
        productDetailImageRepository.save(productDetailImageAdd);
    }

    @Override
    public List<ListProductDetailImageResponse> getAllById() {
        return productDetailImageRepository.getAllById();
    }
}
