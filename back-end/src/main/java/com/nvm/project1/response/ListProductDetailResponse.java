package com.nvm.project1.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ListProductDetailResponse {

    private Long id;

    private String code;

    private String name;

    private Long quantity;

}
