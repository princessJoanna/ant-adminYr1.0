loan.riskmodel = loan.riskmodel || {
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	/**
	 * 跳转到新增页面
	 */
	add:function(menuId){
		parent.loan.tabcut.childAddIframe("新增评分卡",loan.basePath+"/riskModel/toAddRiskModel?menuId="+menuId,"addRiskModel",true,true);
	},
	/**
	 * 根据条件查询风险模型
	 */
	queryriskmodel:function(){
		var userType= "";//客户分类
		var modelName ="";//模型名称
		var modelStatus= "";//模型状态
		var menuId="";

		userType = $("#userType").val();
		if(userType=='-1'){
			userType='';
		}
		modelStatus = $("#modelStatus").val();
		if(modelStatus=='-1'){
			modelStatus='';
		}
		modelName = $("#modelName").val();
		menuId = $("#menuId").val();
		$("#modelGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'userType':userType,'modelName':modelName,
				'modelStatus':modelStatus,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid');
	},
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#modelGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':$('#menuId').val()}
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 修改风险模型按钮
	 */
	edit : function(menuId,rowid) {
		//$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var status = $("#modelGridId").jqGrid('getCell',rowid,'modelStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险模型可以修改","error");
			return;
		}
		//获取修改的id
		var id = $("#modelGridId").jqGrid('getCell',rowid,'modelId');
		parent.loan.tabcut.childAddIframe("修改风险模型",loan.basePath+"/riskModel/toEditRiskModel?menuId="+menuId+"&modelId="+id,"editRiskModel",true,true);
	},
	
	/**
	 * 删除风险等级按钮
	 */
	del : function(menuId,rowid) {
		//$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var status = $("#modelGridId").jqGrid('getCell',rowid,'modelStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险模型可以删除","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该风险模型吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.riskmodel.delFunc(menuId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行删除
	 */
	delFunc:function(menuId,rowid){
		//获取要删除的id
		var id = $("#modelGridId").jqGrid('getCell',rowid,'modelId');
		loan.ajaxDo({
			url:loan.basePath+"/riskModel/deleteRiskModel",
			params:{'menuId':menuId,'menuLog':'1','modelId':id},
			successCallback:function(){
				loan.riskmodel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 注销风险等级按钮
	 */
	logout : function(menuId,rowid) {
		if(!rowid) {
			loan.tooltip("请选择要注销的记录","error");
			return;
		}
		//校验状态，是否可以注销
		var status = $("#modelGridId").jqGrid('getCell',rowid,'modelStatus');
		
		if(status != "1") {
			loan.tooltip("只有已发布的风险模型可以注销","error");
			return;
		}
		//确认是否要注销
		$.artDialog({
			title:"提示",
			content:"确定要注销该风险模型吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.riskmodel.logoutFunc(menuId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 执行注销操作
	 */
	logoutFunc:function(menuId,rowid){
		//获取要注销的id
		var id = $("#modelGridId").jqGrid('getCell',rowid,'modelId');
		loan.ajaxDo({
			url:loan.basePath+"/riskModel/logoutRiskModel",
			params:{'menuId':menuId,'menuLog':'1','modelId':id},
			successCallback:function(){
				loan.riskmodel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 风险模型发布按钮
	 */
	publish : function(menuId) {
		var rowid=$("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要发布的记录","error");
			return;
		}
		//校验状态，是否可以发布
		var status = $("#modelGridId").jqGrid('getCell',rowid,'modelStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险模型可以发布","error");
			return;
		}
		
		//执行发布
		var id = $("#modelGridId").jqGrid('getCell',rowid,'modelId');
		loan.ajaxDo({
			url:loan.basePath+"/riskModel/publishRiskModel",
			params:{'menuId':menuId,'menuLog':'1','modelId':id},
			successCallback:function(){
				loan.riskmodel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 下架
	 */
	soldOut:function(menuId){
		var rowid=$("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要下架的记录","error");
			return;
		}
		//校验状态，是否可以下架
		var status = $("#modelGridId").jqGrid('getCell',rowid,'modelStatus');
		if(status != "1") {
			loan.tooltip("只有已发布的风险模型可以下架","error");
			return;
		}

		//执行下架
		var id = $("#modelGridId").jqGrid('getCell',rowid,'modelId');
		loan.ajaxDo({
			url:loan.basePath+"/riskModel/soldOutRiskModel",
			params:{'menuId':menuId,'menuLog':'1','modelId':id},
			successCallback:function(){
				loan.riskmodel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 重新发布
	 */
	rePublish:function(menuId){
		var rowid=$("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要重新发布的记录","error");
			return;
		}
		//校验状态，是否可以重新发布
		var status = $("#modelGridId").jqGrid('getCell',rowid,'modelStatus');
		if(status != "2") {
			loan.tooltip("只有已下架的风险模型可以重新发布","error");
			return;
		}

		//执行重新发布
		var id = $("#modelGridId").jqGrid('getCell',rowid,'modelId');
		loan.ajaxDo({
			url:loan.basePath+"/riskModel/rePublishRiskModel",
			params:{'menuId':menuId,'menuLog':'1','modelId':id},
			successCallback:function(){
				loan.riskmodel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 查看详情按钮
	 */
	lookInfo:function(menuId,rowid){
		//$("#rowid").val(rowid);
		var id = $("#modelGridId").jqGrid('getCell',rowid,'modelId');
		parent.loan.tabcut.childAddIframe("查看风险模型",loan.basePath+"/riskModel/toShowRiskModel?menuId="+menuId+"&modelId="+id,"",true,true);
	}
	
	
};

	