loan.caselist = loan.caselist || {
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	/**
	 * 导出案件
	 */
	exportCase : function(menuId){
		var rowids = $("#caseGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择案件","error"); 
			return;
		}
		var caseIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#caseGridId").jqGrid('getCell',rowids[i],'caseId');
	    	var caseId = vl+',';
	    	caseIds = caseIds + caseId;
	    }
	    window.location.href=loan.basePath+"/case/exportCase?caseIds=" +caseIds + "&menuId=" + menuId;
//		loan.ajaxDo({
//			url:loan.basePath+"/case/exportCase",
//			params:{'format':'json','menuLog':'1','caseIds':caseIds,'menuId':menuId},
//			successCallback:function(res){},
//			successTip:true, //提示
//			bizErrTip:true,  //提示
//			chainPar:this
//		});
	},
	

    /**
     * 查看案件详情
     * @param menuId
     * @param rowid
     */
	showCaseInfoBtn:function(menuId){
		var rowids = $("#caseGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length!=1){
			loan.tooltip("请选择一条案件","error"); 
			return;
		}
		var caseId = $("#caseGridId").jqGrid('getCell',rowids[0],'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?menuId="+menuId+"&caseId="+caseId,"toCaseInfo",true);
	},
	
	
	
	
	/**
	 * 查询
	 */
	searchFunc:function(){	
		
		var caseNo = $("#caseNo").val();
		var receiptNo = $("#receiptNo").val();
		var userName = $("#userName").val();
		var mobile = $("#mobile").val();
		
		var status="";
		if($("#status").val()!="-1"){
			status = $("#status").val();
		}
		
		var compareResult = compareDate($("#minCreateDateStr").val(),$("#maxCreateDateStr").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var minCreateDateStr = dateStrToStr($("#minCreateDateStr").val());
		var maxCreateDateStr = dateStrToStr($("#maxCreateDateStr").val());
		
		var minOverdueDays = $("#minOverdueDays").val();
		var maxOverdueDays = $("#maxOverdueDays").val();
		
		if(!(minOverdueDays==''&&maxOverdueDays=='')){
			if(!/^\+?[1-9][0-9]*$/.test(minOverdueDays)){
				loan.tooltip("最小天数请输入大于0的整数","error"); 
			    return;
			}
			if(!/^\+?[1-9][0-9]*$/.test(maxOverdueDays)){
				loan.tooltip("最大天数请输入大于0的整数","error"); 
			    return;
			}
			if(parseInt(minOverdueDays)>parseInt(maxOverdueDays)) {
				loan.tooltip("最小天数必须小于或等于最大天数","error"); 
				return;	
			}
		}
		
		
		$("#caseGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'120103','caseNo':caseNo,'receiptNo':receiptNo,'userName':userName,'mobile':mobile,
				'status':status,'minOverdueDays':minOverdueDays,'maxOverdueDays':maxOverdueDays,
				'minCreateDateStr':minCreateDateStr,'maxCreateDateStr':maxCreateDateStr,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#caseNo").val('');
		$("#receiptNo").val('');
		$("#userName").val('');
		$("#mobile").val('');
		$("#status").val('-1');
		$("#minCreateDateStr").val('');
		$("#maxCreateDateStr").val('');
		$("#minOverdueDays").val('');
		$("#maxOverdueDays").val('');
	},

};



/**
 * 把日期格式转化为纯数字格式字符
 */
function dateStrToStr(dateStr) {
	if(dateStr != null) {
		return dateStr.replace(/\-/g,"");
	}
	return dateStr;
}

/**比较日期的大小*/
function compareDate(startDate, endDate){
	var start=new Date(startDate.replace("-", "/").replace("-", "/"));
	var end=new Date(endDate.replace("-", "/").replace("-", "/")); 
	if(end<start){ 
        return true;  
    }else{
    	return false;
    }  
}




