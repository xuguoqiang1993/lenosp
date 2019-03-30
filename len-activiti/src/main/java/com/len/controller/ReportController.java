package com.len.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.len.base.CurrentUser;
import com.len.entity.*;
import com.len.exception.MyException;
import com.len.service.CarMessService;
import com.len.service.ReportRecordService;
import com.len.util.*;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("report")
public class ReportController {


    private String sepa = java.io.File.separator;
    @Autowired
    private CarMessService carMessService;
    @Autowired
    private ReportRecordService reportService;
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    TaskService taskService;
    //展示 违法举报From
    @GetMapping("showFromReport")
    public String showFromReport(){
        return "/act/report/submitreport";
    }

    //写一个总的方法 ，来加载可以配置的选项(车辆颜色，车辆类型，违法道路，)
    @GetMapping("getCarMess")
    @ResponseBody
    public String getCarMess(){
        List<CarMess> carList = carMessService.findAll();
        String json = JSONObject.toJSONString(carList);
        return json ;
    }


    @RequestMapping(value = "/submitReportRecord")
    @ResponseBody
    public String fileUpload(ReportRecord record) throws IOException {
        CurrentUser user = CommonUtil.getUser();
        String id = user.getId();
        String name = user.getUsername();
        record.setUserId(id) ;
        record.setUsername(name);
        System.out.println("success");
        //业务数据已经插入，开始开启流程
        Map<String, Object> map = new HashMap<>();
        map.put("baseTask", record);
        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("report_process", map);
        record.setProcessInstanceId(processInstance.getId());
        reportService.insertRecord(record);

        return "success";

    }

    /**
     * 上传图片
     * @param sortPicImg
     * @param eventCarNo
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/uploadImg", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String uploadFilesEventByMass(@RequestParam("file") MultipartFile sortPicImg, String eventCarNo,HttpServletRequest request,
                                         HttpServletResponse response) {
        JSONObject json = new JSONObject();
        System.out.println(eventCarNo);
       if(!sortPicImg.isEmpty()){
           String path = "D:"+sepa+"unlawful" + sepa + DateUtil.nowDate() + sepa + eventCarNo  ;

           String fileName = System.currentTimeMillis()+ "_" + sortPicImg.getOriginalFilename();
           System.out.println(fileName);
           File parentFile = new File(path);
           if(!parentFile.exists()){
               parentFile.mkdirs();
           }
           File targetFile = new File(path+sepa+fileName);

           // 保存
           try {
               sortPicImg.transferTo(targetFile);
           } catch (Exception e) {
               e.printStackTrace();
               json.put("msg", "error");
               return json.toJSONString();
           }
           json.put("msg", "success");

           File retfile = new File(path, fileName);
           json.put("filepath", retfile.getPath());

           System.out.println("json=" + json.toJSONString());
           return json.toJSONString();
       }else{
           json.put("msg", "error");
           return json.toJSONString();
       }

    }
//
    @GetMapping(value = "showMyReport")
    public String showUser(Model model) {
        return "/act/report/myreportList";
    }

    //展示我的举报
@GetMapping(value = "showReportList")
@ResponseBody
public ReType showLeaveList(Model model, String page, String limit) {
    ReportRecord record = new ReportRecord();
    String userId = CommonUtil.getUser().getId();
    record.setUserId(userId);
    List<ReportRecord> tList = null;
    Page<ReportRecord> tPage = PageHelper.startPage(Integer.valueOf(page), Integer.valueOf(limit));
    try {
        tList = reportService.selectListByPage(record);

        for (ReportRecord record1 : tList) {
            ProcessInstance instance = runtimeService.createProcessInstanceQuery()
                    .processInstanceId(record1.getProcessInstanceId()).singleResult();
            //保证运行ing
            if (instance != null) {
                Task task = taskService.createTaskQuery().processInstanceId(record1.getProcessInstanceId()).singleResult();
                record.setTaskName(task.getName());
                System.out.println(task.getName());
                reportService.updateTaskNameByUserId(record);
            }
        }
    } catch (MyException e) {
        e.printStackTrace();
    }
    return new ReType(tPage.getTotal(), tList);
}


   //展示我的代办

    /**
     * ---------我的任务---------
     */
    @GetMapping(value = "showReportTask")
    public String showTask(Model model) {
        return "/act/report/showReportTask";
    }

//    @GetMapping(value = "showReportTaskList")
//    @ResponseBody
//    public String showTaskList(Model model, com.len.entity.Task task, String page, String limit) {
//        CurrentUser user = CommonUtil.getUser();
//        SysRoleUser sysRoleUser = new SysRoleUser();
//        sysRoleUser.setUserId(user.getId());
//        List<SysRoleUser> userRoles = roleUserService.selectByCondition(sysRoleUser);
//        List<String> roleString = new ArrayList<String>();
//        for(SysRoleUser sru:userRoles)
//        {
//            roleString.add(sru.getRoleId());
//        }
//        List<Task> taskList = taskService.createTaskQuery().taskCandidateUser(user.getId()).list();
//        List<Task> assigneeList =taskService.createTaskQuery().taskAssignee(user.getId()).list();
//        List<Task> candidateGroup =taskService.createTaskQuery().taskCandidateGroupIn(roleString).list();
//        taskList.addAll(assigneeList);
//        taskList.addAll(candidateGroup);
//        List<com.len.entity.Task> tasks = new ArrayList<>();
//        Map<String, Object> map = new HashMap<>();
//        com.len.entity.Task taskEntity = null;
//
//        Map<String, Map<String, Object>> mapMap = new HashMap<>();
//        Map<String, Object> objectMap = null;
//        Set<String> taskSet = new HashSet<String>();
//        for (Task task1 : taskList) {
//            objectMap = new HashMap<>();
//            String taskId = task1.getId();
//            if(taskSet.contains(taskId))
//            {
//                continue;
//            }
//
//            map = taskService.getVariables(taskId);
//            BaseTask userLeave = (BaseTask) map.get("baseTask");
//
//            taskEntity = new com.len.entity.Task(task1);
//            taskEntity.setUserName(userLeave.getUserName());
//            taskEntity.setReason(userLeave.getReason());
//            taskEntity.setUrlpath(userLeave.getUrlpath());
//            /**如果是自己*/
//            if (user.getId().equals(userLeave.getUserId()) ) {
//                if( map.get("flag")!=null)
//                {
//                    if(!(boolean) map.get("flag"))
//                    {
//                        objectMap.put("flag", true);
//                    }else
//                    {
//                        objectMap.put("flag", false);
//                    }
//                }else
//                {
//                    objectMap.put("flag", true);
//                }
//            } else {
//                objectMap.put("flag", false);
//            }
//            mapMap.put(taskEntity.getId(), objectMap);
//            tasks.add(taskEntity);
//            taskSet.add(taskId);
//        }
//        return ReType.jsonStrng(taskList.size(), tasks, mapMap, "id");
//    }


}
