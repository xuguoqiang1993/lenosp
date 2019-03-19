/**
 * 
 * @auth 徐国强
 * @time 2018/5/24
 * @param
 * 选中全部复选框
 */
function checkAll(who, obj){
	var curCheckBox = document.getElementsByName(who);
	
	for(i = 0; i < curCheckBox.length; i++){
		curCheckBox.item(i).checked = obj.checked;
	}
}

/**
 * 提交访问请求
 * @param url
 * @param sTarget
 * @returns {Boolean}
 */
function formSubmit (url,sTarget){
	
    document.forms[0].target = sTarget ;  //表示新跳转的页面在当前窗口打开
    document.forms[0].action = url;      //发起请求 delete
    document.forms[0].submit();
    return true;
}

$(document).ready(function () {

    $('#dataTables-example').dataTable();
	//绑定添加用户事件
	$("#addDevice").click(function () {
		$.ajax({
		type: "GET",
		url: BASE_URL_device+"/services/charge/findDeviceNameAll",
		dataType: "json",
	   success: function (data) {
		  $("#parent_name_options").empty();
		 $("#parent_name_options").append("<option value =''>请选择/没有上级部门</option>");
		for (var i = 0; i < data.length; i++) {
		$("#parent_name_options").append("<option value =' "+data[i].deviceId+"'>" + data[i].name + "</option>");
	}
	}
	});

    $('#myModal').modal();
});
	//绑定修改用户事件
	var checked = [];
	$("#deviceDevice").click(

		function(){
			
			//首先获取userId
              checked = [];
			$('input:checkbox:checked').each(function() {
	            checked.push(($(this).val()+"").trim());
	        });
			
			//alert(checked[0]);
			
	         if(checked.length==1){
	        	 //填充上级部门的信息

	     		$.ajax({
	     		type: "GET",
	     		url: BASE_URL_device+"/services/charge/findDeviceNameAll",
	     		dataType: "json",
	     	   success: function (data) {
	     		  
	     		 $("#parent_name_options").empty();
	     		for (var i = 0; i < data.length; i++) {
	     			//alert(132412)
	     		if(data[i].deviceId == checked[0]){
	     			//alert(12341235);
	     			$("#parent_name_option_a").append("<option value =' "+data[i].parentId+"' selected='selected'>" + data[i].parentName + "</option>");
	     		}else{
	     			$("#parent_name_option_a").append("<option value =' "+data[i].parentId+"'>" + data[i].parentName + "</option>");
	     		}
	     	}
	     	}
	     	});

	    
	        	 $.ajax({
	                 type: "GET",
	                url: BASE_URL_device+"/setting/deviceManager/findDeviceByDeviceId?deviceId="+checked[0],
	                dataType: "json",
	                success: function (data) {
	                //alert(1234);
	               $("#device_deviceId").attr("value",data.deviceId);
	               $("#device_name").attr("value",data.name);
	               $("#device_parentId").attr("value",data.parentId);
	               $("#device_parentName").attr("value",data.parentName);
	               
	               $("#device_remark").attr("value",data.remark);
	               if(data.state=="1"){
	            	   $("#device_state1").attr("checked",true);  
	               }else{
	            	   $("#device_state0").attr("checked",true);
	               }
	            
	             }
	           });
	        
	        	 $('#deviceModal').modal();
	         }else if(checked.length==0){
	        	 alert("请选择一个复选框");
	         }else{
	        	 alert("请不要选择多个复选框");
	         }
			
			 //使用异步请求，向服务器 请求用户数据
			 
			
           
		}	
	);
	
//绑定新增保存事件

    $("#btn_submit_add").click(function() {
    	
        var name = ($("#add_name").val()+"").trim();
        var options =  $("#parent_name_options option:selected");
        var parentId = (options.val()+"").trim();
        var parentName = (options.text()+"").trim();
        if(parentId ==""){
          parentName = "";	
        }
        
        var remark = ($("#add_remark").val()+"").trim();
       
        var device = {
            name : name,
            parentId : parentId ,
            parentName : parentName,
            remark :remark,
           
        };//拼装成json格式
        $.ajax({
            type : "POST",
            url : BASE_URL_device+"/setting/deviceManager/save",
            data : device,
            success : function(data) {
                alert("成功");
            },
            error : function(e) {
                alert("出错：" + e);
            }
        });
    });




});  

//绑定修改之后的时间
function device_save(){
    var deviceId  = ($("#device_deviceId").val()+"").trim();
    var name = ($("#device_name").val()+"").trim();
    var options =  $("#parent_name_option_a option:selected");
    var parentId = (options.val()+"").trim();
    var parentName =( options.text()+"").trim();
    var remark =( $("#device_remark").val()+"").trim();
    var state =( $("input[name='device_state']:checked").val()+"").trim(); 
    //alert(state);
   
    var device = {
    	deviceId :deviceId,
        name : name,
        parentId : parentId ,
        parentName : parentName,
        remark :remark,
        state :state 
    };//拼装成json格式
    
    $.ajax({
        type : "POST",
        url : BASE_URL_device+"/setting/deviceManager/update",
        data : device,
        success : function(data) {
            alert("成功");
        },
        error : function(e) {
            alert("出错：" + e);
        }
    });

	
}

function device_upload(){
	$('#deviceUploadModal').modal();
}




function upPolicy() {
	//alert("解析成功")
}


function test(){
	alert("js能够成功调用");
	
}

function sweetalert(){
	swal({
        title: "操作提示",      //弹出框的title
        text: "确定删除吗？",   //弹出框里面的提示文本
        type: "warning",        //弹出框类型
        showCancelButton: true, //是否显示取消按钮
        confirmButtonColor: "#DD6B55",//确定按钮颜色
        cancelButtonText: "取消",//取消按钮文本
        confirmButtonText: "是的，确定删除！",//确定按钮上面的文档
        closeOnConfirm: true
    }, function () {});
}