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
loan.transconfirm=loan.transconfirm||{
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
	 * 核对材料
	 */
	
	toConfirmMess:function(menuId,id){
		var data=$("#matterGridId").jqGrid("getRowData",id);
		parent.loan.tabcut.childAddIframe("核对材料",loan.basePath+"/nonperformasset/toConfirmMess?menuId="+menuId+"&taskNo="+data.taskNo+"&customerUserId="+data.customerUserId,"toConfirmMess",true,true);
	},
	/**
	 * 刷新
	 */
	freshGrid:function() {
		$("#matterGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'850104'}
	    }).trigger('reloadGrid'); 
		$("#matter2GridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'850104'}
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 核对无误
	 */
	confirmMess:function(menuId,taskNo){
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/verifyTask",
			params:{format:'json','menuId':menuId,'taskNo':taskNo},
            successCallback:loan.transconfirm.freshGrid,
            successTip:true, //提示
            bizErrTip:true,  //提示
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