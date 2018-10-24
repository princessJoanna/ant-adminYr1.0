loan.caroreder = loan.caroreder || {

    sureFn : function(menuId,rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#orderGridId").jqGrid('getRowData',rowid);
        if(rowData.orderStatus && rowData.orderStatus != 6){
            loan.tooltip("订单状态不符合","error");
            return;
        }
        if(rowData.operateType != 1){
            loan.tooltip("车辆用途为非运营","error");
            return;
        }
        var customerPhone = rowData.customerPhone;
        $.artDialog({
            title:'提示',
            content:"确认该用户是否国补里程达标，确认后将进入国补退款流程？",
            ok:function(){
                loan.ajaxDo({
                    url:loan.basePath+"/order/national?menuId=900103",
                    params:{'menuId':'900103','customerPhone':customerPhone},
                    successCallback:function () {
                        loan.tooltip("国补达标短信发送成功","succeed")
                    },
                    successTip:true
                });
            },
            cancel:function(){
                return false;
            }
        })
    },

    delOrderSureFn : function() {
        var refundAmt = document.getElementById("refundAmt").value;
        var remark = document.getElementById("remark").value;
        var orderId = document.getElementById("orderId").value;
        $.artDialog({
            title:'提示',
            content:"确定取消订单，并退款"+refundAmt+"元?",
            ok:function(){
                loan.ajaxDo({
                    url:loan.basePath+"/order/ordercancel?menuId=900102",
                    params:{'menuId':'900102','orderId':orderId,'refundAmt':refundAmt,'remark':remark},
                    successCallback:function () {
                        parent.$("#focus").focus();
                        parent.loan.caroreder.refreshFun();
                        loan.s_Pop_closedChild(false,false);
                    },
                    successTip:true
                });
            },
            cancel:function(){
                return false;
            }
        })
    },

    /**刷新当前页面*/
    refreshFun : function(){
        $("#orderGridId").jqGrid("setGridParam", {
            postData:{'format':'json'}
        }).trigger('reloadGrid');
    },

    delOrderFn : function(menuId,rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#orderGridId").jqGrid('getRowData',rowid);
        var status = rowData.orderStatus;
        if(status != 1 && status != 2 && status != 4 && status != 5){
            loan.tooltip("订单状态不符合","error");
            return;
        }
        var orderId = rowData.orderId;
        var salesManagerId = rowData.salesManagerId;
        var customerId = rowData.customerId;
        loan.s_addPop("取消订单",loan.basePath+"/order/todel?menuId=900103&orderId="+orderId+"&salesManagerId="+salesManagerId+"&customerId="+customerId,"",720,430,{isRefresh:false});
    },

    /**查看*/
    displayOrderFn : function(menuId,rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#orderGridId").jqGrid('getRowData',rowid);
        var orderId = rowData.orderId;
         var customerId = rowData.customerId;
         var salesManagerId=rowData.salesManagerId;
        parent.loan.tabcut.childAddIframe("查询订单",loan.basePath+"/order/toinfo?menuId=900101&orderId="+orderId+"&customerId="+customerId+"&salesManagerId="+salesManagerId,"",true, true);
    },
    /**删除成功翻页的处理*/
    delOrderSucFn : function(){
        var rows = $("#roleGridId").jqGrid('getRowData').length;
        var page = $("#roleGridId").jqGrid('getGridParam','page');
        if(rows < 2){
            if(page > 1){
                page = page -1;
            }
        }
        var orgId = $("#orgId").val();
        $("#roleGridId").jqGrid("setGridParam", {
            'postData':{'format':'json','orgId':orgId,'menuId':'9001'},
            'page':page
        }).trigger('reloadGrid');
        $("#rowid").attr("value","");
    },

	searchFn : function(){
        var orderStatus = $("#orderStatus").val();
        var startDateString = $("#startDate").val();
        var startDate = null;
        var endDateString = $("#endDate").val();
        var endDate = null;
        var searchContent = $("#searchContent").val();
        if(startDateString != null && startDateString != "" ) {
            startDate = Date.parse(loan.caroreder.formatDate(startDateString));
        }
        if(endDateString != null && endDateString != "" ) {
            endDate = Date.parse(loan.caroreder.formatDate(endDateString))+86400000;
        }
        var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
        if(compareResult) {
            loan.tooltip("起始日期大于结束日期","error");
            return;
        }
		$("#orderGridId").jqGrid("setGridParam", {
			postData:{'menuId':'2003','format':'json','orderStatus':orderStatus,'beginTime':startDate,"endTime":endDate,"searchContent":searchContent},
			page:1
	    }).trigger('reloadGrid');
	},

    formatDate : function (dateString) {

        dateString = dateString.replace(new RegExp(/-/gm) ,"/");
        return new Date(dateString);
    },


    orderEdit :function(){
        var order = document.getElementById("order");
        var data = document.getElementById("data");
        var rankList=document.getElementById("rankList");
        order.style.display = "block";
        data.style.display = "none";
        rankList.style.display="none";

    },

    dataEdit :function(){
        var order = document.getElementById("order");
        var data = document.getElementById("data");
        var rankList=document.getElementById("rankList");
        order.style.display = "none";
        data.style.display = "block";
        rankList.style.display="none";
    },
    picListEdit:function(){
        var order = document.getElementById("order");
        var data = document.getElementById("data");
        var rankList=document.getElementById("rankList");
        order.style.display = "none";
        data.style.display = "none";
        rankList.style.display="block";
    },

    /**清空查询条件*/
    clearCondition : function() {
        $("#startDate").val("");
        $("#endDate").val("");
        $("#orderStatus").val("-1");
        $("#searchContent").val("");
    },


};


selectOrderRowFunc = function(rowid){
    $("#rowid").attr("value",rowid);//记录当前选中的行的rowid
}




function compareDate(startDate, endDate){
    var start=new Date(startDate.replace("-", "/").replace("-", "/"));
    var end=new Date(endDate.replace("-", "/").replace("-", "/"));
    if(end<start){
        return true;
    }else{
        return false;
    }
}

$(function(){
    $('#startDate').datepicker({
        showOn: "button",
        buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
        buttonImageOnly: true
    });
    $('#endDate').datepicker({
        showOn: "button",
        buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
        buttonImageOnly: true
    });
});




