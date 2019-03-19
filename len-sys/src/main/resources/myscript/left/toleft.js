$(document).ready(function(){
    	//初始化加载左侧菜单
    	$.ajax(
    	{
    	type:"POST",
    	url:BASE_URL+"/setting/moduleManager/toLeft",
    	data:{},
    	success:function(data){
    		
//    	 console.log(data.map1);
//    	 console.log(data.map);
    	 var str = "";
    	 for(var name in data.map1){
    		 console.log(data.map1[name]);
//    		 console.log(name);
//    		 console.log(data.map[name]);
    		 
    		 var getmapson = data.map[name];

    		 //判断一下getmapson 是否 存在
//    		 console.log(getmapson);
    		 if(getmapson!=undefined){
    			 console.log("1234123");
        		 str += '<li> <a  href="" onclick="linkHighlighted(this)" target="main" id="aa_1"><i class="fa fa-dashboard"></i>'+data.map1[name]+'<span class="fa arrow"></span></a>'

    			 str += '<ul class="nav nav-second-level">';
    		 }else{
    			 console.log("1234567");
        		 str += '<li> <a  href="'+BASE_URL+'/home/Main" onclick="linkHighlighted(this)" target="main" id="aa_1"><i class="fa fa-dashboard"></i>'+data.map1[name]+'</a>'

    		 }
    		 for(var getson in getmapson){
//    			 console.log(getson);
//    			 console.log(getmapson[getson]);
//    			 console.log(getmapson[getson].name);
    			 console.log(123);
    			 str += '<li><a href="${ctx}/report/event/toEventReportByTraffic" onclick="linkHighlighted(this)" target="main" id="aa_2">'+getmapson[getson].name+'</a></li>'
    		 }
    		 if(getmapson!=null){
    			 str += '</ul>';
    		 }
    		 str+="</li>";
    		 
    		 
    		
    		 
    	 }	
    	 
    	 $("#main-menu").append(str);
		 console.log(str);
    		
    	}
    	}		
    	);
    	
    	 
    	
    });