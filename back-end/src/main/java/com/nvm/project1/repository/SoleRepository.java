package com.nvm.project1.repository;

import com.nvm.project1.entity.Sole;
import com.nvm.project1.response.SoleResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoleRepository extends JpaRepository<Sole,Long> {


    @Query("""
            select new com.nvm.project1.response.SoleResponse(s.id,s.name,s.updated_at,s.status) from Sole s order by s.id desc
            """)
    List<SoleResponse> getAll();


    @Query("""
            select new com.nvm.project1.response.SoleResponse(s.id,s.name,s.updated_at,s.status) from Sole s order by s.id desc
            """)
    List<SoleResponse> getAllPaging(Pageable pageable);


    @Query("""
            select new com.nvm.project1.response.SoleResponse(s.id,s.name,s.updated_at,s.status) from Sole s order by s.id desc
            """)
    List<SoleResponse> getAllTotalPage();


    @Query(value = """
            select * from sole order by sole.id desc limit 1
            """,nativeQuery = true)
    Sole getTop1();


    @Query("""
            select new com.nvm.project1.response.SoleResponse(s.id,s.name,s.updated_at,s.status) from Sole s where
            (s.name is null or s.name like %:name%) or
            (s.status is null or s.status=:status) order by s.id desc
            """)
    List<SoleResponse> findByAll(String name,Boolean status,Pageable pageable);


    @Query("""
            select new com.nvm.project1.response.SoleResponse(s.id,s.name,s.updated_at,s.status) from Sole s where
            (s.name is null or s.name like %:name%) or
            (s.status is null or s.status=:status)
            """)
    List<SoleResponse> findAllTotalPage(String name,Boolean status);


    @Query("""
            select s from Sole s where s.name=:name
            """)
    Sole getSoleByName(String name);

}
