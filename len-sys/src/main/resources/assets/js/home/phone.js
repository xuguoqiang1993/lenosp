 function sendCode(messageModel){ 
	    var username = $("#username")
        var phone = $("#username").val().trim();  
        
        if(phone && phone.length == 11){  
            alert("sendM");
    		$.ajax({
    		type: "GET",
    		url: BASE_URL_message+"/permission/sendMessageToTelephone?phone="+phone+"&messageModel="+ messageModel,
    	    dataType: "json",
    	   success: function (data) {
                 if(data.flag=="1"){
                	alert("短信发送成功"); 
                 }else if(data.flag=="0"){
                	 alert("短信发送失败");
                 }else if(data.flag=="3"){
                	 alert("一分钟只能接受一条验证码，请稍后重试");
                 }else if(data.flag=="4"){
                	 alert("一小时只能接受5条验证码，请稍后重试");
                 }else if(data.flag=="5"){
                	 alert("一天只能接受10条验证码，请明天重试");
                 }else {
                	 alert("短信发送异常");
                 }  
    	    }
    	   });
 
            // 1分钟内禁止点击  
            for (var i = 1; i <= 80; i++) {  
                // 1秒后显示  
                window.setTimeout("updateTime(" + (80 - i) + ")", i * 1000);  
            }  
        }else{  
            alert("请输入正确的手机号码");  
            username.focus();  
              
        }  
    }  
      
    function updateTime(i){  
     
        var obj = document.getElementById("validationCode");  
        if(i > 0){  
            obj.innerHTML  =   i + "秒后再次获取";  
            obj.disabled = true;  
        }else{  
            obj.innerHTML = "获取验证码";  
            obj.disabled = false;  
        }  
    }  
      
  
      
    function doValidation(){  
        if(validateFormValidateor.form()){  
            $("#validateForm").ajaxSubmit({  
                success:function(data){  
                    if(data == "success") {  
                        alert("验证成功");  
                    }else{  
                        alert("验证失败");  
                    }  
                }  
             });  
        }  
    }  
      
  