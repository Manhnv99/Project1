package com.nvm.project1.service;

import com.nvm.project1.request.ProductDetailRequest;
import com.nvm.project1.response.ListProductDetailResponse;
import com.nvm.project1.response.ProductDetailResponse;

import java.util.List;

public interface ProductDetailService {

    ProductDetailResponse add(ProductDetailRequest productDetailRequest);

    List<ListProductDetailResponse> getAll();
}
