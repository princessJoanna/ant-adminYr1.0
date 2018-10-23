loan.adjustfee = loan.adjustfee || {
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#feesAdjustGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'1104'}
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},

	/**
	 * 查看详情按钮
	 */
	lookInfo:function(menuId,rowid){
		$("#rowid").val(rowid);
		var id = $("#feesAdjustGridId").jqGrid('getCell',rowid,'applyId');
		var idKindCn=$("#feesAdjustGridId").jqGrid('getCell',rowid,'idKindCn');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/feesAdjust/toAdjustFeeInfo?applyId="+id+"&menuId="+menuId+"&idKindCn="+idKindCn,"AdjustFeeInfo",true,true);
	},
	/**
	 * 新增费息调整按钮
	 */
	add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增费息调整",loan.basePath+"/feesAdjust/toAddAdjustFee?menuId="+menuId,"AddAdjustFee",true,true);
	},
	
	/**
	 * 修改费息调整按钮
	 */
	edit : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var confirmStatus = $("#feesAdjustGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(confirmStatus != "0") {
			loan.tooltip("只有未审核费息可以修改","error");
			return;
		}
		//获取修改的id
		var applyId = $("#feesAdjustGridId").jqGrid('getCell',rowid,'applyId');
		var idKindCn= $("#feesAdjustGridId").jqGrid('getCell',rowid,'idKindCn');//证件类型
		var userId = $("#feesAdjustGridId").jqGrid('getCell',rowid,'userId');
		parent.loan.tabcut.childAddIframe("修改费息调整",loan.basePath+"/feesAdjust/toAddAdjustFee?menuId="+menuId+"&applyId="+applyId+"&idKindCn="+idKindCn+"&opType=up" + "&userId=" + userId,"editAdjustFee",true,true);
	},
	
	/**
	 * 删除费息调整按钮
	 */
	del : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var confirmStatus = $("#feesAdjustGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(confirmStatus != "0") {
			loan.tooltip("只有未审核费息可以删除","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该费息信息吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.adjustfee.delFunc(menuId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行删除
	 */
	delFunc:function(menuId,rowid){
		//获取要删除的id
		var id = $("#feesAdjustGridId").jqGrid('getCell',rowid,'applyId');
		loan.ajaxDo({
			url:loan.basePath+"/feesAdjust/deleteFeesAdjustFee",
			params:{'menuId':menuId,'menuLog':'1','applyId':id},
			successCallback:function(){
				loan.adjustfee.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 发起审核按钮
	 */
	confirm:function(menuId,rowid){
		//判断是否可以审核
		var confirmStatus = $("#feesAdjustGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(confirmStatus != "0") {
			loan.tooltip("只有未审核费息可以发起审批","error");
			return;
		}
		//执行
		var id = $("#feesAdjustGridId").jqGrid('getCell',rowid,'applyId');
		
		loan.ajaxDo({
			url:loan.basePath+"/feesAdjust/startConfirm",
			params:{'menuId':'110404','menuLog':'1','applyId':id},
			successCallback:function(){
				loan.adjustfee.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
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
		userName = $("#userName").val();
		
		$("#feesAdjustGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1104','userType':userType,'userName':userName,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 高级搜索按钮
	 */
	searchGreatFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号
		var searchOrgId = "";
		userType = $("#userType").val();
		userName = $("#userName").val();
		idKind = $("#idKind").val();
		idNo = $("#idNo").val();
		searchOrgId=$("#parentOrgId").val();
		$("#feesAdjustGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1104','userType':userType,'userName':userName,'searchOrgId':searchOrgId,
				'idKind':idKind,'idNo':idNo,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 清空
	 */
	clearSearch:function() {
		$("#userType").val('-1');
		$("#userName").val("");
	},
	/**
	 * 高级清空
	 */
	clearGreatSearch:function() {
		$("#userType").val('-1');
		$("#idKind").val('-1');
		$("#userName").val("");
		$("#idNo").val("");
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

	