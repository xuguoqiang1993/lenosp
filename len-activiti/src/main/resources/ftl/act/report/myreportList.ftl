<#-- Created by IntelliJ IDEA.
 User: zxm
 Date: 2018/1/15
 Time: 16:53
 To change this template use File | Settings | File Templates.
流程部署-->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>我的举报</title>
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport"
        content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi"/>
  <link rel="stylesheet" href="${re.contextPath}/plugin/layui/css/layui.css">
  <link rel="stylesheet" href="${re.contextPath}/plugin/lenos/main.css"/>
    <script type="text/javascript" src="${re.contextPath}/plugin/jquery/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="${re.contextPath}/plugin/layui/layui.all.js"
          charset="utf-8"></script>
  <script type="text/javascript" src="${re.contextPath}/plugin/tools/tool.js" charset="utf-8"></script>
</head>

<body>
<div class="lenos-search">
  <div class="select">
    <#--车辆牌照：-->
    <#--<div class="layui-inline">-->
      <#--<input class="layui-input"  placeholder="yyyy-MM-dd" height="20px" id="beginTime" autocomplete="off">-->
    <#--</div>-->
    <#--违法时间：-->
    <#--<div class="layui-inline">-->
      <#--<input class="layui-input"  placeholder="yyyy-MM-dd" height="20px" id="endTime" autocomplete="off">-->
    <#--</div>-->
    <#--<button class="select-on layui-btn layui-btn-sm" data-type="select"><i class="layui-icon"></i>-->
    <#--</button>-->
    <button class="layui-btn layui-btn-sm icon-position-button" id="refresh" style="float: right;"
            data-type="reload">
      <i class="layui-icon">ဂ</i>
    </button>
  </div>
</div>

<table id="reportList" class="layui-hide" lay-filter="report"></table>
<script type="text/html" id="toolBar">
  <#--<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="getProcImage"><i class="layui-icon">&#xe640;</i>查看流程图</a>-->
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="reportDetail"><i class="layui-icon">&#xe640;</i>查看详情</a>
</script>
<script type="text/html" id="status">
  {{#if(typeof(d.taskName)!='undefined'){}}
    <div>${d.taskName}</div>
  {{# }else{}}
      结束
  {{# }}}
</script>
<script>


  layui.use(['table','laydate','layer'], function () {
    var table = layui.table,laydate = layui.laydate,layer = layui.layer;
    //方法级渲染(初始化)
    var initTable = table.render({
      id: 'reportList',
      elem: '#reportList'
      , url: 'showReportList'
      , cols: [[
         {checkbox: true, fixed: true, width: '5%'},
         {field: 'eventCarNo', title: '车辆牌照', width: '10%', sort: true},
        {field: 'eventRunKm', title: '公里桩', width: '10%', sort: true},
        {field: 'eventRoad', title: '道路名称', width: '10%', sort: true},
        {field: 'eventCarDir', title: '行车方向', width: '10%', sort: true},
        {field: 'carEvent', title: '违法行为', width: '10%', sort: true},
        {field: 'eventTime', title: '违法时间', width: '10%', sort: true},
        {field: 'taskName', title: '审核状态', width: '10%', sort: true},
        {field: 'text', title: '操作', width: '20%', toolbar:'#toolBar'}
      ]]
      , page: true
      ,  height: 'full-84'
    });
    //绑定刷新按钮
    $("#refresh").click(
            function () {
              initTable.reload({
               page: {
                  curr: 1 //重新从第 1 页开始
                }
              });
            }
    );
    //监听toolbar
    table.on('toolbar(report)', function(obj){
      console.log(123456778)

    });



  });


</script>
</body>

</html>
