loan.addriskfactor = loan.addriskfactor || {
	
	/**
	 * 新增规则
	 */
	addRiskRule:function(){
		var menuId = $("#menuId").val();
		loan.s_addPop("新增配置项",loan.basePath+"/riskRule/toAddRiskRule?menuId="+menuId+"&modelId="+$('#modelId').val()+"&factorId="+$('#factorId').val(),"",600,300,{isChangeClose:true});
	},
	/**
	 * 修改规则
	 */
	editRule:function(id){
		var menuId = $("#menuId").val();
		var data=$("#ruleGridId").jqGrid("getRowData", id);
		$('#rowId').val(id);
		loan.s_addPop("修改配置项",loan.basePath+"/riskRule/toEditRiskRule?menuId="+menuId+"&ruleId="+data.ruleId,"",600,300,{isChangeClose:true});
	},
	/**
	 * 删除规则
	 */
	deleteRule:function(id){
		var menuId = $("#menuId").val();
		var data=$("#ruleGridId").jqGrid("getRowData", id);
		loan.ajaxDo({
	        url:loan.basePath+"/riskRule/deleteRiskRule",
	        params:{'menuId':menuId,'ruleId':data.ruleId},
	        successCallback:function(result){
	        	$("#ruleGridId").jqGrid("setGridParam", {   
	        		postData:{format:'json',"menuId":"400601",'factorId':$('#factorId').val()}
	            }).trigger('reloadGrid');
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},
	/**
	 * 查看规则
	 */
	showRule:function(id){
		var menuId = $("#menuId").val();
		var data=$("#ruleGridId").jqGrid("getRowData", id);
		$('#rowId').val(id);
		loan.s_addPop("查看配置项",loan.basePath+"/riskRule/toShowRiskRule?menuId="+menuId+"&ruleId="+data.ruleId,"",600,300,{isChangeClose:true});
	},
	/**
	 * 提交风险规则
	 */
	submitFactor:function(){
		if($("#factorType").val() == '-1'){
			loan.tooltip("请选择风险因子类型","error");
			return;
		}
		if($('#calculateType').val() == '-1'){
			loan.tooltip("请选择计算方式","error");
			return;
		}
		var datas = $("#ruleGridId").jqGrid('getRowData');
		if(datas.length==0){
			loan.tooltip("请添加风险因子配置项","error");
			return;
		}
		var weightRatio=$('#weightRatio').val();
		if(weightRatio>1){
			loan.tooltip("所选权重不能大于1","error");
			return;
		}
		var param={
			factorId:$('#factorId').val(),
			modelId:parent.$('#modelId').val(),
			factorName:$("#factorName").val(),
			calculateType:$('#calculateType').val(),
			calculateFormula:$('#calculateFormula').val(),
			factorUnit:$('#factorUnit').val(),
			factorType:$("#factorType").val(),
			weightRatio:$('#weightRatio').val(),
			orderId:$('#orderId').val(),
			remark:$('#remark').val()
		};
		var url=loan.basePath+"/riskFactor/addRiskFactor";
		if($('#opType').val()){
			url=loan.basePath+"/riskFactor/editRiskFactor";
		}
		loan.ajaxDo({
	        url:url,
	        params:param,
	        successCallback:function(result){
	        	parent.$('#modelId').val(result.modelId);
	        	parent.$("#factorGridId").jqGrid("setGridParam", {   
	        		postData:{format:'json',"menuId":"400601",'modelId':result.modelId}
	            }).trigger('reloadGrid');
	        	loan.s_Pop_closedChild(false,false);
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},
	closePage:function(){
		loan.s_Pop_closedChild(false,false);
	}
};

