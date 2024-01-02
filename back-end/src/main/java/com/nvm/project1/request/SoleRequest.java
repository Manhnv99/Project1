package com.nvm.project1.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SoleRequest {
    private String name;
    private Boolean status;
}
