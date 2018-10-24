loan.appointmentorder = loan.appointmentorder || {

        /**
         * 清空查询条件
         */
        clearCondition : function () {
            $("#brand").val("");
            $("#store").val("");
            $("#state").val("");
        },
        /**
         * 搜索按钮
         */
        searchFunc : function () {
            var lineState = $("#state").val();
            var searchContent = $("#brand").val();
            var va ={};
            //va.date = new Date();
            //if(searchContent!=""){
                va.searchContent=searchContent;
            //}
            //if(lineState!=-1){
                va.lineState=lineState;
            //}

                $ ( "#appointmentorderinquiryGridId" ).jqGrid ( "setGridParam", {
                    postData : va,
                    page : 1,
                    cache:true
                } ).trigger ( 'reloadGrid' );
        },

        /**
         * 刷新 jqgrid
         */
        freshGrid : function () {
            $ ( "#appointmentorderinquiryGridId" ).jqGrid ( "setGridParam", {
                postData : { 'menuId' : '600901', 'format' : 'json' }
            } ).trigger ( 'reloadGrid' );
        },

        /**
         * 初始化选项
         */
        initSelect:function() {
            $("#store").html("");
            $("#state").html("");
            $("#store").prepend("<option value=''>乐到新能源杭州分公司</option>");
            $("#state").prepend("<option value=''>全部</option>");
            $("#state").prepend("<option value='0'>未上架</option>");
            $("#state").prepend("<option value='1'>已上架</option>");
            $("#state").prepend("<option value='2'>待补全</option>");

            var ids = jQuery("#appointmentorderinquiryGridId").jqGrid('getDataIDs');
            //单选按钮
            for (var j = 0; j < ids.length; j++) {
                var cl = ids[j];
                var ret = jQuery("#appointmentorderinquiryGridId").jqGrid('getRowData', cl);

                if(ret.lineState==0) {
                    jQuery("#appointmentorderinquiryGridId").jqGrid('setRowData', cl, {
                        lineState: "未上架",
                        guidancePrice:toDecimal(ret.guidancePrice),
                        updateTime: formatDateTime(ret.updateTime),
                        createTime: formatDateTime(ret.createTime),
                        act:"<a href='javascript:loan.appointmentorder.updateBtnFunc(\""+ret.hqWareId+"\")'>编辑</a>&nbsp;<a href='javascript:loan.appointmentorder.upBtnFunc(\""+ret.hqWareId+"\")'>上架</a>"
                    });
                } else if(ret.lineState==1) {
                    jQuery("#appointmentorderinquiryGridId").jqGrid('setRowData', cl, {
                        lineState: "已上架",
                        guidancePrice:toDecimal(ret.guidancePrice),
                        updateTime: formatDateTime(ret.updateTime),
                        createTime: formatDateTime(ret.createTime),
                        act:"<a href='javascript:loan.appointmentorder.downBtnFunc(\""+ret.hqWareId+"\")'>下架</a>"
                    });
                }
                else if(ret.lineState==2) {
                    jQuery("#appointmentorderinquiryGridId").jqGrid('setRowData', cl, {
                        lineState: "待补全",
                        guidancePrice:toDecimal(ret.guidancePrice),
                        updateTime: formatDateTime(ret.updateTime),
                        createTime: formatDateTime(ret.createTime),
                        act:"<a href='javascript:loan.appointmentorder.bqBtnFunc(\""+ret.hqWareId+"\")'>补全</a>"

                    });
                }
            }

            // loan.appointmentorder.queryAppointmentOrderById();
        },
        upBtnFunc : function ( shopId ) {//上架
            loan.ajaxDo({
                //url:loan.basePath+"/appointmentorderinquiry/queryAppointmentOrder",
                url:"hqwareonline",
                params:{'id':shopId,'format':'json'},
                successCallback:loan.appointmentorder.fitDetailField,
                errorCallback:function ( result ) {
                    console.log ("errorCallback:"+result);
                },
                successTip:false, //不提示
                bizErrTip:true,  //提示
                bizErrCallback:function ( result ) {
                    loan.tooltip ( result.errMsg || "通讯异常", "error" );
                },
                chainPar:this,
                isMask:false
            });
        },downBtnFunc : function ( shopId ) {//下架
            loan.ajaxDo({
               url:"hqwareoffline",
                params:{'id':shopId,'format':'json'},
                successCallback:loan.appointmentorder.fitDetailField,
                errorCallback:function ( result ) {
                    console.log ("errorCallback:"+result);
                },
                successTip:false, //不提示
                bizErrTip:true,  //提示
                bizErrCallback:function ( result ) {
                    loan.tooltip ( result.errMsg || "通讯异常", "error" );
                },
                chainPar:this,
                isMask:false
            });
        },bqBtnFunc : function ( shopId ) {//补全
            parent.loan.tabcut.childAddIframe ( "商品补全", "/toProductCompletion?id=" + shopId ,"productCompletion", true, true );

        },updateBtnFunc : function ( shopId ) {//编辑
            parent.loan.tabcut.childAddIframe ( "商品编辑", "/toProductEdit?id=" + shopId ,"productEdit", true, true );
        },


        detailBtnFunc : function ( menuId, rowid ) {
            $ ( "#rowid" ).val ( rowid );
            var hqWareObj = $ ( "#appointmentorderinquiryGridId" ).jqGrid ( 'getRowData', rowid );

            var hqWareId = hqWareObj.hqWareId;
            parent.loan.tabcut.childAddIframe ( "商品详情", "/toBq?menuId=" + menuId +"&hqWareId=" + hqWareId,"commodityLineDetail", true, true );
        },

        queryAppointmentOrderById : function() {
            var menuId = $("#menuId").val();
            //var appointmentOrderId = $("#appointmentOrderId").val();

            loan.ajaxDo({
                //url:loan.basePath+"/appointmentorderinquiry/queryAppointmentOrder",
                url:"http://mock.eolinker.com/rSPXcjwc577ced7c9c7e5ff5d4ce8e16d2cd2c527352857?uri=http://ip:port/mall/hqware/hqwarequery",
                params:{'menuId':menuId,'format':'json'},
                successCallback:loan.appointmentorder.fitDetailField,
                errorCallback:function ( result ) {
                    console.log ("errorCallback:"+result);
                },
                successTip:false, //不提示
                bizErrTip:true,  //提示
                bizErrCallback:function ( result ) {
                    loan.tooltip ( result.errMsg || "通讯异常", "error" );
                },
                chainPar:this,
                isMask:false
            });
        },

        /**
         * 初始化详情页面
         */
        fitDetailField : function ( result ) {
            console.log ( result );
            if(result.success=="true"){
                loan.tooltip("操作成功");
                jQuery("#appointmentorderinquiryGridId").trigger("reloadGrid");

            }

        },

        isEmpty: function(value) {
            return (value === null) || (value === undefined) || value === '' || ($.isArray(value) && value.length === 0);
        },

        setImgAttr: function( _$img, url ) {
            _$img .attr ( "ori", url );
            _$img .attr ( "down", loan.appointmentorder.buildDownloadSrc( url ) );
            _$img .attr ( "src", loan.appointmentorder.buildThumbnailSrc( url ) );
        },

        getImgName: function( url ) {
            var index = url.indexOf ( '?' );
            var url_front = index > 0 ? url.substring ( 0, index ) : url;
            var file_name = url_front.substring ( url_front.lastIndexOf ('/')+1 );
            return file_name;
        },

        buildThumbnailSrc: function(url) {
            var file_name = loan.appointmentorder.getImgName( url );
            var path = loan.basePath + "/appointmentorderinquiry/image/thumbnail/" + file_name;
            return path;
        },
        buildDownloadSrc: function(url) {
            var file_name = loan.appointmentorder.getImgName( url );
            var path = loan.basePath + "/appointmentorderinquiry/image/download/" + file_name;
            return path;
        }
    };
function formatDateTime(inputTime) {
    var date = new Date(inputTime*1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};

function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x*100)/100;
    return f;
}