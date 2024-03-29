package com.nvm.project1.service.impl;

import com.nvm.project1.entity.Product;
import com.nvm.project1.entity.ProductDetailImage;
import com.nvm.project1.repository.BrandRepository;
import com.nvm.project1.repository.ProductDetailImageRepository;
import com.nvm.project1.repository.ProductDetailRepository;
import com.nvm.project1.repository.ProductRepository;
import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.request.ProductDetailUpdateRequest;
import com.nvm.project1.response.ListImageResponse;
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

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public void add(ProductDetailImageRequest productDetailImageRequest) {
        ProductDetailImage productDetailImageAdd=new ProductDetailImage();
        productDetailImageAdd.setProductDetail_id(productDetailRepository.getReferenceById(productDetailImageRequest.getProductDetail_id()));
        productDetailImageAdd.setImage(productDetailImageRequest.getImage());
        productDetailImageRepository.save(productDetailImageAdd);
    }

    @Override
    public List<ListProductDetailImageResponse> getAllById(Long id) {
        return productDetailImageRepository.getAllById(id);
    }

    @Override
    public ListProductDetailImageResponse getDetailById(Long id) {
        return productDetailImageRepository.getDetailById(id);
    }

    @Override
    public List<ListImageResponse> getListImageById(Long id) {
        return productDetailImageRepository.getListImageById(id);
    }

    @Override
    public ListProductDetailImageResponse updateDetail(Long idProduct, Long idProductDetail, ProductDetailUpdateRequest productDetailUpdateRequest) {
        //update Product first
        Product productUpdate=productRepository.getReferenceById(idProduct);
        productUpdate.setName(productDetailUpdateRequest.getName());
        productUpdate.setGender(productDetailUpdateRequest.getGender());
        productUpdate.setDescription(productDetailUpdateRequest.getDescription());
        productUpdate.setBrand(brandRepository.getBrandByName(productDetailUpdateRequest.getBrand_name()));
        //đang làm dở update
        return null;
    }
}
