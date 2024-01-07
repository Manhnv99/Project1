package com.nvm.project1.service;

import com.nvm.project1.request.ProductDetailRequest;
import com.nvm.project1.response.ProductDetailResponse;

public interface ProductDetailService {

    ProductDetailResponse add(ProductDetailRequest productDetailRequest);
}
