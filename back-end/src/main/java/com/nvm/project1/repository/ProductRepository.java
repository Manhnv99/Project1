package com.nvm.project1.repository;

import com.nvm.project1.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query(value = """
            select * from product order by product.id desc limit 1
            """,nativeQuery = true)
    Product getTop1();
}
