loan.survey = loan.survey || {
	/**新增*/
	addSurveyItemFn : function() {
		loan.s_addPop("新增贷前调查项",loan.basePath+"/org/addsurvey?menuId=400501","",650,430,{isRefresh:true});	
	},
	
	/** 选中行的触发事件*/
	selectRowFunc : function(rowid) {
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**修改*/
	editSurveyItem : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		var rowObj = $("#surveyItemGridId").jqGrid('getRowData',rowid);
		var publishStatus = rowObj.publishStatus;
		var status = rowObj.status;
		if(status == '0') {
			loan.tooltip("无效状态不能修改","error");
			return;
		}else{
			if(publishStatus == '1')  {
				loan.tooltip("该状态是发布状态不能修改","error");
				return;
			}
		}
		loan.s_addPop("修改贷前调查项",loan.basePath+"/org/editsurvey?menuId="+menuId,"",650,430,{isRefresh:true});	
	},
	
	/**删除*/
	del : function(menuId,rowid) {
		$("#rowid").val(rowid);
		var rowObj = $("#surveyItemGridId").jqGrid('getRowData',rowid);
		var publishStatus = rowObj.publishStatus;
		var status = rowObj.status;
		if(status == '0') {
			loan.tooltip("无效状态不能删除","error");
			return;
		}else{
			if(publishStatus == '1')  {
				loan.tooltip("已发布不可以删除只可以停用","error");
				return;
			}	
		}
		var title = "提示";
		var configName = $("#surveyItemGridId").jqGrid('getCell',rowid,'configName');
		var content = "确定要删除【"+configName+"】这一调查项吗？";
		loan.survey.confirmDialog(title,content,loan.survey.delPreLoan);
	},
	
	/**发布*/
	publishSurveyItem : function(menuId) {
		if($("#rowid").val() == ""){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var rowid = $("#rowid").val();
		var rowObj = $("#surveyItemGridId").jqGrid('getRowData',rowid);
		var status = rowObj.status;
		if(status == '0') {
			loan.tooltip("无效状态不能发布","error");
			return;
		}
		if(rowObj.publishStatus == "1"){
			loan.tooltip("该调查项已经是发布状态","error");
		}else{
			$.artDialog({
				title:'提示',
				content:"是否确定发布【"+rowObj.configName+"】调查项？",
				ok:function(){
					loan.survey.publishPreLoanFn(rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}
	},
	
	/**发布*/
	publishPreLoanFn : function(rowid) {
		var rowObj = $("#surveyItemGridId").jqGrid('getRowData',rowid);
		loan.ajaxDo({
	  		url:loan.basePath+"/org/publishPreLoan",
	  		params:{'menuId':'400505','preloanConfigId':rowObj.preloanConfigId,'publishStatus':'1','alternativeType':rowObj.alternativeType,'menuLog':'1'},
	  		successCallback:loan.survey.commSuccFun,
	  		successTip:true
	  	})
	},
	
	/**启用/禁用*/
	updatePreLoanStatus : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		if($("#rowid").val() == ""){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var rowid = $("#rowid").val();
		var rowObj = $("#surveyItemGridId").jqGrid('getRowData',rowid);
		if(rowObj.status == "1"){
			$.artDialog({
				title:'提示',
				content:"是否确定禁用【"+rowObj.configName+"】调查项？",
				ok:function(){
					loan.survey.disablePreLoanFn(rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}else{
			$.artDialog({
				title:'提示',
				content:"是否确定启用【"+rowObj.configName+"】调查项？",
				ok:function(){
					loan.survey.enablePreLoanFn(rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}
	},
	
	/**启用*/
	enablePreLoanFn : function(rowid) {
		var rowObj = $("#surveyItemGridId").jqGrid('getRowData',rowid);
		if(rowObj.status == "1"){
			loan.tooltip("该角色已经是启用状态","error");
		}else{
			loan.ajaxDo({
		  		url:loan.basePath+"/org/updatePreLoanStatus",
		  		params:{'menuId':'400504','preloanConfigId':rowObj.preloanConfigId,'status':'1','menuLog':'1'},
		  		successCallback:loan.survey.commSuccFun,
		  		successTip:true
		  	})
		}
	},
	
	/**禁用*/
	disablePreLoanFn : function(rowid) {
		var rowObj = $("#surveyItemGridId").jqGrid('getRowData',rowid);
		if(rowObj.status == "2"){
			loan.tooltip("该角色已经是禁用状态","error");
		}else{
			loan.ajaxDo({
		  		url:loan.basePath+"/org/updatePreLoanStatus",
		  		params:{'menuId':'400504','preloanConfigId':rowObj.preloanConfigId,'status':'0','menuLog':'1'},
		  		successCallback:loan.survey.commSuccFun,
		  		successTip:true
		  	})
		}
	},
	
	/**刷新当前页面*/
	commSuccFun : function(){
		loan.s_Pop_closedParent(true,false);
	},
	
	/**
	 * 确认提示框
	 */
	confirmDialog:function(dtitle,dcontent,callBackFunc) {
		$.artDialog({
			title:dtitle,
			content:dcontent,
			ok:callBackFunc,
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 删除功能
	 */
	delPreLoan:function() {
		var rowid = $("#rowid").val();
		var preloanConfigId = $("#surveyItemGridId").jqGrid('getCell',rowid,'preloanConfigId');
		loan.ajaxDo({
			url:loan.basePath+"/org/delPreLoan",
			params:{"menuId":"400503","preloanConfigId":preloanConfigId,'menuLog':'1'},
			successCallback:loan.survey.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		var ids = $("#surveyItemGridId").jqGrid('getDataIDs');
		if(ids.length == 1){
			loan.s_Pop_closedParent(true,false);
		}else{
			$("#surveyItemGridId").jqGrid("setGridParam", {   
				/*postData:{'format':'json'}*/
		    }).trigger('reloadGrid');
		}
		 
	},
	
	
	/**跳转到备选项管理页面*/
	manageSurveyItemFn : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		loan.s_addPop("备选项管理",loan.basePath+"/org/mngsurvey?menuId="+menuId,"",650,430,{isRefresh:true});
	},
	/**选中某行*/
	selectFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	
	/**点击搜索按钮*/
	sell_sellorderquery : function(){
		var configName = $("#configSurveyName").val();
		$("#surveyItemGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'4005','configName':configName},
			page:1
	    }).trigger('reloadGrid');
	}
};

$(window).resize(function(){
	loan.grid.mdetailconWidth("surveyItemGridId");
});