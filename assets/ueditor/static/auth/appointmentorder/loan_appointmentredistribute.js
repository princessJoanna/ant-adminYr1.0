loan.appointmentredistribute = loan.appointmentredistribute || {

    confirm : function () {
        if ($("#saleManager").val() == "0")
            return loan.tooltip("请先选择【指派客户经理】", 'error');
        $.artDialog({
            title: '提示',
            content: "是否确定预约重新分配？",
            ok: function () {
                $.ajax({
                    url: loan.basePath + "/appointment" + "/appointmentRedistribution",
                    type: 'POST',
                    data: {
                        "appointmentOrderId": $("#appointmentOrderId").val(),
                        "remark": $("#remark").val(),
                        "salesManager":  $("#saleManager").val(),
                        "appointmentWare":  $("label#appointmentWare").text(),
                        "customerPhone":  $("label#customerPhone").text(),
                        "salesManagerName":  $("#saleManager").find("option:selected").text()
                    },
                    success: function (responseStr) {
                        if (responseStr == true)
                            loan.tooltip("预约重新分配成功", "succeed");
                        else
                            loan.tooltip("预约重新分配失败" + responseStr, "error");
                        loan.s_Pop_closedChild(true, false);
                    },
                    error: function (responseStr) {
                        //12出错后的动作
                        console.log(responseStr);
                        loan.tooltip("网络问题，请重试", "error");
                    }
                });
            },
            cancel: function () {
                return false;
            }
        });
    }

};