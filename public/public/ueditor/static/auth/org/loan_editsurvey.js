var preloanConfigId;
var orgId;
var status;
var publishStatus;
loan.editsurvey = loan.editsurvey || {
	submit : function() {
		var configName = $("#configName").val();
		var alternativeType = $("#alternativeType").val();
		var orderId = $("#orderId").val();
		var remark = $("#remark").val();
		loan.ajaxDo({
	  		url:loan.basePath+"/org/updateSurveyItem",
	  		params : {'menuId':'400502','menuLog':'1',"configName":configName,"alternativeType":alternativeType,"orderId":orderId,"remark":remark,'orgId':orgId,'status':status,'preloanConfigId':preloanConfigId,'publishStatus':publishStatus,
	  			'menuLog':'1'},
	  		successCallback:loan.editsurvey.callback
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
	/**从父页面加载数据*/
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#surveyItemGridId").jqGrid('getRowData',rowid);
	$("#configName").attr("value",rowObj.configName);
//	var alternativeVals = $("#alternativeType");
//	alert(alternativeVals.options.length);
	$("#orderId").attr("value",rowObj.orderId);
	$("#remark").attr("value",rowObj.remark);
	preloanConfigId = rowObj.preloanConfigId;
	orgId = rowObj.orgId;
	status = rowObj.status;
	publishStatus = rowObj.publishStatus;
});

var seletedFn = function() {
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#surveyItemGridId").jqGrid('getRowData',rowid);
	var alternativeVal = rowObj.alternativeType;
	$('[name=alternativeType] option').each(function(i,o){
		if(alternativeVal == o.value) {
			o.selected = true;
		}
	});
}