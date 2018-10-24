loan.faccontractlist = loan.faccontractlist || {

    /**
     * 查看保理合同详情
     * @param menuId
     * @param rowid
     */
	showFacContractInfoBtn:function(menuId,rowid){
		var facContractId = $("#facContractGridId").jqGrid('getCell',rowid,'facContractId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/league/toFaccontractDetail?menuId="+menuId+"&facContractId="+facContractId,"toFaccontractDetail",true);
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
		var userName = "" ;//客户名称
		var status = "";//保理合同状态
		if($("#leagueType").val()!="-1"){
			leagueType = $("#leagueType").val();
		}
		
		if($("#status").val()!="-1"){
			status = $("#status").val();
		}
	
		userName = $("#userName").val();

		$("#facContractGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'850105','leagueType':leagueType,'status':status,'userName':userName,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		
		$("#leagueType").val('-1');
		$("#userName").val('');
		$("#status").val('-1');
		
		
	},
}