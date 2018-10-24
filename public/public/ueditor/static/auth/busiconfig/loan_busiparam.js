loan.busiparam = loan.busiparam || {
	editBusiParamFn : function(menuId,rowid){
		$("#rowid").attr("value",rowid);
		loan.s_addPop("修改业务参数",loan.basePath+"/busiparam/tomodbusiparam?menuId=400101","",650,380,{isRefresh:false});	
	},
	selectRowFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	searchFn :function(){
		var paraCnName = $("#paraCnName").val();
		$("#busiparamGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'4001','paraCnName':paraCnName,'paraEnName':paraCnName},
			page:1
	    }).trigger('reloadGrid');   
	}
}