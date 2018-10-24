loan.collectingop = loan.collectingop || {
	
	/**
	 * 
	 * @param menuId
	 */
	submit:function(){
		var menuId = $("#menuId").val();
		var caseIds = $("#caseIds").val();
		var rowid = $("#collectingOpGridId").jqGrid("getGridParam", "selrow");
		if(rowid==null){
			loan.tooltip("请选择一位催收员","error"); 
			return;
		}
		var opId = $("#collectingOpGridId").jqGrid('getCell',rowid,'opId');
	    loan.ajaxDo({
			url:loan.basePath+"/case/innerAssignCase",
			params:{'format':'json','menuLog':'1','collectingOpId':opId,
				'caseIds':caseIds,'managerFlag':false,'menuId':menuId},
			successCallback:function(){
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 查询
	 */
	searchFunc:function(){	
		
		var opName = $("#opName").val();
		$("#collectingOpGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'','opName':opName,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	

};





