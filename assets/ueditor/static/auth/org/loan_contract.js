loan.contract = loan.contract || {
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#contractGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'7009'}
	    }).trigger('reloadGrid'); 
	},
	
	/**查看合同*/
	lookContract : function(menuId,rowId) {
		$("#rowid").attr("value",rowId);
		var rowObj = $("#contractGridId").jqGrid('getRowData',rowId);
		rowObj.orgId='1000';
		//rowObj.properties = new String(rowObj.userType).substr(0,1);
		var urlSuffix="?menuId="+menuId+"&param="+encodeURI(JSON.stringify(rowObj));
		parent.loan.tabcut.childAddIframe("查看合同",loan.basePath+"/org/previewContract"+urlSuffix,"previewContract",true);
		
		
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 查看详情按钮
	 */
	lookInfo:function(menuId,rowid){
		$("#rowid").val(rowid);
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/contract/toContractInfo?contractId="+id+"&menuId="+menuId,"contractinfo",true,true);
	},
	
	/**
	 * 修改合同额度
	 */
	editAmount:function(menuId,rowid){
		$("#rowid").val(rowid);
		var contractId = $("#contractGridId").jqGrid('getCell', rowid, 'contractId');
		var contractAmount = $("#contractGridId").jqGrid('getCell', rowid, 'contractAmount');
		loan.s_addPop("修改合同额度", loan.basePath + "/contract/toEditContractAmount?menuId=700904&&contractId=" + contractId + "&contractAmount=" + contractAmount, "", 500, 300, {isChangeClose:true});
	},
	
	adjustQuota:function(){
		var rowid=$("#rowid").val();
		if(rowid ==undefined || rowid== ""){
			loan.tooltip("请选择一条合同记录","error");
			return;
		}
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		//判断作废条件
		var contractStatus = $("#contractGridId").jqGrid('getCell',rowid,'contractStatus');
		if(contractStatus != "1") {
			loan.tooltip("暂封额度只能处理已通过审核的有效合同","error");
			return;
		}
		var status = $("#contractGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(status == "0") {
			loan.tooltip("无需暂封，可以修改合同额度","error");
			return;
		}
		if(status != "2") {
			loan.tooltip("暂封额度只能处理已通过审核的有效合同","error");
			return;
		}
		loan.s_addPop("暂封合同额度",loan.basePath+"/contract/toAdjustQuota?contractId="+id,"",500,300,{isChangeClose:true});
	},
	/**
	 * 再申请按钮
	 */
	add:function(menuId,rowid){
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		parent.loan.tabcut.childAddIframe("再申请",loan.basePath+"/contract/toEditContract?contractId="+id+"&menuId="+menuId,"addcontract",true,true);
	},
	/**
	 * 打印合同按钮
	 */
	print:function(menuId,rowid){
	},
	/**
	 * 作废合同按钮
	 */
	invalid:function(menuId){
		var rowid=$("#rowid").val();
		if(rowid ==undefined || rowid== ""){
			loan.tooltip("请选择一条合同记录","error");
			return;
		}
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		//判断作废条件
		var contractStatus = $("#contractGridId").jqGrid('getCell',rowid,'contractStatus');
		if(contractStatus != "1") {
			loan.tooltip("只能作废有效的合同","error");
			return;
		}
		var status = $("#contractGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(status == "0") {
			loan.tooltip("无需作废，可做相应修改","error");
			return;
		}
		if(status == "1") {
			loan.tooltip("审核中的合同，不能作废","error");
			return;
		}
		//确认作废
		$.artDialog({
			title:"提示",
			content:"确定要作废该合同吗？",
			ok:function(){
				//执行作废
				var rowid = $("#rowid").val();
				loan.contract.invalidFunc(rowid);
			},
			cancel:function(){
				return false;
			}
	    });
		
	},
	/**
	 * 执行作废合同
	 */
	invalidFunc:function(rowid){
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		loan.ajaxDo({
			url:loan.basePath+"/contract/invalidContract",
			params:{'menuId':'700903','menuLog':'1','contractId':id},
			successCallback:function(){
				loan.contract.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 终止合同按钮
	 */
	stop:function(menuId){
		var rowid=$("#rowid").val();
		if(rowid ==undefined || rowid== ""){
			loan.tooltip("请选择一条合同记录","error");
			return;
		}
		//终止判断条件
		var confirmStatus = $("#contractGridId").jqGrid('getCell',rowid,'confirmStatus');
		var contractStatus = $("#contractGridId").jqGrid('getCell',rowid,'contractStatus');
		if(contractStatus != "1") {
			loan.tooltip("只有有效合同可以进行提前终止操作","error");
			return;
		}
		if(confirmStatus != "2") {
			loan.tooltip("只有通过审核的合同可以进行提前终止操作","error");
			return;
		}
		//确认终止
		$.artDialog({
			title:"提示",
			content:"确定要终止该合同吗？",
			ok:function(){
				//执行终止
				var rowid = $("#rowid").val();
				loan.contract.stopFunc(rowid);
			},
			cancel:function(){
				return false;
			}
	    });
		
	},
	/**
	 * 执行终止合同
	 */
	stopFunc:function(rowid){
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		loan.ajaxDo({
			url:loan.basePath+"/contract/stopContract",
			params:{'menuId':'700907','menuLog':'1','contractId':id},
			successCallback:function(){
				loan.contract.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	setApp:function(menuId){
		var rowid=$("#rowid").val();
		if(rowid ==undefined || rowid== ""){
			loan.tooltip("请选择一条合同记录","error");
			return;
		}
		//判断条件
		var confirmStatus = $("#contractGridId").jqGrid('getCell',rowid,'confirmStatus');
		var contractStatus = $("#contractGridId").jqGrid('getCell',rowid,'contractStatus');
		var appStatus = $("#contractGridId").jqGrid('getCell',rowid,'appStatus');
		if(contractStatus != "1") {
			loan.tooltip("只有有效合同可以设置为APP合同","error");
			return;
		}
		if(confirmStatus == "3") {
			loan.tooltip("被否决合同不可以设置为APP合同","error");
			return;
		}
		if(appStatus == "1") {
			loan.tooltip("该合同已经是APP合同","error");
			return;
		}
		//确认设置为APP合同
		$.artDialog({
			title:"提示",
			content:"确定要设置该合同为APP合同吗？同一产品下的其他合同将会被设置为非APP合同",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.contract.setAppFunc(rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行设置为APP合同
	 */
	setAppFunc:function(rowid){
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		loan.ajaxDo({
			url:loan.basePath+"/contract/setAppContract",
			params:{'menuId':'700908','menuLog':'1','contractId':id},
			successCallback:function(){
				loan.contract.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 发起审核按钮
	 */
	confirm:function(menuId,rowid){
		//判断是否可以审核
		var confirmStatus = $("#contractGridId").jqGrid('getCell',rowid,'confirmStatus');
		var contractStatus = $("#contractGridId").jqGrid('getCell',rowid,'contractStatus');
		if(contractStatus != "1") {
			loan.tooltip("只有有效合同可以发起审批","error");
			return;
		}
		if(confirmStatus != "0") {
			loan.tooltip("只有未审核合同可以发起审批","error");
			return;
		}
		//执行
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		loan.ajaxDo({
			url:loan.basePath+"/contract/startConfirm",
			params:{'menuId':'700902','menuLog':'1','contractId':id},
			successCallback:function(){
				loan.contract.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 修改合同按钮
	 */
	edit:function(menuId,rowid){
		//判断是否可以完善
		var confirmStatus = $("#contractGridId").jqGrid('getCell',rowid,'confirmStatus');
		var contractStatus = $("#contractGridId").jqGrid('getCell',rowid,'contractStatus');
		if(contractStatus != "1") {
			loan.tooltip("只有有效合同可以修改","error");
			return;
		}
		if(confirmStatus != "0") {
			loan.tooltip("只有未审核的合同可以修改","error");
			return;
		}
		//打开完善修改页面
		var id = $("#contractGridId").jqGrid('getCell',rowid,'contractId');
		parent.loan.tabcut.childAddIframe("修改合同",loan.basePath+"/contract/toEditContract?menuId="+menuId+"&contractId="+id,"EditContract",true,true);
	},
	
	/**
	 * 搜索按钮按钮
	 */
	searchFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号

		userType = $("#userType").val();
		if(userType=='-1'){
			userType='';
		}
		idKind = $("#idKind").val();
		if(idKind=='-1'){
			idKind='';
		}
		userName = $("#userName").val();
		idNo = $("#idNo").val();
		searchOrgId = $("#parentOrgId").val();
		
		$("#contractGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'7009','userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,'searchOrgId':searchOrgId,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 清空
	 */
	clearSearch:function() {
		$("#userType").val('-1');
		$("#idKind").val('-1');
		$("#userName").val("");
		$("#idNo").val("");
	},
	
};

/**
 * 金额格式化
 * @param nData
 * @param decimalSeparator
 * @param decimalPlaces
 * @returns
 */
function formatMoney(nData,decimalSeparator,decimalPlaces) {
	var floatRegex = /^[0-9]+(\.[0-9]+)?$/ ;
	if(floatRegex.test(nData)) {
		var bNegative = (nData < 0);
		var sOutput = String(nData);
		var sDecimalSeparator = decimalSeparator || ".";
		var nDotIndex;
		var nDecimalPlaces = decimalPlaces || 2;
		var nDecimal = Math.pow(10, nDecimalPlaces);
		sOutput = String(Math.round(nData*nDecimal)/nDecimal);
		nDotIndex = sOutput.lastIndexOf(".");
		if(nDecimalPlaces > 0) {
			// Add the decimal separator
			if(nDotIndex < 0) {
				sOutput += sDecimalSeparator;
				nDotIndex = sOutput.length-1;
			}
			// Replace the "."
			else if(sDecimalSeparator !== "."){
				sOutput = sOutput.replace(".",sDecimalSeparator);
			}
			// Add missing zeros
			while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
				sOutput += "0";
			}
		}
		return sOutput;
	}
	return '';
}
	
