loan.addblack = loan.addblack || {
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
		loan.addblack.freshGrid();
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#blacklistGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'8002'}
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 新增执行
	 */
	executeAddBlack:function(result) {
		var black = result.pager.items;
		if(black && black.length > 0) {
			loan.tooltip("客户已列入黑名单","error");
			return;
		}
		var userId = $("#userId").val();
		var remark = $("#remark").val();
		loan.ajaxDo({
			url:loan.basePath+"/blacklist/addBlacklist",
			params:{'menuId':'800201','format':'json','userId':userId,'remark':remark},
			successCallback:loan.addblack.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 
	 */
	addBlacklist:function() {
		var userId = $("#userId").val();
		var remark = $("#remark").val();
		if(userId == "") {
			loan.tooltip("请选择要加入黑名单的客户","error");
			return;
		}
		var userId = $("#userId").val();
		var remark = $("#remark").val();
		loan.ajaxDo({
			url:loan.basePath+"/blacklist/addBlacklist",
			params:{'menuId':'800201','format':'json','userId':userId,'remark':remark},
			successCallback:loan.addblack.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			/*bizErrCallback:function(result) {
				var errorCode = result.errCode;
				if(errorCode == '0LE329501041') {
					loan.tooltip("该用户存在未审核的黑名单记录","error");
				} else if(errorCode == '0LE329501042') {
					loan.tooltip("该用户已加入黑名单","error");
				} else {
					loan.tooltip(result.errMsg,"error");
				} 
			},*/
			chainPar:this
		});
		/*loan.ajaxDo({
			url:loan.basePath+"/blacklist/queryBlacklistPaged",
			params:{'menuId':'800201','menuLog':'1','userId':userId,'page':'1','rows':'1','status':'1'},
			successCallback:loan.addblack.executeAddBlack,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});*/
		
	}
}