package com.len.service;

import com.len.base.BaseService;
import com.len.entity.ReportRecord;

public interface ReportRecordService extends BaseService<ReportRecord,String> {
   public  void insertRecord(ReportRecord record);
}
