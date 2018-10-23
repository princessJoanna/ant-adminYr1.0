loan.orderAppointmentAuditListDeal = loan.orderAppointmentAuditListDeal || {

    /**
     * 关闭子框架
     */
    closeChildFrame : function () {
        loan.tabcut.childClosedIframe ( true );
    },

    /**
     * 关闭子框架 和 弹出的页面
     */
    closeChildFrameAndPage : function () {
        parent.document.getElementById('btn').click();   //调用父页面的 loan.tabcut.childClosedIframe ( true )
    },

    /**退回*/
    return : function() {
        var appointmentOrderId = $("#appointmentOrderId").val();
        loan.s_addPop("",loan.basePath+"/orderappointment/return?appointmentOrderId="+appointmentOrderId,"",430,230,{isRefresh:false});
    },

    /**拒绝 */
    reject: function() {
        var appointmentOrderId = $("#appointmentOrderId").val();
        loan.s_addPop("",loan.basePath+"/orderappointment/reject?appointmentOrderId="+appointmentOrderId,"",430,230,{isRefresh:false});
    },

    /**通过 */
    pass: function() {
        var appointmentOrderId = $("#appointmentOrderId").val();
        var userId = $("#userId").val();
        loan.s_addPop("",loan.basePath+"/orderappointment/pass?appointmentOrderId="+appointmentOrderId + "&userId=" +userId,"",430,230,{isRefresh:false});
    },
    /**确认通过 */
    appointmentAuditPass: function() {
        var appointmentOrderId = $("#appointmentOrderId").val();
        var userId = $("#userId").val();
        var remark = $("#remark").val();
        if(remark == null || remark == ""){
            loan.tooltip("备注不能为空","error");
        }else if(remark.length>50){
			loan.tooltip("备注不能超过50字","error");
		}else {
            loan.ajaxDo({
                url: loan.basePath + "/orderappointment/auditappointment",
                params: {
                    'appointmentOrderId': appointmentOrderId,
                    'result': 1,
                    'userId': userId,
                    'remark': remark
                },
                successCallback: loan.orderAppointmentAuditListDeal.closeChildFrameAndPage,
                successTip: true, //提示
                bizErrTip: true,  //提示
                chainPar: this
            });
        }},
    /**确认退回 */
    appointmentAuditReturn: function() {
        var appointmentOrderId = $("#appointmentOrderId").val();
        var remark = $("#remark").val();
        if(remark == null || remark == ""){
            loan.tooltip("备注不能为空","error");
        }else if(remark.length>50){
			loan.tooltip("备注不能超过50字","error");
		}else{
            loan.ajaxDo({
                url:loan.basePath+"/orderappointment/auditappointment",
                params:{'appointmentOrderId':appointmentOrderId,
                    'remark':remark,
                    'result':3},
                successCallback:loan.orderAppointmentAuditListDeal.closeChildFrameAndPage,
                successTip:true, //提示
                bizErrTip:true,  //提示
                chainPar:this
            });
        }
    },
    /**确认拒绝 */
    appointmentAuditReject: function() {
        var appointmentOrderId = $("#appointmentOrderId").val();
        var remark = $("#remark").val();
        if(remark == null || remark == ""){
            loan.tooltip("备注不能为空","error");
        }else if(remark.length>50){
			loan.tooltip("备注不能超过50字","error");
		}else{
            loan.ajaxDo({
                url:loan.basePath+"/orderappointment/auditappointment",
                params:{'appointmentOrderId':appointmentOrderId,
                    'remark':remark,
                    'result':2},
                successCallback:loan.orderAppointmentAuditListDeal.closeChildFrameAndPage,
                successTip:true, //提示
                bizErrTip:true,  //提示
                chainPar:this
            });
        }
    }
};

$(window).resize(function(){
    loan.grid.mdetailconWidth("appointmentOrderGridId");
});