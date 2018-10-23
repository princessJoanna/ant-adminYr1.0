loan.acctPublic = loan.acctPublic || {
	selectFn : function(rowid,status){
		if(status){
			$("#rowid").attr("value",rowid);
		}
	},
	
	/**
	 * 搜索
	 */
	searchFunc : function(){
		var userName = $('#userName').val();
		var leagueType = $('#leagueType :checked').val();
		var confirmStatus = $('#confirmStatus :checked').val();
		$("#acctPublic").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId': $('#rowId').val(),userName : userName , leagueType : leagueType, confirmStatus : confirmStatus}
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#acctPublic").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId': $('#rowId').val()}
	    }).trigger('reloadGrid'); 
	}
	
}