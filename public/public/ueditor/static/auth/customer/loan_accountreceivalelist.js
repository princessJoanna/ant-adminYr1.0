loan.accountreceivalelist = loan.accountreceivalelist || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#receiveAccount").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'850104'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	

	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
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
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	/**
	 * 附件查询
	 * @param menuId
	 * @param rowid
	 */
	showAccountInfoBtn:function(menuId,rowid){	
		var userId = $("#receiveAccount").jqGrid('getCell',rowid,'userId');
		var leagueId = $("#receiveAccount").jqGrid('getCell',rowid,'leagueId');
		var receiveAcctId=$("#receiveAccount").jqGrid('getCell',rowid,'receiveAcctId')
		parent.loan.tabcut.childAddIframe("附件查询",loan.basePath+"/league/acctReceAttach?userId="+userId
				+"&leagueId=" + leagueId + "&menuId=" + menuId+"&receiveAcctId="+receiveAcctId,"acctReceAttach",true);
	},
	/**
	 * 保理按钮
	 */
	addFactorContract :function(menuId){	
		var ids = $("#receiveAccount").jqGrid("getGridParam", "selarrrow");
	    if(ids.length<1){
	    	loan.tooltip("请选择需要保理的应收账单","error"); 
			return;
	    }
	    var id=$("#receiveAccount").jqGrid('getCell',ids[0],'leagueId');
	    for(var i=0;i<ids.length;i++){
		    var status=$("#receiveAccount").jqGrid('getCell',ids[i],'status');
	    	if(status!="1"){
	    		loan.tooltip("请选择已转让的应收帐单","error"); 
				return;
	    	};
	    	if(id!=$("#receiveAccount").jqGrid('getCell',ids[i],"leagueId")){
	    		loan.tooltip("请选择同一加盟商的应收帐单","error"); 
				return;
	    	};
	    }
	    var acctIds = '';
	    for(var i = 0;i <ids.length;i++){
	    	var vl = $("#receiveAccount").jqGrid('getCell',ids[i],'receiveAcctId');
	    	var acctId = vl+',';
	    	acctIds = acctIds + acctId;
	    }
		parent.loan.tabcut.childAddIframe("保理页面",loan.basePath+"/league/toFactoring?menuId="+menuId + "&data=" +acctIds,"toFactoring",true,true);
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		
		var leagueType = "";//加盟商分类
		var shortName = "";//加盟商名称
		var status = "" ;//应收账单状态
		var orderTime = "";//订单起始时间
		var validTime= "";//订单终止时间
		if($("#leagueType").val()!="-1"){
			leagueType = $("#leagueType").val();
		}
		if($("#status").val()!="-1"){
			status = $("#status").val();
		}
		shortName=$("#shortName").val();
		orderTime=dateStrToStr($("#orderTime").val());
		validTime=dateStrToStr($("#validTime").val());
		$("#receiveAccount").jqGrid("setGridParam", {   
			postData:{'menuId':'850104','leagueType':leagueType,'shortName':shortName,'status':status,'orderTime':orderTime,'validTime':validTime,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
		var compareResult = compareDate($("#orderTime").val(),$("#validTime").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
	},
	
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#leagueType").val('-1');
		$("#status").val('-1');
		$("#shortName").val('');
		$("#orderTime").val('');
		$("#validTime").val('');
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
};
/**
 * 比较时间
 * @param startDate
 * @param endDate
 * @returns {Boolean}
 */
function compareDate(startDate, endDate){
	var start=new Date(startDate.replace("-", "/").replace("-", "/"));
	var end=new Date(endDate.replace("-", "/").replace("-", "/")); 
	if(end<start){ 
        return true;  
    }else{
    	return false;
    }  
}


$(function(){
	loan.selFun('selAll'); 
	loan.selFun('adv');
	$('#orderTime').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});	
	$('#validTime').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});
})
	 
	