
function formSubmit (url,sTarget){
	
	//判断一下是否已经有了选择框
    var userIds = formCheckBoxString("userId");
    //alert(userIds);
    if(userIds==null||userIds == ""){
    	swal("提示","请选择一个复选框","warning");
    	return false;
    }
	//判断是什么类型，展示什么类型的提示框
	if(url == "delete"){
		sweetChoice("操作提示","确定删除选择的用户,一旦删除，数据将无法恢复","是的，确定删除",function(){
			  
			   $.ajax({
				   type:"POST",
				   data:{userId:userIds},
				   url:BASE_URL+"/setting/userManager/delete"
			   });
			   swal("删除成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/userManager/findAll"',delayTime);
		})
		
	}else if(url == "start"){

		sweetChoice("操作提示","确定启用选择的用户","是的，确定启用",function(){
			   $.ajax({
				   type:"POST",
				   data:{userId:userIds},
				   url:BASE_URL+"/setting/userManager/start"
			   });
			   swal("启用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/userManager/findAll"',delayTime);
		})
		
	
	}else if(url == "stop"){
		sweetChoice("操作提示","确定停用选择的用户,停用的用户将无法登陆系统","是的，确定停用",function(){
			   $.ajax({
				   type:"POST",
				   data:{userId:userIds},
				   url:BASE_URL+"/setting/userManager/stop"
			   });
			   swal("停用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/userManager/findAll"',delayTime);
		})
		
	}
   
}





$(document).ready(function () {
    //汉化表格
	
	chinaDataTable();
	//绑定添加用户事件,填充所有部门名称
	$("#addUser").click(function () {

		
		$.ajax({
		type: "GET",
		url: BASE_URL+"/services/charge/findDeptNameAll",
		dataType: "json",
	   success: function (data) {
		 $("#user_deptName_add_option").empty();
		 $("#user_deptName_add_option").append("<option value =''>请选择/没有所属部门</option>"); 
		for (var i = 0; i < data.length; i++) {
			
		$("#user_deptName_add_option").append("<option value =' "+data[i].deptId+"'>" + data[i].deptName + "</option>");
	}
	}
	});

    $('#myModal').modal();
});
	
	//绑定新增保存事件

    $("#btn_submit_add").click(function() {
        var username = ($("#add_username").val().trim()+"").trim();
        var nickname = ($("#add_nickname").val()+"").trim();
        var options =  $("#user_deptName_add_option option:selected");
        var deptId =  (options.val()+"").trim();
        if(deptId == ''){
           deptId == null;
        }
        var remark = ($("#add_remark").val()+"").trim();
       
        var user = {
            username : username,
            nickname : nickname,
            deptId : deptId ,
            remark :remark
        };//拼装成json格式
        $.ajax({
            type : "POST",
            url : BASE_URL+"/setting/userManager/save",
            data : user,
            success : function(data) {
                swal("添加用户成功","页面跳转中。。。。","success");
               
                setTimeout('window.location = BASE_URL+"/setting/userManager/findAll"',delayTime);
               // window.location = BASE_URL+"/setting/userManager/findAll";
            },
            error : function(e) {
                alert("出错：" + e);
            }
        });
    });
	
	
	
	
	
	
	//绑定修改用户事件
	 modfiyDeptId = null;
	
	 $("#modfiyUser").click(
     
		function(){
		
			var checked = formCheckBoxArray("userId");
			
	         if(checked.length==1){
	        	 //加载部门信息
              
	        	 $.ajax({
	                    type: "GET",
		                url: BASE_URL+"/setting/userManager/findUserByUserId?userId="+checked[0],
		                dataType: "json",
		                success: function (data) {
		                	modfiyDeptId = data.deptId;
		                	//alert("modfiyDeptId"+modfiyDeptId);
		                }
		           });

	     		
	     		$.ajax({
	     		type: "GET",
	     		url: BASE_URL+"/services/charge/findDeptNameAll",
	     		dataType: "json",
	     	   success: function (data) {
	     		 
	     		 $("#user_deptName_modfiy_option").empty();
	     		if(modfiyDeptId == null||modfiyDeptId ==""){
	     			
	     			$("#user_deptName_modfiy_option").append("<option value ='' selected='selected'>请选择/没有所属部门</option>"); 
	     		 }else{
	     			$("#user_deptName_modfiy_option").append("<option value ='' >请选择/没有所属部门</option>"); 
	     		 }
	     		
	     		for (var i = 0; i < data.length; i++) {
	     			 //alert("所有部门id遍历"+data[i].deptId);
	     			 //alert("modfiyId"+modfiyDeptId);
	     			 //console.log(data[i].deptId);
	     			 //console.log(modfiyDeptId)
	     	
	     		  if( modfiyDeptId == data[i].deptId){
                       //alert("true")
	     			 $("#user_deptName_modfiy_option").append("<option selected='selected' value =' "+data[i].deptId+"' >" + data[i].deptName + "</option>");
	     		 }else{
	     			
	     			 $("#user_deptName_modfiy_option").append("<option value =' "+data[i].deptId+"'>" + data[i].deptName + "</option>"); 
	     		 }
	     		
	     	}
	     	}
	     	});

	        	 $.ajax({
	                 type: "GET",
	                url: BASE_URL+"/setting/userManager/findUserByUserId?userId="+checked[0],
	                dataType: "json",
	                success: function (data) {
	               // alert(1234);
	               $("#modfiy_userId").attr("value",data.userId);
	               $("#modfiy_username").attr("value",data.username);
	               $("#modfiy_nickname").attr("value",data.nickname);
	               $("#modfiy_deptName").attr("value",data.deptName);
	               $("#modfiy_remark").attr("value",data.remark);
	               if(data.state=="1"){
	            	   $("#modfiy_state1").attr("checked",true);  
	               }else{
	            	   $("#modfiy_state0").attr("checked",true);
	               }
	            
	             }
	           });
	        
	        	 $('#modfiyModal').modal();
	         }else if(checked.length==0){
	        	 swal("提示","请选择一个复选框","info");
	         }else{
	        	 swal("提示","请不要选择多个复选框","info");
	         }
			
			 //使用异步请求，向服务器 请求用户数据
			 
			
           
		}	
	);
	





});  


//绑定修改之后的事件
function modfiy_save(){
    var userId  = ($("#modfiy_userId").val()+"").trim();
    var username =( $("#modfiy_username").val()+"").trim();
    var nickname = ($("#modfiy_nickname").val()+"").trim();
    var options =  $("#user_deptName_modfiy_option option:selected");
    var deptId = (options.val()+"").trim();
    var remark = ($("#modfiy_remark").val()+"").trim();
    var state = ($("input[name='modfiy_state']:checked").val()+"").trim(); 
   
    //alert(state);
   
    var user = {
    		userId :userId,
    		username : username,
    		nickname:nickname,
    		deptId : deptId ,
            remark :remark,
            state :state 
    };//拼装成json格式
    
    $.ajax({
        type : "POST",
        url : BASE_URL+"/setting/userManager/update",
        data : user,
        success : function(data) {
            swal("修改成功","页面跳转中","success");
            setTimeout('window.location=BASE_URL+"/setting/userManager/findAll"',delayTime);
        },
        error : function(e) {
            swal("报错", e ,"warning");
        }
    });

	
}



