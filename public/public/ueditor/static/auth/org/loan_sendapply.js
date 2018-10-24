loan.sendapply = loan.sendapply || {
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#sendApplyGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'7011'}
	    }).trigger('reloadGrid'); 
	},
	
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 新增放款申请按钮
	 */
	add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增放款申请",loan.basePath+"/loan/toAddSendApply?opType=add&menuId="+menuId,"AddSendApply",true,true);
	},
	
	/**
	 * 修改放款申请按钮
	 */
	edit : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var status = $("#sendApplyGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(status != "0") {
			loan.tooltip("只有未发起审核的申请可以修改","error");
			return;
		}
		//获取修改的id
		var id = $("#sendApplyGridId").jqGrid('getCell',rowid,'loanApplyId');
		parent.loan.tabcut.childAddIframe("修改放款申请",loan.basePath+"/loan/toAddSendApply?opType=update&menuId="+menuId+"&loanApplyId="+id,"editSendApply",true,true);
	},
	
	/**
	 * 删除放款申请按钮
	 */
	del : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var status = $("#sendApplyGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(status != "0") {
			loan.tooltip("只有未发起审核的申请可以删除","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该放款申请吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.sendapply.delFunc(menuId,rowid);
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
		var id = $("#sendApplyGridId").jqGrid('getCell',rowid,'loanApplyId');
		loan.ajaxDo({
			url:loan.basePath+"/sendloan/delSendApply",
			params:{'menuId':menuId,'menuLog':'1','loanApplyId':id},
			successCallback:function(){
				$("#rowid").val('');
				loan.sendapply.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 作废放款申请按钮
	 */
	invalid : function(menuId) {
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要作废的记录","error");
			return;
		}
		//校验状态，是否可以作废
		var status = $("#sendApplyGridId").jqGrid('getCell',rowid,'status');
		if(status == "2") {
			loan.tooltip("该记录已作废","error");
			return;
		}
		if(status != "1") {
			loan.tooltip("该记录不可以作废","error");
			return;
		}
		//确认是否要作废
		$.artDialog({
			title:"提示",
			content:"确定要作废该放款申请吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.sendapply.invalidFunc(menuId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 执行作废操作
	 */
	invalidFunc:function(menuId,rowid){
		//获取要作废的id
		var id = $("#sendApplyGridId").jqGrid('getCell',rowid,'loanApplyId');
		loan.ajaxDo({
			url:loan.basePath+"/sendloan/invalidSendApply",
			params:{'menuId':menuId,'menuLog':'1','loanApplyId':id},
			successCallback:function(){
				loan.sendapply.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 发起审批按钮
	 */
	startFlow : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以发起审批
		var status = $("#sendApplyGridId").jqGrid('getCell',rowid,'confirmStatus');
		var defaultStatus = $("#sendApplyGridId").jqGrid('getCell',rowid,'defaultStatus');
		if(status != "0") {
			loan.tooltip("该记录已发起审批","error");
			return;
		}
		if(defaultStatus != "0") {
			loan.tooltip("处理中的记录不可以发起审批","error");
			return;
		}
		//执行审批
		var id = $("#sendApplyGridId").jqGrid('getCell',rowid,'loanApplyId');
		loan.ajaxDo({
			url:loan.basePath+"/sendloan/startFlow",
			params:{'menuId':menuId,'menuLog':'1','loanApplyId':id},
			successCallback:function(){
				loan.sendapply.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 查看详情按钮
	 */
	lookInfo:function(menuId,rowid){
		$("#rowid").val(rowid);
		var id = $("#sendApplyGridId").jqGrid('getCell',rowid,'loanApplyId');
		loan.s_addPop("查看详情",loan.basePath+"/loan/toSendApplyInfo?loanApplyId="+id+"&menuId="+menuId,"",750,420,{isRefresh:true,isChangeClose:true});	
		//parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/loan/toSendApplyInfo?loanApplyId="+id+"&menuId="+menuId,"",true,true);
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号
		var confirmStatus = "";//审核状态

		userType = $("#userType").val();
		if(userType=='-1'){
			userType='';
		}
		confirmStatus = $("#confirmStatus").val();
		if(confirmStatus=='-1'){
			confirmStatus='';
		}
		userName = $("#userName").val();
		searchOrgId = $("#parentOrgId").val();
		
		$("#sendApplyGridId").jqGrid("setGridParam", {   
			postData:{'userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,'confirmStatus':confirmStatus,
				'searchOrgId':searchOrgId,
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
		var confirmStatus = "";//审核状态

		idKind = $("#idKind").val();
		if(idKind=='-1'){
			idKind='';
		}
		idNo = $("#idNo").val();
		
		userType = $("#userType").val();
		if(userType=='-1'){
			userType='';
		}
		confirmStatus = $("#confirmStatus").val();
		if(confirmStatus=='-1'){
			confirmStatus='';
		}
		userName = $("#userName").val();
		searchOrgId = $("#parentOrgId").val();
		
		$("#sendApplyGridId").jqGrid("setGridParam", {   
			postData:{'userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,'confirmStatus':confirmStatus,
				'searchOrgId':searchOrgId,
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
	
	