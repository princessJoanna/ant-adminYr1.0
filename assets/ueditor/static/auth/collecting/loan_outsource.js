loan.outsource = loan.outsource || {
	
	toImportResult : function(menuId){
		console.log(menuId);
		loan.s_addPop("导入委外结果",loan.basePath+"/outsourceOrder/toImportResult?menuId="+menuId,"",650,400,{isChangeClose:true});

	},
	
	exportOutCase : function(menuId){
		var rowids = $("#outsource2").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择案件","error"); 
			return;
		}
		var orderIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#outsource2").jqGrid('getCell',rowids[i],'orderId');
	    	var orderId = vl+',';
	    	orderIds = orderIds + orderId;
	    }
	    window.location.href=loan.basePath+"/outsourceOrder/exportOutCase?orderIds=" +orderIds + "&menuId=" + menuId;
		
	},
	
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#outsource1").jqGrid("setGridParam", {   
			postData:{'format':'json'}
	    }).trigger('reloadGrid'); 
	},
	
	freshGrid2:function() {
		$("#outsource2").jqGrid("setGridParam", {   
			postData:{'format':'json'}
	    }).trigger('reloadGrid'); 
	},

	
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
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
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		parent.loan.outsource.freshGrid();
		loan.s_Pop_closedChild(false,false);
	},
	
	clearCondition : function() {
		$("#caseNo").val('');
		$("#receiptNo").val('');
		$("#userName").val('');	
		$("#mobile").val('');	
	},
	
	clearCondition2 : function() {
		$("#caseNo").val('');
		$("#orderNo").val('');
		$("#caseBatchNo").val('');	
		$("#queryEndDateInt").val('');	
		$("#companyName").val('');
		$("#status").val('');
		
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var caseNo = $("#caseNo").val();
		var receiptNo = $("#receiptNo").val();
		var userName = $("#userName").val();
		var mobile = $("#mobile").val();
		$("#outsource1").jqGrid("setGridParam", {   
			postData:{'caseNo':caseNo,'receiptNo':receiptNo,'userName':userName, 'mobile':mobile,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/** 拒绝协催按钮 */
	refuseOutsource : function(menuId,rowid){
		var com = $("#outsource1").jqGrid('getRowData',rowid);
		var orderId = com.orderId;
		var caseId = com.caseId;
		var receiptId = com.receiptId;
		var status = com.status;
			$.artDialog({
				title:"提示",
				content:"确定要拒绝吗？",
				ok:function(){
					loan.ajaxDo({
						url : loan.basePath + "/outsourceOrder/refuseOutsourceOrder",
						params : { "orderId" : orderId ,"caseId" : caseId ,"status" : status , "receiptId" : receiptId, format : 'json' , menuId : $('#menuId').val() },
						successCallback:function(result){
							loan.outsource.freshGrid();
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
	},
	
	
	/** 拒绝协催按钮2 */
	refuseOutsource2 : function(menuId,rowid){
		var com = $("#outsource2").jqGrid('getRowData',rowid);
		var orderId = com.orderId;
		var caseId = com.caseId;
		var receiptId = com.receiptId;
		var status = com.status;
		if(status == "2") {
			alert("该委外状态为已拒绝！");
			return;
		} else if(status == "3") {
			alert("该委外状态为已完成！");
			return;
		}
			$.artDialog({
				title:"提示",
				content:"确定要拒绝吗？",
				ok:function(){
					loan.ajaxDo({
						url : loan.basePath + "/outsourceOrder/refuseOutsourceOrder",
						params : { "orderId" : orderId ,"caseId" : caseId ,"status" : status , "receiptId" : receiptId, format : 'json' , menuId : $('#menuId').val() },
						successCallback:function(result){
							loan.outsource.freshGrid2();
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
	},
	
	
	/*
	 * 跳转受理委外映射页面
	 */
	agreeOutsource:function(menuId,rowid){
		$("#rowid").val(rowid);
		loan.s_addPop("受理委外",loan.basePath+"/outsourceOrder/toAgreeOutsource?menuId="+menuId,"",650,400,{isRefresh:true,isChangeClose:true});
	},
	
	/*
	 * 跳转查看案件详情页面1
	 */
 	showDetail : function(menuId, rowid) {
		var caseId = $("#outsource1").jqGrid('getCell',rowid,'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?menuId="+menuId+"&caseId="+caseId,"toCaseInfo",true);
 	},
 	
	
	/*
	 * 跳转查看案件详情页面1
	 */
 	showDetail2 : function(menuId, rowid) {
		var caseId = $("#outsource2").jqGrid('getCell',rowid,'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?menuId="+menuId+"&caseId="+caseId,"toCaseInfo",true);
 	},
	
	/**
	 * 搜索公司按钮
	 */
	searchCompany:function(){	
		var companyName = $("#companyName").val();
		$("#outsourceCompany").jqGrid("setGridParam", {   
			postData:{'companyName':companyName,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
 	/** 受理委外确认*/
	commitComplete : function(menuId, rowid) {
 		var parentrowid = parent.$("#rowid").val();
 		var outsource1 = parent.$("#outsource1").jqGrid('getRowData',parentrowid);
 		var orderId = outsource1.orderId;
 		var caseId = outsource1.caseId;
 		var receiptId = outsource1.receiptId;
 		var status = outsource1.status;
 		var endTime = "";
 		endTime = dateStrToStr($("#endTime").val());
 		var applyTime = "";
 		applyTime = dateStrToStr($("#applyTime").val());
		if(applyTime == ""){
        	loan.tooltip("请选择起始时间","error");
        	return;
        }
		if(endTime == ""){
        	loan.tooltip("请选择截止时间","error");
        	return;
        }
		if(applyTime > endTime) {
			loan.tooltip("起始时间应小于截止时间", "error");
			return;
		}
		rowid = $('#rowid').val();
		if(rowid == ''){
        	loan.tooltip("请选择催收公司","error");
        	return;
        }
		
 		var collectingCompanyId = $("#outsourceCompany").jqGrid('getCell',rowid,'companyId');
 		console.log(menuId);
		loan.ajaxDo({ 
			url:loan.basePath+"/outsourceOrder/agreeOutsourceOrder",
			params:{ "menuId" : menuId,"orderId":orderId,"caseId":caseId, "receiptId":receiptId,
				"status":status, "acceptTimeInt":applyTime, "endTimeInt":endTime,
				"collectingCompanyId":collectingCompanyId },
			successCallback:loan.outsource.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
 	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc2:function(){	
		var caseBatchNo = $("#caseBatchNo").val();
		var caseNo = $("#caseNo").val();
		var orderNo = $("#orderNo").val();
		var companyName = $("#companyName").val();
 		var queryEndDateInt = "";
 		queryEndDateInt = dateStrToStr($("#queryEndDateInt").val());
		var status = $("#status").val();
		if(status == -1){
			status = null;
		}
		$("#outsource2").jqGrid("setGridParam", {   
			postData:{'caseNo':caseNo,'orderNo':orderNo,'status':status,'caseBatchNo':caseBatchNo,
				'companyName':companyName,'queryEndDateInt':queryEndDateInt,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
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
};

function convertTime(cellvalue) {
	var reg = new RegExp("^[0-9]*$");
	if(reg.test(cellvalue)) {
		var date = new Date(Number(cellvalue));
		return date.Format("yyyy-MM-dd");
	}
	return "";
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


	