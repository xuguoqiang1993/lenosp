package com.len.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.len.base.CurrentUser;
import com.len.core.shiro.ShiroUtil;
import com.len.entity.*;
import com.len.exception.MyException;
import com.len.service.CarMessService;
import com.len.service.ReportRecordService;
import com.len.service.RoleUserService;
import com.len.util.*;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricActivityInstance;
import org.activiti.engine.history.HistoricDetail;
import org.activiti.engine.history.HistoricVariableUpdate;
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
import java.util.*;

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
    @Autowired
    private RoleUserService roleUserService;
    @Autowired
    private HistoryService historyService;
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
        reportService.insertRecord(record);
        //然后将url路径插入
        Integer reportId = record.getId();
        String urlpath = "/report/readOnlyReport/"+reportId;
        record.setUrlpath(urlpath);

        //业务数据已经插入，开始开启流程
        Map<String, Object> map = new HashMap<>();
        map.put("baseTask", record);
        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("report_process", map);
        record.setProcessInstanceId(processInstance.getId());
        reportService.updateByPrimaryKeySelective(record);


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

    @GetMapping(value = "showReportTaskList")
    @ResponseBody
    public String showTaskList(Model model, com.len.entity.Task task, String page, String limit) {
        CurrentUser user = CommonUtil.getUser();

        SysRoleUser sysRoleUser = new SysRoleUser();
        sysRoleUser.setUserId(user.getId());
        List<SysRoleUser> userRoles = roleUserService.selectByCondition(sysRoleUser);
        List<String> roleString = new ArrayList<String>();
        for(SysRoleUser sru:userRoles)
        {
            roleString.add(sru.getRoleId());
        }
        //根据用户查询任务
        List<Task> taskList = taskService.createTaskQuery().taskCandidateUser(user.getId()).list();
        //该用户受理任务的列表
        List<Task> assigneeList =taskService.createTaskQuery().taskAssignee(user.getId()).list();
        //根据用户组查询任务
        List<Task> candidateGroup =taskService.createTaskQuery().taskCandidateGroupIn(roleString).list();

        taskList.addAll(assigneeList);
        taskList.addAll(candidateGroup);

        List<com.len.entity.Task> tasks = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        com.len.entity.Task taskEntity = null;

        Map<String, Map<String, Object>> mapMap = new HashMap<>();
        Map<String, Object> objectMap = null;
        Set<String> taskSet = new HashSet<String>();
        for (Task task1 : taskList) {
            objectMap = new HashMap<>();
            String taskId = task1.getId();
            if(taskSet.contains(taskId))
            {
                continue;
            }
            //根据任务id来获取信息
            map = taskService.getVariables(taskId);
            //获取到record信息
            ReportRecord record = (ReportRecord) map.get("baseTask");

            taskEntity = new com.len.entity.Task(task1);
            taskEntity.setUserName(record.getUsername());


            /**如果是自己*/
            if (user.getId().equals(record.getUserId()) ) {
                if( map.get("flag")!=null)
                {
                    if(!(boolean) map.get("flag"))
                    {
                        objectMap.put("flag", true);
                    }else
                    {
                        objectMap.put("flag", false);
                    }
                }else
                {
                    objectMap.put("flag", true);
                }
            } else {
                objectMap.put("flag", false);
            }
            mapMap.put(taskEntity.getId(), objectMap);
            tasks.add(taskEntity);
            taskSet.add(taskId);
        }
        System.out.println(ReType.jsonStrng(taskList.size(), tasks, mapMap, "id"));
        return ReType.jsonStrng(taskList.size(), tasks, mapMap, "id");
    }


    @GetMapping("agent/{id}")
    public String agent(Model model, @PathVariable("id") String taskId) {
        Map<String, Object> variables = taskService.getVariables(taskId);
        ReportRecord record = (ReportRecord) variables.get("baseTask");

       model.addAttribute("reportUrl", record.getUrlpath());
        model.addAttribute("taskId", taskId);
        return "/act/report/report-task-agent-iframe";
    }

    @GetMapping("readOnlyReport/{billId}")
    public String readOnlyLeave(Model model, @PathVariable String billId) {
        ReportRecord reportRecord = reportService.selectByPrimaryKey(billId);
        model.addAttribute("report", reportRecord);
        System.out.println(reportRecord.getEventCarColor());
        return "/act/report/update-report-readonly";
    }


    //开始审核
    @PostMapping("agent/complete")
    @ResponseBody
    public JsonUtil complete(LeaveOpinion op, HttpServletRequest request) {

        Map<String, Object> variables = taskService.getVariables(op.getTaskId());

        CurrentUser user = ShiroUtil.getCurrentUse();
        op.setCreateTime(new Date());
        op.setOpId(user.getId());
        op.setOpName(user.getRealName());
        JsonUtil j = new JsonUtil();
        Map<String, Object> map = new HashMap<>();
        map.put("flag", op.isFlag());

        //判断节点是否已经拒绝过一次了
        Object needend = variables.get("needend");
        if(needend!=null && (boolean ) needend &&  (!op.isFlag()) )
        {
            map.put("needfinish",-1); //结束
        }else
        {
            if(op.isFlag())
            {
                map.put("needfinish",1);//通过下一个节点
            }else
            {
                map.put("needfinish",0);//不通过
            }
        }
        //审批信息叠加
        List<LeaveOpinion> leaveList = new ArrayList<>();
        //private String leaveOpinionList = "leaveOpinionList";
        Object o = variables.get("leaveOpinionList");
        if (o != null) {
            leaveList = (List<LeaveOpinion>) o;
        }
        leaveList.add(op);
        map.put("leaveOpinionList", leaveList);
        j.setMsg("审核成功" + (op.isFlag() ? "<font style='color:green'>[通过]</font>" : "<font style='color:red'>[未通过]</font>"));
        taskService.complete(op.getTaskId(), map);
        return j;
    }

    /**
     * 根据 执行对象id获取审批信息
     *
     * @param model
     * @param processId
     * @return
     */
    @GetMapping("leaveDetail")
    public String leaveDetail(Model model, String processId) {
        ProcessInstance instance = runtimeService.createProcessInstanceQuery()
                .processInstanceId(processId).singleResult();
        //保证运行ing
        List<LeaveOpinion> leaveList = null;
        List<HistoricActivityInstance> historicActivityInstanceList = new ArrayList<>();
        if (instance != null) {
            Task task = this.taskService.createTaskQuery().processInstanceId(processId).singleResult();
            Map<String, Object> variables = taskService.getVariables(task.getId());
            Object o = variables.get("leaveOpinionList");
            if (o != null) {
                /*获取历史审核信息*/
                leaveList = (List<LeaveOpinion>) o;
            }
        } else {
            leaveList = new ArrayList<>();
            List<HistoricDetail> list = historyService.createHistoricDetailQuery().
                    processInstanceId(processId).list();
            HistoricVariableUpdate variable = null;
            for (HistoricDetail historicDetail : list) {
                variable = (HistoricVariableUpdate) historicDetail;
                String variableName = variable.getVariableName();
                if ("leaveOpinionList".equals(variable.getVariableName())) {
                    leaveList.clear();
                    leaveList.addAll((List<LeaveOpinion>) variable.getValue());
                }
            }
        }
        model.addAttribute("leaveDetail", JSON.toJSONString(leaveList));
        return "/act/leave/leaveDetail";
    }




}
