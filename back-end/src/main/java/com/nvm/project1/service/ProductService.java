package com.nvm.project1.service;

import com.nvm.project1.request.ProductRequest;
import com.nvm.project1.response.ProductResponse;

public interface ProductService {

    ProductResponse add(ProductRequest productRequest);
}
