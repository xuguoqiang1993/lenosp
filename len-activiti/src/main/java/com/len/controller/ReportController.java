package com.len.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.len.entity.*;
import com.len.exception.MyException;
import com.len.service.CarMessService;
import com.len.service.ReportRecordService;
import com.len.util.*;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.runtime.ProcessInstance;
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


//    @RequestMapping(value = "/insertReportAgainstLawByMassRecord")
//    @ResponseBody
//    public String fileUpload(ReportRecord record) throws IOException {
//        //要判断img 和 filestr 是够存在
//        String[] img = record.getImg();
//        String fileStr = record.getFilestr();
//        String eventCarNo = record.getEventCarNo();
//        System.out.println(record.getEventTime());
//
//
//        String path = "unlawful" + sepa + DateUtil.nowDate() + sepa + eventCarNo ;
//
//        for (int i = 0; i < img.length; i++) {
//            System.out.println(img[i]);
//            //将一些没用自动产生的图片删除
//            if (!"data:image/png;base64".equals(img[i])) {
//
//                String imgName = System.currentTimeMillis() + "_视频截图.png";
//                ImageUtils.decodeBase64ToImageOSS(img[i], path, imgName);
//                if ("".equals(fileStr) || fileStr == null) {
//                    fileStr = path + imgName;
//                } else {
//                    fileStr = fileStr + "," + path + imgName;
//                }
//            }
//        }
//
//        // 开始插入数据库中
//        System.out.println(fileStr);
//        record.setFilestr(fileStr);
//
//        reportService.insertRecord(record);
//
//        //开启流程管理
//        Map<String, Object> map = new HashMap<>();
//        map.put("baseTask", record);
//        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("report_process", map);
//        System.out.println(processInstance.getId());
//
//
//        return "success";
//
//    }
//
    @RequestMapping(value = "/uploadImg", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String uploadFilesEventByMass(@RequestParam("file") MultipartFile sortPicImg, HttpServletRequest request,
                                         HttpServletResponse response) {
        JSONObject json = new JSONObject();
       if(!sortPicImg.isEmpty()){
           String eventCarNo = request.getParameter("eventCarNo");
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
           // json.put("filePath",request.getContextPath() + "/upload/" +
           // fileName);
           File retfile = new File(path, fileName);
           json.put("filePath", retfile.getPath());
           json.put("fileDirPath", path);
           System.out.println("json=" + json.toJSONString());
           return json.toJSONString();
       }else{
           json.put("msg", "error");
           return json.toJSONString();
       }

    }
//
//    @GetMapping(value = "showMyReport")
//    public String showUser(Model model) {
//        return "/act/report/myreportList";
//    }
//
//    //展示我的举报
//    @GetMapping(value = "showMyReportList")
//    @ResponseBody
//    public ReType showLeaveList(Model model, String page, String limit) {
//        String userId = CommonUtil.getUser().getId();
//        ReportRecord record = new ReportRecord();
//        record.setUserId(userId);
//        List<ReportRecord> tList = null;
//        Page<ReportRecord> tPage = PageHelper.startPage(Integer.valueOf(page), Integer.valueOf(limit));
//        try {
//          tList = reportService.selectByUserId(record);
//
//        } catch (MyException e) {
//            e.printStackTrace();
//        }
//        return new ReType(tPage.getTotal(), tList);
//    }


}
