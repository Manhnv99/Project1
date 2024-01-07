package com.nvm.project1.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ColorResponse {
    private Long id;
    private String code;
    private String name;
    private Boolean status;
}
