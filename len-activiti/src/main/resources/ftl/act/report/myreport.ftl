<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dream</title>
    <#include "${re.contextPath}/base/main.ftl">
    <#include "${re.contextPath}/base/webupload.ftl">

    <!-- 插件导入 -->
    <style type="text/css">
        video
        {
            height: 720px;
            width: 100%;

        }
        #shotBar
        {
            height: 120px;
            width: 100%;
            background-color: #000;
            overflow: auto;
        }

        #shotBar img
        {
            border: 3px solid #fff;
            border-radius: 5px;
            height: 110px;
            width: 210px;
            margin-left: 4px;
        }
    </style>


    <!-- 时间选择js导入 -->
    <script src="${re.contextPath}/assets/timeSetting/js/src/timeSetting.js"></script>
    <script src="${re.contextPath}/assets/timeSetting/js/src/datePlugin.js"></script>


</head>
<body>
<div id="wrapper">
    <!-- /. NAV SIDE  -->
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="page-header">
                        道路违法事件举报 <small>请填写以下详细信息 ,所有信息为必填项</small>
                    </h1>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default" >

                        <div class="form-group input-group" style = "margin:30px 50px 20px 50px">
                            <span class="input-group-addon"><strong>违法车牌牌照:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <input type="text" class="form-control"
                                   placeholder="浙D99999（格式按照提示格式正确填写）" name="eventCarNo" id = "eventCarNo">

                        </div>

                        <div class="form-group input-group" style = "margin:20px 50px 20px 50px">
                            <span class="input-group-addon"><strong>违法车牌颜色:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <select class="form-control" name="eventCarnocolor" id="eventCarnocolor" ></select>
                            <span class="input-group-addon"><strong>违法车牌类型:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <select class="form-control" name="eventCarnotype" id="eventCarnotype" ></select>

                        </div>
                        <div class="form-group input-group" style = "margin:20px 50px 20px 50px">
                            <span class="input-group-addon"><strong>违法车辆颜色:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <select class="form-control" name="eventCarcolor" id="eventCarcolor" ></select>
                            <span class="input-group-addon"><strong>违法车辆类型:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <select class="form-control" name="eventCartype" id="eventCartype" ></select>


                        </div>



                        <div class="form-group input-group" style = "margin:20px 50px 20px 50px">

                            <span class="input-group-addon"><strong>道路名称:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <select class="form-control" name="eventRoad" id ="eventRoad"></select>

                            <span class="input-group-addon"><strong>方向:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <select class="form-control" name="eventCarDir" id = "eventCarDir"><option>上行</option>
                                <option>下行</option></select>
                        </div>


                        <div class="form-group input-group" style = "margin:20px 50px 20px 50px">
                            <span class="input-group-addon"><strong>公里桩:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <input type="text" class="form-control" name="eventRunKm" id = "eventRunKm">
                            <span class="input-group-addon"><strong>KM</strong></span> <input
                                    type="text" class="form-control" name="eventRunM" id = "eventRunM"> <span
                                    class="input-group-addon"><strong>M</strong></span>

                        </div>
                        <div class="form-group input-group" style = "margin:20px 50px 20px 50px">
                            <span class="input-group-addon"><strong>违法行为:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <select class="form-control" name="carEvent" id="carEvent" ></select>

                        </div>
                        <div class="form-group input-group" style = "margin:20px 50px 20px 50px">
                            <span class="input-group-addon"><strong>事件发生时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <input class="form-control span4 time-setting" type="text" id="eventTime">
                        </div>

                        <div class="form-group input-group" style = "margin:20px 50px 20px 50px">
                            <span class="input-group-addon"><strong>信息描述:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>

                            <textarea class="form-control" placeholder="请描述违法事件详细信息" name="eventDescription" id = "eventDescription"></textarea>
                        </div>

                        <div style = "margin:20px 50px 20px 50px"><p>提示：点击下方选择文件，选择视频文件，等待视频文件加载完毕，点击播放，播放到你认为的有效违法信息，点击视频下方的黑色方框，进行截图</p> </div>

                        <div style = "margin:20px 50px 20px 50px" class="form-group input-group">
                            <span class="input-group-addon"><strong>上传视频文件:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                            <input id="fileUrl" class="form-control" type="file" onchange="Get_FileUploadLocalPath(this)">
                        </div>

                        <div style = "margin:20px 50px 20px 50px">
                            <video src="" controls id="video"></video>

                        </div>
                        <div style = "margin:20px 50px 20px 50px">
                            <button id = "deleteImg" onclick = "deleteImg()" >重新截图</button>
                        </div>
                        <div style = "margin:20px 50px 20px 50px">
                            <div id="shotBar"> </div>
                        </div>
                        <div id="post-container" class="form-group" style = "margin:20px 50px 20px 50px">

                            <div class="page-container">
                                <div id="uploader" class="wu-example">
                                    <div class="queueList">
                                        <div id="dndArea" class="placeholder">
                                            <div id="filePicker" class="webuploader-container">
                                                <div class="webuploader-pick">点击选择文件</div>
                                                <div id="rt_rt_1cffvijbm14cqq7gulh1oljtqi1"
                                                     style="position: absolute; top: 0px; left: 448px; width: 168px; height: 44px; overflow: hidden; bottom: auto; right: auto;">
                                                    <input type="file" name="file"
                                                           class="webuploader-element-invisible" multiple="multiple"
                                                           accept="image/*"><label
                                                            style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                </div>
                                            </div>
                                            <p>或将文件拖到这里(所有文件最多200M，单个文件最多50M)</p>
                                        </div>
                                        <ul class="filelist"></ul>
                                    </div>
                                    <div class="statusBar" style="display: none;">
                                        <div class="progress" style="display: none;">
                                            <span class="text">0%</span> <span class="percentage"
                                                                               style="width: 0%;"></span>
                                        </div>
                                        <div class="info">共0张（0B），已上传0张</div>
                                        <div class="btns">
                                            <div id="filePicker2" class="webuploader-container">
                                                <div class="webuploader-pick">继续添加</div>
                                                <div id="rt_rt_1cffvijbpr6e18nq1ofk3dqc5f6"
                                                     style="position: absolute; top: 0px; left: 0px; width: 1px; height: 1px; overflow: hidden;">
                                                    <input type="file" name="file"
                                                           class="webuploader-element-invisible" multiple="multiple"
                                                           accept="image/*"><label
                                                            style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div style="text-align: center; height: 50px; line-height: 50px;margin:20px 50px 20px 50px;" >
                            <button class="btn btn-primary btn-lg uploadBtn"
                                    style="vertical-align: middle;" id = "uploadMessage" >确认信息正确后 上传</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <footer><p >2018 &copy; 绍兴高速交警支队.</p></footer>
    </div>

</div>


<!-- 截屏js引入 /newMaven/src/main/webapp/assets/videoshot-->
<script type="text/javascript" src="${re.contextPath}/assets/videoshot/jquery-1.8.3.js"></script>

<script type="text/javascript" src="${re.contextPath}/assets/videoshot/videoshot.js"></script>


<script type="text/javascript" src="${re.contextPath}/myscript/webuploader/eventReportByMass.js"></script>

<script type="text/javascript">

    function deleteImg(){
        // alert("zhejiang");
        $("#shotBar img").remove();

    }

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



                }
            });



        });

</script>

</body>

</html>
