loan.interestFlow = loan.interestFlow || {
	init : function(){
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
	},
	selectFn : function(rowid,status){
		if(status){
			$("#rowid").attr("value",rowid);
		}
	},
	/**
	 * 查看
	 */
	view : function(menuId,rowid){
		var rowData = $("#loanInterestGridId").jqGrid('getRowData',rowid);
		parent.loan.tabcut.childAddIframe("查看审批",loan.basePath + "/process/display?processId=" + rowData.processId + "&orderId=" + rowData.orderId + "&menuId="+menuId+"&menuId1="+menuId,"creditFlowView",true,true);
	},
	viewHist : function(menuId,rowid){
		var rowData = $("#loanInterestGridId").jqGrid('getRowData',rowid);
		parent.loan.tabcut.childAddIframe("查看审批",loan.basePath + "/process/displayHist?processId=" + rowData.processId + "&orderId=" + rowData.orderId + "&menuId="+menuId,"start",true,true);
	},
	/**
	 * 审批
	 */
	exec : function(menuId,rowid){
		var rowData = $("#loanInterestGridId").jqGrid('getRowData',rowid);
		parent.loan.tabcut.childAddIframe("任务处理",loan.basePath + "/flow/all" + "?menuId="+menuId+"&processId=" + rowData.processId + "&taskId=" + rowData.taskId + "&orderId=" + rowData.orderId ,"executeCreditFlow",true,true);
	},
	// 历史记录查询
	histQuery : function(){
		var userName = $("#userName").val();
		var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
		searchOrgId = $("#parentOrgId").val();
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var startDate = dateStrToStr($("#startDate").val());
		var endDate = dateStrToStr($("#endDate").val());
		$("#loanInterestGridId").jqGrid("setGridParam", {   
			postData:{'searchOrgId':searchOrgId,'format':'json','userName':userName,'menuId':$('#menuId').val(),'startDate':startDate,'endDate':endDate},
			page:1
	    }).trigger('reloadGrid');
		
	},
	// 清空查询条件
	clearSearchVal : function(){
		$("#userName,#startDate,#endDate").val('');
	},
	query : function(){
		var userName = $("#userName").val();
		searchOrgId = $("#parentOrgId").val();
		$("#loanInterestGridId").jqGrid("setGridParam", {   
			postData:{'searchOrgId':searchOrgId,'format':'json','userName':userName,'menuId':$('#menuId').val()},
			page:1
	    }).trigger('reloadGrid');
		
	}
}

/**比较日期的大小*/
function compareDate(startDate, endDate){
	var start=new Date(startDate.replace("-", "/").replace("-", "/"));
	var end=new Date(endDate.replace("-", "/").replace("-", "/")); 
	if(end<start){ 
        return true;  
    }else{
    	return false;
    }  
}

/**
 * 把日期格式转化为纯数字格式字符
 */
function dateStrToStr(dateStr) {
	if(dateStr != null) {
		return dateStr.replace(/\-/g,"");
	}
	return dateStr;
}