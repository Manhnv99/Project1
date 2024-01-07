package com.nvm.project1.repository;

import com.nvm.project1.entity.Brand;
import com.nvm.project1.response.BrandResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {


    @Query("""
            select new com.nvm.project1.response.BrandResponse(b.id,b.name,b.updated_at,b.status) from Brand b order by b.id desc
            """)
    List<BrandResponse> getAll();


    @Query("""
            select new com.nvm.project1.response.BrandResponse(b.id,b.name,b.updated_at,b.status) from Brand b order by b.id desc
            """)
    List<BrandResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.project1.response.BrandResponse(b.id,b.name,b.updated_at,b.status) from Brand b order by b.id desc
            """)
    List<BrandResponse> getAllTotalPage();


    @Query(value = """
            select * from brand order by brand.id desc limit 1
            """,nativeQuery = true)
    Brand getTop1();


    @Query("""
            select new com.nvm.project1.response.BrandResponse(b.id,b.name,b.updated_at,b.status) from Brand b where
            (b.name is null or b.name like %:name%) or
            (b.status is null or b.status=:status) order by b.id desc
            """)
    List<BrandResponse> findByAll(String name,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.project1.response.BrandResponse(b.id,b.name,b.updated_at,b.status) from Brand b where
            (b.name is null or b.name like %:name%) or
            (b.status is null or b.status=:status)
            """)
    List<BrandResponse> findAllTotalPage(String name,Boolean status);
}
