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
				url:BASE_URL+"/review/event/getHiddenEventByRecordId?recordId="+checked[0],
				dataType:"json",
				success:function(data){
					
						$('#eventRoad').attr("value",data.eventRoad);
						$('#eventCarDir').attr("value",data.eventCarDir);
						$('#eventRunKm').attr("value",data.eventRunKm);
						$('#eventRunM').attr("value",data.eventRunM);
						$('#carEvent').attr("value",data.carEvent);
						document.getElementById("eventDescription").value=data.eventDescription;
						document.getElementById("eventSuggest").value = data.eventSuggest;
						$('#moveProcess').modal();
					
				}
			});
	
		}else if(checked.length==0){
			swal("提示","请选择一个复选框","info")
		}else{
			swal("提示","请不要选中多个复选框","info")
		}
	});
	//点击打回原来指派单位
	$("#save_moveProcess").click(function (){
		var desc= $("#rejectDescription").val().trim();
		if(desc==""||desc==null){
			swal({title:"打回理由不能为空",text:"点击ok关闭或者3s之后自动关闭",type:"warning",timer:3000});
			return false;
		}
		
		sweetChoice("您确定要打回？","将隐患打回给指派单位","是的,打回",moveDept);

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
	        	 window.location.href=BASE_URL+"/review/event/ownerAll?recordId="+checked[0];  
	         }else if(checked.length==0){
	        	swal("提示","请选择一个复选框","info")
	         }else{
	        	swal("提示","请不要选择多个复选框","info")
	         }
			
		}	
	);
	
}); 

//异步将隐患移交给其他部门
function moveDept(){
	$.ajax({
		type:"POST",
		url:BASE_URL+"/review/event/updateHiddenEventRecordownerState",
		data:{"recordId":$('input:checkbox:checked').val(),"rejectDescription":$("#rejectDescription").val().trim()},
		success:function(data){
		       if(data.msg=="成功"){
		    	  swal('打回指派单位成功!','该隐患事件已经打回,页面跳转中....','success'); 
		    	  // 跳转到页面
		    	  setTimeout('window.location = BASE_URL+"/review/event/findAllHiddenEventByUserId"',3000);
		       }else{
		    	   swal('失败!',data.msg,'error');  
		       }
		    
		}
	});
}





