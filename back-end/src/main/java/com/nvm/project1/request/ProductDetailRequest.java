package com.nvm.project1.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDetailRequest {

    private Long quantity;

    private Double price;

    private Long product_id;

    private String size_name;

    private String color_code;

    private Boolean status;

    private String image;

}
