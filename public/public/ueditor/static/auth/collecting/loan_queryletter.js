loan.queryletter=loan.queryletter||{
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#status").val('');
		$("#caseNo").val('');
		$("#orderNo").val('');
	},
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var menuId=$("#menuId").val();
		var caseNo = $("#caseNo").val();//事件ID
		var orderNo =$("#orderNo").val();//工单ID
		var status=$('#status').val();
		$("#letterOrderGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'caseNo':caseNo,'orderNo':orderNo,'status':status,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 查看案件详情
	 */
	detail:function(menuId,rowId){
		 var caseId=$("#letterOrderGridId").jqGrid('getCell',rowId,'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?caseId="+caseId
				+"&menuId=" + menuId,"toLetterDetail",true);	
	},
	
	
	
}