loan.selectwarrant = loan.selectwarrant || {
	/**
	 * 选择确定
	 */
	submit:function(){
		var ids = $("#warrantGridId").jqGrid('getGridParam','selarrrow');
		if(!ids || ids.length == 0) {
			loan.tooltip("请选中要操作的行","error");
			return;
		}
		//父页面赋值
		$(ids).each(function (i, rowid){
			var rowObj = $("#warrantGridId").jqGrid('getRowData',rowid);
			var warrantIds = parent.$("#warrantGridId").jqGrid('getCol','warrantId');
			//判断父页面已添加该担保物标志
			var existFlag = false;
			if(warrantIds && warrantIds.length > 0) {
				for(var i = 0; i < warrantIds.length; i++) {
					if(rowObj.warrantId == warrantIds[i]) {
						existFlag = true;
						break;
					}
				}
			}
			//父页面未添加该担保物，添加
			if(!existFlag) {
				var parentIds = parent.$("#warrantGridId").jqGrid('getDataIDs');
				var newid = 1;
				if(parentIds){
					newid = parentIds.length + 1;
				}
				parent.$("#warrantGridId").jqGrid('addRowData',newid,rowObj);
			}
			
		});
		
		//关闭选择窗口
		loan.selectwarrant.closePage();
	},
	
	
	closePage:function(){
		if(parent.$("#focus").length == 1) {
			parent.$("#focus").focus();
		}else if(parent.$("#contractNo").length == 1){
			parent.$("#contractNo").focus();
		}
		loan.s_Pop_closedChild(false,false);
	}
	
}

$(function(){
	//重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",loan.selectwarrant.closePage);
});


