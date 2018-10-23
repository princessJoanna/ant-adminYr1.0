loan.addAdmitModel = loan.addAdmitModel || {

		seltargets:function(){
			var menuId = $("#menuId").val();
			var targetCodes = $("#targetCodes").val();
			var targetCompId =$('#targetCompId input[name="targetCompId"]:checked').val();
			if(targetCompId == null || targetCompId == ""){
				loan.tooltip("请先选择指标所属机构","error");
				return;
			}
			loan.s_addPop("选择指标",loan.basePath+"/ruleconfig/toTargets?menuId="+menuId+"&targetCodes="+targetCodes+"&targetCompId="+targetCompId,"",600,430,{isRefresh:false});
		},

		addTargets:function(targets){
			$("#targetCodes").val(targets.codes);
			$("#targetCodesCn").val(targets.names);
		},

	submitModel:function(){

		if(!$('#targetCodes').val() || $('#targetCodes').val() == ''){
			loan.tooltip("请选择关联指标","error");
			return;
		}

		var riskModelBean={
			modelCode:$('#modelCode').val(),
			modelName:$('#modelName').val(),
			targetCompId:$('#targetCompId input[name="targetCompId"]:checked').val(),
			modelId:$('#modelId').val(),
			remark:$('#remark').val(),
			targetCode:$('#targetCodes').val(),
			targetName:$('#targetCodesCn').val()
		};
		var url=loan.basePath+"/ruleconfig/addCreditreportModel";
		if(riskModelBean.modelId && riskModelBean.modelId !=""){
			url=loan.basePath+"/ruleconfig/editCreditReportModel";
		}
		loan.ajaxDo({
	        url:url,
	        params:riskModelBean,
	        successCallback:function(result){
	        	loan.tabcut.childClosedIframe(true);
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	}
};