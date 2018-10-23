loan.fivecategories = loan.fivecategories || {

	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
			
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#userType").val('-1');
		$("#idKind").val('-1');
		$("#idNo").val('');
		$("#userName").val('');
	},
	
	toViewDetailInfo: function(menuId, rowId) {
		var receiptId = $("#fiveGridId").jqGrid('getRowData',rowId).receiptId;
		var loanApplyId = $("#fiveGridId").jqGrid('getRowData',rowId).loanApplyId;		
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/risk/five/toFiveCategoriesDetail?oper=view&menuId="+menuId+"&receiptId="+receiptId+"&loanApplyId="+loanApplyId,"viewFiveCategories",true,true);
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind='';  //证件类型
		var idNo=''; //证件号码

		userType = $("#userType").val();
		if(userType=='-1'){
			userType='';
		}
		if($.trim($("#userName").val())!="") {
			userName = $("#userName").val();
		}		
		idKind = $("#idKind").val();
		if(idKind=='-1'){
			idKind='';
		}	
		if($.trim($("#idNo").val())!="") {
			idNo = $("#idNo").val();
		}
			
		$("#fiveGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'####','idKind':idKind,'idNo':idNo,
				'userType':userType,'userName':userName,
				'format':'json'},
			page:1
	    }).trigger('reloadGrid'); 
	},	
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
	