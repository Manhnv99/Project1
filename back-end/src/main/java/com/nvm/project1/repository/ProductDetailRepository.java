package com.nvm.project1.repository;

import com.nvm.project1.entity.ProductDetail;
import com.nvm.project1.response.ListProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail,Long> {


    @Query("""
            select new com.nvm.project1.response.ListProductDetailResponse(p.id,p.code,p.name,sum(pd.quantity))
            from Product p join ProductDetail pd on p.id=pd.product.id group by p.id,p.code,p.name
            """)
    List<ListProductDetailResponse> getAll();

}
