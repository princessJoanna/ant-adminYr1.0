loan.facEndPay = loan.facEndPay || {

	/**
	 * 尾款支付按钮
	 */
	endPayBtn : function(menuId) {
		var ids = $("#factoringEndPayGridId").jqGrid('getGridParam','selarrrow'), id = '',proAmt = 0,actAmt = 0,balanceAmt = 0;
		if(ids.length == 0) {
			loan.tooltip("请选择一条记录","error");
			return;
		}
		for(var i = 0;i < ids.length;i++){
			id += (i == 0 ? "" : ",") + $("#factoringEndPayGridId").jqGrid('getCell',ids[i],'receiveAcctId');
			var preAmount =  parseFloat($("#factoringEndPayGridId").jqGrid('getCell',ids[i],'preAmount') == "" ? '0' : $("#factoringEndPayGridId").jqGrid('getCell',ids[i],'preAmount'));
			var proAmount = parseFloat($("#factoringEndPayGridId").jqGrid('getCell',ids[i],'proAmount') == "" ? '0' : $("#factoringEndPayGridId").jqGrid('getCell',ids[i],'proAmount'));
			proAmt += proAmount;// 尾付总额
			var fundBalance = parseFloat($("#factoringEndPayGridId").jqGrid('getCell',ids[i],'fundBalance') == "" ? '0' : $("#factoringEndPayGridId").jqGrid('getCell',ids[i],'fundBalance'));
			balanceAmt += fundBalance;// 账单总额
			var poundageAmount =  parseFloat($("#factoringEndPayGridId").jqGrid('getCell',ids[i],'poundageAmount') == "" ? '0' : $("#factoringEndPayGridId").jqGrid('getCell',ids[i],'poundageAmount'));
	    	var payType = parseInt($("#factoringEndPayGridId").jqGrid('getCell',ids[i],'payType'));
	    	if(payType == 1){
	    		proAmount = proAmount - poundageAmount;
	    	}
	    	actAmt  += proAmount;// 实付总额
		}
		
		// 查询尾付的金额用来展示
		loan.s_addPop("尾付金额",loan.basePath+"/league/toEndPayAmt?menuId=" + menuId + "&ids=" + id
				+ "&proAmt=" + proAmt + "&actAmt=" + actAmt + "&balanceAmt=" + balanceAmt,"",430,300);	
	},
	/**
	 * 查询按钮
	 */
	queryBtn : function(menuId, rowid) {
		var leagueType = $('#leagueType').val();
		var leagueName = $('#leagueName').val();
		$("#factoringEndPayGridId").jqGrid("setGridParam", {   
			postData:{'leagueType':leagueType,'leagueName':leagueName,'format':'json' , 'menuId' : $('#menuId').val() },page:1
	    }).trigger('reloadGrid'); 
		
	},
	/**
	 * 详情
	 */
	showDetail : function(menuId, rowid){
		var userId = $("#factoringEndPayGridId").jqGrid('getCell',rowid,'userId');
		var leagueId = $("#factoringEndPayGridId").jqGrid('getCell',rowid,'leagueId');
		var receiveAcctId=$("#factoringEndPayGridId").jqGrid('getCell',rowid,'receiveAcctId');
		parent.loan.tabcut.childAddIframe("附件查询",loan.basePath+"/league/acctReceAttach?userId="+userId
				+"&leagueId=" + leagueId + "&menuId=" + menuId+"&receiveAcctId="+receiveAcctId,"acctReceAttach",true);
		
	},
	showAccReceivaleInfoBtn:function(menuId,rowid){	
		var userId = $("#factoringEndPayGridId").jqGrid('getCell',rowid,'userId');
		if(!userId){
			loan.tooltip("当前用户不可以!",'error');
			return;
		}
		var applyId = $("#factoringEndPayGridId").jqGrid('getCell',rowid,'applyId');
		//parent.loan.tabcut.childAddIframe("贷款明细",loan.basePath+"/borrower/toBorrowerInfo?userId="+userId  + "&menuId=800109" ,"loanDetailInfo",true);
		parent.loan.tabcut.childAddIframe("贷款信息",loan.basePath+"/league/loanDetail?menuId=800109&userId=" + userId + "&applyId=" + applyId ,true,true);
	}

}