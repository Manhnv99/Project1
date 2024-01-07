package com.nvm.project1.repository;

import com.nvm.project1.entity.ProductDetailImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailImageRepository extends JpaRepository<ProductDetailImage,Long> {
}
