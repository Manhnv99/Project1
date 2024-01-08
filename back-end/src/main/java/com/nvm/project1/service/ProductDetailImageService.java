package com.nvm.project1.service;

import com.nvm.project1.request.ProductDetailImageRequest;
import com.nvm.project1.response.ListProductDetailImageResponse;

import java.util.List;

public interface ProductDetailImageService {

    void add(ProductDetailImageRequest productDetailImageRequest);


    List<ListProductDetailImageResponse> getAllById();
}
