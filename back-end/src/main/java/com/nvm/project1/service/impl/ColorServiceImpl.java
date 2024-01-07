package com.nvm.project1.service.impl;

import com.nvm.project1.entity.Color;
import com.nvm.project1.repository.ColorRepository;
import com.nvm.project1.request.ColorRequest;
import com.nvm.project1.response.ColorResponse;
import com.nvm.project1.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public List<ColorResponse> getAll() {
        return colorRepository.getAll();
    }

    @Override
    public ColorResponse add(ColorRequest colorRequest) {
        Color colorAdd=new Color();
//        if(colorRepository.getTop1()==null){
//            colorAdd.setCode("Color1");
//        }else{
//            String code=colorRepository.getTop1().getCode();
//            colorAdd.setCode(code.substring(0,5)+((Integer.parseInt(code.substring(5)))+1));
//        }
        colorAdd.setCode(colorRequest.getCode());
        colorAdd.setName(colorRequest.getName());
        colorAdd.setStatus(colorRequest.getStatus());
        colorAdd.setCreated_at(new Date());
        colorAdd.setUpdated_at(new Date());
        colorAdd.setCreated_by(Long.valueOf(1));
        colorAdd.setUpdated_by(Long.valueOf(1));
        Color color = colorRepository.save(colorAdd);
        return new ColorResponse(color.getId(),color.getCode(),color.getName(),color.getStatus());
    }

}
