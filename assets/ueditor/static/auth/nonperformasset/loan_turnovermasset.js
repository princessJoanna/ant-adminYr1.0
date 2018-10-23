/**
 * 
 */
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
loan.turnovermasset=loan.turnovermasset||{
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		var menuId=$("menuId").val();
		$("#matterGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':menuId}
	    }).trigger('reloadGrid'); 
		$("#matter2GridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':menuId}
	    }).trigger('reloadGrid'); 
		$("#matter3GridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':menuId}
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
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var startTime = dateStrToStr($("#startTime").val());
		var endTime = dateStrToStr($("#endTime").val());
		var compareResult = compareDate($("#startTime").val(),$("#endTime").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var nameOrNo=$("#nameOrNo").val();//姓名或编号
		var menuId=$("#menuId").val();
		$("#matterGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'nameOrNo':nameOrNo,'startTime':startTime,'endTime':endTime,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
		$("#matter2GridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'nameOrNo':nameOrNo,'startTime':startTime,'endTime':endTime,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
		$("#matter3GridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'nameOrNo':nameOrNo,'startTime':startTime,'endTime':endTime,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 清空
	 */
	clearFunc:function(){
		$('#startTime').val('');
		$('#endTime').val('');
		$('#nameOrNo').val('');
	},
	/**
	 * 新增按钮
	 */
	add:function(){
		var menuId=$("#menuId").val();
	 	loan.s_addPop("选择移交客户",loan.basePath+"/nonperformasset/toAddMasset?menuId="+menuId,"",750,400,{isRefresh:true});

	},
	/**
	 * 分配
	 */
	toAssignFmt:function(menuId,rowId){
		var taskState="分配";
		var data=$("#matterGridId").jqGrid("getRowData",rowId);
		var taskNo=data.taskNo;
		var securityManagerName=data.securityManagerName;
		
		if(securityManagerName=='请选择保全经理'){
			loan.tooltip('请为该任务选择保全经理','error')
			return;
		}
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/notAssign",
			params:{format:'json','menuId':menuId,'taskNo':taskNo,'taskState':taskState},
            successCallback:loan.turnovermasset.freshGrid,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	toAssignFmt2:function(menuId,rowId){
		var taskState="分配";
		var data=$("#matter3GridId").jqGrid("getRowData",rowId);
		var taskNo=data.taskNo;
		var securityManagerName=data.securityManagerName;
		
		if(securityManagerName=='请选择保全经理'){
			loan.tooltip('请为该任务选择保全经理','error')
			return;
		}
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/notAssign",
			params:{format:'json','menuId':menuId,'taskNo':taskNo,'taskState':taskState},
            successCallback:loan.turnovermasset.freshGrid,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	/**
	 * 暂不分配
	 */
	notAssignFmt:function(menuId,taskNo){
		var taskState="暂不分配";
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/notAssign",
			params:{format:'json','menuId':menuId,'taskNo':taskNo,'taskState':taskState},
            successCallback:loan.turnovermasset.freshGrid,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	
}
$(function(){
	loan.selFun('selAll'); 
	loan.selFun('adv');
	$('#startTime').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});	
	$('#endTime').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});
});
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