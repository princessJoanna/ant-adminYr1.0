loan.guarantee = loan.guarantee || {
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#warrantGridId").jqGrid("setGridParam", {   
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
	 * 新增保证人按钮
	 */
	add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增保证人",loan.basePath+"/guarantee/toAddGuarantee?opType=add&menuId="+menuId,"AddGuarantee",true,true);
	},
	
	/**
	 * 修改保证人按钮
	 */
	edit : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var status = $("#warrantGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {
			loan.tooltip("只有状态为未登记的保证人可以修改","error");
			return;
		}
		//获取修改的id
		var id = $("#warrantGridId").jqGrid('getCell',rowid,'warrantId');
		parent.loan.tabcut.childAddIframe("修改保证人",loan.basePath+"/guarantee/toAddGuarantee?opType=up&menuId="+menuId+"&warrantId="+id,"edittoGuarantee",true,true);
	},
	
	/**
	 * 删除保证人按钮
	 */
	del : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var status = $("#warrantGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {
			loan.tooltip("只有状态为未登记的保证人可以删除","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该保证人吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.guarantee.delFunc(rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行删除
	 */
	delFunc:function(rowid){
		//获取要删除的id
		var id = $("#warrantGridId").jqGrid('getCell',rowid,'warrantId');
		loan.ajaxDo({
			url:loan.basePath+"/guarantee/deleteWarrant",
			params:{'menuId':'','menuLog':'1','warrantId':id},
			successCallback:function(){
				$("#rowid").val('');
				loan.guarantee.freshGrid();//刷新页面
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
		var id = $("#warrantGridId").jqGrid('getCell',rowid,'warrantId');
		loan.s_addPop("查看详情",loan.basePath+"/guarantee/toGuaranteeInfo?warrantId="+id+"&menuId="+menuId,"",680,450,{isRefresh:true,isChangeClose:true});	
	},
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号
        var searchOrgId="";
		userType = $("#userType").val();
		userName = $("#userName").val();
		searchOrgId = $("#parentOrgId").val();
		
		$("#warrantGridId").jqGrid("setGridParam", {   
			postData:{'userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,'searchOrgId':searchOrgId,
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
		userType= $("#userType").val();//客户分类
		userName =$("#userName").val();//客户名称
		idKind= $("#idKind").val();//证件类型
		idNo =$("#idNo").val();//证件号
		
		$("#warrantGridId").jqGrid("setGridParam", {   
			postData:{'userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	
};

	