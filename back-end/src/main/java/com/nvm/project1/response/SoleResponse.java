package com.nvm.project1.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SoleResponse {
    private Long id;
    private String name;
    private Date updated_at;
    private Boolean status;
}
