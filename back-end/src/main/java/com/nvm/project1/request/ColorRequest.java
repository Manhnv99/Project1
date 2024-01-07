package com.nvm.project1.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ColorRequest {

    private String code;

    private String name;

    private Boolean status;
}
