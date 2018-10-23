loan.facadvancepayment = loan.facadvancepayment || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#factoringAdvancePayment").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'850106'}
	    }).trigger('reloadGrid'); 
	},
	clearCondition : function() {
		$("#leagueType").val('');
		$("#shortName").val('');
		$("#endTime").val('');	
	},
	/**
	 * 预付款支付按钮
	 */
	pay :function(menuId){	
		var ids = $("#factoringAdvancePayment").jqGrid("getGridParam", "selarrrow");
	    if(ids.length < 1){
	    	loan.tooltip("请选择需要预付的保理合同！","error"); 
			return;
	    }
	    var data = '',preAmt = 0,actAmt = 0,balanceAmt = 0;
	    for(var i=0;i<ids.length;i++){
	    	var facContId = $("#factoringAdvancePayment").jqGrid('getCell',ids[i],'facContractId');
	    	data += facContId + (i == ids.length-1 ? '' : ',');
	    	var preAmount =  parseFloat($("#factoringAdvancePayment").jqGrid('getCell',ids[i],'preAmount') == '' ? '0' : $("#factoringAdvancePayment").jqGrid('getCell',ids[i],'preAmount'));
	    	var proAmount = parseFloat($("#factoringAdvancePayment").jqGrid('getCell',ids[i],'proAmount') == '' ? '0' : $("#factoringAdvancePayment").jqGrid('getCell',ids[i],'preAmount'));
	    	preAmt += preAmount;// 预付总额
	    	var balance = parseFloat($("#factoringAdvancePayment").jqGrid('getCell',ids[i],'facAmount') == '' ? '0' : $("#factoringAdvancePayment").jqGrid('getCell',ids[i],'facAmount'));
	    	balanceAmt += balance;// 账单总额
	    	var poundageAmount =  parseFloat($("#factoringAdvancePayment").jqGrid('getCell',ids[i],'poundageAmount') == '' ? '0' : $("#factoringAdvancePayment").jqGrid('getCell',ids[i],'poundageAmount'));
	    	var payType = parseInt($("#factoringAdvancePayment").jqGrid('getCell',ids[i],'payType'));
	    	if(payType == 0){
	    		preAmount = preAmount - poundageAmount;
	    	}
	    	actAmt  += preAmount;// 实付总额
	    }
	    
		loan.s_addPop("预付金额",loan.basePath+"/league/toPrePayAmt?menuId=" + menuId + "&ids=" + data 
				+ "&preAmt=" + preAmt + "&actAmt=" + actAmt + "&balanceAmt=" + balanceAmt,"",430,300);	
	},
	
	/**
	 * 确认提示框
	 */
	confirmDialog:function(dtitle,dcontent,callBackFunc) {
		$.artDialog({
			title:dtitle,
			content:dcontent,
			ok:callBackFunc,
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		
		var leagueType = "";//客户分类
		var shortName = "" ;//客户名称
		var endTime = "" ;//截止日期
		if($("#leagueType").val()!="-1"){
			leagueType = $("#leagueType").val();
		}

		shortName = $("#shortName").val();
		endTime=dateStrToStr($("#endTime").val());
		$("#factoringAdvancePayment").jqGrid("setGridParam", {   
			postData:{'menuId':'850106','leagueType':leagueType,'leagueSortName':shortName,'endTime':endTime,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},

	showAccReceivaleInfoBtn:function(menuId,rowid){	
		var facContractId = $("#factoringAdvancePayment").jqGrid('getCell',rowid,'facContractId');
		parent.loan.tabcut.childAddIframe("查看应收账单明细",loan.basePath+"/league/viewAccReceivaleDetail?facContractId="+facContractId
				 + "&menuId=" + menuId,"viewAccReceivaleDetail",true);
	},
};
/**
 * 把日期格式转化为纯数字格式字符
 */
function dateStrToStr(dateStr) {
	if(dateStr != null) {
		return dateStr.replace(/\-/g,"");
	}
	return dateStr;
};
	