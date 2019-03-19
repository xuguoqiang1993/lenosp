/**
 * Created by linkage on 2017/8/22.
 */

$(function($) {
    var element = document;
    InitContainerPanel()
    initLoadData();

    function initLoadData() {
        //向后台请求数据，获取己设置的时间。如果返回结果success:false说明没有设置过时间，如果返回结果，success:false，则把时间填上。
        /*
         parent.xblockPost({
         data: JSON.stringify({'q_number': qNo}),
         success: successLoading
         failure: handleFailure
         }, 'getTimeJson');
         */
        var data = {
            "startTime": "2017-08-09T08:23:43.000Z",
            "commitEndTime": "2017-08-09T08:23:46.000Z",
            "judgeStartTime": "2017-08-09T08:23:48.000Z",
            "judgeEndTime": "2017-08-09T08:23:50.000Z",
            "auditStartTime": "2017-08-09T08:23:52.000Z",
            "auditEndTime": "2017-08-09T08:23:54.000Z",
            "publishTime": "2017-08-09T08:23:56.000Z"
        };

        $('#time-detail').html($('#time-detail-template').html());
        fillTemplate($('#time-detail'), data);
    }

    function fillTemplate(template, qJson) {
        template.find('input#EventTime').val(qJson.startTime);
        template.find('input#CommitEndTime').val(qJson.commitEndTime);
        template.find('input#PeerAssessmentStartTime').val(qJson.judgeStartTime);
        template.find('input#PeerAssessmentEndTime').val(qJson.judgeEndTime);
        template.find('input#AuditStartTime').val(qJson.auditStartTime);
        template.find('input#AuditEndTime').val(qJson.auditEndTime);
        template.find('input#PublishTime').val(qJson.publishTime);

        // 重新设置相关的EventListener
        //initJsForPad();
    }

    $('input.span4.time-setting',element).click(function(eventObject){
       SelectDate(this,'yyyy-MM-dd hh:mm');
    });

});