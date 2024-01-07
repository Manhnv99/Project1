package com.nvm.project1.repository;

import com.nvm.project1.entity.Size;
import com.nvm.project1.response.SizeResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<Size,Long> {

    @Query("""
            select new com.nvm.project1.response.SizeResponse(z.id,z.name,z.status) from Size z order by z.name asc
            """)
    List<SizeResponse> getAll();

    @Query(value = """
            select * from size order by size.id desc limit 1
            """,nativeQuery = true)
    Size getTop1();


    @Query(value = """
            select * from size where size.name=:name limit 1
            """,nativeQuery = true)
    Size getSizeByCode(String name);

}
