package com.len.service.impl;

import com.len.base.BaseMapper;
import com.len.base.impl.BaseServiceImpl;
import com.len.entity.ReportRecord;
import com.len.mapper.ReportRecordMapper;
import com.len.service.ReportRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportRecordServiceImpl  implements ReportRecordService {
    @Autowired
    private ReportRecordMapper reportRecordMapper;

    @Override
    public void insertRecord(ReportRecord record) {
        reportRecordMapper.insert(record);
    }

    @Override
    public List<ReportRecord> selectListByPage(ReportRecord record) {
        return reportRecordMapper.selectListByPage(record);
    }

    @Override
    public void updateByPrimaryKeySelective(ReportRecord record) {
        reportRecordMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void updateTaskNameByUserId(ReportRecord record) {
        String taskName = record.getTaskName();
        String userId = record.getUserId();
        reportRecordMapper.updateTaskNameByUserId(taskName,userId);
    }


}
