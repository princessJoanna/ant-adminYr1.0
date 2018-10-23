loan.contractAmount = loan.contractAmount || {
	
	/**
	 * 提交按钮
	 */
	submit : function(){
		var contractId = $('#contractId').val();
		var editAmount = $('#editAmount').val();
		loan.ajaxDo({
			url : loan.basePath + "/contract/editContractAmount",
			params : {format:'json', menuId:$('#menuId').val(), contractId:contractId, editAmount:editAmount},
			successCallback:function(result){
				parent.$("#contractGridId").jqGrid("setGridParam", {   
					postData:{'format':'json', 'menuId':'7009'},
					page:1
				   }).trigger('reloadGrid'); 
				if( parent.$('#focus').length > 0) {
					parent.$("#focus").focus();
				}
				loan.s_Pop_closedChild(false,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
}
