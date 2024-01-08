package com.nvm.project1.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListProductDetailImageResponse {

    private Long productDetail_id;

    private String name;

    private String description;

    private String brand_name;

    private String material_name;

    private String sole_name;

    private String category_name;

    private Long quantity;

    private Double price;

    private String size;

    private String color_code;

    private Boolean status;

    private Boolean gender;

    private String image;




}
