loan.loanPurpose = loan.loanPurpose || {

	searchFn:function(){
	   var userName=$("#userName").val();
	   var borrowPurpose=$("#borrowPurpose").val();
	   var status=$("#status").val();
		$("#LoanPurposeGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'6007','format':'json','userName':userName,'borrowPurpose':borrowPurpose,'status':status},
			page:1
	    }).trigger('reloadGrid');   
	},

	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#userName").val("");
		$("#borrowPurpose").val('-1');
		$("#status").val('-1');
	},
	
	/**
	 * 审核信息按钮
	 */
	auditBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		var loanPurpose = $("#LoanPurposeGridId").jqGrid('getRowData',rowid);
		if(loanPurpose.status!='0') {
			loan.tooltip("该审核状态为"+loanPurpose.statusCn+"，不可以再审核","error");
			return;
		}
		loan.s_addPop("申请贷款额度提升审核",loan.basePath+"/loan/toEditloanPurpose?opType=one&menuId="+menuId,"",430,320,{isChangeClose:true});
	},
	
	/**
	 * 提交审核信息
	 */
	submitAudit:function(menuId) {
		var rowid = parent.$("#rowid").val();
		var loanPurposeId = parent.$("#LoanPurposeGridId").jqGrid("getCell", rowid, "loanPurposeId");
		var status = $("input[name='status']:checked").val();
		var reason=$("#reason").val();
		if(!status) {
			loan.tooltip("请选择表决意见","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/loan/confirmLoanPurpose",
			params:{'menuId':menuId,'format':'json',
				'loanPurposeId':loanPurposeId,'status':status,'reason':reason},
			successCallback:function(result) {
				parent.$("#focus").focus();
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}

}