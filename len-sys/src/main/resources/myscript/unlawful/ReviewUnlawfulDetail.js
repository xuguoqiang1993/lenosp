
$(document).ready(function () {

	// 指派按钮的绑定
	$("#reviewPass").click(function(){
		var reviewCarevent = $("#reviewCarevent").val().trim();
		var reviewDescription = $("#reviewDescription").val().trim();

		if(ownerName == "请选择"||ownerName==null){
			swal({title:"请选择您认为的违法类型",text:"点击ok关闭或者3s之后自动关闭",type:"warning",timer:3000});
			return false ;
		}
		
		if(reviewDescription==""||reviewDescription==null){
			swal({title:"请选择填写审核描述",text:"点击ok关闭或者3s之后自动关闭",type:"warning",timer:3000});
			return false ;
		}
		
		sweetChoice("违法审核通过","违法信息审核通过","是的,通过",reveiwPass);
	
	});
	
	


	
	//结束流程按钮绑定
	$("#endProcess").click(function(){
		sweetChoice("您确定要结束流程？","隐患流程一旦结束将无法再次指派","是的，结束流程", endProcess);
		
	});

});


//审核通过
function reveiwPass(){
	$.ajax({
		type:"POST",
		url:BASE_URL+"/unlawful/reveiwPass",
	    data:{
	    	"recordId":$("#recordId").val(),
	    	"updateName":BASE_NICKNAME,
	    	"updateBill":BASE_USERNAME,
	    	"updateDept":BASE_DEPTNAME,
	    	"reviewCarevent":$("#reviewCarevent").val(),
	    	"reviewDescription":$("#reviewDescription").val()
	        
	    },
	    success:function(data){
	    	
	    	if(data.msg=="success"){
	    		swal("审核通过成功","审核通过，页面跳转中",'success');
	    		// 跳转到页面
		    	 setTimeout('window.location = BASE_URL+"/unlawful/findUnlawfulByDeptAndReviewState?reviewState=未审核"',3000);
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





