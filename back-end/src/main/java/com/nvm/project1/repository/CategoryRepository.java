package com.nvm.project1.repository;

import com.nvm.project1.entity.Category;
import com.nvm.project1.response.CategoryResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Query("""
            select new com.nvm.project1.response.CategoryResponse(c.id,c.name,c.updated_at,c.status) from Category c order by c.id desc
            """)
    List<CategoryResponse> getAllPaging(Pageable pageable);


    @Query("""
            select new com.nvm.project1.response.CategoryResponse(c.id,c.name,c.updated_at,c.status) from Category c order by c.id desc
            """)
    List<CategoryResponse> getAllTotalPage();


    @Query(value = """
            select * from category order by category.id desc limit 1
            """,nativeQuery = true)
    Category getTop1();

    @Query("""
            select new com.nvm.project1.response.CategoryResponse(c.id,c.name,c.updated_at,c.status) from Category c where
            (c.name is null or c.name like %:name%) or
            (c.status is null or c.status=:status) order by c.id desc
            """)
    List<CategoryResponse> findByAll(String name,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.project1.response.CategoryResponse(c.id,c.name,c.updated_at,c.status) from Category c where
            (c.name is null or c.name like %:name%) or
            (c.status is null or c.status=:status)
            """)
    List<CategoryResponse> findAllTotalPage(String name,Boolean status);
}
