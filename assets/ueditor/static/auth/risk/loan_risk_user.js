loan.riskUser = loan.riskUser || {

	toGradeModelPage:function(){
		parent.loan.tabcut.childAddIframe("手工评级",loan.basePath+"/risk/user/score/toAddRiskGrade","toGradeModelPage",true,true);
	},

	queryScorePaged : function(){
		var userName = $("#userName").val();
		var menuId = $("#menuId").val();
		$("#scoreGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId, 'userName':userName, 'format':'json'},
			page:1
	    }).trigger('reloadGrid');
	},
	
	queryAgreePaged : function(){
		var userName = $("#userName").val();
		var menuId = $("#menuId").val();
		$("#agreeGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId, 'userName':userName, 'format':'json'},
			page:1
	    }).trigger('reloadGrid');
	},
	
	queryscorerecore:function(menuId, rowId){
		var serialNo = $("#scoreGridId").jqGrid('getRowData',rowId).serialNo;
		parent.loan.tabcut.childAddIframe("跑分结果详细",loan.basePath+"/risk/user/score/torulerecorepage?menuId="+menuId+"&serialNo="+serialNo,"queryscorerecore",true,true);
	},
	
	queryagreerecore:function(menuId, rowId){
		var serialNo = $("#agreeGridId").jqGrid('getRowData',rowId).serialNo;
		parent.loan.tabcut.childAddIframe("准入结果详细",loan.basePath+"/risk/user/score/torulerecorepage?menuId="+menuId+"&serialNo="+serialNo,"queryscorerecore",true,true);
	},
	
	checkScoreResult:function(menuId, rowId){
		var serialNo = $("#scoreGridId").jqGrid('getRowData',rowId).serialNo;
		loan.ajaxDo({
			url: loan.basePath + "/risk/user/score/checkresult",
			params: {
				"menuId": menuId, 
				"format":"json",
				"serialNo": serialNo
			},
			successTip: false,
			successCallback: function(res) {
				$("#agreeGridId").jqGrid({}).trigger('reloadGrid');
			}
		});
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#userName").val('');
	},
	
	checkAgreeResult:function(menuId, rowId){
		var serialNo = $("#agreeGridId").jqGrid('getRowData',rowId).serialNo;
		loan.ajaxDo({
			url: loan.basePath + "/risk/user/score/checkresult",
			params: {
				"menuId": menuId, 
				"format":"json",
				"serialNo": serialNo
			},
			successTip: false,
			successCallback: function(res) {
				$("#agreeGridId").jqGrid({}).trigger('reloadGrid');
			}
		});
	}
	
}