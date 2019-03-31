package com.len.service;

import com.len.base.BaseService;
import com.len.entity.ReportRecord;
import com.len.entity.UserLeave;

import java.util.List;

public interface ReportRecordService{
   public  void insertRecord(ReportRecord record);

   public List<ReportRecord> selectListByPage(ReportRecord record);

   public void updateByPrimaryKeySelective(ReportRecord record);

   public void updateTaskNameByUserId(ReportRecord record);

   public ReportRecord selectByPrimaryKey(String billId);
}
