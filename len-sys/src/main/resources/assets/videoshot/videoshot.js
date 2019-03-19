
var xuguoqiang = {};  
xuguoqiang.click2shot = (function ()  
{  
    var _ID_VIDEO = "video";  
    var _ID_SHOTBAR = "shotBar";  
    var _videoWidth = 0;  
    var _videoHeight = 0;  
    var _canvas = null;  
    var _ctx = null;  
    var _video = null;
    var flagClick = false ;
    
    function _init()  
    {  
    	 _canvas = document.createElement("canvas");  
    	    _ctx = _canvas.getContext("2d");  
    	    _video = document.getElementById(_ID_VIDEO);    
        
  
        _video.addEventListener("canplay", function ()  
        {  
            _canvas.width = _videoWidth = _video.videoWidth;  
            _canvas.height = _videoHeight = _video.videoHeight;  
            console.log(_videoWidth + " , " + _videoHeight);  
            _ctx.fillStyle = '#ffffff';  
            _ctx.fillRect(0, 0, _videoWidth, _videoWidth);
            if(flagClick==false){
            	
            	$("#" + _ID_SHOTBAR).click(_click2shot);  
            }
            flagClick = true ;
            _video.removeEventListener("canplay", arguments.callee);  
        });  
  
    }  
  
    function _click2shot(event)  
    {  
    	//alert("1234");
        _video.pause();  
        _ctx.drawImage(_video, 0, 0, _videoWidth, _videoHeight, 0, 0, _videoWidth, _videoHeight);  
        var dataUrl = _canvas.toDataURL("image/png");  
  
        //创建一个和video相同位置的图片  
        var $imgBig = $("<img/>");  
  
        $imgBig.width(_videoWidth).height(_videoHeight).css({position: "absolute", left: _video.offsetLeft, top: _video.offsetTop, width: _videoWidth + "px", height: _videoWidth + "px"}).attr("src", dataUrl);  
        
        $("body").append($imgBig);  
  
        //创建缩略图，准备加到shotBar  
        var $img = $("<img/>");  
        $img.attr("src", dataUrl); 
        //alert(dataUrl);
        //console.log(dataUrl);
        $(this).append($img);  
  
        var offset = _getOffset($img[0]);  
        $img.hide();  
        //添加动画效果  
        $imgBig.animate({left: offset.x + "px", top: offset.y + "px", width: $img.width() + "px", height: $img.height() + "px"}, 200, function ()  
        {  
            $img.attr("src", dataUrl).show();  
            $imgBig.remove();  
            _video.play();  
        });  
  
  
    }  
  
    /** 
     * 获取元素在显示区域的leftOffset和topOffset 
     * @param elem 
     * @returns {{x: (Number|number), y: (Number|number)}} 
     * @private 
     */
    
    function _getOffset(elem)  
    {  
        var pos = {x: elem.offsetLeft, y: elem.offsetTop};  
        var offsetParent = elem.offsetParent;  
        while (offsetParent)  
        {  
            pos.x += offsetParent.offsetLeft;  
            pos.y += offsetParent.offsetTop;  
            offsetParent = offsetParent.offsetParent;  
        }  
        return pos;  
    }  
  
  
    return {init: _init}  
  
})();  

var flagInit = false ; 
function Get_FileUploadLocalPath(obj) {
    	   //alert("flagInit"+flagInit);
    	   f = document.getElementById("fileUrl")
    	   document.getElementById('video').src = window.URL.createObjectURL(f.files[0]); 

    	    	 xuguoqiang.click2shot.init();	
    	  
    	   } 



function formAction1(){
	var eventCarNo = ($("#eventCarNo").val()+"").trim();
	var eventRoad = ($("#eventRoad").val()+"").trim();
	var eventCarDir = ($("#eventCarDir").val()+"").trim();
	var eventRunKm = ($("#eventRunKm").val()+"").trim();
	var eventRunM = ($("#eventRunM").val()+"").trim();
	var carEvent = ($("#carEvent").val()+"").trim();
	var eventTime = ($("#eventTime").val()+"").trim();
	var eventDescription = ($("#eventDescription").val()+"").trim();
//	if(eventCarNo=="null"||eventCarNo==""){
//		alert("车牌不能为空");
//		return ;
//	}
//	if(eventRoad=="null"||eventRoad==""){
//		alert("道路不能为空");
//		return ;
//	}
//	if(eventCarDir=="null"||eventCarDir==""){
//		alert("方向不能为空");
//		return ;
//	}
//	if(eventRunKm=="null"||eventRunKm==""){
//		alert("公里桩KM不能为空");
//		return ;
//	}
//	if(eventRunM=="null"||eventRunM==""){
//		alert("公里桩M不能为空");
//		return ;
//	}
//	if(carEvent=="null"||carEvent==""){
//		alert("违法事件不能为空");
//		return ;
//	}
//	if(eventTime=="null"||eventTime==""){
//		alert("违法时间不能为空");
//		return ;
//	}
//	if(eventDescription=="null"||eventDescription==""){
//		alert("违法描述不能为空");
//		return ;
//	}
	//var img = $("#shotBar img").attr("src");
	var imgSrc = [];  
	  
    $("#shotBar img").each(function() {  
        imgSrc.push($(this).attr("src"));  
    });
   
    var img = imgSrc.join(",")
	var data1 ={
//			eventCarNo:eventCarNo,
//			eventRoad:eventRoad,
//			eventCarDir:eventCarDir,
//			eventRunKm:eventRunKm,
//			eventRunM:eventRunM,
//	         carEvent:carEvent,
//	         eventTime:eventTime,
//	         eventDescription:eventDescription,
	         img:img
	} ;	
		

	$.ajax({
		type: "POST",
		url: BASE_URL_mass+"/report/event/fileUploadByMass",
		dataType: "json",
		data :data1 ,
		   success: function (data) {
			   
			   
		   }
		
	});
}
