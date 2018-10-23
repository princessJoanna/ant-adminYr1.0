loan.appointmentdistribute = loan.appointmentdistribute || {

    confirm : function () {
        if ( $("#distribute").val() == "0")
            return    loan.tooltip( "请先选择【是否进行分配】" ,'error');
        if ( $("#distribute").val() == "1"  && $("#saleManager").val() == "0")
            return    loan.tooltip( "请先选择【指派客户经理】" ,'error');
        if ( $("#distribute").val() == "2"  && ($("#remark").val() == null || $("#remark").val() == ""))
            return    loan.tooltip( "预约舍弃时备注不能为空" ,'error');
        if ($("#distribute").val() == "2"){
            $.artDialog({
                title:'提示',
                content:"是否确定预约舍弃？",
                ok:function(){
                    $.ajax({
                        url: loan.basePath + "/appointment" + "/appointmentcancel",
                        type: 'POST',
                        data: {
                            "appointmentOrderId" : $("#appointmentOrderId").val(),
                            "remark" : $("#remark").val()
                        },
                        success: function (responseStr) {
                            if (responseStr == true)
                                loan.tooltip("预约舍弃成功", "succeed");
                            else
                                loan.tooltip("预约舍弃失败", "error");
                            loan.s_Pop_closedChild(true, false);
                        },
                        error : function (responseStr) {
                            //12出错后的动作
                            console.log(responseStr);
                            loan.tooltip("网络问题，请重试", "error");
                        }
                    });
                },
                cancel:function(){
                    return false;
                }
            })
        } else if ($("#distribute").val() == "1") {
            $.artDialog({
                title:'提示',
                content:"是否确定预约分配？",
                ok:function(){
                    $.ajax({
                        url: loan.basePath + "/appointment" + "/appointmentdistribute",
                        type: 'POST',
                        data: {
                            "appointmentOrderId" : $("#appointmentOrderId").val(),
                            "salesManager":  $("#saleManager").val(),
                            "salesManagerName":  $("#saleManager").find("option:selected").text(),
                            "appointmentWare":  $("label#appointmentWare").text(),
                            "customerPhone":  $("label#customerPhone").text(),
                            "remark" : $("#remark").val()
                        },
                        success: function (responseStr) {
                            if (responseStr == true)
                                loan.tooltip("预约分配成功", "succeed");
                            else
                                loan.tooltip("预约分配失败", "error");
                            loan.s_Pop_closedChild(true, false);
                        },
                        error : function (responseStr) {
                            //12出错后的动作
                            console.log(responseStr);
                            loan.tooltip("网络问题，请重试", "error");
                        }
                    });
                },
                cancel:function(){
                    return false;
                }
            })

        }
    }
};