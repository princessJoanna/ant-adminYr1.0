loan.repayrecord = loan.repayrecord || {
	
	/**
	 * 单笔还款登记
	 */
	singleRepayFn : function(menuId,rowId) {
		var rowObj = $('#lendGridId').jqGrid('getRowData',rowId);
		parent.loan.tabcut.childAddIframe("单笔还款", loan.basePath + "/loan/toRepayOne?receiptId=" + rowObj.receiptId + "&menuId=" + menuId, "lendetail", true);
	},
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id,chose) {
		if(!chose) {
			chose = '-1';
		}
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val(chose);
	},
	
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 单笔还款按钮
	 */
	batchrepay : function(menuId){
		var ids=$('#lendGridId').jqGrid('getGridParam','selarrrow');
		if(ids.length == 0){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var receiptIds = new Array();
		for(var i in ids){
			var rowObj = $('#lendGridId').jqGrid('getRowData',ids[i]);
			receiptIds.push(rowObj.receiptId);
		}
		loan.ajaxDo({
            url:loan.basePath+"/loan/batchRepay",
            params:{ 'receiptIds':JSON.stringify(receiptIds),'format':'json','menuId':menuId,'menuLog':'1'},
            successCallback:function(result){
            	loan.repayrecord.searchFunc();
            },
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 单笔还款按钮
	 */
	repayLoanBtn:function(menuId,rowid){	
	/*	var rowObj = $('#lendGridId').jqGrid('getRowData',rowid);
		loan.ajaxDo({
            url:loan.basePath+"/sendloan/giveLoan",
            params:{ 'loanApplyIds':JSON.stringify(loanApplyIds),'format':'json','menuId':menuId,'menuLog':'1'},
            successCallback:function(result){
            	loan.repayrecord.searchFunc();
            },
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });*/
		/*var ids=$('#sendRecordGridId').jqGrid('getGridParam','selarrrow');
		if(ids.length == 0){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var loanApplyIds = new Array();
		for(var i in ids){
			var rowObj = $('#sendRecordGridId').jqGrid('getRowData',ids[i]);
			loanApplyIds.push(rowObj.loanApplyId);
		}
		loan.ajaxDo({
            url:loan.basePath+"/sendloan/giveLoan",
            params:{ 'loanApplyIds':JSON.stringify(loanApplyIds),'format':'json','menuId':menuId,'menuLog':'1'},
            successCallback:function(result){
            	loan.sendrecord.searchFunc();
            },
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });*/
	},
	
	/**
	 * 提前结清
	 */
	prePayment:function(menuId,rowId){
		var repaymentType=$("#lendGridId").jqGrid("getCell", rowId,"repaymentType");
		if(repaymentType == "0" || repaymentType == "1"){
			loan.tooltip("该用户不支持提前结清！","error");
			return;
		}
		var receiptId = $("#lendGridId").jqGrid("getCell",rowId,"receiptId");
		var userId = $("#lendGridId").jqGrid("getCell",rowId,"userId");
		parent.loan.tabcut.childAddIframe("提前结清", loan.basePath + "/loan/toPrepayment?menuId=" + menuId + "&receiptId=" + receiptId + "&userId=" + userId, "toRepayment", true);
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号

		userType = $("#userType").val();
		if(userType=='-1'){
			userType='';
		}
		idKind = $("#idKind").val();
		if(idKind=='-1'){
			idKind='';
		}
		userName = $("#userName").val();
		idNo = $("#idNo").val();
		searchOrgId = $("#parentOrgId").val();
		
		$("#lendGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1101','userType':userType,'userRealName':userName,
				'idType':idKind,'idNo':idNo,'searchOrgId':searchOrgId,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 查看详情
	 */
	lookInfo:function(menuId,rowid){
		$("#rowid").val(rowid);
		var id = $("#sendRecordGridId").jqGrid('getCell',rowid,'loanApplyId');
		loan.s_addPop("查看详情",loan.basePath+"/loan/toSendApplyInfo?loanApplyId="+id+"&menuId="+menuId,"",680,450,{isRefresh:true,isChangeClose:true});	
	},
	
	clearFunc : function(){
		$('#userType,#idKind').val('-1');
		$('#userName,#idNo').val('');
	}
	
};

/**
 * 金额格式化
 * @param nData
 * @param decimalSeparator
 * @param decimalPlaces
 * @returns
 */
function formatMoney(nData,decimalSeparator,decimalPlaces) {
	var floatRegex = /^[0-9]+(\.[0-9]+)?$/ ;
	if(floatRegex.test(nData)) {
		var bNegative = (nData < 0);
		var sOutput = String(nData);
		var sDecimalSeparator = decimalSeparator || ".";
		var nDotIndex;
		var nDecimalPlaces = decimalPlaces || 2;
		var nDecimal = Math.pow(10, nDecimalPlaces);
		sOutput = String(Math.round(nData*nDecimal)/nDecimal);
		nDotIndex = sOutput.lastIndexOf(".");
		if(nDecimalPlaces > 0) {
			// Add the decimal separator
			if(nDotIndex < 0) {
				sOutput += sDecimalSeparator;
				nDotIndex = sOutput.length-1;
			}
			// Replace the "."
			else if(sDecimalSeparator !== "."){
				sOutput = sOutput.replace(".",sDecimalSeparator);
			}
			// Add missing zeros
			while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
				sOutput += "0";
			}
		}
		return sOutput;
	}
	return '';
}
	
	