/*------------------------------------------------------
    Author : www.webthemez.com
    License: Commons Attribution 3.0
    http://creativecommons.org/licenses/by/3.0/
---------------------------------------------------------  */

(function ($) {
    "use strict";
    var mainApp = {

        initFunction: function () {
            

        	//初始化加载左侧菜单
        	$.ajax(
        	{
        	type:"POST",
        	url:BASE_URL+"/setting/moduleManager/toLeft",
        	data:{},
        	success:function(data){
        		
        	 console.log(data.map1);  //父级菜单存在
        	 console.log(data.map);   //自己菜单
        	 var str = "";
        	 for(var name in data.map1){
        		 var getmapfather = data.map1[name];
        		 var getmapson = data.map[name];

        		 //判断一下getmapson 是否 存在
//        		 console.log(getmapson);
        		 if(getmapson!=undefined){
        			 console.log("1234123");
            		 str += '<li> <a  href="" onclick="linkHighlighted(this)" target="main" id="aa_1"><i class="'+getmapfather.icourl+'"></i>'+getmapfather.name+'<span class="fa arrow"></span></a>'

        			 str += '<ul class="nav nav-second-level">';
        		 }else{
        			 console.log("1234567");
            		 str += '<li> <a  href="'+BASE_URL+getmapfather.url+'" onclick="linkHighlighted(this)" target="main" id="aa_1"><i class="'+getmapfather.icourl+'"></i>'+getmapfather.name+'</a>'

        		 }
        		 for(var getson in getmapson){
//        			 console.log(getson);
       			 console.log(getmapson[getson]);
//        			 console.log(getmapson[getson].name);
        			 console.log(123);
        			 str += '<li><a href="'+BASE_URL+getmapson[getson].url+'" onclick="linkHighlighted(this)" target="main" id="aa_2">'+getmapson[getson].name+'</a></li>'
        		 }
        		 if(getmapson!=null){
        			 str += '</ul>';
        		 }
        		 str+="</li>";
        		 
        		 
        		
        		 
        	 }	
        	 
        	 $("#main-menu").append(str);
    		 console.log(str);
    		 $('#main-menu').metisMenu();
    		 console.log("chushihua ");
        	}
        	}		
        	);
        	
        	 
        	
        
        	
           
          

        },

        initialization: function () {
            mainApp.initFunction();

        }

    }
    // Initializing ///

    $(document).ready(function () {
    	console.log("start");
        mainApp.initFunction();
    });

}(jQuery));




function resumeLinkHighlighted(){
	var linka=document.getElementsByTagName('A');
	for(var i=0;i<linka.length;i++){
		if(linka[i].id.indexOf('aa_')!=-1){
			linka[i].style.color = '#000066';
		}
	}
 }