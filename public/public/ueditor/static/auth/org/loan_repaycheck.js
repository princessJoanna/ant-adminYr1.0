loan.repaycheck = loan.repaycheck || {
	sell_sellorderquery : function() {
		searchOrgId = $("#parentOrgId").val();
		var userRealName = $("#userRealName").val();
		var productType = $("#productType").val();
		var idType = $("#idType").val();
		var receiptNo = $("#receiptNo").val();
		var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var startDate = dateStrToStr($("#startDate").val());
		var endDate = dateStrToStr($("#endDate").val());
		var userIdNum = $("#userIdNum").val();
		$("#repaycheckGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','userRealName':userRealName,'menuId':'7005','productType':productType,
				'startDate':startDate,'endDate':endDate,'idNo':userIdNum,'idType':idType,'receiptNo':receiptNo,'searchOrgId':searchOrgId},
			page:1
	    }).trigger('reloadGrid');
	},
	
	/** 选中行的触发事件*/
	selectRowFunc : function(rowid) {
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**清空查询条件*/
	clearlendVal : function() {
		$("#userRealName").val("");
		$("#userIdNum").val("");
		$("#startDate").val("");
		$("#endDate").val("");
		$("#unitName").val("");
		$("#idType").val("");
		$("#receiptNo").val("");
		$("#productType").val("");
	},
	
	/**
	 * 导出明细
	 */
	exportRepayCheck:function(menuId) {
		var rowIds = jQuery("#repaycheckGridId").jqGrid('getDataIDs');
		if (!rowIds || rowIds.length == 0) {
			loan.tooltip("请选择要导出的还款核对数据！", "error");
			return;
		}
		var searchOrgId = $("#parentOrgId").val();
		var userRealName = $("#userRealName").val();
		var productType = $("#productType").val();
		var idType = $("#idType").val();
		var receiptNo = $("#receiptNo").val();
		var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var startDate = dateStrToStr($("#startDate").val());
		var endDate = dateStrToStr($("#endDate").val());
		var idNo = $("#userIdNum").val();
		var productId = "";	// 产品ID
		productId = $("#productId").val();
		if (productId == '-1') {
			productId = "";
		}
		loan.tooltip("正在导出还款核对数据，请稍后...", "succeed");
		window.location.href = loan.basePath + "/org/exportRepayCheck?startDate=" + startDate 
				+ "&endDate=" + endDate 
				+ "&userRealName=" + userRealName 
				+ "&idNo=" + idNo 
				+ "&receiptNo=" + receiptNo 
				+ "&searchOrgId=" + searchOrgId 
				+ "&idType=" + idType 
				+ "&productId=" + productId 
				+ "&allChoose=" + true;
	},
	
	/**
	 * 查看还款核对详情
	 */
	look : function(memuId,rowId) {
		$("#rowid").attr("value",rowId);
		var rowObj = $("#repaycheckGridId").jqGrid('getRowData',rowId);
		var receiptId = rowObj.receiptId;
		var receiptNo = rowObj.receiptNo;
		var repaymentId = rowObj.repaymentId;
		var userName = rowObj.borrowerName;
		var userId = rowObj.userId;
		var orgId = rowObj.orgId;
		var idKindCn = rowObj.idKindCn;
		var idKind = rowObj.idKind;
		var idNo = rowObj.idNo;
		var limitDate = rowObj.limitDate;
		var limitDays = rowObj.limitDays;
		var productTypeCn = rowObj.productTypeCn;
		var productType = rowObj.productType;
		var productId = rowObj.productId;
		var productName = rowObj.productName;
		var loanDate = rowObj.loanDate;
		var loanAmount = rowObj.loanAmount;
		var repayStatusCn = rowObj.repayStatusCn;
		var startDate = dateStrToStr($("#startDate").val());
		var endDate = dateStrToStr($("#endDate").val());
		var status = "repaycheck";
		var urlSuffix = "?repaymentId=" + repaymentId 
					+ "&receiptId=" + receiptId 
					+ "&receiptNo=" + receiptNo 
					+ "&userName=" + userName 
					+ "&userId=" + userId 
					+ "&orgId" + orgId 
					+ "&idKindCn=" + idKindCn 
					+ "&idKind=" + idKind 
					+ "&idNo=" + idNo 
					+ "&productTypeCn=" + productTypeCn 
					+ "&productType=" + productType 
					+ "&productId=" + productId 
					+ "&productName=" + productName 
					+ "&loanDate=" + loanDate 
					+ "&loanAmount=" + loanAmount 
					+ "&startDate=" + startDate 
					+ "&endDate=" + endDate 
					+ "&memuId=" + memuId 
					+ "&status=" + status 
					+ "&repayStatusCn=" + repayStatusCn 
					+ "&limitDate=" + limitDate 
					+ "&limitDays=" + limitDays;
		parent.loan.tabcut.childAddIframe("核对详情", loan.basePath + "/org/repaydetail" + urlSuffix, "repaydetail", true);
	}
};

/**
 * 把日期格式转化为纯数字格式字符
 */
function dateStrToStr(dateStr) {
	if(dateStr != null) {
		return dateStr.replace(/\-/g,"");
	}
	return dateStr;
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

$(function(){
	loan.selFun('selAll'); 
	loan.selFun('adv');
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
	/*$(".openw").click(function(){
		$("#advCon").removeClass("dropDownList");
		$("#adv").unbind("click");
		$("#adv").addClass('open');
		$("#adv").html("收起高级搜索");
		loan.s_addPop("选择客户",loan.basePath+"/common/selectloan","",650,400);
	})*/

})
$(window).resize(function(){
	loan.grid.mdetailconWidth("repaycheckGridId");
})
