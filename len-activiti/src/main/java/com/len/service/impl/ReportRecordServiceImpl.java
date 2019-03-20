package com.len.service.impl;

import com.len.mapper.ReportRecordMapper;
import com.len.service.ReportRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportRecordServiceImpl implements ReportRecordService {
    @Autowired
    private ReportRecordMapper reportRecordMapper;

}
