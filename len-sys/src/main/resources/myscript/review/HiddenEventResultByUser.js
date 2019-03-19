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
	

	//点击查询流程详情
	var checked = [];
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
	        	 swal("提示","请选择一个复选框","info");
	         }else{
	        	 swal("提示","请不要选择多个复选框","info");
	         }
			 //使用异步请求，向服务器 请求用户数据
		}	
	);
});

