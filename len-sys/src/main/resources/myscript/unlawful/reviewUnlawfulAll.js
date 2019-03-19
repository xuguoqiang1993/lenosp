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


$(document).ready(function () {
	

	$('#dataTables-example').dataTable({
		"paging": true,   //表格分页,默认是true
		   "language": {

		       "sProcessing": "处理中...",
		       "sLengthMenu": "每页显示 _MENU_ 条记录",
		       "sZeroRecords": "没有匹配记录",
		       "sInfo": "显示第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
		       "sInfoEmpty": "显示第 0 至 0 条记录，共 0 条",
		       "sInfoFiltered": "(由 _MAX_ 条记录过滤)",
		       "sInfoPostFix": "",
		       "sSearch": "搜索:",
		       "sUrl": "",
		       "sEmptyTable": "表中数据为空",
		       "sLoadingRecords": "载入中...",
		       "sInfoThousands": ",",
		       "oPaginate": {
		           "sFirst": "首页",
		           "sPrevious": "上页",
		           "sNext": "下页",
		           "sLast": "末页"
		       },
		       "oAria": {
		           "sSortAscending": ": 以升序排列此列",
		           "sSortDescending": ": 以降序排列此列"
		       }
		     
			   
		   },
		   "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 0 ] }],
		   "aaSorting": [[1, "asc"]]

		});
	
	//移交的弹出框
	$('#dispose').click(function (){
		
		//开始填充详细信息
		//首先获取recordId
        var checked = [];
		$('input:checkbox:checked').each(function() {
          checked.push(($(this).val()+"").trim());
      });
		
		if(checked.length==1){
			
			//只选中一个复选框的时候
			//开始想服务器请求审核的详细信息
			$.ajax({
				type:"GET",
				url:BASE_URL+"/unlawful/getUnlawfulByRecordId?recordId="+checked[0],
				dataType:"json",
				success:function(data){
					if(data.reviewState=="未审核"){
						$('#eventCarNo').attr("value",data.eventCarNo);
						$('#eventCarNoColor').attr("value",data.eventCarNoColor);
						$('#eventCarNoType').attr("value",data.eventCarNoType);
						$('#eventCarColor').attr("value",data.eventCarColor);
						$('#eventCarType').attr("value",data.eventCarType);
						
						$('#eventRoad').attr("value",data.eventRoad);
						$('#eventCarDir').attr("value",data.eventCarDir);
						$('#eventRunKm').attr("value",data.eventRunKm);
						$('#eventRunM').attr("value",data.eventRunM);
						$('#carEvent').attr("value",data.carEvent);
						document.getElementById("eventDescription").value=data.eventDescription;
						$('#moveProcess').modal();
					}else{
					//swal({title:"只有在审核状态为未审核的时候才能移交其他部门",text:"点击ok关闭或者2s之后自动关闭",type:"warning",timer:2000});
					swal("提示","只有在审核状态为未审核的时候才能移交其他部门","info");
					}
					
				}
			});
	
		}else if(checked.length==0){
			swal("提示","请选中一个复选框","info");
			
		}else{
			swal("提示","请不要选中多个复选框","info")
			
		}
		 
	});
	//点击移交部门
	$("#save_moveProcess").click(function (){
		var ju_dept = $("#ju_dept").val().trim();
		if(ju_dept=="请选择"||ju_dept==null){
			swal({title:"请选择移交的部门",text:"点击ok关闭或者3s之后自动关闭",type:"warning",timer:3000});
			return false ;
		}
		
		sweetChoice("您确定要移交？","将隐患移交给   ("+ju_dept+")  审核","是的,移交",save_moveProcess);

	});

	//点击查询流程详情
	$("#ProcessMessageInfo").click(
		function(){
			
		   //首先获取userId
              checked = [];
			$('input:checkbox:checked').each(function() {
	            checked.push(($(this).val()+"").trim());
	        });
		
	         if(checked.length==1){
	        	 window.location.href=BASE_URL+"/review/event/getProcessDetailByRecordId?recordId="+checked[0];  
	        	 
	         }else if(checked.length==0){
	        	 swal("提示","请选择一个复选框","info")
	        	
	         }else{
	        	 swal("提示","请不要选择多个复选框","info")
	        	
	         }
			 //使用异步请求，向服务器 请求用户数据
		}	
	);
	
	//开始总的审核
	
	$("#reviewAll").click(
		function(){
		//首先获取userId
              checked = [];
			$('input:checkbox:checked').each(function() {
	            checked.push(($(this).val()+"").trim());
	        });
			
	         if(checked.length==1){
	        	 window.location.href=BASE_URL+"/review/event/reviewAll?recordId="+checked[0];  
	         }else if(checked.length==0){
	        	 swal("提示","请选择一个复选框","info");
	         }else{
	        	 swal("提示","请不要选择多个复选框","info");
	         }
			 //使用异步请求，向服务器 请求用户数据
		}	
	);
	
	
	
	
}); 

//保存移交的部门
function save_moveProcess(){
	$.ajax({
		type:"POST",
		url:BASE_URL+"/review/event/updateHiddenEventRecordreviewState",
		data:{"recordId":$('input:checkbox:checked').val(),"jurisdictionDeptName":$("#ju_dept").val()},
		success:function(data){
			
		       if(data.msg=="成功"){
		    	  swal('移交成功!','该隐患已经成功移交给 '+$("#ju_dept").val()+' ,页面跳转中....','success'); 
		    	  // 跳转到页面
		    	  setTimeout('window.location = BASE_URL+"/review/event/findAllHiddenEventByDept"',3000);
		       }else{
		    	   swal('失败!',data.msg,'error');  
		       }
		    
		}
	});	
}


//select 切换
 function changeState(){
	 
	 var reviewState = $("#queryState option:selected").text().trim();
	 
		 window.location = BASE_URL + "/unlawful/findUnlawfulByReviewState?reviewState="+reviewState;
		 
	
 }




