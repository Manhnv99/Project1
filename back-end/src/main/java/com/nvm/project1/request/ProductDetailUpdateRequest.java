package com.nvm.project1.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDetailUpdateRequest {
    private String name;
    private String description;
    private String brand_name;
    private String material_name;
    private Boolean gender;
    private String color_name;
    private Long quantity;
    private Boolean status;
    private String sole_name;
    private String category_name;
    private String size_name;
    private Double price;
}
