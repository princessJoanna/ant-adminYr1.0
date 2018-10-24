loan.appointment = loan.appointment || {

    formatDate : function (dateString) {

        dateString = dateString.replace(new RegExp(/-/gm) ,"/");
        return new Date(dateString);
    },

    /**
     * 清空搜索
     */
    clearCondition : function () {
        $("#startDate").val("");
        $("#endDate").val("");
        $("#searchContent").val("");
        $("#status").val("-1");
    },

    /**
     * 跳转预约分配
     */
    toDistribute : function(menuId, rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#appointmentGridId").jqGrid('getRowData',rowid);
        if (rowData.appointmentStatus != '1')
            return   loan.tooltip("预约单状态不符合【状态不为待分配】","error");
        var temp = true;
        var appointmentOrderId = rowData.appointmentOrderId;
        $.ajax({
            url: loan.basePath + "/appointment" + "/nowstatus" ,
            type: 'POST',
            async:false,
            data: {
                "appointmentOrderId" : appointmentOrderId
            },
            success: function (responseStr) {
                if (rowData.appointmentStatus != responseStr)
                    temp = false;
            },
            error : function (responseStr) {
                //12出错后的动作
                console.log(responseStr);
                loan.tooltip("网络问题，请重试", "error");
            }
        });
        if (!temp) return   loan.tooltip("预约单已经更改【请刷新重试】","error");
        loan.s_addPop("预约分配",loan.basePath + "/appointment/todistribute?appointmentOrderId=" + appointmentOrderId , "",720,430,{isRefresh:false});
    },

    /**
     * 跳转预约修改
     */
    toReDistribute : function(menuId, rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#appointmentGridId").jqGrid('getRowData',rowid);
        if (rowData.appointmentStatus != '2')
            return   loan.tooltip("预约单状态不符合【状态不为待预约】","error");
        var appointmentOrderId = rowData.appointmentOrderId;
        var temp = true;
        $.ajax({
            url: loan.basePath + "/appointment" + "/nowstatus" ,
            type: 'POST',
            async:false,
            data: {
                "appointmentOrderId" : appointmentOrderId
            },
            success: function (responseStr) {
                if (rowData.appointmentStatus != responseStr)
                    temp = false;
            },
            error : function (responseStr) {
                //12出错后的动作
                console.log(responseStr);
                loan.tooltip("网络问题，请重试", "error");
            }
        });
        if (!temp) return   loan.tooltip("预约单已经更改【请刷新重试】","error");
        loan.s_addPop("预约分配修改",loan.basePath + "/appointment/toredistribute?appointmentOrderId=" + appointmentOrderId , "",720,430,{isRefresh:false});
    },

    /**
     * 跳转预约查看
     */
    toDetail : function(menuId, rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#appointmentGridId").jqGrid('getRowData',rowid);
        var appointmentOrderId = rowData.appointmentOrderId;
        loan.s_addPop("预约查看",loan.basePath + "/appointment/todetail?appointmentOrderId=" + appointmentOrderId , "", 720,430,{isRefresh:false});
    }


};

selectAppointmentRowFunc = function(rowid){
    $("#rowid").attr("value",rowid);//记录当前选中的行的rowid
};

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
