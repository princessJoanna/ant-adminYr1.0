loan.feeRate = loan.feeRate || {
	
	init : function(){
		/*if(window.console){
			console.log('利率调整列表页面。。。');
		}*/
	},
	selectFn : function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	view : function(menuId,rowid){
		$("#rowid").val(rowid);
		var rowData = $("#feeRateAdjustDataGrid").jqGrid("getRowData",rowid);
		var applyId = rowData.applyId;//
		if(applyId == ""){
			loan.tooltip("申请编号不存在，请重新选择!","error");
			return;
		}
		var url = "&applyId=" + applyId + "&loanApplyId=" + rowData.loanApplyId + "&userId=" + rowData.userId +"&receiptId=" + rowData.receiptId + "&userName=" + rowData.userName
		+ "&idKindCn=" + rowData.idKindCn + "&idNo=" + rowData.idNo + "&loanAmount=" + rowData.loanAmount + "&loanDate=" + rowData.loanDate
		+ "&limitDate=" + rowData.limitDate + "&interestRate=" + rowData.interestRate+"&oldDinterestRate=" + rowData.oldDinterestRate+  "&interestRatio=" + rowData.interestRatio + "&startDate=" 
		+ rowData.startDate + "&diInterestRatio=" + rowData.diInterestRatio + "&remark=" + rowData.remark;
		parent.loan.tabcut.childAddIframe("利率调整详情",loan.basePath+"/feeRateAdjust/toFeeRateAdjustInfo?menuId="+menuId+ url,"",true,true);
	},
	/** 搜索 */
	search : function(){
		var userType = $('#userType').val();
		var name = $('#name').val();
		var idKind = $('#idKind').val();
		var idNo = $('#idNo').val();
		var searchOrgId = $("#parentOrgId").val();
		$("#feeRateAdjustDataGrid").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId': $('#menuId').val() , userType : userType, name : name, idKind : idKind ,idNo : idNo,'searchOrgId':searchOrgId },
			page:1
		 }).trigger('reloadGrid'); 
	},
	clear : function(){
		$('#type,#name,#idKind,#idNo').val('');
	},
	/** 发起审批 */
	approve : function(menuId,rowid){
		$("#rowid").val(rowid);
		var rowData = $("#feeRateAdjustDataGrid").jqGrid("getRowData",rowid);
		var applyId = rowData.applyId;//
		if(!applyId){
			loan.tooltip("请选择审批的数据!","error");
			return;
		}
		var confirmStatus = rowData.confirmStatus;
		if(confirmStatus != 0){
			loan.tooltip("只有未审核的申请才能发起审批!","error");
			return;
		}
		var userId = rowData.userId;
		var idKind = rowData.idKind;
		var idNo = rowData.idNo;
		var userName = rowData.userName;
		loan.ajaxDo({
			url : loan.basePath + "/feeRateAdjust/startApproval",
			params : { applyId : applyId ,userId : userId,idKind : idKind,idNo:idNo , userName:userName , format : 'json' , menuId : menuId },
			successCallback:function(result){
				$("#feeRateAdjustDataGrid").jqGrid("setGridParam", {   
					postData:{'format':'json','menuId': $('#menuId').val()},
					page:1
				   }).trigger('reloadGrid'); 
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增利率调整",loan.basePath+"/feeRateAdjust/toAddFeeRateAdjust?menuId="+menuId,"AddAdjustRate",true,true);
	},
	/** 更新 */
	update : function(menuId,rowid){
		$("#rowid").val(rowid);
		var rowData = $("#feeRateAdjustDataGrid").jqGrid("getRowData",rowid);
		var applyId = rowData.applyId;//
		if(applyId == ""){
			loan.tooltip("申请编号不存在，请重新选择!","error");
			return;
		}
		var confirmStatus = rowData.confirmStatus;
		if(confirmStatus != 0){
			loan.tooltip("只有未审核的申请才能修改!","error");
			return;
		}
		var startDate = rowData.startDate;
		if(rowData.startDate){
			var date = rowData.startDate.toString();
			startDate = date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
		}
		var url = "&applyId=" + applyId + "&loanApplyId=" + rowData.loanApplyId + "&userId=" + rowData.userId +"&receiptId=" + rowData.receiptId + "&userName=" + rowData.userName
			+ "&idKindCn=" + rowData.idKindCn + "&idNo=" + rowData.idNo + "&loanAmount=" + rowData.loanAmount + "&loanDate=" + rowData.loanDate
			+ "&limitDate=" + rowData.limitDate +"&interestRate=" + rowData.interestRate+ "&interestRatio=" + rowData.interestRatio + "&startDate=" 
			+ startDate + "&diInterestRatio=" + rowData.diInterestRatio + "&remark=" + rowData.remark;
		parent.loan.tabcut.childAddIframe("更新申请",loan.basePath+"/feeRateAdjust/toUpdateFeeRateAdjust?menuId="+menuId+ url,"",true,true);
	},
	/** 删除 */
	del : function(menuId,rowid){
		$("#rowid").val(rowid);
		var rowData = $("#feeRateAdjustDataGrid").jqGrid("getRowData",rowid);
		var applyId = rowData.applyId;//
		if(applyId == ""){
			loan.tooltip("申请编号不存在，请重新选择!","error");
			return;
		}
		var confirmStatus = rowData.confirmStatus;
		if(confirmStatus != 0){
			loan.tooltip("只有未审核的申请才可以删除!","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该申请吗？",
			ok:function(){
				loan.ajaxDo({
					url : loan.basePath + "/feeRateAdjust/delFeeRateAdjust",
					params : { format : 'json' , menuId : menuId , applyId : applyId },
					successCallback:function(result){
						$("#feeRateAdjustDataGrid").jqGrid("setGridParam", {   
							postData:{'format':'json','menuId': $('#menuId').val()},
							page:1
						   }).trigger('reloadGrid'); 
					},
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
			},
			cancel:function(){
				return false;
			}
	    });
		
	}
	
}