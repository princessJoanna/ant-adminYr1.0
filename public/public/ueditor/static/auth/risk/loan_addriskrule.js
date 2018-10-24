loan.addriskrule = loan.addriskrule || {
	/**
	 * 提交风险规则
	 */
	submitRule:function(){
		if(!$('#ruleFormula').val() || $.trim($('#ruleFormula').val())==""){
			loan.tooltip("规则表达式内容不能为空","error");
			return;
		}
		var param={
			ruleId:$('#ruleId').val(),
			modelId:parent.parent.$('#modelId').val(),
			factorId:parent.$('#factorId').val(),
			ruleName:$('#ruleName').val(),
			riskScore:$('#riskScore').val(),
			orderId:$('#orderId').val(),
			ruleFormula:$('#ruleFormula').val(),
			remark:$('#remark').val()
		};
		var url=loan.basePath+"/riskRule/addRiskRule";
		if($('#opType').val()){
			url=loan.basePath+"/riskRule/editRiskRule";
		}
		loan.ajaxDo({
	        url:url,
	        params:param,
	        successCallback:function(result){
	        	parent.$('#factorId').val(result.factorId);
	        	parent.$('#modelId').val(result.modelId);
	        	parent.parent.$('#modelId').val(result.modelId);
	        	parent.$("#ruleGridId").jqGrid("setGridParam", {   
	        		postData:{format:'json',"menuId":"400601",'factorId':result.factorId}
	            }).trigger('reloadGrid');
	        	loan.s_Pop_closedChild(false,false);
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},
};

