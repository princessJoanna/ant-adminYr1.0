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

loan.assist = loan.assist || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#assist").jqGrid("setGridParam", {   
			postData:{'format':'json'}
	    }).trigger('reloadGrid'); 
	},
	
	freshOrder:function() {
		$("#assistOrderGridId").jqGrid("setGridParam", {   
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
	
	/*
	 * 清空按钮
	 */
	clearCondition : function() {
		$("#caseNo").val('');
		$("#orderNo").val('');
		$("#status").val('');		
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
		parent.loan.assist.freshGrid();
		loan.s_Pop_closedChild(false,false);
	},
	
	closeChildWindow2 : function() {
		parent.$("#focus").focus();
		parent.loan.assist.freshOrder();
		loan.s_Pop_closedChild(false,false);
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var caseNo = $("#caseNo").val();
		var orderNo = $("#orderNo").val();
		var status = $("#status").val();
		if(status == -1){
			status = null;
		}
		$("#assist").jqGrid("setGridParam", {   
			postData:{'caseNo':caseNo,'orderNo':orderNo,'status':status,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	searchFunc2:function(){	
		var caseNo = $("#caseNo").val();
		var orderNo = $("#orderNo").val();
		var status = '0';
		$("#assist").jqGrid("setGridParam", {   
			postData:{'caseNo':caseNo,'orderNo':orderNo,'status':status,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	
	/** 拒绝协催按钮 */
	refuseAssist : function(menuId,rowid){
/*		var rowid = $("#rowid").val();	*/
		var com = $("#assist").jqGrid('getRowData',rowid);
		var orderId = com.orderId;
		var caseId = com.caseId;
		var status = com.status;
		if(status == "2") {
			alert("该订单状态为已拒绝！");
		} else if(status == "3") {
			alert("该订单状态为已完成！");
		} else {
			$.artDialog({
				title:"提示",
				content:"确定要拒绝吗？",
				ok:function(){
					loan.ajaxDo({
						url : loan.basePath + "/assistOrder/refuseAssistOrder",
						params : { "orderId" : orderId ,"caseId" : caseId ,"status" : status , format : 'json' , menuId : $('#menuId').val() },
						successCallback:function(result){
							loan.assist.freshGrid();
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
	},
	
	
	completeAssist:function(menuId,rowid){
		$("#rowid").val(rowid);
		loan.s_addPop("完成协催",loan.basePath+"/assistOrder/toCompleteAssist?menuId="+menuId,"",650,400,{isRefresh:true,isChangeClose:true});
	},
	
	initAssist:function(){
		//初始化数据
		var rowid = parent.$("#rowid").val();
		var assist = parent.$("#assist").jqGrid('getRowData',rowid);
		$("#applyDate").val(assist.applyDate);
		$("#assistType").val(assist.assistTypeCn);
		$("#applyDetail").val(assist.applyDetail);
	},

	queryAssistInfo:function (){
		var orderId=$("#orderId").val();
		loan.ajaxDo({
			url:loan.basePath+ "/assistOrder/queryAssistDetail",
			params:{'format':'json','menuLog':'1','orderId':orderId},
			successCallback:loan.assist.initializeAssist,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this,
			falseTip:true
		});
	},
	
	initializeAssist:function(result){
		//初始化数据
//		var rowid = parent.$("#rowid").val();
//		console.log(rowid);
//		prowid = $("#prowid").val();
//		console.log(prowid);
//		var assist = parent.$("#assistOrderGridId").jqGrid('getRowData',prowid);
		var assist = result.assistOrderDto;
		$("#orderNo").val(assist.orderNo);
		$("#assistTypeCn").val(assist.assistTypeCn);
		$("#opName").val(assist.opName);
		$("#statusCn").val(assist.statusCn);
		$("#assistDetail").val(assist.assistDetail);
		var applyDate=assist.applyDate;
		$("#applyDate").val(convertTime(applyDate));
	},
	
 	/** 完成协催确认*/
	commitComplete : function() {
 		var rowid = parent.$("#rowid").val();
 		var assist = parent.$("#assist").jqGrid('getRowData',rowid);
 		var orderId = assist.orderId;
 		var caseId = assist.caseId;
 		var status = assist.status;
		var endTime = $("#endTime").val();
		var assistDetail = $("#assistDetail").val();
		var flag=jQuery.trim(assistDetail)==''&&assistDetail.length>0;
		if(assistDetail==null||assistDetail==''||flag){
			loan.tooltip("请输入协催内容","error");
			return;
		}
	
		loan.ajaxDo({ 
			url:loan.basePath+"/assistOrder/completeAssistOrder",
			params:{"menuId":$('#menuId').val(),"orderId":orderId,"caseId":caseId,
				"status":status,
				"endTimeStr":endTime,"assistDetail":assistDetail},
			successCallback:loan.assist.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
 	},
	
 	/** 申请协催确认*/
	commitAdd : function() {

 		var caseId=$("#caseId").val();
		var assistType = $("#assistType").val();
		var applyDetail = $("#applyDetail").val();
		// debugger;
		var flag=jQuery.trim(applyDetail)==''&&applyDetail.length>0;
	    if(applyDetail==null||applyDetail==''||flag){
	    	loan.tooltip("请输入协催内容","error");
	    	return;
	    }
		loan.ajaxDo({ 
			url:loan.basePath+"/assistOrder/addAssistOrder",
			params:{"menuId":$('#menuId').val(),"caseId":caseId,
				"assistType":assistType,"applyDetail":applyDetail},
			successCallback:loan.assist.closeChildWindow2,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
 	},
 	
 	showDetail : function(menuId, rowid) {
		var caseId = $("#assist").jqGrid('getCell',rowid,'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?menuId="+menuId+"&caseId="+caseId,"toCaseInfo",true);
 	},
 	
};


function completeAssist(menuId,rowid){
	$("#rowid").val(rowid);
	var assist = $("#assist").jqGrid('getRowData',rowid);
	var status = assist.status;
	if(status == "2") {
    	loan.tooltip("该订单状态为已拒绝","error"); 
		return;
	} else if(status == "3") {
		loan.tooltip("该订单状态为已完成","error"); 
		return;
	} else {
		loan.s_addPop("完成协催",loan.basePath+"/assistOrder/toCompleteAssist?menuId="+menuId,"",650,400,{isRefresh:true,isChangeClose:true});
	}
};

function addAssist(rowid){
    var menuId=$("#menuId").val();
	var caseId=$("#caseId").val();
	loan.s_addPop("申请协催",loan.basePath+"/assistOrder/toAddAssist?menuId="+menuId+"&caseId="+caseId,"",650,400,{isRefresh:true,isChangeClose:true});
};

function assistDetail(menuId,rowid){
	var orderId = $("#assistOrderGridId").jqGrid("getCell", rowid, "orderId");
	parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/assistOrder/toAssistDetail?orderId="+orderId
			+"&menuId=" + menuId,"toAssistDetail",true);
};
/*
detail:function(){
    var menuId=$("#menuId").val();
	var ids = $("#letterOrderGridId").jqGrid("getGridParam", "selrow");
    if(ids==null){
    	loan.tooltip("请选择需要处理的案件","error"); 
		return;
    }
	 var orderId=$("#letterOrderGridId").jqGrid('getCell',ids,'orderId');
	parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/collecting/toLetterDetail?orderId="+orderId
			+"&menuId=" + menuId,"toLetterDetail",true);	
},*/


function convertTime(cellvalue) {
	var reg = new RegExp("^[0-9]*$");
	if(reg.test(cellvalue)) {
		var date = new Date(Number(cellvalue));
		return date.Format("yyyy-MM-dd");
	}
	return "";
}




	