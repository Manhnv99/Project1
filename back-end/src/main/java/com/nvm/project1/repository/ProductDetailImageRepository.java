package com.nvm.project1.repository;

import com.nvm.project1.entity.ProductDetailImage;
import com.nvm.project1.response.ListProductDetailImageResponse;
import com.nvm.project1.response.ProductDetailImageResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailImageRepository extends JpaRepository<ProductDetailImage,Long> {

    @Query("""
            select new com.nvm.project1.response.ListProductDetailImageResponse(
                pd.id,p.name,p.description,p.brand.name,p.material.name,p.sole.name,p.category.name,pd.quantity,pd.price,pd.size.name,pd.color.code,pd.status,p.gender,pd.image
            )
            from Product p join ProductDetail pd on p.id=pd.product.id
            """)
    List<ListProductDetailImageResponse> getAllById();
}
