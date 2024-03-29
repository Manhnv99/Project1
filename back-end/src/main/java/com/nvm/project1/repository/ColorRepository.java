package com.nvm.project1.repository;

import com.nvm.project1.entity.Color;
import com.nvm.project1.entity.Size;
import com.nvm.project1.response.ColorResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color,Long> {

    @Query("""
            select new com.nvm.project1.response.ColorResponse(c.id,c.code,c.name,c.status) from Color c order by c.id asc
            """)
    List<ColorResponse> getAll();

    @Query(value = """
            select * from color order by color.id desc limit 1
            """,nativeQuery = true)
    Color getTop1();


    @Query(value = """
            select * from color where color.code=:code limit 1
            """,nativeQuery = true)
    Color getColorByCode(String code);


    @Query("""
            select c from Color c where c.name=:name
            """)
    Color getColorByName(String name);
}
