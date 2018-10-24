loan.addriskmodel = loan.addriskmodel || {
	/**
	 * 新增因子
	 * @returns
	 */
	addRiskFactor:function(){
		var menuId = $("#menuId").val();
		loan.s_addPop("新增风险因子",loan.basePath+"/riskFactor/toAddRiskFactor?menuId="+menuId,"",1000,500,{isChangeClose:true});	
	},
	/**
	 * 修改因子
	 */
	editFactor:function(id){
		var menuId = $("#menuId").val();
		var data=$("#factorGridId").jqGrid("getRowData", id);
		$('#rowId').val(id);
		loan.s_addPop("修改风险因子",loan.basePath+"/riskFactor/toEditRiskFactor?menuId="+menuId+"&factorId="+data.factorId,"",1000,500,{isChangeClose:true});
	},
	/**
	 * 删除因子
	 */
	deleteFactor:function(id){
		var menuId = $("#menuId").val();
		var data=$("#factorGridId").jqGrid("getRowData", id);
		loan.ajaxDo({
	        url:loan.basePath+"/riskFactor/deleteRiskFactor",
	        params:{'menuId':menuId,'factorId':data.factorId},
	        successCallback:function(result){
	        	$("#factorGridId").jqGrid("setGridParam", {   
	        		postData:{format:'json',"menuId":"400601",'modelId':$('#modelId').val()}
	            }).trigger('reloadGrid');
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},
	/**
	 * 查看因子
	 */
	showFactor:function(id){
		var menuId = $("#menuId").val();
		var data=$("#factorGridId").jqGrid("getRowData", id);
		$('#rowId').val(id);
		loan.s_addPop("查看风险因子",loan.basePath+"/riskFactor/toShowRiskFactor?menuId="+menuId+"&factorId="+data.factorId,"",1000,500,{isChangeClose:true});
	},
	submitModel:function(){
		if($('#modelType').val() == '-1'){
			loan.tooltip("请选择模型适用模块","error");
			return;
		}
		if(!$('#userType1 input[name="userType"]:checked').val()){
			loan.tooltip("请选择适用客户分类","error");
			return;
		}
		if(!$('#tradeType1 input[name="tradeType"]:checked').val()){
			loan.tooltip("请选择适用行业分类","error");
			return;
		}
		if($('#triggerType').val() == '-1'){
			loan.tooltip("请选择触发类型","error");
			return;
		}
		if($('#degreeId').val() == '-1'){
			loan.tooltip("请选择信用等级标准","error");
			return;
		}
		var datas = $("#factorGridId").jqGrid('getRowData');
		if(datas.length==0){
			loan.tooltip("请添加风险因子","error");
			return;
		}
		
		var riskModelBean={
			modelId:$('#modelId').val(),
			modelType:$('#modelType').val(),
			modelName:$('#modelName').val(),
			userType:$('#userType1 input[name="userType"]:checked').val(),
			tradeType:$('#tradeType1 input[name="tradeType"]:checked').val(),
			sumWeightRatio:$('#sumWeightRatio').val(),
			degreeId:$('#degreeId').val(),
			degreeName:$("#degreeId").find("option:selected").text(),
			triggerType:$('#triggerType').val(),
			triggerRule:$('#triggerRule').val(),
			remark:$('#remark').val(),
		};
		var url=loan.basePath+"/riskModel/addRiskModel";
		if($('#opType').val()){
			url=loan.basePath+"/riskModel/editRiskModel";
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
	},
	showDegree:function(){
		if($('#degreeId').val() == '-1'){
			loan.tooltip("请选择信用等级标准","error");
			return;
		}
		loan.s_addPop("查看信用等级详情",loan.basePath+"/riskDegree/toRiskDegreeInfo?degreeId="+$('#degreeId').val()+"&menuId="+$('#menuId').val(),"",640,400,{isRefresh:true,isChangeClose:true});
	}
};