loan.blacklist = loan.blacklist || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#blacklistGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'8002'}
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 查看单条黑名单详情
	 */
	queryBlackDetail: function(blacklistId) {
		loan.ajaxDo({
			url:loan.basePath + "/blacklist/queryBlackDetail",
			params:{'menuId':'800205','menuLog':'1','format':'json','blacklistId':blacklistId},
			successCallback:loan.blacklist.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化单条黑名单详情
	 */
	initPage:function(result, gridId) {
		$("#customName").html(result.customName);
		$("#certTypeCn").html(result.certTypeCn);
		$("#certNoCn").html(result.certNoCn);
		$("#remark").html(result.remark);
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 检查选中项
	 */
	checkStatus:function(rowid) {
		var status = $("#blacklistGridId").jqGrid("getCell", rowid, "status");
		if(status != "0") {
			loan.tooltip("该黑名单不处于未生效状态，不得修改","error");
			return false;
		}
		return true;
	},
	
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
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
	 * 新增按钮
	 */
	addBtnFunc:function(){	
		parent.loan.tabcut.childAddIframe("加入黑名单",loan.basePath+"/blacklist/toAddBlack?menuId=800201","addblack",true,true);
	},
	
	/**
	 * 查看按钮
	 */
	viewBlackFunc:function(menuId, rowid) {
		var blacklistId = $("#blacklistGridId").jqGrid('getCell',rowid,'blacklistId');
		loan.s_addPop("查看黑名单详情",loan.basePath+"/blacklist/toViewBlack?menuId=" + menuId + "&blacklistId=" + blacklistId, "", 450, 300, {isRefresh:true,isChangeClose:true});
	},
	
	/**
	 * 删除按钮
	 */
	delBtnFunc:function(menuId,rowid){
		$("#rowid").val(rowid);
		var status = $("#blacklistGridId").jqGrid("getCell", rowid, "status");
		if(status != "0") {
			loan.tooltip("该黑名单不处于未生效状态，不得删除","error");
			return;
		}
		var title = "提示";
		var name = $("#blacklistGridId").jqGrid('getCell',rowid,'userName');
		var content = "确定要删除【"+name+"】的黑名单吗？";
		loan.blacklist.confirmDialog(title,content,loan.blacklist.delBlacklist);
	},
	
	/**
	 * 撤销按钮
	 */
	backBtnFunc:function(menuId,rowid){
		var status = $("#blacklistGridId").jqGrid("getCell", rowid, "status");
		if(status != "1") {
			loan.tooltip("该黑名单非生效状态，不得撤销","error");
			return;
		}
		$("#rowid").val(rowid);
		loan.s_addPop("撤销黑名单","toBackBlack?menuId=800204","",680,400,{isChangeClose:true});
	},
	
	/**
	 * 清空查询条件
	 */
	clearCondition:function() {
		$("#customType").val("");
		$("#certType").val("");
		$("#certNo").val("");
		$("#customName").val("");
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var customType = $("#customType").val();
		var customName = $("#customName").val();
		var certType = $("#certType").val();
		var certNo = $("#certNo").val();
		searchOrgId = $("#parentOrgId").val();
		$("#blacklistGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'8002','customType':customType,'customName':customName,
				'certType':certType,'certNo':certNo,
				'searchOrgId':searchOrgId,
				'format':'json'},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 删除
	 */
	delBlacklist:function() {
		var rowid = $("#rowid").val();
		var blacklistId = $("#blacklistGridId").jqGrid("getCell", rowid, "blacklistId");
		loan.ajaxDo({
			url:loan.basePath+"/blacklist/delBlacklist",
			params:{'menuId':'800203','menuLog':'1','format':'json','blacklistId':blacklistId},
			successCallback:loan.blacklist.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
	
	
}
	
	