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
loan.sendletter=loan.sendletter||{
	/**
	 * 提交
	 */
	submit:function(){
		var menuId=$("#menuId").val();
		var sendDate=$("#sendDate").val();
		var orderId=$('#orderId').val();
		loan.ajaxDo({
			url:loan.basePath+ "/collecting/sendLetter",
			params:{'format':'json','menuLog':'1','orderId':orderId,'sendDate':sendDate},
			successCallback:function() {
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			falseTip:true,
			bizErrTip:true,  //提示
			chainPar:this
		});
		
	},
	
	/**
	 * 查询信函催收详情
	 * 
	 */
	queryLetterInfo:function (){
		var orderId=$("#orderId").val();
		loan.ajaxDo({
			url:loan.basePath+ "/collecting/queryLetterInfo",
			params:{'format':'json','menuLog':'1','orderId':orderId},
			successCallback:loan.sendletter.initLetterInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this,
			falseTip:true
		});
	},	
	initLetterInfo:function(result){
		var letterOrder=result.letterOrderDto;
		$("#orderId").val(letterOrder.orderId);
		var applyDate=letterOrder.applyDate;
		$("#applyDate").val(convertTime(applyDate));
		$("#relationPhone").val(letterOrder.relationPhone);
		$("#relationTypeCn").val(letterOrder.relationTypeCn);
		$('#status').val(letterOrder.status);
		$('#templateId').val(letterOrder.templateId);
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
$(function() {
	loan.selFun('selAll');
	loan.selFun('adv');
	$('#sendDate')
			.datepicker(
					{
						showOn : "button",
						buttonImage : loan.basePath
								+ "/static/auth/common/element/jqueryui/css/images/calendar.gif",
						buttonImageOnly : true
					});
	loan.verify.verifyCheck("iform", "submit_button");
	$(function() {
		loan.sendletter.queryLetterInfo();
	});
})
function convertTime(cellvalue) {
var reg = new RegExp("^[0-9]*$");
if(reg.test(cellvalue)) {
	var date = new Date(Number(cellvalue));
	return date.Format("yyyyMMdd");
}
return "";
}