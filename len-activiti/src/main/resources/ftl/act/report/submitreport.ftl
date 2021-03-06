<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>开始使用layui</title>
    <link rel="stylesheet" href="${re.contextPath}/plugin/layui/css/layui.css">
</head>
<body>

<form class="layui-form" action="">
   <div class="layui-row">
    <div class="layui-form-item">
        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">
            <legend style="font-size:16px;">举报信息</legend>
        </fieldset>
    </div>

    <div class="layui-form-item layui-col-md10">
        <div class="layui-col-md6">
        <label class="layui-form-label">车辆牌照</label>
        <div class="layui-input-block">
            <input type="text" name="eventCarNo" id = "eventCarNo" required  lay-verify="required" placeholder="浙D99999（格式按照提示格式正确填写）" autocomplete="off" class="layui-input">
        </div>
        </div>

        <div class="layui-col-md6">
            <label class="layui-form-label">公里桩(KM)</label>
            <div class="layui-input-block">
                <input type="text" name="eventRunKm" id = "eventRunKm" required  lay-verify="required" placeholder="请填写整数或者小数(单位KM)" autocomplete="off" class="layui-input">
            </div>
        </div>
    </div>



    <div class="layui-form-item layui-col-md10">
        <div class="layui-col-md6">
        <label class="layui-form-label">车牌颜色</label>
        <div class="layui-input-block">
            <select name="eventCarnocolor" id="eventCarnocolor"  lay-verify="required">

            </select>
        </div>
        </div>
        <div class="layui-col-md6">
        <label class="layui-form-label">车牌类型</label>
        <div class="layui-input-block">
            <select name="eventCarnotype" id="eventCarnotype" lay-verify="required">

            </select>
        </div>
        </div>
    </div>

       <div class="layui-form-item layui-col-md10">
           <div class="layui-col-md6">
               <label class="layui-form-label">车辆颜色</label>
               <div class="layui-input-block">
                   <select name="eventCarcolor" id="eventCarcolor" lay-verify="required">

                   </select>
               </div>
           </div>
           <div class="layui-col-md6">
               <label class="layui-form-label">车辆类型</label>
               <div class="layui-input-block">
                   <select name="eventCartype" id="eventCartype" lay-verify="required">

                   </select>
               </div>
           </div>
       </div>

       <div class="layui-form-item layui-col-md10">
           <div class="layui-col-md6">
               <label class="layui-form-label">道路名称</label>
               <div class="layui-input-block">
                   <select name="eventRoad" id ="eventRoad" lay-verify="required">

                   </select>
               </div>
           </div>
           <div class="layui-col-md6">
               <label class="layui-form-label">行车方向</label>
               <div class="layui-input-block">
                   <select name="eventCarDir" id = "eventCarDir" lay-verify="required">
                      <option>上行</option>
                       <option>下行</option>
                   </select>
               </div>
           </div>
       </div>

       <div class="layui-form-item layui-col-md10">
           <div class="layui-col-md6">
               <label class="layui-form-label">违法行为</label>
               <div class="layui-input-block">
                   <select name="carEvent" id="carEvent" lay-verify="required">

                   </select>
               </div>
           </div>
           <div class="layui-col-md6">
               <label class="layui-form-label">发生时间</label>
               <div class="layui-input-block">
               <input type="text"  id="eventTime" name="eventTime"  lay-verify="beginTime"  placeholder="yyyy-MM-dd"
                      autocomplete="off" class="layui-input">
           </div>
           </div>
       </div>
       <div class="layui-form-item">
       </div>

    <div class="layui-form-item layui-form-text layui-col-md10" >
        <label class="layui-form-label">详情描述</label>
        <div class="layui-input-block">
            <textarea name="eventDescription" id = "eventDescription" placeholder="请描述违法事件详细信息" class="layui-textarea"></textarea>
        </div>
    </div>
       <div class="layui-form-item layui-form-text layui-col-md10" >

           <div class="layui-input-block" >
          <input type="hidden" id="fileUrl" name="fileUrl" value=""/>
       <button type="button" class="layui-btn" id="picImgs">
           <i class="layui-icon">&#xe67c;</i>上传图片
       </button>
           </div>

           </div>
       <div class="layui-form-item layui-col-md12">
       <div id="ImgPreview" class="layui-input-block">

       </div> </div>


       <div class="layui-form-item layui-col-md10">
           <div class="layui-col-md6 layui-col-md-offset5">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo" id = "uploadReport">立即提交</button>
            <#--<button type="reset" class="layui-btn layui-btn-primary">重置</button>-->
        </div>
           </div>
    </div>


   </div>
</form>

<script src="${re.contextPath}/plugin/layui/layui.js"></script>
<script type="text/javascript" src="${re.contextPath}/plugin/jquery/jquery-3.2.1.min.js"></script>

<script>
    $(document).ready(
        function() {
            //文档初始化事件
            //时间行为初始化
            $.ajax({
                type : "GET",
                url : "${re.contextPath}/report/getCarMess",
                dataType : "json",
                success : function(data) {
                    console.log(data);
                    $("#eventCarnocolor").empty();
                    $("#eventCarnocolor").append("<option value =''>请选择</option>");
                    $("#eventCarnotype").empty();
                    $("#eventCarnotype").append("<option value =''>请选择</option>");
                    $("#eventCarcolor").empty();
                    $("#eventCarcolor").append("<option value =''>请选择</option>");
                    $("#eventCartype").empty();
                    $("#eventCartype").append("<option value =''>请选择</option>");
                    $("#eventRoad").empty();
                    $("#eventRoad").append("<option value =''>请选择</option>");
                    $("#carEvent").empty();
                    $("#carEvent").append("<option value =''>请选择</option>");
                    // 车牌颜色
                    var cpys = "";
                    var cplx = "";
                    var clys = "";
                    var cllx = "";
                    var wfdd = "";
                    var wfxw = "";
                    for (var i = 0; i<data.length;i++){
                        if(data[i].name == "车牌颜色"){
                            cpys = data[i].id;
                        }
                        if(data[i].name == "车牌类型"){
                            cplx = data[i].id;
                        }
                        if(data[i].name == "车辆颜色"){
                            clys = data[i].id;
                        }
                        if(data[i].name == "车辆类型"){
                            cllx = data[i].id;
                        }

                        if(data[i].name == "违法道路"){
                            wfdd = data[i].id;
                        }
                        if(data[i].name == "违法行为"){
                            wfxw = data[i].id;
                        }

                    }

                    for (var i = 0; i<data.length;i++) {
                        if(data[i].parentId==cpys){
                            $("#eventCarnocolor").append("<option >" + data[i].name+  "</option>");
                        }
                        if(data[i].parentId==cplx){
                            $("#eventCarnotype").append("<option >" + data[i].name+  "</option>");
                        }
                        if(data[i].parentId==clys){
                            $("#eventCarcolor").append("<option >" + data[i].name+  "</option>");
                        }
                        if(data[i].parentId==cllx){
                            $("#eventCartype").append("<option >" + data[i].name+  "</option>");
                        }

                        if(data[i].parentId == wfdd){
                            $("#eventRoad").append("<option >" + data[i].name+  "</option>");
                        }

                        if(data[i].parentId == wfxw){
                            $("#carEvent").append("<option >" + data[i].name+  "</option>");
                        }
                    }
                    //车牌类型
                    //车辆颜色
                    //车辆类型
                    layui.use('form', function(){
                        var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
                        //但是，如果你的HTML是动态生成的，自动渲染就会失效
                        //因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();

                        form.render();
                    });



                }
            });
            layui.use('laydate', function(){
                var laydate = layui.laydate;

                //执行一个laydate实例
                laydate.render({
                    elem: '#eventTime' ,//指定元素
                    type:'datetime'
                });
            });

            layui.use('upload', function(){
                var upload = layui.upload;
                //执行实例
                var uploadInst = upload.render({
                    elem: '#picImgs' //绑定元素
                    ,url: "${re.contextPath}/report/uploadImg" //上传接口
                    ,auto: false
                    ,multiple:true
                    ,number:2
                    ,drag:true
                    ,accept:'images'
                    ,bindAction: '#uploadReport'
                    ,data:{
                        eventCarNo: function(){
                            return $('#eventCarNo').val();
                        }
                    }
                    ,choose: function(obj){
                        var files = obj.pushFile();
                        //预读本地文件示例，不支持ie8
                        obj.preview(function(index, file, result){    //在当前ID为“demo2”的区域显示图片
                                if (file.size > 0 && $('#ImgPreview').find('img').length === 0) {
                                    $('#ImgPreview').empty();
                                }
                                // 添加图片 ImgPreview-预览的dom元素的id
                                $('#ImgPreview').append('<div class="image-container layui-col-md2" id="container'+index+'"><div class="delete-css"><button type="button" id="upload_img_'+index+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button></div>' +
                                    '<img id="showImg'+index+'" style="width: 150px; margin:10px;cursor:pointer;"src="' + result + '" alt="' + file.name + '"></div>');



                                //删除某图片
                                $("#upload_img_" + index).bind('click', function () {
                                    delete files[index];
                                    $("#container"+index).remove();
                                });

                                //某图片放大预览
                                $("#showImg"+index).bind('click',function () {
                                    var width = $("#showImg"+index).width();
                                    var height = $("#showImg"+index).height();
                                    var scaleWH = width/height;
                                    var bigH = 600;
                                    var bigW = scaleWH*bigH;
                                    if(bigW>900){
                                        bigW = 900;
                                        bigH = bigW/scaleWH;
                                    }

                                    // 放大预览图片
                                    layer.open({
                                        type: 1,
                                        title: false,
                                        closeBtn: 1,
                                        shadeClose: true,
                                        area: [bigW + 'px', bigH + 'px'], //宽高
                                        content: "<img width='"+bigW+"' height='"+bigH+"' src=" + result + " />"
                                    });
                                });

                        });
                    }
                    ,allDone: function(obj){
                        //当所有文件被提交之后，开始提交表单
                        var eventCarNo = $("#eventCarNo").val().trim(); //车牌
                        var eventCarNoColor = $("#eventCarnocolor").val().trim(); //车牌颜色
                        var eventCarNoType = $("#eventCarnotype").val().trim(); //车牌类型
                        var eventCarColor = $("#eventCarcolor").val().trim(); //车辆颜色
                        var eventCarType = $("#eventCartype").val().trim(); //车辆类型
                        var eventRoad=$("#eventRoad").val().trim(); //违法地点
                        var eventCarDir=$("#eventCarDir").val().trim(); //方向
                        var eventRunKm=$("#eventRunKm").val().trim(); //公里桩
                        var carEvent=$("#carEvent").val().trim();  //行为
                        var eventTime = $("#eventTime").val().trim() ; //时间
                        var eventDescription=$("#eventDescription").val().trim();  //隐患描述
                        var filestr = $("#fileUrl").val();
                            $.ajax({
                            url:'${re.contextPath}/report/submitReportRecord',
                            type:'post',
                            data : {
                                "eventCarNo":eventCarNo,
                                "eventCarNoColor":eventCarNoColor,
                                "eventCarNoType":eventCarNoType,
                                "eventCarColor":eventCarColor,
                                "eventCarType":eventCarType,
                                "eventRoad" : eventRoad ,//违法地点
                                "eventCarDir": eventCarDir,//方向
                                "eventRunKm" : eventRunKm, //KM公里桩
                                "carEvent": carEvent, //行为
                                "eventTime":eventTime,
                                "eventDescription":eventDescription, //描述
                                "filestr": filestr,  //文件名称

                        },
                            async:false, traditional: true,
                            success:function(){
                             console.log("success");
                            },error:function(){
                            layer.alert("请求失败", {icon: 6},function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                            });
                            }
                            });
                         // 将隐藏的文件路径清空
                        $("#fileUrl").attr("value","");
                        console.log(obj.total); //得到总文件数
                        console.log(obj.successful); //请求成功的文件数
                        console.log(obj.aborted); //请求失败的文件数
                        layer.msg("举报成功",{icon:6});
                    }
                    ,done: function(res, index, upload){ //每个文件提交一次触发一次。详见“请求成功的回调”
                       //文件路径拼接
                        var fileurl = "";
                        var getfileUrlByInput = $("#fileUrl").val();
                        if(getfileUrlByInput==""){
                         fileurl = res.filepath;
                        }else{
                            fileurl = getfileUrlByInput + "," + res.filepath ;
                        }
                        //然后见文件路径赋值给input
                        $("#fileUrl").attr("value",fileurl);
                        console.log(res);
                        console.log(index);
                        console.log("123412");
                    }
                    ,error: function(){
                        //请求异常回调
                    }
                });
            });

    layui.use('form', function(){
                var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
                //但是，如果你的HTML是动态生成的，自动渲染就会失效
                //因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();
        form.on('submit(formDemo)', function(data){
            console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
               form.render();
            });







        });




</script>
</body>
</html>