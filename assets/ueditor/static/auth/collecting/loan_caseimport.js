loan.caseimport = loan.caseimport || {

	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function(result) {
		if(result.success){
			$("#caseImportGridId").jqGrid("setGridParam", {   
				postData:{'format':'json'}
		    }).trigger('reloadGrid');
		}
	},
	
	/**
	 * 案件核对
	 * @param menuId
	 */
	checkCaseBtn:function(menuId){
		var rowids = $("#caseImportGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择案件","error"); 
			return;
		}
		var caseIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#caseImportGridId").jqGrid('getCell',rowids[i],'caseId');
	    	var caseId = vl+',';
	    	caseIds = caseIds + caseId;
	    }
	    
	    $.artDialog({
			title:"提示",
			content:"确定核对吗？",
			ok:function(){
				loan.ajaxDo({
					url:loan.basePath+"/case/checkCase",
					params:{'format':'json','menuLog':'1','caseIds':caseIds,'menuId':menuId},
					successCallback:loan.caseimport.freshGrid,
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
			},
			cancel:function(){
				return false;
			}
		});
	},
	
	/**
	 * 查询
	 */
	searchFunc:function(){	
		
		var caseNo = $("#caseNo").val();
		var receiptNo = $("#receiptNo").val();
		var userName = $("#userName").val();
		var mobile = $("#mobile").val();
		
	
		var createTimeStr = dateStrToStr($("#createTimeStr").val());
		
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
		

		$("#caseImportGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'120101','caseNo':caseNo,'receiptNo':receiptNo,'userName':userName,'mobile':mobile,
				'status':status,'minOverdueDays':minOverdueDays,'maxOverdueDays':maxOverdueDays,
				'createTimeStr':createTimeStr,'format':'json'},
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
		$("#createTimeStr").val('');
		$("#minOverdueDays").val('');
		$("#maxOverdueDays").val('');
	},
	
	
	import : function(menuId){
		loan.s_addPop("导入案件",loan.basePath+"/case/toImportCase?menuId="+menuId,"",900,400,{isChangeClose:true});
	}
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



