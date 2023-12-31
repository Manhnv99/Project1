package com.nvm.project1.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class StaffRequest {

    private String code;

    private String name;

    private Boolean gender;

    private LocalDate birthDay;

    private String phone;

    private String email;

    private String cccd;

    private Boolean role;

    private Boolean status;

    private String password;

    private String image;

    private String address;

    private String thanhPho;

    private String quanHuyen;

    private String phuongXa;
}
