package com.nvm.project1.service.impl;


import com.nvm.project1.entity.Size;
import com.nvm.project1.repository.SizeRepository;
import com.nvm.project1.request.SizeRequest;
import com.nvm.project1.response.SizeResponse;
import com.nvm.project1.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;


    @Override
    public List<SizeResponse> getAll() {
        return sizeRepository.getAll();
    }

    @Override
    public SizeResponse add(SizeRequest sizeRequest) {
        Size sizeAdd=new Size();
        if(sizeRepository.getTop1()==null){
            sizeAdd.setCode("Size1");
        }else{
            String code=sizeRepository.getTop1().getCode();
            sizeAdd.setCode(code.substring(0,4)+((Integer.parseInt(code.substring(4)))+1));
        }
        sizeAdd.setName(sizeRequest.getName());
        sizeAdd.setStatus(sizeRequest.getStatus());
        sizeAdd.setCreated_at(new Date());
        sizeAdd.setUpdated_at(new Date());
        sizeAdd.setCreated_by(Long.valueOf(1));
        sizeAdd.setUpdated_by(Long.valueOf(1));
        Size size = sizeRepository.save(sizeAdd);
        return new SizeResponse(size.getId(),size.getName(),size.getStatus());
    }



}
