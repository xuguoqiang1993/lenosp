
$(document).ready(function () {

	// 指派按钮的绑定
	$("#toOwner").click(function(){
		var ownerName = $("#ownerNameFrom").val().trim();
		if(ownerName == "请选择"||ownerName==null){
			swal({title:"请选择需要指派的业主",text:"点击ok关闭或者3s之后自动关闭",type:"warning",timer:3000});
			return false ;
		}
		sweetChoice("您确定要指派？","将隐患指派给   ("+$("#ownerNameFrom").val()+")  处理","是的,指派",toOwner);
	
	});
	
	
	// 再次处理的按钮的点击
	$("#againHandleButton").click(function(){
		
		var reviewDesc = $("#againHandle").val().trim();
		if(reviewDesc==""||reviewDesc==null){
			swal({title:"请输入再次处理的理由",text:"点击ok关闭或者2s之后自动关闭",type:"warning",timer:2000});
			return false;
	  }
		sweetChoice("您确定要求业主重新处理？","上次处理的结果将放置在流程详情中","是的,重新要求业主处理",againHandle);
		
	});
	
	//结束流程按钮绑定
	$("#endProcess").click(function(){
		sweetChoice("您确定要结束流程？","隐患流程一旦结束将无法再次指派","是的，结束流程", endProcess);
		
	});

});


//异步指派业主
function toOwner(){
	$.ajax({
		type:"POST",
		url:BASE_URL+"/review/event/toOwner",
	    data:{
	    	"recordId":$("#recordId").val(),
	    	"updateName":BASE_NICKNAME,
	    	"updateBill":BASE_USERNAME,
	    	"updateDept":BASE_DEPTNAME,
	    	"ownerName":$("#ownerNameFrom").val()
	        
	    },
	    success:function(data){
	    	
	    	if(data.msg=="成功"){
	    		swal("指派成功","该隐患已经指派给  ("+ $("#ownerNameFrom").val() +") 处理,页面跳转中... ",'success');
	    		// 跳转到页面
		    	 setTimeout('window.location = BASE_URL+"/review/event/findAllHiddenEventByDept"',3000);
	    	}else{
	    		swal('失败!',data.msg,'error');  
	    	}
	    }
	
	});

}

function againHandle(){
	$.ajax({
		type:"POST",
		url:BASE_URL+"/review/event/againHandle",
		data:{
			"recordId":$("#recordId").val(),
	    	"updateName":BASE_NICKNAME,
	    	"updateBill":BASE_USERNAME,
	    	"updateDept":BASE_DEPTNAME,
	    	"ownerRejectDescription":reviewDesc
		},
		success:function(data){

	    	if(data.msg=="成功"){
	    		swal("重新指派成功","该隐患已经指派给  ("+ $("#ownerNameFrom").val() +") 处理,页面跳转中... ",'success');
	    		// 跳转到页面
		    	 setTimeout('window.location = BASE_URL+"/review/event/findAllHiddenEventByDept"',3000);
	    	}else{
	    		swal('失败!',data.msg,'error');  
	    	}
	    
		}
		
		
	});
}
//异步提交结束流程
function endProcess(){
	 $.ajax({
			type:"POST",
			url:BASE_URL+"/review/event/endProcess",
			data:{
				"recordId":$("#recordId").val(),
		    	"updateName":BASE_NICKNAME,
		    	"updateBill":BASE_USERNAME,
		    	"updateDept":BASE_DEPTNAME,
		    	
			},
			success:function(data){
		       if(data.msg=="成功"){
		    	  swal('结束隐患成功!','该隐患流程已经结束,页面跳转中....','success'); 
		    	  // 跳转到页面
		    	  setTimeout('window.location = BASE_URL+"/review/event/findAllHiddenEventByDept"',3000);
		       }else{
		    	   swal('失败!',data.msg,'error');  
		       }
		    }
	  }); 
}





