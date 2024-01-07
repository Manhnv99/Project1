package com.nvm.project1.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ProductRequest {

    private String name;

    private Boolean gender;

    private String description;

    private Long brand_id;

    private Long material_id;

    private Long sole_id;

    private Long category_id;

}
