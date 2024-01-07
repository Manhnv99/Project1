package com.nvm.project1.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SizeResponse {
    private Long id;
    private String name;
    private Boolean status;
}
