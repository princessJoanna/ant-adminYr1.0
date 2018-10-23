/**
 * 
 */
loan.casecollect = loan.casecollect || {
	startCollection:function(menuId){
		var rowids = $("#caseCollectGridId").jqGrid("getGridParam","selarrrow");
		if(rowids.length!=1){
			loan.tooltip("请选择一条案件","error"); 
			return;
		}    
		var caseId = $("#caseCollectGridId").jqGrid('getCell',rowids[0],'caseId');
		var data = $("#caseCollectGridId").jqGrid('getRowData',rowids[0]);
		parent.loan.tabcut.childAddIframe("开始催收",loan.basePath+"/collecting/toStartCollect?menuId="+menuId+"&caseId="+caseId+"&userId="+data.userId+"&receiptNo="+data.receiptNo+"&receiptId="+data.receiptId,"toStartCollect",true,true);
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function(result) {
		if(result.success){
			$("#caseCollectGridId").jqGrid("setGridParam", {   
				postData:{'format':'json'}
		    }).trigger('reloadGrid');
		}
	},
	
	/**
	 * 案件委外催收
	 */
	outCaseBtn:function(menuId){
		var rowids = $("#caseCollectGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择案件","error"); 
			return;
		}
		var caseIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#caseCollectGridId").jqGrid('getCell',rowids[i],'caseId');
	    	var caseId = vl+',';
	    	caseIds = caseIds + caseId;
	    }
	    
	    loan.ajaxDo({
			url:loan.basePath+"/case/assignOut",
			params:{'format':'json','menuLog':'1','caseIds':caseIds,'assignOutType':'1','menuId':menuId},
			successCallback:loan.casecollect.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 结案
	 */
	finishCase:function(menuId){
		var rowids = $("#caseCollectGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length!=1){
			loan.tooltip("请选择一条案件","error"); 
			return;
		}
		var caseId = $("#caseCollectGridId").jqGrid('getCell',rowids[0],'caseId');
		
		loan.ajaxDo({
			url:loan.basePath+"/case/finishCase",
			params:{'format':'json','menuLog':'1','caseId':caseId,'menuId':menuId},
			successCallback:loan.casecollect.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 退回委内案件
	 */
	rollbackCase:function(menuId){
		var rowids = $("#caseCollectGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length!=1){
			loan.tooltip("请选择一条案件","error"); 
			return;
		}
		var caseId = $("#caseCollectGridId").jqGrid('getCell',rowids[0],'caseId');
		
		loan.ajaxDo({
			url:loan.basePath+"/case/rollbackCase",
			params:{'format':'json','menuLog':'1','caseId':caseId,'menuId':menuId},
			successCallback:loan.casecollect.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 查询
	 */
	searchFunc:function(){	
		
		var caseNo = $("#caseNo").val();
		var receiptNo = $("#receiptNo").val();
		var userName = $("#userName").val();
		var mobile = $("#mobile").val();
		
		var minOverdueDays = $("#minOverdueDays").val();
		var maxOverdueDays = $("#maxOverdueDays").val();
		
		if(!(minOverdueDays==''&&maxOverdueDays=='')){
			if(!/^\+?[1-9][0-9]*$/.test(minOverdueDays)){
				loan.tooltip("最小天数请输入大于0的整数","error"); 
			    return;
			}
			if(!/^\+?[1-9][0-9]*$/.test(maxOverdueDays)){
				loan.tooltip("最大天数请输入大于0的整数","error"); 
			    return;
			}
			if(parseInt(minOverdueDays)>parseInt(maxOverdueDays)) {
				loan.tooltip("最小天数必须小于或等于最大天数","error"); 
				return;	
			}
		}
		

		$("#caseCollectGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'120102','caseNo':caseNo,'receiptNo':receiptNo,'userName':userName,'mobile':mobile,
				'minOverdueDays':minOverdueDays,'maxOverdueDays':maxOverdueDays,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#caseNo").val('');
		$("#receiptNo").val('');
		$("#userName").val('');
		$("#mobile").val('');
		$("#minOverdueDays").val('');
		$("#maxOverdueDays").val('');
	},

};



$(function(){
	loan.selFun('selAll'); 
	loan.selFun('adv');
	$('#startTime').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});	
	$('#endTime').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});
});