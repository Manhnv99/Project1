package com.nvm.project1.repository;

import com.nvm.project1.entity.Category;
import com.nvm.project1.entity.Material;
import com.nvm.project1.response.CategoryResponse;
import com.nvm.project1.response.MaterialResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material,Long> {

    @Query("""
            select new com.nvm.project1.response.MaterialResponse(m.id,m.name,m.updated_at,m.status) from Material m order by m.id desc
            """)
    List<MaterialResponse> getAll();


    @Query("""
            select new com.nvm.project1.response.MaterialResponse(m.id,m.name,m.updated_at,m.status) from Material m order by m.id desc
            """)
    List<MaterialResponse> getAllPaging(Pageable pageable);


    @Query("""
            select new com.nvm.project1.response.MaterialResponse(m.id,m.name,m.updated_at,m.status) from Material m order by m.id desc
            """)
    List<MaterialResponse> getAllTotalPage();


    @Query(value = """
            select * from material order by material.id desc limit 1
            """,nativeQuery = true)
    Material getTop1();

    @Query("""
            select new com.nvm.project1.response.MaterialResponse(m.id,m.name,m.updated_at,m.status) from Material m where
            (m.name is null or m.name like %:name%) or
            (m.status is null or m.status=:status) order by m.id desc
            """)
    List<MaterialResponse> findByAll(String name,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.project1.response.MaterialResponse(m.id,m.name,m.updated_at,m.status) from Material m where
            (m.name is null or m.name like %:name%) or
            (m.status is null or m.status=:status)
            """)
    List<MaterialResponse> findAllTotalPage(String name,Boolean status);


    @Query("""
            select m from Material m where m.name=:name
            """)
    Material getMaterialByName(String name);
}
