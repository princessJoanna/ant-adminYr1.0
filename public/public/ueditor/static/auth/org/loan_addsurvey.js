loan.addsurvey = loan.addsurvey || {
	submitVal : function(){
		var configName = $("#configName").val();
		var alternativeType = $("#alternativeType").val();
		var orderId = $("#orderId").val();
		var remark = $("#remark").val();
		loan.ajaxDo({
	  		url:loan.basePath+"/org/addSurveyItem",
	  		params : {'menuId':'400501','menuLog':'1',"configName":configName,"alternativeType":alternativeType,"orderId":orderId,"remark":remark,'menuLog':'1'},
	  		chainPar:this,
	  		successCallback:loan.addsurvey.callback
	  	});
	},
	
	/**保存成功后的回调函数*/
	callback : function(result) {
		if(!result.success) {
			loan.tooltip(result.errMsg,"error"); 
			return;
		}else{
			loan.tooltip(result.errMsg,"succeed");
			loan.s_Pop_closedChild(true,false);
		}
	}
};


$(function(){
	loan.verify.verifyCheck("iform","submit_button");
});

/**验证参数**/
function validate(configName,orderId,remark){
	var configNameLen = strLen(configName);
	var orderIdLen = strLen(orderId);
	var remarkLen = strLen(remark);
	if(configName == null || configName == '') {
		loan.tooltip("调查项名称不能为空","error"); 
		return;
	}
	
	if(orderId == null || orderId == '') {
		loan.tooltip("排序号为空","error"); 
		return;
	}
	
	if(configNameLen > 32) {
		loan.tooltip("调查项名称查过最大长度","error"); 
		return;
	}
	
	if(orderIdLen > 10) {
		loan.tooltip("排序号超过最大长度","error"); 
		return;
	}
	
	if(remarkLen > 255) {
		loan.tooltip("说明长度超过最大长度","error"); 
		return;
	}
}

//计算字符的长度
function strLen(str) {
	 var len = 0;
	    for (var i=0; i<str.length; i++) { 
	     var c = str.charCodeAt(i); 
	    //单字节加1 
	     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
	       len++; 
	     } 
	     else { 
	      len+=2; 
	     } 
	    } 
	    return len;
}