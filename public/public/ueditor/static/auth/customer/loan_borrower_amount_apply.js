loan.amountApply=loan.amountApply||{
	
	/**
	 * 跳转查看风控详情页面
	 */
	viewRiskDetailBtn:function(menuId, rowid) {
		var rowData = $("#borrowerAmountApplyGridId").jqGrid("getRowData", rowid);
		var amountApplyId = rowData.amountApplyId;
		var userId = rowData.userId;
		parent.loan.tabcut.childAddIframe("查看风控详情", loan.basePath + "/borrower/toViewRiskDetail?menuId=" + menuId + "&amountApplyId=" + amountApplyId + "&userId=" + userId,"",true,true);
	},
	
	/**
	 * 跳转新增借款申请页面
	 */
	editAmountApplyBtn:function(menuId, rowid) {
		var rowData = $("#borrowerAmountApplyGridId").jqGrid("getRowData", rowid);
		var amountApplyId = rowData.amountApplyId;
		if (rowData.dealStatus != "0") {
			loan.tooltip("只能处理未处理的额度申请！", "error");
			return;
		}
		parent.loan.tabcut.childAddIframe("新增借款申请", loan.basePath + "/borrower/toAddLoanApply?amountApplyId=" + amountApplyId, "", true, true);
	},
	
	/**
	 * 触发拒绝额度申请
	 */
	disableApplyBtn:function(menuId, rowid){
		$("#rowid").val(rowid);
		$.artDialog({
			title:"提示",
			content:"确定要拒绝该申请吗？",
			isCloseBtn:true,
			cancel:true,
			ok:function(){
				loan.amountApply.disableApply(menuId);
			},
			isCloseicon:true
		});
	},
	
	/**
	 * 拒绝额度申请
	 */
	disableApply:function(menuId){
		var rowid = $("#rowid").val();
		var rowData = $("#borrowerAmountApplyGridId").jqGrid("getRowData", rowid);
		var amountApplyId = rowData.amountApplyId;
		if (rowData.dealStatus != "0") {
			loan.tooltip("只能拒绝未处理的额度申请！", "error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath + "/borrower/disableAmountApply",
			params:{menuId:menuId, format:'json', "amountApplyId":amountApplyId},
			successCallback:loan.amountApply.searchAmountApply,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 触发发起评级
	 */
	startRiskBtn:function(menuId, rowid){
		$("#rowid").val(rowid);
		var rowData = $("#borrowerAmountApplyGridId").jqGrid("getRowData", rowid);
		if ("1" != rowData.riskResult) {
			loan.tooltip("只有{人工审核}的额度申请，才能审核！", "error");
			return;
		}
		$.artDialog({
			title:"提示",
			content:"确认发起审核吗？",
			isCloseBtn:true,
			closeText:"不通过",
			cancel:function() {
				loan.amountApply.rejectApply(menuId);
			},
			okText:"通过",
			ok:function() {
				loan.amountApply.toAccept(menuId);
			},
			isCloseicon:true
		});
		
		
	},
	
	/**
	 * 人工审核【不通过】
	 */
	rejectApply:function(menuId){
		var rowid = $("#rowid").val();
		var rowData = $("#borrowerAmountApplyGridId").jqGrid("getRowData", rowid);
		var amountApplyId = rowData.amountApplyId;
		var riskResult = "2";
		if (!isNull(rowData.riskScore)) {
			loan.tooltip("已通过评级，请勿重新发起！", "error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath + "/borrower/startRiskToApply",
			params:{menuId:menuId, format:'json', "amountApplyId":amountApplyId, "riskResult":riskResult},
			successCallback:loan.amountApply.searchAmountApply,
			successTip:true, // 提示
			bizErrTip:true,  // 提示
			chainPar:this
		});
	},
	
	/**
	 * 人工审核通过
	 */
	toAccept:function(menuId){
		var rowid = $("#rowid").val();
		var rowData = $("#borrowerAmountApplyGridId").jqGrid("getRowData", rowid);
		var amountApplyId = rowData.amountApplyId;
		console.log(amountApplyId);
		var riskResult = "0";
		if (!isNull(rowData.riskScore)) {
			loan.tooltip("已通过评级，请勿重新发起！", "error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath + "/borrower/startRiskToApply",
			params:{menuId:menuId, format:'json', "amountApplyId":amountApplyId, "riskResult":riskResult},
			successCallback:loan.amountApply.searchAmountApply,
			successTip:true, // 提示
			bizErrTip:true,  // 提示
			chainPar:this
		});
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 查询
	 */
	searchAmountApply:function(){
		var userName = $("#userName").val();
		var dealStatus = $("#dealStatus").val();
		var idKind = $("#idKind").val();
		var idNo = $("#idNo").val();
		var productId = $("#productId").val();
		if (productId == -1) {
			productId = null;
		}
		$("#borrowerAmountApplyGridId").jqGrid("setGridParam", {   
			postData:{'userName':userName,'dealStatus':dealStatus,'format':'json','idKind':idKind,'idNo':idNo,'productId':productId},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#userName").val('');
		$("#dealStatus").val('-1');
		$("#idNo").val('');
		$("#idKind").val('-1');
		$("#productId").val('-1');
	},
	
	/**
	 * 初始化下拉框选项
	 */
	setSelect:function(id, chose) {
		if(!chose) {
			chose = '-1';
		}
		$("#" + id).prepend("<option value='-1'>所有</option>");
		$("#" + id).val(chose);
	},
	
	/**
	 * 初始化加载借款产品列表
	 */
	initProductList:function(){
    	loan.ajaxDo({
            url:loan.basePath + "/signProduct/queryProduct",
            params:{ 'menuId':'6008', 'format':'json'},
            successCallback:loan.amountApply.ajaxProductList,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 异步加载数据
	 */
	ajaxProductList:function(result){
		var productObj = $("#productId");
		var productList = result.list;
		for(var i = 0; i < productList.length; i++) {
			var productId = productList[i].productId;
			var productName = productList[i].productName;
			productObj.append("<option value='" + productId + "'\>" + productName + "<\li>");
		}
	},
}

/** 
* 判断是否null 
* @param data 
*/
function isNull(data){ 
	return (data == "" || data == undefined || data == null); 
}
