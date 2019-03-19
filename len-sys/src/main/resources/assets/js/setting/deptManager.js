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
	
	//判断一下是否已经有了选择框
    var deptIds = formCheckBoxString("deptId");
    //alert(userIds);
    if(deptIds==null||deptIds == ""){
    	swal("提示","请选择一个复选框","warning");
    	return false;
    }
	//判断是什么类型，展示什么类型的提示框
	if(url == "delete"){
		sweetChoice("操作提示","确定删除选择的部门,一旦删除，数据将无法恢复","是的，确定删除",function(){
			  
			   $.ajax({
				   type:"POST",
				   data:{deptId:deptIds},
				   url:BASE_URL+"/setting/deptManager/delete"
			   });
			   swal("删除成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/deptManager/findAll"',delayTime);
		})
		
	}else if(url == "start"){

		sweetChoice("操作提示","确定启用选择的部门","是的，确定启用",function(){
			   $.ajax({
				   type:"POST",
				   data:{deptId:deptIds},
				   url:BASE_URL+"/setting/deptManager/start"
			   });
			   swal("启用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/deptManager/findAll"',delayTime);
		})
		
	
	}else if(url == "stop"){
		sweetChoice("操作提示","确定停用选择的部门?","是的，确定停用",function(){
			   $.ajax({
				   type:"POST",
				   data:{deptId:deptIds},
				   url:BASE_URL+"/setting/deptManager/stop"
			   });
			   swal("停用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/deptManager/findAll"',delayTime);
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
	$("#addDept").click(function () {
		//alert()
		$.ajax({
		type: "GET",
		url: BASE_URL+"/services/charge/findDeptNameAll",
		dataType: "json",
	   success: function (data) {
		  // alert(data);
		 $("#parent_name_options").empty();
		 $("#parent_name_options").append("<option value =''>请选择/没有上级部门</option>");
		for (var i = 0; i < data.length; i++) {
			//console.log(data[i]);
		$("#parent_name_options").append("<option value =' "+data[i].deptId+"'>" + data[i].deptName + "</option>");
	}
	}
	});

    $('#myModal').modal();
});
	
	//绑定新增保存事件

    $("#btn_submit_add").click(function() {
    	
        var deptName = ($("#add_name").val()+"").trim();
        var options =  $("#parent_name_options option:selected");
        var parentId = (options.val()+"").trim();
        var telephone = ($("#add_telephone").val()+"").trim();
        var remark = ($("#add_remark").val()+"").trim();
        var dept = {
            deptName : deptName,
            parentId : parentId ,
            remark :remark,
            telephone:telephone
           
        };//拼装成json格式
        $.ajax({
            type : "POST",
            url : BASE_URL+"/setting/deptManager/save",
            data : dept,
            success : function(data) {
                swal("成功","添加部门信息成功,页面跳转中。。。","success");
                setTimeout('window.location=BASE_URL+"/setting/deptManager/findAll"',delayTime);
            },
            error : function(e) {
                swal("出错",  e ,"warning");
            }
        });
    });
	
	//绑定修改用户事件
	var checked = [];
	$("#modfiyDept").click(

		function(){
			
			var checked = formCheckBoxArray("deptId");
	
	         if(checked.length==1){
	          var getParentId = "";
              
	     	

	    
	        	 $.ajax({
	                 type: "GET",
	                url: BASE_URL+"/setting/deptManager/findDeptByDeptId?deptId="+checked[0],
	                dataType: "json",
	                success: function (data) {
	                //alert(1234);
	               $("#modfiy_deptId").attr("value",data.deptId);
	               $("#modfiy_name").attr("value",data.deptName);
	               $("#modfiy_parentId").attr("value",data.parentId);
	               getParentId = data.parentId ;
	               $("#modfiy_parentName").attr("value",data.parentName);
	               $("#modfiy_telephone").attr("value",data.telephone);
	               $("#modfiy_remark").attr("value",data.remark);
	               if(data.state=="1"){
	            	   $("#modfiy_state1").attr("checked",true);  
	               }else{
	            	   $("#modfiy_state0").attr("checked",true);
	               }
	            
	             }
	           });
	        	 
	        		$.ajax({
	    	     		type: "GET",
	    	     		url: BASE_URL+"/services/charge/findDeptNameAll",
	    	     		dataType: "json",
	    	     	    success: function (data) {
	    	     		  
	    	     		 $("#parent_name_option_a").empty();
	    	     		 
	    	     		if(getParentId == null||getParentId ==""){
	    	     			
	    	     			$("#parent_name_option_a").append("<option value ='' selected='selected'>请选择/没有所属部门</option>"); 
	    	     		 }else{
	    	     			$("#parent_name_option_a").append("<option value ='' >请选择/没有所属部门</option>"); 
	    	     		 }
	    	     		 
	    	     		for (var i = 0; i < data.length; i++) {
	    	     			console.log(data[i]);
	    	     			
	    	     		if(data[i].deptId == getParentId ){
	    	     			//选中的deptId == 所有中的deptId
	    	     			
	    	     			$("#parent_name_option_a").append("<option value =' "+data[i].deptId+"' selected='selected'>" + data[i].deptName + "</option>");
	    	     		
	    	     		}else{
	    	     			//没有选中的所有信息
	    	     			$("#parent_name_option_a").append("<option value =' "+data[i].deptId+"'>" + data[i].deptName + "</option>");
	    	     		}
	    	     	}
	    	     	}
	    	     	});
	        
	        	 $('#modfiyModal').modal();
	         }else if(checked.length==0){
	        	 swal('提示','请选择一个多选框',"info");
	         }else{
	        	 swal("提示","请不要选择多个复选框","info");
	         }
			
			 //使用异步请求，向服务器 请求用户数据
			 
			
           
		}	
	);
	





});  

//绑定修改之后的时间
function modfiy_save(){
    var deptId  = ($("#modfiy_deptId").val()+"").trim();
    var deptName = ($("#modfiy_name").val()+"").trim();
    var options =  $("#parent_name_option_a option:selected");
    var parentId = (options.val()+"").trim();
    var telephone = ($("#modfiy_telephone").val()+"").trim();
    var remark =( $("#modfiy_remark").val()+"").trim();
    var state =( $("input[name='modfiy_state']:checked").val()+"").trim(); 
    //alert(state);
   
    var dept = {
    	deptId :deptId,
    	deptName : deptName,
        parentId : parentId ,
        telephone :telephone,
        remark :remark,
        state :state 
    };//拼装成json格式
    
    $.ajax({
        type : "POST",
        url : BASE_URL+"/setting/deptManager/update",
        data : dept,
        success : function(data) {
        	swal("成功","修改部门信息成功,页面跳转中。。。","success");
        	 setTimeout('window.location=BASE_URL+"/setting/deptManager/findAll"',delayTime);
        },
        error : function(e) {
            swal("出错", e ,"warning");
        }
    });

	
}
