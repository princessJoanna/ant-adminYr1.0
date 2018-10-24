loan.adjustquota = loan.adjustquota || {
	
	closePage:function(){
		loan.s_Pop_closedChild(false,false);
	},
	closePageRefresh:function(){
		loan.s_Pop_closedChild(true,false);
	},
	/**
	 * 执行提交
	 */
	submitAdjust:function(){
		var contractId=$("#contractId").val();
		var adjustAmount=$("#adjustAmount").val();
		if(adjustAmount == 0){
			loan.tooltip("调整金额为0，不需要调整","error");
			return;
		}
		var params={
				contractId:contractId,
				adjustAmount:adjustAmount,
				'menuId':'700909'
		}
		loan.ajaxDo({
			url:loan.basePath+"/contract/adjustQuota",
			params:params,
			successCallback:loan.adjustquota.closePageRefresh,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
};


$(function(){
	//重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",loan.adjustquota.closePage);
});