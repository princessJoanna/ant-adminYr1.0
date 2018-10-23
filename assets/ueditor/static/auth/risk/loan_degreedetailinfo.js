loan.degreedetailinfo = loan.degreedetailinfo || {
	
	
	
	initData:function(){
		var rowid = parent.$("#rowid").val();
		var target = parent.$("#detailGridId").jqGrid('getRowData',rowid);
		$("#detailName").html(target.degreeDetailName);
		$("#maxScore").html(target.maxScore);
		$("#minScore").html(target.minScore);
		$("#suggestBalance").html(target.suggestBalance);
		$("#suggestRatio").html(target.suggestRatio);
		$("#triggerStatusCn").html(target.triggerStatusCn);
		$("#remark").html(target.remark);
	},
	
	/**
	 * 关闭窗口
	 */
	closePage:function(){
		if(parent.$("#focus").length == 1) {
			parent.$("#focus").focus();
		}else if(parent.$("#degreeName").length == 1){
			parent.$("#degreeName").focus();
		}
		parent.$("#rowid").val("");
		loan.s_Pop_closedChild(false,false);
	},
	
	
}

$(function(){
	//重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",loan.degreedetailinfo.closePage);
});


