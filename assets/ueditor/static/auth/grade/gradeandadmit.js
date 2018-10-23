loan.grademodel = loan.grademodel || {
	
	rowid:0,
	/**
	 * 新增评分模型
	 */
	addGrade:function(menuId){
		parent.loan.tabcut.childAddIframe("新增评分模型",loan.basePath+"/ruleconfig/toAddGradeModel?menuId="+menuId,"addGradeModel",true,true);
	},
	/**
	 * 新增准入模型
	 */
	addAdmit:function(menuId){
		parent.loan.tabcut.childAddIframe("新增规则模型",loan.basePath+"/ruleconfig/toAddAdmittanceModel?menuId="+menuId,"addAdmittanceModel",true,true);
	},
		addCreditReport:function(menuId){
			parent.loan.tabcut.childAddIframe("新增征信报告模型",loan.basePath+"/ruleconfig/toAddCreditReportModel?menuId="+menuId,"aaddCreditReportModel",true,true);
		},
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#ruleModelGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':$('#menuId').val()}
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 删除风险等级按钮
	 */
	del : function(menuId,rowid) {
		//$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var status = $("#ruleModelGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {//0为未发布
			loan.tooltip("只有未发布的模型才可以删除","error");
			return;
		}
		var modelId = $("#ruleModelGridId").jqGrid('getCell',rowid,'modelId');
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该模型吗？",
			ok:function(){
				loan.grademodel.delFunc(modelId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行删除
	 */
	delFunc:function(modelId,rowid){

		loan.ajaxDo({
	        url:loan.basePath+"/ruleconfig/del",
	        params:{'modelId':modelId},
	        successCallback:function(result){
				loan.grademodel.freshGrid();
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},
	/**
	 * 修改模型按钮
	 */
	edit : function(menuId,rowid) {
		var status = $("#ruleModelGridId").jqGrid('getCell',rowid,'status');
		if(status == "1") {//1为已发布
			loan.tooltip("已发布的模型不可以修改","error");
			return;
		}
		var type =  $("#ruleModelGridId").jqGrid('getCell',rowid,'modelType');
		//获取修改的id
		var id = $("#ruleModelGridId").jqGrid('getCell',rowid,'modelId');
		if(type == 0) {//0是评分模型
			parent.loan.tabcut.childAddIframe("修改评分模型",loan.basePath+"/ruleconfig/toEditGradeModel?menuId="+menuId+"&modelId="+id,"editGradeModel",true,true);
		}else if(type == 2){
			parent.loan.tabcut.childAddIframe("修改征信报告模型",loan.basePath+"/ruleconfig/toEditCreditReportModel?menuId="+menuId+"&modelId="+id,"editCreditReportModel",true,true);
		}else {
			parent.loan.tabcut.childAddIframe("修改规则模型",loan.basePath+"/ruleconfig/toEditAdmittanceModel?menuId="+menuId+"&modelId="+id,"editAdmitModel",true,true);
		}
		
	},
	lookInfo: function(menuId,rowid) {
		//获取修改的id
		var id = $("#ruleModelGridId").jqGrid('getCell',rowid,'modelId');
		var type =  $("#ruleModelGridId").jqGrid('getCell',rowid,'modelType');
		if(type == 0) {//0是评分模型
			parent.loan.tabcut.childAddIframe("查看评分模型",loan.basePath+"/ruleconfig/toShowGradeModel?menuId="+menuId+"&modelId="+id,"editGradeModel",true,true);
		}else if(type == 2){
			parent.loan.tabcut.childAddIframe("查看征信报告模型",loan.basePath+"/ruleconfig/toShowCreditReportModel?menuId="+menuId+"&modelId="+id,"editCreditReport",true,true);
		}else {
			parent.loan.tabcut.childAddIframe("查看规则模型",loan.basePath+"/ruleconfig/toShowAdmittanceModel?menuId="+menuId+"&modelId="+id,"editAdmitModel",true,true);
		}
	},
	/**
	 * 发布按钮
	 */
	pub : function(menuId,rowid) {
		//校验状态，是否可以发布
		var status = $("#ruleModelGridId").jqGrid('getCell',rowid,'status');
		if(status == "1") {
			loan.tooltip("此模型已发布","error");
			return;
		}
		var modelId = $("#ruleModelGridId").jqGrid('getCell',rowid,'modelId');
		//确认是否要发布
		$.artDialog({
			title:"提示",
			content:"确定要发布此模型吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.grademodel.pubFunc(modelId,menuId);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行发布
	 */
	pubFunc : function(modelId,menuId) {
		//执行发布
		
		loan.ajaxDo({
			url:loan.basePath+"/ruleconfig/publishRuleModel",
			params:{'menuId':menuId,'modelId':modelId},
			successCallback:function(){
				loan.grademodel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 下架按钮
	 */
	soldOut : function(menuId,rowid) {

		//校验状态，是否可以下架
		var status = $("#ruleModelGridId").jqGrid('getCell',rowid,'status');
		if(status != "1") {
			loan.tooltip("只有已发布的模型才可以下架","error");
			return;
		}
		var modelId = $("#ruleModelGridId").jqGrid('getCell',rowid,'modelId');
		//确认是否要下架
		$.artDialog({
			title:"提示",
			content:"确定要下架该模型吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.grademodel.soldOutFunc(menuId,modelId);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行下架
	 */
	soldOutFunc : function(menuId,modelId) {

		loan.ajaxDo({
			url:loan.basePath+"/ruleconfig/soldOutRuleModel",
			params:{'menuId':menuId,'modelId':modelId},
			successCallback:function(){
				loan.grademodel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 查看详情
	 */
	showRule:function(id){
		var menuId = $("#menuId").val();
		var data=$("#ruleModelGridId").jqGrid("getRowData", id);
		$('#rowId').val(id);
		loan.s_addPop("查看详情",loan.basePath+"/ruleconfig/toShowAdmittanceModel?menuId="+menuId+"&ruleId="+data.modelId,"",600,300,{isChangeClose:true});
	},
	/**
	 * 提交准入模型
	 */
	submitModel:function(){
		if($('#modelName').val() == '-1'){
			loan.tooltip("请输入模型名称","error");
			return;
		}
		if($('#模型Code').val() == '-1'){
			loan.tooltip("请输入模型Code","error");
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
			loan.tooltip("请选关联指标","error");
			return;
		}
		var datas = $("#factorGridId").jqGrid('getRowData');
		if(datas.length==0){
			loan.tooltip("请添加风险因子","error");
			return;
		}
		
		var ruleModelBean={
			modelId:$('#modelId').val(),
			modelType:$('#modelType').val(),
			modelName:$('#modelName').val(),
			userType:$('#userType1 input[name="userType"]:checked').val(),
			tradeType:$('#tradeType1 input[name="tradeType"]:checked').val(),
			sumWeightRatio:$('#sumWeightRatio').val(),
			degreeName:$("#degreeId").find("option:selected").text(),
			remark:$('#remark').text(),
		};
		var url=loan.basePath+"/ruleconfig/addAdmittanceModel";
		if($('#opType').val()){
			url=loan.basePath+"/ruleconfig/editAdmittanceModel";
		}
		
		loan.ajaxDo({
	        url:url,
	        params:ruleModelBean,
	        successCallback:function(result){
	        	loan.tabcut.childClosedIframe(true);
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

