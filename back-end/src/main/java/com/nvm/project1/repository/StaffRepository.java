package com.nvm.project1.repository;

import com.nvm.project1.entity.Staff;
import com.nvm.project1.response.StaffResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Long> {


    @Query("""
            select new com.nvm.project1.response.StaffResponse(s.id,s.code,s.name,s.gender,s.birthDay,s.phone,s.email,s.cccd,
            s.role,s.status,s.password,s.image,s.address,s.thanhPho,s.quanHuyen,s.phuongXa)
            from Staff s
            """)
    List<StaffResponse> getAll();


    @Query( """
            select new com.nvm.project1.response.StaffResponse(s.id,s.code,s.name,s.gender,s.birthDay,s.phone,s.email,s.cccd,
            s.role,s.status,s.password,s.image,s.address,s.thanhPho,s.quanHuyen,s.phuongXa)
            from Staff s order by s.id desc 
            """)
    List<StaffResponse> getAllPaging(Pageable pageable);


    @Query( """
            select new com.nvm.project1.response.StaffResponse(s.id,s.code,s.name,s.gender,s.birthDay,s.phone,s.email,s.cccd,
            s.role,s.status,s.password,s.image,s.address,s.thanhPho,s.quanHuyen,s.phuongXa)
            from Staff s where
            ((:input is null or s.name like %:input%) or (:input is null or s.cccd like %:input%) or (:input is null or s.phone like %:input%)) and
            (:status is null or s.status = :status) and    
            (:ageFrom is null or :ageTo is null or s.birthDay between :ageFrom and :ageTo)
             order by s.id desc
            """)
    List<StaffResponse> FindByAllPaging(String input,Boolean status, LocalDate ageFrom, LocalDate ageTo, Pageable pageable);


    @Query( """
            select new com.nvm.project1.response.StaffResponse(s.id,s.code,s.name,s.gender,s.birthDay,s.phone,s.email,s.cccd,
            s.role,s.status,s.password,s.image,s.address,s.thanhPho,s.quanHuyen,s.phuongXa)
            from Staff s where
            ((:input is null or s.name like %:input%) or (:input is null or s.cccd like %:input%) or (:input is null or s.phone like %:input%)) and
            (:status is null or s.status = :status) and    
            (:ageFrom is null or :ageTo is null or s.birthDay between :ageFrom and :ageTo)
             order by s.id desc
            """)
    List<StaffResponse> FindByAllTotalPage(String input,Boolean status, LocalDate ageFrom, LocalDate ageTo);


    @Query("""
            select new com.nvm.project1.response.StaffResponse(s.id,s.code,s.name,s.gender,s.birthDay,s.phone,s.email,s.cccd,
            s.role,s.status,s.password,s.image,s.address,s.thanhPho,s.quanHuyen,s.phuongXa)
            from Staff s where s.id=:id
            """)
    StaffResponse getStaffById(Long id);


    @Query(value = """
            select count(*) from Staff
            """,nativeQuery = true)
    Double totalPage();

}
