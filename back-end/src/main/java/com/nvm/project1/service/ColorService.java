package com.nvm.project1.service;

import com.nvm.project1.entity.Color;
import com.nvm.project1.request.ColorRequest;
import com.nvm.project1.response.ColorResponse;

import java.util.List;

public interface ColorService {

    List<ColorResponse> getAll();


    ColorResponse add(ColorRequest colorRequest);

}
