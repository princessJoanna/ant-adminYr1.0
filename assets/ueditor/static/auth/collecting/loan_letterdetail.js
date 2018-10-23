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
loan.letterdetail= loan.letterdetail || {
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 查询信函催收详情
	 * 
	 */
	queryLetterInfo:function (){
		var orderId=$("#orderId").val();
		var flag=$("#flag").val();
		loan.ajaxDo({
			url:loan.basePath+ "/collecting/queryLetterInfo",
			params:{'format':'json','menuLog':'1','orderId':orderId,"flag":flag},
			successCallback:loan.letterdetail.initLetterInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this,
			falseTip:true
		});
	},
	initLetterInfo:function(result){
		var letterOrder=result.letterOrderDto;
		$("#orderId").val(letterOrder.orderId);
		$("#opName").val(letterOrder.opName);
		var applyDate=letterOrder.applyDate;
		$("#applyDate").val(convertTime(applyDate));
		var sendDate=letterOrder.sendDate;
		$("#sendDate").val(convertTime(sendDate));
		$("#relationPhone").val(letterOrder.relationPhone);
		$("#relationTypeCn").val(letterOrder.relationTypeCn);
		$("#relationName").val(letterOrder.relationName);
		$("#zipCode").val(letterOrder.zipCode);
		$("#statusCn").val(letterOrder.statusCn);
		$("#templateId").val(letterOrder.templateId);
		/****行政区域特殊处理*****/
		$("#area").attr("provinceid",letterOrder['provinceCode']),
		$("#area").attr("cityid",letterOrder['cityCode']),
		$("#area").attr("areaid",letterOrder['districtCode'])
		
		$("#areaCn").val(loan.getArea(letterOrder['provinceCode'])+loan.getArea(letterOrder['cityCode'])+loan.getArea(letterOrder['districtCode'])+letterOrder.address);	
	}
}
function convertTime(cellvalue) {
var reg = new RegExp("^[0-9]*$");
if(reg.test(cellvalue)) {
	var date = new Date(Number(cellvalue));
	return date.Format("yyyy-MM-dd");
}
return "";
}
	 
	