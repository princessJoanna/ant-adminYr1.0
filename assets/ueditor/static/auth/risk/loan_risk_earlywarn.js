loan.riskEarlywarn = loan.riskEarlywarn || {
	queryEarlyWarn: function() {
		var userType = $("#userType").val();
		var userName = $("#userName").val();
		var tradeType = $("#tradeType").val();
		var productType = $("#productType").val();
		var idKind = $("#idKind").val();
		var idNo = $("#idNo").val();
		var menuId = $("#menuId").val();
		$("#earlyWarnGridId").jqGrid("setGridParam", {   
			postData:{
				'menuId':menuId, 
				'format':'json',
				'userType': userType,
				'userName': userName,
				'tradeType': tradeType,
				'productType': productType,
				'idKind': idKind,
				'idNo': idNo
			},
			page:1
	    }).trigger('reloadGrid');
	},
	toProcess: function() {
		var menuId = $("#menuId").val();
		var rowids = $("#earlyWarnGridId").jqGrid("getGridParam", "selarrrow");
		var ids = new Array();
		for(var i = 0 ; i < rowids.length; i ++) {
			var data = $("#earlyWarnGridId").jqGrid('getRowData',rowids[i]);
			if(data.status == 0) {
				ids.push(data.serialNo);
			}
		}
		if(ids.length<1){
			loan.tooltip("请选择未处理的贷后预警","error"); 
			return;
		}
		parent.loan.selectSerialNoArray = ids;
		parent.loan.tabcut.childAddIframe("预警处理",loan.basePath+"/earlywarn/toProcess?oper=update&menuId="+menuId,"toProcess",true,true);

	},
	submitProcess: function() {
		var processDesp = $("#processDesp").val();
		if(processDesp == "") {
			loan.tooltip("未填写预警处理描述","error"); 
			return;
		}
		var ids = parent.loan.selectSerialNoArray;
		// debugger;
		var arr = new Array();
		for(var i = 0; i < ids.length; i ++) {
			var obj = new Object();
			obj.serialNo = ids[i];
			obj.status = $("#status").val();
			obj.processDesp = $("#processDesp").val();
			arr.push(obj);
		}
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath + "/earlywarn/updateProcess",
			params: {
				"menuId": menuId, 
				"format":"json",
				"jsonStr": JSON.stringify(arr)
			},
			successTip: false,
			successCallback: function(res) {
				if(res.success) {
					loan.tooltip("预警处理成功","succeed");
					loan.tabcut.childClosedIframe(true);
				}else {
					loan.tooltip("预警处理失败","error");
				}
			}
		});
	},
	toProcessView: function(menuId, rowId) {
		var serialNo = $("#earlyWarnGridId").jqGrid('getRowData',rowId).serialNo;
		var status = $("#earlyWarnGridId").jqGrid('getRowData',rowId).status;
		if(status == "0") {
			loan.tooltip("该贷后预警信息未处理无处理详情","error"); 
			return;
		}
		parent.loan.tabcut.childAddIframe("预警处理详情",loan.basePath+"/earlywarn/toProcess?oper=view&menuId="+menuId+"&serialNo="+serialNo,"toProcessView",true,true);

		
	},
	toAnalysis: function(menuId) {
		loan.ajaxDo({
			url: loan.basePath + "/earlywarn/toAnalysis",
			params: {
				"menuId": menuId, 
				"type": "cus",
				"format":"json",
			},
			successTip: false,
			successCallback: function(res) {
				if(res.success) {
					loan.ajaxDo({
						url: loan.basePath + "/earlywarn/toAnalysis",
						params: {
							"menuId": menuId, 
							"type": "rec",
							"format":"json",
						},
						successTip: false,
						successCallback: function(res) {
							if(res.success) {
								loan.tooltip("预警分析成功","succeed");
								$("#earlyWarnGridId").trigger("reloadGrid");
							}else {
								loan.tooltip("预警分析失败","error");
							}
						}
					});
				}else {
					loan.tooltip("预警分析失败","error");
				}
			}
		});
	}
}