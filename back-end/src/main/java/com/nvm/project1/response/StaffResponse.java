package com.nvm.project1.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StaffResponse {

    private Long id;

    private String code;

    private String name;

    private Boolean gender;

    private LocalDate birthDay;

    private String phone;

    private String email;

    private String cccd;

    private Boolean role;

    private Boolean Status;

    private String password;

    private String image;

    private String address;

    private String thanhPho;

    private String quanHuyen;

    private String phuongXa;
}
