package com.len.mapper;

import com.len.base.BaseMapper;
import com.len.entity.ReportRecord;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;


public interface ReportRecordMapper extends Mapper<ReportRecord> {

    public List<ReportRecord> selectListByPage(ReportRecord record);
   @Update("update report_record set task_name = #{taskName} where user_id = #{userId}")
    public void updateTaskNameByUserId(@Param("taskName") String taskName, @Param("userId") String userId );
}
