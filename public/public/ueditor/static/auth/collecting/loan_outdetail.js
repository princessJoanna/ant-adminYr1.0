loan.outdetail = loan.outdetail || {
	
	/**
	 * 查询委外催收详情
	 * 
	 */
	queryOutInfo:function (){
		var orderId=$("#orderId").val();
		var flag=$("#flag").val();
		loan.ajaxDo({
			url:loan.basePath+ "/collecting/queryOutInfo",
			params:{'format':'json','menuLog':'1','orderId':orderId,'flag':flag},
			successCallback:loan.outdetail.initOutInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	initOutInfo:function(result){
		var outOrderDto=result.outOrderDto;
		$("#orderNo").val(outOrderDto.orderNo);
		$("#applyDate").val(convertTime(outOrderDto.applyDate));
		$("#acceptTime").val(convertTime(outOrderDto.acceptTime));
		$("#endTime").val(convertTime(outOrderDto.endTime));
		$("#realEndDate").val(convertTime(outOrderDto.realEndDate));
		$("#overdueAmountStr").val(outOrderDto.overdueAmountStr);
		$("#companyName").val(outOrderDto.companyName);
		$("#collectingDetail").val(outOrderDto.collectingDetail);
	}
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
	 
	