
<link href="${re.contextPath}/assets/css/bootstrap.css" rel="stylesheet" />

<link href="${re.contextPath}/assets/css/font-awesome.css" rel="stylesheet" />


<link href="${re.contextPath}/assets/css/custom-styles.css" rel="stylesheet" />

<link href='https://fonts.googleapis.com/css?family=Open+Sans'
      rel='stylesheet' type='text/css' />

<link href="${re.contextPath}/assets/js/dataTables/dataTables.bootstrap.css"
      rel="stylesheet" />

<script src="${re.contextPath}/assets/js/jquery-3.1.1.min.js"></script>


<!-- jQuery Js -->
<script src="${re.contextPath}/assets/js/jquery-1.10.2.js"></script>
<!-- Bootstrap Js -->
<script src="${re.contextPath}/assets/js/bootstrap.min.js"></script>
<!-- Metis Menu Js -->
<script src="${re.contextPath}/assets/js/jquery.metisMenu.js"></script>
<!-- DATA TABLE SCRIPTS -->
<script src="${re.contextPath}/assets/js/dataTables/jquery.dataTables.js"></script>

<script src="${re.contextPath}/assets/js/dataTables/dataTables.bootstrap.js"></script>

<!-- Custom Js -->
<script src="${re.contextPath}/assets/js/custom-scripts.js"></script>

<script type="text/javascript">
    var BASE_URL = '${re.contextPath}';
    var BASE_URL_SWF = '${re.contextPath}/webuploader';




</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Courgette">

<link rel="stylesheet" href="http://www.jq22.com/jquery/font-awesome.4.6.0.css">

<script src="${ctx }/assets/sweetalert2/dist/sweetalert2.min.js"></script>
<link rel="stylesheet" href="${ctx }/assets/sweetalert2/dist/sweetalert2.min.css">
<script type="text/javascript">

    function sweetChoice(title,text,confirmText,successSwal){
        swal({
            title: title,
            text: text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmText,
            cancelButtonText: '取消'
        }).then(function(isConfirm) {
            if (isConfirm) {
                successSwal();
            }
        })
    };
    //统一设置页面跳转延迟时间
    var delayTime = 1800 ;

    /**
     *
     *
     * @time 2018/5/24
     * @param
     * 选中全部复选框
     */


    function checkAll(who, obj){
        var curCheckBox = document.getElementsByName(who);

        for(var i = 0; i < curCheckBox.length; i++){
            curCheckBox.item(i).checked = obj.checked;
        }
    }

    /**
     * 提交访问请求
     * @param url
     * @param sTarget
     * @returns {Boolean}
     */

    //获取选中的checkbox的值 string 类型
    function formCheckBoxString(name){
        var id_array=new Array();
        $('input[name="'+name+'"]:checked').each(function(){
            id_array.push($(this).val());//向数组中添加元素
        });
        var idstr=id_array.join(',');//将数组元素连接起来以构建一个字符串
        //alert(idstr);
        return idstr ;
    }
    // 获取选中的checkbox的值 数组类型
    function formCheckBoxArray(name){
        var id_array=new Array();
        $('input[name="'+name+'"]:checked').each(function(){
            id_array.push($(this).val());//向数组中添加元素
        });
        return id_array ;
    }

    //同意汉化dataGrid
    function chinaDataTable(){
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
    }
</script>








