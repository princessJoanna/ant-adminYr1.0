loan.caseclose = loan.caseclose || {

	confirmFunc:function(menuId){
		var caseIds = $("#caseIds").val();
		var remark = $("#remark").val();
		loan.ajaxDo({
			url:loan.basePath+"/case/closeCase",
			params:{'format':'json','menuLog':'1','caseIds':caseIds,'remark':remark,'menuId':menuId},
			successCallback:function(){
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},

};



