loan.creditaudit = loan.creditaudit || {
	/**
	 * 初始化选项
	 */
	setSelect:function(id,chose) {
		if(!chose) {
			chose = '-1';
		}
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val(chose);
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#creditGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'6003'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#workUnit").val('');
		$("#certType").val('-1');
		$("#certNo").val('');
		$("#customType").val('-1');
		$("#customName").val('');
		$("#confirmStatus").val('0');
	},
	
	/**
	 * 搜索
	 */
	searchCredit:function() {
		var customType = $("#customType").val();
		var customName = "";
		var workUnit = "";
		var certType = $("#certType").val();
		var certNo = "";
		var confirmStatus = $("#confirmStatus").val();
		if($.trim($("#workUnit").val())!="") {
			workUnit = $("#workUnit").val();
		}
		if(certType && certType == "-1") {
			certType = "";
		}
		if($.trim($("#certNo").val())!="") {
			certNo = $("#certNo").val();
		}
		if(customType && customType == "-1") {
			customType = "";
		}
		if($.trim($("#customName").val())!="") {
			customName = $("#customName").val();
		}
		if(confirmStatus && confirmStatus == "-1") {
			confirmStatus = "";
		}
		$("#creditGridId").jqGrid("setGridParam", {   
			postData:{'customType':customType,'customName':customName,
				'workUnit':workUnit,'certType':certType,'certNo':certNo,
				'confirmStatus':confirmStatus,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 查询客户详情按钮
	 */
	lookCusBtnFunc:function(menuId,rowid) {
		$("#rowid").val(rowid);
		var userId = $("#creditGridId").jqGrid('getCell',rowid,'userId');
		parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?userId="+userId+"&&menuId="+menuId,"creditcusdetail",true);	
	},
	
	/**
	 * 审核按钮
	 */
	auditBtnFunc:function(menuId,rowid) {
		$("#rowid").val(rowid);
		var confirmstatus = jQuery("#creditGridId").jqGrid('getCell',rowid,'confirmStatus');
		var status = jQuery("#creditGridId").jqGrid('getCell',rowid,'status');
		if(confirmstatus != 0) {//0-未审核
			loan.tooltip("该授信已经不处于未授信状态","error");
			return;
		}
		if(status == 2) {//2-注销
			loan.tooltip("该授信已经被注销","error");
			return;
		}
		loan.s_addPop("审核授信",loan.basePath+"/credit/toExamCredit","",430,260,{isChangeClose:true});
	},
	
	/**
	 * 提交审核
	 */
	submitAudit:function() {
		var rowid = parent.$("#rowid").val();
		var creditId = parent.$("#creditGridId").jqGrid("getCell", rowid, "creditId");
		var userId = parent.$("#creditGridId").jqGrid("getCell", rowid, "userId");
		var confirmRemark = $("#confirmRemark").val();
		var confirmStatus = $("input[name='status']:checked").val();
		if($.trim(confirmStatus) == "") {
			loan.tooltip("请选择表决意见","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/credit/confirmCredit",
			params:{'menuId':'600301','menuLog':'1','format':'json','creditId':creditId,'userId':userId,
				'confirmRemark':confirmRemark,'confirmStatus':confirmStatus},
			successCallback:loan.creditaudit.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
}
