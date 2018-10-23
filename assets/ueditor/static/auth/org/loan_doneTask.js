loan.doneTask = loan.doneTask || {
	// 查看审批
	view : function(menuId,rowid){
		var rowData = $("#loanDoneTaskGridId").jqGrid('getRowData',rowid);
		loan.ajaxDo({
			url : loan.basePath + "/process/displayDone",
			params : {
				type : "checkOrderAlive",
				orderId : rowData.orderId,
				menuId : menuId
			},
			successCallback : function(result) {
				if(result.alive) {
					parent.loan.tabcut.childAddIframe("查看审批",loan.basePath + "/process/displayDone?type=display&processId=" + rowData.processId + "&orderId=" + rowData.orderId + "&menuId=" + menuId,"start",true,true);
				}else {
					loan.tooltip("该任务订单流程已审批完成，请转至历史任务查询","error");
					loan.doneTask.query();
				}
			}
		});
	},
	// 记录查询
	query : function(){
		var userName = $("#userName").val();
		var searchOrgId = $("#parentOrgId").val();
		var kind = $('#kind').val();
		$("#loanDoneTaskGridId").jqGrid("setGridParam", {   
			postData:{'searchOrgId':searchOrgId,'format':'json','userName':userName,'menuId':$('#menuId').val() , kind : kind},
			page:1
	    }).trigger('reloadGrid');
	},
	// 清空查询条件
	clearSearchVal : function(){
		$("#userName").val('');
	}
}
