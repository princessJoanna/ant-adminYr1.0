loan.blackaudit = loan.blackaudit || {
	
	setSelect:function(id,chose) {
		if(!chose) {
			chose = '-1';
		}
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val(chose);
	},
	
	/**
	 * 查看审核信息
	 */
	queryConfirmBlackDetail: function(blacklistId) {
		loan.ajaxDo({
			url:loan.basePath + "/blacklist/queryConfirmBlackDetail",
			params:{'menuId':'800302','menuLog':'1','format':'json','blacklistId':blacklistId},
			successCallback:loan.blackaudit.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	initPage:function(result, gridId) {
		$("#confirmContent").html(result.confirmContent);
		if (result.status == '1') {
			$("#status").html("同意");
		} else if (result.status == '3') {
			$("#status").html("否决");
		}
	},
	
	/**
	 * 清空查询条件
	 */
	clearCondition:function() {
		$("#customType").val("-1");
		$("#certType").val("-1");
		$("#status").val("-1");
		$("#certNo").val("");
		$("#customName").val("");
	},
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var customType = $("#customType").val();
		var customName = '';
		var status = $("#status").val();
		var certType = $("#certType").val();
		var certNo = '';
		searchOrgId = $("#parentOrgId").val();
		if(certType && certType == "-1") {
			certType = "";
		}
		if(status && status == "-1") {
			status = "";
		}
		if($("#certNo").val()) {
			certNo = $("#certNo").val();
		}
		if(customType && customType == "-1") {
			customType = "";
		}
		if($("#customName").val()) {
			customName = $("#customName").val();
		}
		$("#blacklistGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'8003','customType':customType,'customName':customName,
				'certType':certType,'certNo':certNo,'status':status,
				'searchOrgId':searchOrgId,
				'format':'json'},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#blacklistGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'8003'}
	    }).trigger('reloadGrid'); 
	},
	
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
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
	 * 检查选中项
	 */
	checkStatus:function(rowid) {
		var status = $("#blacklistGridId").jqGrid("getCell", rowid, "status");
		if(status != "0") {
			loan.tooltip("该黑名单不处于未生效状态","error");
			return false;
		}
		return true;
	},
	
	/**
	 * 审核按钮
	 */
	btnAuditFunc:function(menuId,rowid) {
		if(loan.blackaudit.checkStatus(rowid)) {
			$("#rowid").val(rowid);
			loan.s_addPop("审核",loan.basePath+"/blacklist/toExamBlack?menuId=800301","",430,260,{isChangeClose:true});
		}
	},
	
	/**
	 * 查看按钮
	 */
	viewBlackAuditFunc:function(menuId, rowid) {
		var status = $("#blacklistGridId").jqGrid('getCell',rowid,'status');
		if (status == '0') {
			loan.tooltip("该黑名单未生效，不能查看审核详情", "error");
			return false;
		}
		var blacklistId = $("#blacklistGridId").jqGrid('getCell',rowid,'blacklistId');
		loan.s_addPop("查看黑名单审核详情",loan.basePath+"/blacklist/toViewBlackAudit?menuId=" + menuId + "&blacklistId=" + blacklistId, "", 430, 260, {isRefresh:true,isChangeClose:true});
	},
	
	/**
	 * 提交审核
	 */
	submitAudit:function() {
		var rowid = parent.$("#rowid").val();
		var blacklistId = parent.$("#blacklistGridId").jqGrid("getCell", rowid, "blacklistId");
		var userId = parent.$("#blacklistGridId").jqGrid("getCell", rowid, "userId");
		var content = $("#confirmContent").val();
		var status = $("input[name='status']:checked").val();
		if($.trim(status) == "") {
			loan.tooltip("请选择表决意见","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/blacklist/confirmBlacklist",
			params:{'menuId':'800301','menuLog':'1','format':'json','blacklistId':blacklistId,'confirmContent':content,
				'status':status,'userId':userId},
			successCallback:loan.blackaudit.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
}

function look(){	
	parent.loan.tabcut.childAddIframe("查看客户详情",loan.basePath+"/customer/toCusDetail?menuId=8003","cusdetail",true,true);
}
function role(){
		
}
$(window).resize(function(){
	loan.grid.mdetailconWidth("userGridId");
})