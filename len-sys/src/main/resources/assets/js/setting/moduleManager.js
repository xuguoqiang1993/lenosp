

/**
 * 提交访问请求
 * @param url
 * @param sTarget
 * @returns {Boolean}
 */
function formSubmit (url,sTarget){
	
	//判断一下是否已经有了选择框
    var moduleIds = formCheckBoxString("moduleId");
    
    if(moduleIds==null||moduleIds == ""){
    	swal("提示","请选择一个复选框","warning");
    	return false;
    }
	//判断是什么类型，展示什么类型的提示框
	if(url == "delete"){
		sweetChoice("操作提示","确定删除选择的模块,一旦删除，数据将无法恢复","是的，确定删除",function(){
			  
			   $.ajax({
				   type:"POST",
				   data:{moduleId:moduleIds},
				   url:BASE_URL+"/setting/moduleManager/delete"
			   });
			   swal("删除成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/moduleManager/findAll"',delayTime);
		})
		
	}else if(url == "start"){

		sweetChoice("操作提示","确定启用选择的模块","是的，确定启用",function(){
			   $.ajax({
				   type:"POST",
				   data:{moduleId:moduleIds},
				   url:BASE_URL+"/setting/moduleManager/start"
			   });
			   swal("启用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/moduleManager/findAll"',delayTime);
		})
		
	
	}else if(url == "stop"){
		sweetChoice("操作提示","确定停用选择的模块?","是的，确定停用",function(){
			   $.ajax({
				   type:"POST",
				   data:{moduleId:moduleIds},
				   url:BASE_URL+"/setting/moduleManager/stop"
			   });
			   swal("停用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/moduleManager/findAll"',delayTime);
		})
		
	}
   
}

$(document).ready(function () {

	 $('#dataTables-example').dataTable({
	    	"bPaginate": false, //翻页功能
	    	"bLengthChange": false, //改变每页显示数据数量
	    	"bFilter": true, //过滤功能
	    	"bSort": false, //排序功能
	    	"bInfo": true,//页脚信息
	    	"bAutoWidth": true,//自动宽度
	    	 "language": {
			       "sZeroRecords": "没有匹配记录",
			       "sInfo": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
			       "sInfoEmpty": "显示第 0 至 0 条记录，共 0 条",
			       "sInfoFiltered": "(由 _MAX_ 条记录过滤)",
			       "sInfoPostFix": "",
			       "sSearch": "搜索:",
			       "sUrl": "",
			       "sEmptyTable": "表中数据为空",
			       "sLoadingRecords": "载入中...",
			       "sInfoThousands": ","
			
	    	 }
	    });
	//绑定添加用户事件
	$("#addModule").click(function (){
    //上级模块信息填充
   
		$.ajax({
		type: "GET",
		url: BASE_URL+"/setting/moduleManager/findAllModule",
		dataType: "json",
	   success: function (data) {
		 //  alert(134123);
		  $("#module_moduleName_add_option").empty();
		 $("#module_moduleName_add_option").append("<option value =''>请选择/没有上级模块</option>");
		for (var i = 0; i < data.length; i++) {
		$("#module_moduleName_add_option").append("<option value =' "+data[i].moduleId+"'>" + data[i].name + "</option>");
	}
	}
	});

    $('#myModal').modal();
});
	//绑定修改用户事件
	var checked = [];
	var modfiymoduleId = "";
	$("#modfiyModule").click(

		function(){
			
			//首先获取moduleId
              checked = [];
			$('input:checkbox:checked').each(function() {
	            checked.push(($(this).val()+"").trim());
	        });
			
			//alert(checked[0]);
			
	         if(checked.length==1){

	        	 //加载部门信息
              $.ajax({
	                 type: "GET",
		                url: BASE_URL+"/setting/moduleManager/findModuleByModuleId?moduleId="+checked[0],
		                dataType: "json",
		                success: function (data) {
		                	modfiymoduleId = data.parentId;
		                	//alert(modfiymoduleId);
		                }
		           });

	     		
	     		$.ajax({
	     		type: "GET",
	     		url: BASE_URL+"/setting/moduleManager/findAllModule",
	     		dataType: "json",
	     	   success: function (data) {
	     		 
	     		 $("#module_moduleName_modfiy_option").empty();
	     		if(modfiymoduleId == null||modfiymoduleId ==""){
	     			//alert("1134");
	     			$("#module_moduleName_modfiy_option").append("<option value ='' selected='selected'>请选择/没有父模块</option>"); 
	     		 }else{
	     			$("#module_moduleName_modfiy_option").append("<option value ='' >请选择/没有父模块</option>"); 
	     		 }
	     		//alert("模块id："+checked[0]);
	     		//alert("模块父id："+modfiymoduleId);
	     		for (var i = 0; i < data.length; i++) {
	     		  //alert("所有部门id遍历"+data[i].moduleId);
	     		  if( (modfiymoduleId+"").trim() == (data[i].moduleId+"").trim()){

	     			 $("#module_moduleName_modfiy_option").append("<option selected='selected' value =' "+data[i].moduleId+"' >" + data[i].name + "</option>");
	     		 }else{
	     			 $("#module_moduleName_modfiy_option").append("<option value =' "+data[i].moduleId+"'>" + data[i].name + "</option>"); 
	     		 }
	     		
	     		//$("#issued_sub_key_b").append("<option value =' "+data[i].moduleId+"'>" + data[i].name + "</option>");
	     	}
	     	}
	     	});

	        	//alert(123);
	        	 $.ajax({
	                 type: "GET",
	                url: BASE_URL+"/setting/moduleManager/findModuleByModuleId?moduleId="+checked[0],
	                dataType: "json",
	                success: function (data) {
	               // alert(1234);
	               $("#modfiy_moduleId").attr("value",data.moduleId);
	               $("#modfiy_name").attr("value",data.name);
	               $("#modfiy_ctype").attr("value",data.ctype);
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
	        	 alert("提示","请不要选择多个复选框","info");
	         }
			
			 //使用异步请求，向服务器 请求用户数据
			 
			
           
		}	
	);
	
//绑定新增保存事件

    $("#btn_submit_add").click(function() {

    	
        var name = ($("#add_name").val()+"").trim();
        var options =  $("#module_moduleName_add_option option:selected");
        var parentId = (options.val()+"").trim();
        var remark = ($("#add_remark").val()+"").trim();
       
        var module = {
            name : name,
            parentId : parentId ,
            remark :remark,
           
        };//拼装成json格式
        $.ajax({
            type : "POST",
            url : BASE_URL+"/setting/moduleManager/save",
            data : module,
            success : function(data) {
            	  swal("成功","添加模块信息成功,页面跳转中。。。","success");
     	    	 setTimeout('window.location=BASE_URL+"/setting/moduleManager/findAll"',delayTime);
            },
            error : function(e) {
                alert("出错：" + e);
            }
        });
    
    });
});  

//绑定修改之后事件
function modfiy_save(){
    var moduleId  = ($("#modfiy_moduleId").val()+"").trim();
    var name = ($("#modfiy_name").val()+"").trim();
    var options =  $("#module_moduleName_modfiy_option option:selected");
    var parentId = (options.val()+"").trim();
    var remark = ($("#modfiy_remark").val()+"").trim();
    var state = ($("input[name='modfiy_state']:checked").val()+"").trim(); 
    //alert(state);
   
    var module = {
    	moduleId :moduleId,
        name : name,
        parentId:parentId,
        remark :remark,
        state :state 
    };//拼装成json格式
    
    $.ajax({
        type : "POST",
        url : BASE_URL+"/setting/moduleManager/update",
        data : module,
        success : function(data) {
            swal("成功","修改模块信息成功,页面跳转中。。。","success");
	    	 setTimeout('window.location=BASE_URL+"/setting/moduleManager/findAll"',delayTime);

        },
        error : function(e) {
            alert("出错：" + e);
        }
    });

	
}
