loan.facadvancepayment = loan.facadvancepayment || {
	
	/**
	 * 查询贷款信息
	 */
	view : function(menuId, rowid){
		var userId = $("#accReceivaleDetail").jqGrid('getCell',rowid,'userId');
		var applyId = $("#accReceivaleDetail").jqGrid('getCell',rowid,'applyId');
		parent.loan.tabcut.childAddIframe("贷款信息",loan.basePath+"/league/loanDetail?menuId=800109&userId=" + userId + "&applyId=" + applyId ,true,true);
	}

}