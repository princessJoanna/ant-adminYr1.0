loan.sysparam = loan.sysparam || {
	editSysParamFn : function(rowid){
		$("#rowid").attr("value",rowid);
		loan.s_addPop("修改运行参数",loan.basePath+"/sysparam/tomodsysparam?menuId=100101","",690,390,{isRefresh:false});	
	},
	selectRowFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	searchFn :function(){
		var paraCnName = $("#paraCnName").val();
		$("#sysparamGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'1001','paraCnName':paraCnName,'paraEnName':paraCnName},
			page:1
	    }).trigger('reloadGrid');   
	}
}
