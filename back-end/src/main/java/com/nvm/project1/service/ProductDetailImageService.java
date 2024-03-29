package com.nvm.project1.service;

import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.request.ProductDetailUpdateRequest;
import com.nvm.project1.response.ListImageResponse;
import com.nvm.project1.response.ListProductDetailImageResponse;

import java.util.List;

public interface ProductDetailImageService {

    void add(ProductDetailImageRequest productDetailImageRequest);


    List<ListProductDetailImageResponse> getAllById(Long id);


    ListProductDetailImageResponse getDetailById(Long id);


    List<ListImageResponse> getListImageById(Long id);

    ListProductDetailImageResponse updateDetail(Long idProduct, Long idProductDetail, ProductDetailUpdateRequest productDetailUpdateRequest);
}
