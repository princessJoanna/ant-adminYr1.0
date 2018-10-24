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
loan.noticedetail = loan.noticedetail || {

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
	 * 查询短信催收信息
	 * 
	 */
	queryNoticeInfo:function (){
		var orderId = $("#orderId").val();
		var flag = $("#flag").val();
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url:loan.basePath+ "/collecting/queryNoticeInfo",
			params:{'format':'json','menuId':menuId,'orderId':orderId,"flag":flag},
			successCallback:loan.noticedetail.initNoticeInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	initNoticeInfo:function(result){
		var noticeOrderDto=result.noticeOrderDto;
	   $("#acceptTime").val(convertTime(noticeOrderDto.acceptTime));
	   $("#opId").val(noticeOrderDto.opId);
	   $("#relationPhone").val(noticeOrderDto.relationPhone);
	   $("#relationName").val(noticeOrderDto.relationName);
	   $("#noticeContent").val(noticeOrderDto.noticeContent);
	   $("#relationTypeCn").val(noticeOrderDto.relationTypeCn);
	   $("#noticeOpName").val(noticeOrderDto.noticeOpName);
	}
};
function convertTime(cellvalue) {
	var reg = new RegExp("^[0-9]*$");
	if(reg.test(cellvalue)) {
		var date = new Date(Number(cellvalue));
		return date.Format("yyyy-MM-dd hh:mm:ss");
	}
	return "";
}	 
$(function(){
	loan.noticedetail.queryNoticeInfo();
})