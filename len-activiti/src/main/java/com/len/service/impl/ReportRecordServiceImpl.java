package com.len.service.impl;

import com.len.base.BaseMapper;
import com.len.base.impl.BaseServiceImpl;
import com.len.entity.ReportRecord;
import com.len.mapper.ReportRecordMapper;
import com.len.service.ReportRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportRecordServiceImpl extends BaseServiceImpl<ReportRecord,String> implements ReportRecordService {
    @Autowired
    private ReportRecordMapper reportRecordMapper;

    @Override
    public void insertRecord(ReportRecord record) {
        reportRecordMapper.insert(record);
    }

    @Override
    public BaseMapper<ReportRecord, String> getMappser() {
        return reportRecordMapper;
    }
}
