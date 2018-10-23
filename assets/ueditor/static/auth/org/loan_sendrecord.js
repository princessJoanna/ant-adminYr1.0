loan.sendrecord = loan.sendrecord || {
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	
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
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 放款按钮
	 */
	sendLoanBtn:function(menuId){	
		var ids=$('#sendRecordGridId').jqGrid('getGridParam','selarrrow');
		if(ids.length == 0){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var loanApplyIds = new Array();
		for(var i in ids){
			var rowObj = $('#sendRecordGridId').jqGrid('getRowData',ids[i]);
			loanApplyIds.push(rowObj.loanApplyId);
		}
		loan.ajaxDo({
            url:loan.basePath+"/sendloan/adminLoan",
            params:{ 'loanApplyIds':JSON.stringify(loanApplyIds),'format':'json','menuId':menuId,'menuLog':'1'},
            successCallback:function(result){
            	loan.sendrecord.searchFunc();
            },
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
	},
	

	/**
	 * 搜索按钮
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
		
		$("#sendRecordGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'7012','userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,'searchOrgId':searchOrgId,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 查看详情
	 */
	lookInfo:function(menuId,rowid){
		$("#rowid").val(rowid);
		var id = $("#sendRecordGridId").jqGrid('getCell',rowid,'loanApplyId');
		loan.s_addPop("查看详情",loan.basePath+"/loan/toSendApplyInfo?loanApplyId="+id+"&menuId="+menuId,"",680,450,{isRefresh:true,isChangeClose:true});	
	}
	
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
	
	