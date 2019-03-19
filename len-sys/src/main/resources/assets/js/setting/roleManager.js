/**
 * 
 * @auth 徐国强
 * @time 2018/5/24
 * @param
 * 选中全部复选框
 */
function checkAll(who, obj){
	var curCheckBox = document.getElementsByName(who);
	
	for(var i = 0; i < curCheckBox.length; i++){
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
    var roleIds = formCheckBoxString("roleId");
    //alert(userIds);
    if(roleIds==null||roleIds == ""){
    	swal("提示","请选择一个复选框","warning");
    	return false;
    }
	//判断是什么类型，展示什么类型的提示框
	if(url == "delete"){
		sweetChoice("操作提示","确定删除选择的角色,一旦删除，数据将无法恢复","是的，确定删除",function(){
			  
			   $.ajax({
				   type:"POST",
				   data:{roleId:roleIds},
				   url:BASE_URL+"/setting/roleManager/delete"
			   });
			   swal("删除成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/roleManager/findAll"',delayTime);
		})
		
	}else if(url == "start"){

		sweetChoice("操作提示","确定启用选择的角色","是的，确定启用",function(){
			   $.ajax({
				   type:"POST",
				   data:{roleId:roleIds},
				   url:BASE_URL+"/setting/roleManager/start"
			   });
			   swal("启用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/roleManager/findAll"',delayTime);
		})
		
	
	}else if(url == "stop"){
		sweetChoice("操作提示","确定停用选择的角色？","是的，确定停用",function(){
			   $.ajax({
				   type:"POST",
				   data:{roleId:roleIds},
				   url:BASE_URL+"/setting/roleManager/stop"
			   });
			   swal("停用成功","页面跳转中。。。","success");
	    	   setTimeout('window.location=BASE_URL+"/setting/roleManager/findAll"',delayTime);
		})
		
	}
   

	
}

$(document).ready(function () {

    //汉化表格
	
	chinaDataTable();
	//绑定添加用户事件
	$("#addRole").click(function (){

    $('#myModal').modal();
});
	
	//绑定新增保存事件

    $("#btn_submit_add").click(function() {
    	
        var roleName = ($("#add_name").val()+"").trim();
        var remark = ($("#add_remark").val()+"").trim();
       
        var role = {
            roleName : roleName,
            remark :remark,
           
        };//拼装成json格式
        $.ajax({
            type : "POST",
            url : BASE_URL+"/setting/roleManager/save",
            data : role,
            success : function(data) {
                swal("成功","添加角色成功,页面跳转中。。。","success");
                setTimeout('window.location=BASE_URL+"/setting/roleManager/findAll"',delayTime);
            },
            error : function(e) {
                alert("出错：" + e);
            }
        });
    });
});  
	//绑定修改用户事件
	var checked = [];
	$("#modfiyRole").click(

		function(){
			
			//首先获取roleId
              checked = [];
			$('input:checkbox:checked').each(function() {
	            checked.push(($(this).val()+"").trim());
	        });
			
			//alert(checked[0]);
			
	         if(checked.length==1){
	       
	        	 $.ajax({
	                 type: "GET",
	                url: BASE_URL+"/setting/roleManager/findRoleByRoleId?roleId="+checked[0],
	                dataType: "json",
	                success: function (data) {
	                //alert(1234);
	               $("#modfiy_roleId").attr("value",data.roleId);
	               $("#modfiy_name").attr("value",data.roleName);
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
		}	
	);
	


//绑定修改之后的时间
function modfiy_save(){
    var roleId  =( $("#modfiy_roleId").val()+"").trim();
    var roleName = ($("#modfiy_name").val()+"").trim();
    var remark = ($("#modfiy_remark").val()+"").trim();
    var state =( $("input[name='modfiy_state']:checked").val()+"").trim(); 
   // alert(state);
   
    var role = {
    	roleId :roleId,
    	roleName : roleName,
        remark :remark,
        state :state 
    };//拼装成json格式
    
    $.ajax({
        type : "POST",
        url : BASE_URL+"/setting/roleManager/update",
        data : role,
        success : function(data) {
            alert("成功");
        },
        error : function(e) {
            alert("出错：" + e);
        }
    });

	
}
