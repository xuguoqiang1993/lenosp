package com.len.service.impl;

import com.len.entity.CarMess;
import com.len.mapper.CarMessMapper;
import com.len.service.CarMessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CarMessServiceImpl implements CarMessService {
    @Autowired
    private CarMessMapper carMessMapper;
    @Override
    public List<CarMess> findAll() {
        return carMessMapper.select(null);
    }
}
