loan.warrantrel = loan.warrantrel || {
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#rowid").val("");
		$("#warrantRelGridId").jqGrid("setGridParam", {   
			postData:{'format':'json'}
	    }).trigger('reloadGrid'); 
	},
	
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 新增担保关系按钮
	 */
	add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增担保关系",loan.basePath+"/guarantee/toAddGrtRlt?opType=add&menuId="+menuId+"&warrantRelId=0","AddGrtRlt",true,true);
	},
	
	/**
	 * 修改担保关系按钮
	 */
	edit : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var status = $("#warrantRelGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {
			loan.tooltip("只有未成立的担保关系可以修改","error");
			return;
		}
		//获取修改的id
		var id = $("#warrantRelGridId").jqGrid('getCell',rowid,'warrantRelId');
		parent.loan.tabcut.childAddIframe("修改担保关系",loan.basePath+"/guarantee/toAddGrtRlt?opType=up&menuId="+menuId+"&warrantRelId="+id,"editGrtRlt",true,true);
	},
	
	/**
	 * 删除担保关系按钮
	 */
	del : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var status = $("#warrantRelGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {
			loan.tooltip("只有未成立的担保关系可以删除","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该担保关系吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.warrantrel.delFunc(menuId,rowid);
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
		var id = $("#warrantRelGridId").jqGrid('getCell',rowid,'warrantRelId');
		loan.ajaxDo({
			url:loan.basePath+"/guarantee/delWarrantRel",
			params:{'menuId':menuId,'menuLog':'1','warrantRelId':id},
			successCallback:function(){
				loan.warrantrel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 注销担保关系按钮
	 */
	disable : function(menuId) {
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要注销的记录","error");
			return;
		}
		//校验状态，是否可以注销
		var status = $("#warrantRelGridId").jqGrid('getCell',rowid,'status');
		
		if(status != "1") {
			loan.tooltip("只有已成立的担保关系可以注销","error");
			return;
		}
		//确认是否要注销
		$.artDialog({
			title:"提示",
			content:"确定要注销该担保关系吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.warrantrel.disableFunc(menuId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 执行注销操作
	 */
	disableFunc:function(menuId,rowid){
		//获取要注销的id
		var id = $("#warrantRelGridId").jqGrid('getCell',rowid,'warrantRelId');
		loan.ajaxDo({
			url:loan.basePath+"/guarantee/disableWarrantRel",
			params:{'menuId':menuId,'menuLog':'1','warrantRelId':id},
			successCallback:function(){
				loan.warrantrel.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 担保成立按钮
	 */
	enable : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以成立
		var status = $("#warrantRelGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {
			loan.tooltip("只有未成立的担保关系可以成立","error");
			return;
		}
		
		//执行成立
		var id = $("#warrantRelGridId").jqGrid('getCell',rowid,'warrantRelId');
		loan.ajaxDo({
			url:loan.basePath+"/guarantee/enableWarrantRel",
			params:{'menuId':menuId,'menuLog':'1','warrantRelId':id},
			successCallback:function(){
				loan.warrantrel.freshGrid();//刷新页面
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
		var id = $("#warrantRelGridId").jqGrid('getCell',rowid,'warrantRelId');
		loan.s_addPop("查看详情",loan.basePath+"/guarantee/toWarrantRelInfo?warrantRelId="+id+"&menuId="+menuId,"",680,400,{isRefresh:true,isChangeClose:true});	
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号
		var contractNo ="";//合同号

		userType = $("#userType").val();
		userName = $("#userName").val();
		searchOrgId = $("#parentOrgId").val();
		contractNo = $("#contractNo").val();
		$("#rowid").val("");
		$("#warrantRelGridId").jqGrid("setGridParam", {   
			postData:{'userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,'contractNo':contractNo,
				'searchOrgId':searchOrgId,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 高级搜索按钮
	 */
	searchGreatFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号
		var contractNo ="";//合同号
		
		idKind = $("#idKind").val();
		idNo = $("#idNo").val();
		userType = $("#userType").val();
		userName = $("#userName").val();
		contractNo = $("#contractNo").val();
		$("#rowid").val("");
		$("#warrantRelGridId").jqGrid("setGridParam", {   
			postData:{'userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,'contractNo':contractNo,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	
};

	