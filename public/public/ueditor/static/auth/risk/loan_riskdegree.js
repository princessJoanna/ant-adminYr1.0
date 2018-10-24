loan.riskdegree = loan.riskdegree || {
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#rowid").val("");
		$("#degreeGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'7010'}
	    }).trigger('reloadGrid'); 
	},
	
	
	/**
	 * 新增风险等级按钮
	 */
	add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增风险等级",loan.basePath+"/riskDegree/toAddRiskDegree?menuId="+menuId+"&degreeId=0&opType=add","AddRiskDegree",true,true);
	},
	
	/**
	 * 修改风险等级按钮
	 */
	edit : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var status = $("#degreeGridId").jqGrid('getCell',rowid,'degreeStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险等级可以修改","error");
			return;
		}
		//获取修改的id
		var id = $("#degreeGridId").jqGrid('getCell',rowid,'degreeId');
		parent.loan.tabcut.childAddIframe("修改风险等级",loan.basePath+"/riskDegree/toAddRiskDegree?menuId="+menuId+"&degreeId="+id+"&opType=up","editRiskDegree",true,true);
	},
	
	/**
	 * 删除风险等级按钮
	 */
	del : function(menuId,rowid) {
		//校验状态，是否可以删除
		var status = $("#degreeGridId").jqGrid('getCell',rowid,'degreeStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险等级可以删除","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该风险等级吗？",
			ok:function(){
				loan.riskdegree.delFunc(menuId,rowid);
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
		var id = $("#degreeGridId").jqGrid('getCell',rowid,'degreeId');
		loan.ajaxDo({
			url:loan.basePath+"/riskDegree/delRiskDegree",
			params:{'menuId':menuId,'menuLog':'1','degreeId':id},
			successCallback:function(){
				loan.riskdegree.freshGrid();//刷新页面
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
		//校验状态，是否可以注销
		var status = $("#degreeGridId").jqGrid('getCell',rowid,'degreeStatus');
		if(status != "1") {
			loan.tooltip("只有已发布的风险等级可以注销","error");
			return;
		}
		//确认是否要注销
		$.artDialog({
			title:"提示",
			content:"确定要注销该风险等级吗？",
			ok:function(){
				loan.riskdegree.logoutFunc(menuId,rowid);
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
		var id = $("#degreeGridId").jqGrid('getCell',rowid,'degreeId');
		loan.ajaxDo({
			url:loan.basePath+"/riskDegree/logoutRiskDegree",
			params:{'menuId':menuId,'menuLog':'1','degreeId':id},
			successCallback:function(){
				loan.riskdegree.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 风险等级发布按钮
	 */
	publish : function(menuId) {
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要发布的等级","error");
			return;
		}
		//校验状态，是否可以发布
		var status = $("#degreeGridId").jqGrid('getCell',rowid,'degreeStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险等级可以发布","error");
			return;
		}
		
		//执行发布
		var id = $("#degreeGridId").jqGrid('getCell',rowid,'degreeId');
		loan.ajaxDo({
			url:loan.basePath+"/riskDegree/publishRiskDegree",
			params:{'menuId':menuId,'menuLog':'1','degreeId':id},
			successCallback:function(){
				loan.riskdegree.freshGrid();//刷新页面
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
		$("#rowid").val(rowid);
		var id = $("#degreeGridId").jqGrid('getCell',rowid,'degreeId');
		loan.s_addPop("查看详情",loan.basePath+"/riskDegree/toRiskDegreeInfo?degreeId="+id+"&menuId="+menuId,"",640,400,{isRefresh:true,isChangeClose:true});	
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var degreeName ="";
		degreeName = $("#degreeName").val();
		$("#rowid").val("");
		$("#degreeGridId").jqGrid("setGridParam", {   
			postData:{'degreeName':degreeName,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
};

	