var filePath = [];
jQuery(function() {
	
    var $ = jQuery,    // just in case. Make sure it's not an other libaray.

        $wrap = $('#uploader'),

        // 图片容器
        $queue = $('<ul class="filelist"></ul>')
            .appendTo( $wrap.find('.queueList') ),

        // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find('.statusBar'),

        // 文件总体选择信息。
        $info = $statusBar.find('.info'),

        // 上传按钮
        $upload = $('.uploadBtn'),

        // 没选择文件之前的内容。
        $placeHolder = $wrap.find('.placeholder'),

        // 总体进度条
        $progress = $statusBar.find('.progress').hide(),

        // 添加的文件数量
        fileCount = 0,

        // 添加的文件总大小
        fileSize = 0,

        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 110 * ratio,
        thumbnailHeight = 110 * ratio,

        // 可能有pedding, ready, uploading, confirm, done.
        state = 'pedding',

        // 所有文件的进度信息，key为file id
        percentages = {},

        supportTransition = (function(){
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                      'WebkitTransition' in s ||
                      'MozTransition' in s ||
                      'msTransition' in s ||
                      'OTransition' in s;
            s = null;
            return r;
        })(),

        // WebUploader实例
        uploader;

    if ( !WebUploader.Uploader.support() ) {
        alert( 'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error( 'WebUploader does not support the browser you are using.' );
    }

    // 实例化
    uploader = WebUploader.create({
    	
        pick: {
            id: '#filePicker',
            label: '点击选择图片'
        },
        dnd: '#uploader .queueList',
        paste: document.body,
        formData: { 
        	eventCarNo :"123"
         },
     // 图片上传功能
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png',
            mimeTypes: 'image/*'
        },

        // swf文件路径
        swf: BASE_URL_SWF + '/js/Uploader.swf',
     // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: true,

        chunked: true,
        // server: 'http://webuploader.duapp.com/server/fileupload.php',
        server: BASE_URL+'/report/uploadFilesEventByMass',
        fileNumLimit: 300,
        fileSizeLimit: 50 * 1024 * 1024,    // 50 M
        fileSingleSizeLimit: 5 * 1024 * 1024    // 5 M
    });

    // 添加“添加文件”的按钮，
    uploader.addButton({
        id: '#filePicker2',
        label: '继续添加'
    });

    // 当有文件添加进来时执行，负责view的创建
    function addFile( file ) {
        var $li = $( '<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '</li>' ),

            $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                '<span class="rotateRight">向右旋转</span>' +
                '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
            $prgress = $li.find('p.progress span'),
            $wrap = $li.find( 'p.imgWrap' ),
            $info = $('<p class="error"></p>'),

            showError = function( code ) {
                switch( code ) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;

                    case 'interrupt':
                        text = '上传暂停';
                        break;

                    default:
                        text = '上传失败，请重试';
                        break;
                }

                $info.text( text ).appendTo( $li );
            };

        if ( file.getStatus() === 'invalid' ) {
            showError( file.statusText );
        } else {
            // @todo lazyload
            $wrap.text( '预览中' );
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $wrap.text( '不能预览' );
                    return;
                }

                var img = $('<img src="'+src+'">');
                $wrap.empty().append( img );
            }, thumbnailWidth, thumbnailHeight );

            percentages[ file.id ] = [ file.size, 0 ];
            file.rotation = 0;
        }

        file.on('statuschange', function( cur, prev ) {
            if ( prev === 'progress' ) {
                $prgress.hide().width(0);
            } else if ( prev === 'queued' ) {
                $li.off( 'mouseenter mouseleave' );
                $btns.remove();
            }

            // 成功
            if ( cur === 'error' || cur === 'invalid' ) {
                console.log( file.statusText );
                showError( file.statusText );
                percentages[ file.id ][ 1 ] = 1;
            } else if ( cur === 'interrupt' ) {
                showError( 'interrupt' );
            } else if ( cur === 'queued' ) {
                percentages[ file.id ][ 1 ] = 0;
            } else if ( cur === 'progress' ) {
                $info.remove();
                $prgress.css('display', 'block');
            } else if ( cur === 'complete' ) {
                $li.append( '<span class="success"></span>' );
            }

            $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
        });

        $li.on( 'mouseenter', function() {
            $btns.stop().animate({height: 30});
        });

        $li.on( 'mouseleave', function() {
            $btns.stop().animate({height: 0});
        });

        $btns.on( 'click', 'span', function() {
            var index = $(this).index(),
                deg;

            switch ( index ) {
                case 0:
                    uploader.removeFile( file );
                    return;

                case 1:
                    file.rotation += 90;
                    break;

                case 2:
                    file.rotation -= 90;
                    break;
            }

            if ( supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                // use jquery animate to rotation
                // $({
                //     rotation: rotation
                // }).animate({
                //     rotation: file.rotation
                // }, {
                //     easing: 'linear',
                //     step: function( now ) {
                //         now = now * Math.PI / 180;

                //         var cos = Math.cos( now ),
                //             sin = Math.sin( now );

                //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                //     }
                // });
            }


        });

        $li.appendTo( $queue );
    }

    // 负责view的销毁
    function removeFile( file ) {
        var $li = $('#'+file.id);

        delete percentages[ file.id ];
        updateTotalProgress();
        $li.off().find('.file-panel').off().end().remove();
    }

    function updateTotalProgress() {
        var loaded = 0,
            total = 0,
            spans = $progress.children(),
            percent;

        $.each( percentages, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );

        percent = total ? loaded / total : 0;

        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        updateStatus();
    }

    function updateStatus() {
        var text = '', stats;

        if ( state === 'ready' ) {
            text = '选中' + fileCount + '张图片，共' +
                    WebUploader.formatSize( fileSize ) + '。';
        } else if ( state === 'confirm' ) {
            stats = uploader.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                    stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
            }

        } else {
            stats = uploader.getStats();
            text = '共' + fileCount + '张（' +
                    WebUploader.formatSize( fileSize )  +
                    '），已上传' + stats.successNum + '张';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }

        $info.html( text );
    }

    function setState( val ) {
        var file, stats;

        if ( val === state ) {
            return;
        }

        $upload.removeClass( 'state-' + state );
        $upload.addClass( 'state-' + val );
        state = val;

        switch ( state ) {
            case 'pedding':
                $placeHolder.removeClass( 'element-invisible' );
                $queue.parent().removeClass('filled');
                $queue.hide();
                $statusBar.addClass( 'element-invisible' );
                uploader.refresh();
                break;

            case 'ready':
                $placeHolder.addClass( 'element-invisible' );
                $( '#filePicker2' ).removeClass( 'element-invisible');
                $queue.parent().addClass('filled');
                $queue.show();
                $statusBar.removeClass('element-invisible');
                uploader.refresh();
                break;

            case 'uploading':
                $( '#filePicker2' ).addClass( 'element-invisible' );
                $progress.show();
                $upload.text( '暂停上传' );
                break;

            case 'paused':
                $progress.show();
                $upload.text( '继续上传' );
                break;

            case 'confirm':
                $progress.hide();
                $upload.text( '提交完毕，如果需要再次提交请刷新' );
               //.addClass( 'disabled' )
                stats = uploader.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    setState( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = uploader.getStats();
                if ( stats.successNum ) {
                	//alert(filePath.join(","));
                	uploadMessage(filePath.join(","));
                    //alert( '上传成功' );
                } else {
                    // 没有成功的图片，重设
                    state = 'done';
                    location.reload();
                }
                break;
        }

        updateStatus();
    }

    uploader.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentages[ file.id ][ 1 ] = percentage;
        updateTotalProgress();
    };

    uploader.onFileQueued = function( file ) {
        fileCount++;
        fileSize += file.size;

        if ( fileCount === 1 ) {
            $placeHolder.addClass( 'element-invisible' );
            $statusBar.show();
        }

        addFile( file );
        setState( 'ready' );
        updateTotalProgress();
    };

    uploader.onFileDequeued = function( file ) {
        fileCount--;
        fileSize -= file.size;

        if ( !fileCount ) {
            setState( 'pedding' );
        }

        removeFile( file );
        updateTotalProgress();

    };

    uploader.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setState( 'confirm' );
                break;

            case 'startUpload':
                setState( 'uploading' );
                break;

            case 'stopUpload':
                setState( 'paused' );
                break;

        }
    });

    uploader.onError = function( code ) {
        alert( 'Eroor: ' + code );
    };

    $upload.on('click', function() {
      judgeMessage();

  //alert("judgeMessage");
   var eventCarNo = $("#eventCarNo").val().trim(); //车牌
  	 var eventCarNoColor = $("#eventCarnocolor").val().trim(); //车牌颜色
  	 var eventCarNoType = $("#eventCarnotype").val().trim(); //车牌类型
  	 var eventCarColor = $("#eventCarcolor").val().trim(); //车辆颜色
  	 var eventCarType = $("#eventCartype").val().trim(); //车辆类型
  	 var eventRoad=$("#eventRoad").val().trim(); //违法地点
  	 var eventCarDir=$("#eventCarDir").val().trim(); //方向
  	 var eventRunKm=$("#eventRunKm").val().trim(); //KM公里桩
  	 var eventRunM=$("#eventRunM").val().trim();  //M公里桩
  	 var carEvent=$("#carEvent").val().trim();  //行为
  	 var eventTime = $("#eventTime").val().trim() ; //时间
  	 var eventDescription=$("#eventDescription").val().trim();  //隐患描述
  	 //console.log("eventCarNo"+eventCarNo);
  	if(field_IsEmpty(eventCarNo)){
  		//console.log("123412341242134123");
  	 swal("提示","请填写车辆号牌","info");
  	 return false;
   }
  	if(field_IsEmpty(eventCarNoColor) || eventCarNoColor=="请选择"){
  	 swal("提示","请选择车牌颜色","info");
  	 return;
   }
  	if(field_IsEmpty(eventCarNoType) || eventCarNoType=="请选择"){
  	 swal("提示","请选择车牌种类","info");
  	 return;
   }
  	if(field_IsEmpty(eventCarColor) || eventCarColor=="请选择"){
  	 swal("提示","请选择车辆颜色","info");
  	 return;
   }
  	if(field_IsEmpty(eventCarType) || eventCarType=="请选择"){
  	 swal("提示","请选择车辆种类","info");
  	 return;
   }
  	
  if(field_IsEmpty(eventRoad) || eventRoad=="请选择"){
  	 swal("提示","请选择违法所在道路","info");
  	 return;
   }
  if(field_IsEmpty(eventRunKm) ){
  	 swal("提示","请填写公里桩（KM）","info");
  	 return;
   }
  if(field_IsEmpty(eventRunM) ){
  	 swal("提示","请填写公里桩(M)","info");
  	 return;
   }

  if(field_IsEmpty(carEvent) || carEvent=="请选择"){
  	 swal("提示","请选择违法类型","info");
  	 return;
   }
  if(field_IsEmpty(eventTime) ){
  	 swal("提示","请填写违法发生时间","info");
  	 return;
   }
  if(field_IsEmpty(eventDescription) ){
  	 swal("提示","请填写违法描述","info");
  	 return;
   }

//      console.log("14132412111");
//      alert("13412342");
    //判断有没有选择图片
 	 var files=uploader.getFiles();
 	// alert(files);
 	var imgSrc = []; 
	      $("#shotBar img").each(function() {  
	        imgSrc.push($(this).attr("src"));  
	      });
 	 if(files.length==0&&imgSrc==0){
 		 console.log("141324");
 	    swal("提示","视频截图和直接上传图片二选一","info");
 		return ;
 	 }
 	 if(files.length==0){
 		uploadMessage("");
 		 return;
 	 }
   
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }

        if ( state === 'ready' ) {
            uploader.upload();
        } else if ( state === 'paused' ) {
            uploader.upload();
        } else if ( state === 'uploading' ) {
            uploader.stop();
        }
    });

    $info.on( 'click', '.retry', function() {
        uploader.retry();
    } );

    $info.on( 'click', '.ignore', function() {
        alert( 'todo' );
    } );
    
    uploader.on( 'uploadBeforeSend', function( object, data,header) {
 
        // 修改data可以控制发送哪些携带数据。
     var eventCarNo=$("#eventCarNo").val().trim(); //
   	 data.eventCarNo = eventCarNo ;
   	 
      });

    uploader.on('uploadSuccess',function(object,ret){
    	//alert("filePath:"+ret.filePath)
    	filePath.push(ret.filePath);
    } );

    $upload.addClass( 'state-' + state );
    updateTotalProgress();
    
    function uploadMessage(sfiles){
    	alert("提交数据")
    	//获取需要上传的信息
    	 var eventCarNo = $("#eventCarNo").val().trim(); //车牌
      	 var eventCarNoColor = $("#eventCarnocolor").val().trim(); //车牌颜色
      	 var eventCarNoType = $("#eventCarnotype").val().trim(); //车牌类型
      	 var eventCarColor = $("#eventCarcolor").val().trim(); //车辆颜色
      	 var eventCarType = $("#eventCartype").val().trim(); //车辆类型 
    	
      	 var eventRoad=$("#eventRoad").val().trim(); //违法地点
      	 var eventCarDir=$("#eventCarDir").val().trim(); //方向
      	 var eventRunKm=$("#eventRunKm").val().trim(); //KM公里桩
      	 var eventRunM=$("#eventRunM").val().trim();  //M公里桩
      	 var carEvent=$("#carEvent").val().trim();  //行为
      	 var eventTime = $("#eventTime").val().trim() ; //时间
      	 var eventDescription=$("#eventDescription").val().trim();  //隐患描述
      	var imgSrc = []; 
   	      $("#shotBar img").each(function() {  
   	        imgSrc.push($(this).attr("src"));  
   	      });
   	   
   	    var img = imgSrc.join(",")
      	 var filestr = sfiles;
    	
    	 //发送保存
    	 $.ajax({
    			type : "POST",
    			url : BASE_URL+"/report/event/insertReportAgainstLawByMassRecord",
    			data : {
    			 "userId":BASE_USERID,
    			 "userBill" : BASE_USERNAME,  //电话
    			 "username" : BASE_NICKNAME,  //昵称
    			 "userDept": BASE_DEPTNAME,   //部门
    			 
    			 "eventCarNo":eventCarNo,
     			"eventCarNoColor":eventCarNoColor,
     			"eventCarNoType":eventCarNoType,
     			"eventCarColor":eventCarColor,
     			"eventCarType":eventCarType,
     			 "eventRoad" : eventRoad ,//违法地点
     			 "eventCarDir": eventCarDir,//方向
     			 "eventRunKm" : eventRunKm, //KM公里桩
     			 "eventRunM": eventRunM ,//M公里桩
     			 "carEvent": carEvent, //行为
     			 "eventTime":eventTime,
     			 "eventDescription":eventDescription, //描述
     			 "filestr": filestr,  //文件名称
     			 "img" : img //截屏图片
    			},
    			dataType : "json",
    			success : function(json) {
    				 if(!field_IsEmpty(json)){
    					 if(json.upload=="1"){
   				    	  swal('提交成功!','违法事件已经提交成功,页面跳转中....','success'); 
				    	  // 跳转到页面
				    	 // setTimeout('window.location = BASE_URL+"/review/event/findAllHiddenEventByUserId"',3000);
				       
					   }
    					 else if(json.upload=="2"){
    						 alert("提交失败");
    					 }
    					 return;
    				 }
    			}
    		});
    };
    
   

  
    
    
});
function field_IsEmpty(field)
{
   if(field==null || $.trim(field)=="")
	   return true;
   else
	   return false;
}

function judgeMessage(){}
