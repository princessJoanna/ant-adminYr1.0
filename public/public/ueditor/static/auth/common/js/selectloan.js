loan.selectloan = loan.selectloan ||{
	selectRowFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	submit : function(){
		var rowid = $("#rowid").val();
		var rowObj = $("#selectLoanjqGridId").jqGrid('getRowData',rowid);
		parent.$("#receiptId").attr("value",rowObj.receiptId);
		parent.$("#loanApplyId").attr("value",rowObj.loadApplyId);
		parent.$("#userName").html(rowObj.userName);
		parent.$("#userId").attr("value",rowObj.userId);
		parent.$("#idKind").attr("value",rowObj.idKind);
		parent.$("#loanAmount").html(rowObj.loanAmount);
		parent.$("#idKindCn").html(rowObj.idKindCn);
		
		parent.$("#idNo").html(rowObj.idNo);
		parent.$("#loanDate").html(rowObj.loanDate);
		parent.$("#limitDate").html(rowObj.limitDate);
		parent.$("#interestRate").html("3‰");
		//loan.borrower.queryUserPreloan(rowObj.userId);
		if (parent.$("#focus").length>0) {
			parent.$("#focus").focus();
		}
		if (parent.$("#remark").length>0) {
			parent.$("#remark").focus();
		}
		
		loan.s_Pop_closedChild(false,false);
	},
	searchLoanApply:function(){
		var userName=$("#userName").val();
		$("#selectLoanjqGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'7004','userName':userName,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
}