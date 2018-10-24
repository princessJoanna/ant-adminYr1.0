loan.apply = loan.apply || {
	
	toAddLoanApply:function(menuId){
		
		parent.loan.tabcut.childAddIframe("新增借款申请",loan.basePath+"/loan/toAddLendApply?menuId="+menuId,"AddLendApply",true,true);
	},
	toDelLoanApply:function(menuId,rowid){
		$("#rowid").val(rowid);
		$.artDialog({
			title:"提示",
			isCloseBtn:true,  
			content:"确定要删除该申请吗？",
			isCloseBtn:true,
			cancel:true,
			ok:function(){
				loan.apply.delLoanApply(menuId);
			},
			isCloseicon:true
		});
	},
	/**删除借款申请*/
	delLoanApply:function(menuId){
		var rowid=$("#rowid").val();
		var rowData=$("#loanApplyGridId").jqGrid("getRowData",rowid);
		var applyId=rowData.applyId;
		if(rowData.confirmStatus!="0"){
			loan.tooltip("只能删除未审核申请","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/loan/delPreLoanApply",
			params:{menuId:menuId,format:'json',"applyId":applyId},
			successCallback:loan.apply.searchLoanApply,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	toCancelLoanApply:function(menuId){
		var rowid=$("#rowid").val();
		if(!rowid){
			loan.tooltip("请选择要审批的申请","error");
			return;
		}
		var rowData=$("#loanApplyGridId").jqGrid("getRowData",rowid);
		var applyId=rowData.applyId;
		if(rowData.confirmStatus!="2"){
			loan.tooltip("只能作废已审批申请","error");
			return;
		}
		if(rowData.status!="1"){
			loan.tooltip("只能作废有效的申请","error");
			return;
		}
		$.artDialog({
			title:"提示",
			isCloseBtn:true,  
			content:"确定要作废该申请吗？",
			isCloseBtn:true,
			cancel:true,
			ok:function(){
				loan.apply.cancelLoanApply(menuId);
			},
			isCloseicon:true
		});
	},
	cancelLoanApply:function(menuId){
		var rowid=$("#rowid").val();
		var rowData=$("#loanApplyGridId").jqGrid("getRowData",rowid);
		var applyId=rowData.applyId;
		
		loan.ajaxDo({
			url:loan.basePath+"/loan/cancelPreloanApply",
			params:{menuId:menuId,format:'json',"applyId":applyId},
			successCallback:loan.apply.searchLoanApply,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**再次申请*/
	toApplyAgain:function(menuId,rowid){
		$("#rowid").val(rowid);
		var userId = $("#loanApplyGridId").jqGrid('getCell',rowid,'userId');
		parent.loan.tabcut.childAddIframe("再申请",loan.basePath+"/loan/toApplyAgain?menuId="+menuId+"&userId="+userId,"",true,true);
	},
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
//	toConfirmLoanApply:function(){
//		loan.s_addPop("审核授信",loan.basePath+"/loan/toConfirmLoanApply?menuId=7008","",430,260,{isChangeClose:true});
//	},
	startConfirm:function(menuId,rowid){
		if(rowid=="undefined"||rowid==""){
			loan.tooltip("请选择要审批的申请","error");
			return;
		}
		var rowData=$("#loanApplyGridId").jqGrid("getRowData",rowid);
		var applyId=rowData.applyId;
		var userId=rowData.userId;
		if(rowData.confirmStatus=="1"){
			loan.tooltip("正在审核中无须再次审批","error");
			return;
		}
		if(rowData.confirmStatus=="2"){
			loan.tooltip("已经审批通过无须再次审批","error");
			return;
		}
		if(rowData.confirmStatus=="3"){
			loan.tooltip("申请被否决不能再次审批","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/loan/startConfirm",
			params:{menuId:menuId,format:'json',"applyId":applyId,"userId":userId},
			successCallback:loan.apply.searchLoanApply,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	searchLoanApply:function(){
		var certNo=$("#idNo").val();
		var customType=$("#userType").val();
		var customName=$("#userName").val();
		var confirmStatus=$("#confirmStatus").val();
		var certType=$("#idKind").val();
		var searchOrgId = $("#parentOrgId").val();
		$("#loanApplyGridId").jqGrid("setGridParam", {   
			postData:{'certNo':certNo,'customName':customName,'confirmStatus':confirmStatus,'searchOrgId':searchOrgId,
				'format':'json','certType':certType,'customType':customType},
				page:1
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#userName").val('');
		$("#userType").val('-1');
		$("#idNo").val('');
		$("#customName").val('');
		$("#confirmStatus").val('-1');
		$("#idKind").val('-1');
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
}
function look(menuId,rowid){
	$("#rowid").val(rowid);
	var applyId = $("#loanApplyGridId").jqGrid('getCell',rowid,'applyId');
	loan.s_addPop("查看详情",loan.basePath+"/loan/toloanapplyinfo?menuId="+menuId+"&applyId="+applyId,"",680,450,{isRefresh:true,isChangeClose:true});	
}
function toEditLoanApply(menuId,rowid){
	var applyId = $("#loanApplyGridId").jqGrid('getCell',rowid,'applyId');
	var confirmStatus= $("#loanApplyGridId").jqGrid('getCell',rowid,'confirmStatus');
	if(confirmStatus!="0"){
		loan.tooltip("只能修改未审核的申请","error");
		return;
	}
	parent.loan.tabcut.childAddIframe("修改借款申请",loan.basePath+"/loan/toEditLoanApply?menuId="+menuId+"&applyId="+applyId,"",true,true);
}