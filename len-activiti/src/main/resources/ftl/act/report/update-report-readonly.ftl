<#--Created by IntelliJ IDEA.
User: zxm
Date: 2017/12/20
Time: 10:00
To change this template use File | Settings | File Templates.-->

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>编辑举报</title>
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
  <link rel="stylesheet" href="${re.contextPath}/plugin/layui/css/layui.css">
  <link rel="stylesheet" href="${re.contextPath}/plugin/ztree/css/metroStyle/metroStyle.css">
  <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="${re.contextPath}/plugin/layui/layui.all.js" charset="utf-8"></script>
  <script type="text/javascript" src="${re.contextPath}/plugin/tools/tool.js" charset="utf-8"></script>
</head>

<body>
<div class="x-body">
  <form class="layui-form layui-form-pane" style="margin-left: 20px;">
    <div style="width:100%;height:400px;overflow: auto;">
    <div class="layui-form-item">
      <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">
        <legend style="font-size:16px;">举报信息</legend>
      </fieldset>
    </div>
      <table class="layui-table" width="80%">
        <tbody >
        <tr>
          <td bgcolor="#87ceeb" width="7%">申请人:</td>
          <td width="12%">${report.username}</td>
          <td bgcolor="#87ceeb"width="7%">申请人ID :</td>
          <td width="12%">${report.userId}</td>
          <td bgcolor="#87ceeb"width="7%">车牌号码:</td>
          <td width="12%">${report.eventCarNo}</td>
          <td bgcolor="#87ceeb"width="7%">公里桩(KM):</td>
          <td width="12%">${report.eventRunKm}</td>
        </tr>
        <tr>
          <td bgcolor="#87ceeb" width="7%">车辆类型:</td>
          <td width="12%">${report.eventCarType}</td>
          <td bgcolor="#87ceeb"width="7%">车辆颜色:</td>
          <td width="12%">${report.eventCarColor}</td>
          <td bgcolor="#87ceeb"width="7%">车牌类型:</td>
          <td width="12%">${report.eventCarNoType}</td>
          <td bgcolor="#87ceeb"width="7%">车牌颜色:</td>
          <td width="12%">${report.eventCarNoColor}</td>
        </tr>
        <tr>
          <td bgcolor="#87ceeb" width="7%">道路名称:</td>
          <td width="12%">${report.eventRoad}</td>
          <td bgcolor="#87ceeb"width="7%">行车方向:</td>
          <td width="12%">${report.eventCarDir}</td>
          <td bgcolor="#87ceeb"width="7%">违法行为:</td>
          <td width="12%">${report.carEvent}</td>
          <td bgcolor="#87ceeb"width="7%">发生时间:</td>
          <td width="12%">${report.eventTime}</td>
        </tr>
        <tr>
          <td>详情描述</td>
          <td colspan="7">${report.eventDescription}</td>

        </tr>
        </tbody>
      </table>
      <div class="image-container layui-col-md2" >
        <div class="delete-css"></div>
       <img id="showImg'+index+'" style="width: 150px; margin:10px;cursor:pointer;"src="" ></div>;


      <div style="height: 60px"></div>
    </div>

  </form>
</div>
<script>
  layui.use(['form','layer'], function(){
    $ = layui.jquery;
    var form = layui.form
        ,layer = layui.layer
    ,laydate = layui.laydate;
    var d = new Date();
    var day=d.getFullYear()+"-"+(parseInt(d.getMonth())+1)+'-'+d.getDate();
    var $ = layui.$, active = {
      close: function () {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
      }
    }
    $('.layui-form-item .layui-btn').on('click', function () {
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
    var a = laydate.render({
      elem: '#beginTime',
      min:day,
      done: function(value, date, endDate) {
        b.config.min = {
          year: date.year,
          month: date.month - 1,
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        }
      }
    });
    var b = laydate.render({
      elem: '#endTime',
      min: '2018-01-20'
    });

    //自定义验证规则
    form.verify({
      beginTime: function(value){
        if(value.trim()==""){
          return "开始时间不能为空";
        }
      },
      endTime:function(value) {
        if (value.trim() == "") {
          return "结束时间不能为空";
        }
      },
      reason:function(value){
        if(value.trim()==""){
          return "请填写请假原因";
        }
      }
    });
   form.on('submit(close)',function (data) {
     var index = parent.layer.getFrameIndex(window.name);
     parent.layer.close(index);
   })
    //监听提交
    form.on('submit(add)', function(data){
      layerAjax('updateLeave/${taskId}/${leave.id}/true',data.field,'taskList');
      return false;
    }); form.on('submit(closeLeave)', function(data){
      layerAjax('updateLeave/${taskId}/${leave.id}/false',data.field,'taskList');
      return false;
    });
  });
</script>
</body>

</html>
