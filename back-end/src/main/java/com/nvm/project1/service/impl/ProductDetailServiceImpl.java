package com.nvm.project1.service.impl;

import com.nvm.project1.entity.ProductDetail;
import com.nvm.project1.repository.ColorRepository;
import com.nvm.project1.repository.ProductDetailRepository;
import com.nvm.project1.repository.ProductRepository;
import com.nvm.project1.repository.SizeRepository;
import com.nvm.project1.request.ProductDetailRequest;
import com.nvm.project1.response.ListProductDetailResponse;
import com.nvm.project1.response.ProductDetailResponse;
import com.nvm.project1.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepository;


    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public ProductDetailResponse add(ProductDetailRequest productDetailRequest) {
        ProductDetail productDetailAdd=new ProductDetail();
        productDetailAdd.setQuantity(productDetailRequest.getQuantity());
        productDetailAdd.setPrice(productDetailRequest.getPrice());
        productDetailAdd.setProduct(productRepository.getReferenceById(productDetailRequest.getProduct_id()));
        productDetailAdd.setSize(sizeRepository.getSizeByCode(productDetailRequest.getSize_name()));
        productDetailAdd.setColor(colorRepository.getColorByCode(productDetailRequest.getColor_code()));
        productDetailAdd.setStatus(productDetailRequest.getStatus());
        productDetailAdd.setImage(productDetailRequest.getImage());
        productDetailAdd.setCreated_at(new Date());
        productDetailAdd.setUpdated_at(new Date());
        productDetailAdd.setCreated_by(Long.valueOf(1));
        productDetailAdd.setUpdated_by(Long.valueOf(1));
        ProductDetail productDetail=productDetailRepository.save(productDetailAdd);
        return new ProductDetailResponse(productDetail.getId(),productDetail.getColor().getCode());
    }

    @Override
    public List<ListProductDetailResponse> getAll() {
        return productDetailRepository.getAll();
    }

    @Override
    public void updatePriceandQuantityById(Long id, Double price, Long quantity) {
        ProductDetail productDetail=productDetailRepository.getReferenceById(id);
        productDetail.setPrice(price);
        productDetail.setQuantity(quantity);
        productDetailRepository.save(productDetail);
    }
}
