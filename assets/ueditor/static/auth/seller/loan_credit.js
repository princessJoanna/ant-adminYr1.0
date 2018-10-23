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
var maxValue = 0;
var busiDate = -1;
loan.credit = loan.credit|| {
	/**
	 * 授信用户列表
	 */
	creditNoticeCustomList : function(){
		loan.s_addPop("授信短信通知客户列表",loan.basePath+"/credit/creditNoticeCustomList?menuId=600205","",1080,400,{isChangeClose:true});
	},
	
	/**
	 * 发送授信短信
	 */
	creditNoticeSendMsg : function(){
    	var noticeList = new Array();
    	var checkboxArray = $("#creditGridId").find("input[type=checkbox]");
		$(checkboxArray).each(function (i, item){
			var val = $(item).val();
			if($(item).prop("checked")){
				var creditId = $(item).parent().parent().find("td[aria-describedby=creditGridId_creditId]").attr("title");
				var userId = $(item).parent().parent().find("td[aria-describedby=creditGridId_userId]").attr("title");
				var amounts = $(item).parent().parent().find("td[aria-describedby=creditGridId_amounts]").attr("title");
				var beginDate = $(item).parent().parent().find("td[aria-describedby=creditGridId_beginDate]").attr("title");
				var endDate = $(item).parent().parent().find("td[aria-describedby=creditGridId_endDate]").attr("title");
				noticeList.push({'creditId': creditId,'userId':userId,'amounts':amounts,'beginDate':beginDate,'endDate':endDate});
			}
		});
		
		if(noticeList.length==0){
			loan.tooltip("请至少选择一位客户","error");
			return;
		};
		
		var noticeMsgList = JSON.stringify(noticeList);
        loan.ajaxDo({
            url:loan.basePath+"/credit/creditNoticeSendMsg",
            params:{'noticeMsgList':noticeMsgList,menuId:'600205','menuLog':'1',format:'json'},
            successCallback:loan.credit.closeChildWindow,
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
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
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#creditGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'6002'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
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
	 * 检查选中项
	 */
	checkStatus:function(rowid) {
		//var rowid = row==null?$("#rowid").val():row;
		if(rowid == null || rowid == "") {
			loan.tooltip("请选中要操作的行","error");
			return false;
		}
		//$("#rowid").val(rowid);
		return true;
	},
	
	
	/**
	 * 删除
	 */
	delCredit:function() {
		var rowid = $("#rowid").val();
		var creditId = $("#creditGridId").jqGrid("getCell", rowid, "creditId");
		loan.ajaxDo({
			url:loan.basePath+"/credit/delCredit",
			params:{'menuId':'600203','menuLog':'1','creditId':creditId},
			successCallback:loan.credit.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 注销
	 */
	cancelCredit:function() {
		var rowid = $("#rowid").val();
		var creditId = $("#creditGridId").jqGrid("getCell", rowid, "creditId");
		loan.ajaxDo({
			url:loan.basePath+"/credit/cancelCredit",
			params:{'menuId':'600204','menuLog':'1','creditId':creditId},
			successCallback:loan.credit.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
	},
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#workUnit").val('');
		$("#certType").val('-1');
		$("#certNo").val('');
		$("#customName").val('');
		$("#customType").val('-1');
		$("#status").val('-1');
	},
	
	/**
	 * 高级搜索
	 */
	advanceSearchCredit:function() {
		var workUnit = "";
		var certType = $("#certType").val();
		var certNo = "";
		var creditStatus = $("#creditStatus").val();
		if($.trim($("#workUnit").val())!="") {
			workUnit = $("#workUnit").val();
		}
		if(certType && certType == "-1") {
			certType = "";
		}
		if($.trim($("#certNo").val())!="") {
			certNo = $("#certNo").val();
		}
		$("#creditGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'6002','format':'json','customType':'','customName':'','status':'',
				'workUnit':workUnit,'certType':certType,'certNo':certNo,'creditStatus':creditStatus},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 搜索
	 */
	searchCredit:function() {
		var customType = $("#customType").val();
		var customName = "";
		var status =  $("#status").val();
		var searchOrgId = $("#parentOrgId").val();
		if(customType && customType == "-1") {
			customType = "";
		}
		if(status && status == "-1") {
			status = "";
		}
		if($.trim($("#customName").val())!="") {
			customName = $("#customName").val();
		}
		$("#creditGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'6002','customType':customType,'customName':customName,'status':status,
				'workUnit':'','certType':'','certNo':'','searchOrgId':searchOrgId,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
};

/**单元格校验*/
function check(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		return [false," ["+colname+"]不能为空！",''];
	}
	if(isNaN(cellvalue)){
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	if(Number(cellvalue) < 0){
		return [false," ["+colname+"]不能小于0 元！",''];
	}
	if(v_Regular.float.test(cellvalue)) {
		cellvalue = Number(Number(cellvalue).toFixed(2));
		var money = loan.numberToDX(cellvalue);
		var rowid = $("#rowid").val();
		var list = $("#creditDetailGridId").jqGrid('getRowData');
		var amount = 0;
		for(var i = 0; i < list.length; i++) {
			var m = Number(list[i].creditAmount);
			if(i == (rowid-1)){
				m = cellvalue;
			}
			amount=amount+m;
		}
		if(amount > maxValue) {
			return [false,"授信总额为"+amount+"元,不能大于"+maxValue+"元！",''];
		}
		$("#creditDetailGridId").jqGrid('setCell',rowid,'dx',money);
		$("#amounts").val(formatMoney(amount,".",2));//总额补零
	} else {
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	$("#rowid").val("");
	$("#iCol").val("");
	$("#cellName").val("");
	return [true,'',''];
}

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

function adjust(menuId,rowid) {
	$("#rowid").attr("value",rowid);
	var status = jQuery("#creditGridId").jqGrid('getCell',rowid,'status');
	var confirmStatus = jQuery("#creditGridId").jqGrid('getCell',rowid,'confirmStatus');
	var canModify = false;
	if(confirmStatus == 0 && status == 0){// 未审批未生效
		canModify = true;
	}
	if(confirmStatus == 2 && status == 1){// 同意生效
		canModify = true;
	}
	if(!canModify){
		loan.tooltip("该授信状态不能调整！","error");
		return;
	}
	var creditId = $("#creditGridId").jqGrid('getCell',rowid,'creditId');
	parent.loan.tabcut.childAddIframe("调整授信",loan.basePath+"/credit/toeditcredit?menuId="+menuId+"&creditId="+creditId + "&status=" + status + "&confirmStatus=" + confirmStatus,"adjustcredit",true,true);
}

function add(){
	parent.loan.tabcut.childAddIframe("新增授信",loan.basePath+"/credit/toaddcredit?menuId=600201","addcredit",true,true);
}

function del(menuId,rowid){
	$("#rowid").attr("value",rowid);
	if(loan.credit.checkStatus(rowid)){
		var confirmstatus = jQuery("#creditGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(confirmstatus != 0) {//0-未审核
			loan.tooltip("该授信已经不处于未授信状态，不可以删除","error");
			return;
		}
		var status = jQuery("#creditGridId").jqGrid('getCell',rowid,'status');
		if(status != 0) {//0-未生效
			loan.tooltip("该授信已经不处于未生效状态，不可以删除","error");
			return;
		}
		var title = "提示";
		var name = $("#creditGridId").jqGrid('getCell',rowid,'userName');
		var content = "确定要删除对【"+name+"】的授信吗？";
		loan.credit.confirmDialog(title,content,loan.credit.delCredit);
	}
}

function cancel(menuid,rowid){
	$("#rowid").attr("value",rowid);
	if(loan.credit.checkStatus(rowid)){
		var status = jQuery("#creditGridId").jqGrid('getCell',rowid,'status');
		var confirmStatus = jQuery("#creditGridId").jqGrid('getCell',rowid,'confirmStatus');
		if(status == 2) {//2、注销 已注销的记录不允许操作
			loan.tooltip("该授信已经注销","error");
			return;
		}
		if(confirmStatus == 0) {//0、注销 未审核的记录不允许操作
			loan.tooltip("该授信未审核不可以注销","error");
			return;
		}
		var title = "提示";
		var name = $("#creditGridId").jqGrid('getCell',rowid,'userName');
		var content = "确定要注销对【"+name+"】的授信吗？";
		loan.credit.confirmDialog(title,content,loan.credit.cancelCredit);
	}	
}

function look(menuId,rowid){
	$("#rowid").val(rowid);
	var creditId = $("#creditGridId").jqGrid('getCell',rowid,'creditId');
	loan.s_addPop("查看详情",loan.basePath+"/credit/tocreditdetail?menuId="+menuId+"&creditId="+creditId,"",680,450,{isRefresh:true,isChangeClose:true});	
}

function comment(){
	var userId = $("#userId").val();
	if($.trim(userId) == "") {
		loan.tooltip("未选择用户","error");
		return;
	}
	parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId=600201&&userId="+userId,"creditcusdetail",true);	
}

/**
 * 启动流程
 */
function startFlow(menuId,rowid){
	$("#rowid").val(rowid);
	var status = $("#creditGridId").jqGrid('getCell',rowid,'status');
	if(status == '2' || status == '3'){
		loan.tooltip("该条记录状态无效！请重新选择","error");
		return;
	}
	var confirmStatus = $("#creditGridId").jqGrid('getCell',rowid,'confirmStatus');
	if(parseInt(confirmStatus) >= 1){
		loan.tooltip("授信流程已经启动或完成！请重新选择","error");
		return;
	}
	var creditId = $("#creditGridId").jqGrid('getCell',rowid,'creditId');
	loan.ajaxDo({
		url:loan.basePath+"/credit/startConfirm",
		params:{menuId:'600207',format:'json',"creditId":creditId},
		successCallback:loan.credit.freshGrid,
		successTip:true, //提示
		bizErrTip:true,  //提示
		chainPar:this
	});
}