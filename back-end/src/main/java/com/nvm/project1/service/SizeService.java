package com.nvm.project1.service;

import com.nvm.project1.entity.Size;
import com.nvm.project1.request.SizeRequest;
import com.nvm.project1.response.SizeResponse;

import java.util.List;

public interface SizeService {

    List<SizeResponse> getAll();

    SizeResponse add(SizeRequest sizeRequest);


}
