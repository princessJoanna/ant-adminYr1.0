loan.modifypic = loan.modifypic || {
	/**上传*/
	upload : function() {
		var menuId = $("#menuId").val();
		var uploadFile = $("#uploadFile").val();
		if(uploadFile == '' || uploadFile == null) {
			loan.tooltip("请选择上传文件","error"); 
			return;
		}
		//灰掉上传按钮
		$("#submit").attr("disabled","disabled");
		var logContent = "修改广告管理[上传文件]";
		$("#uploadFile").upload({
			url:  "uploadPic?logContent="+logContent,
			type: 'POST',
			// 其他表单数据
			params: {'format':'json','menuId':menuId},
			dataType: 'text',
			onSend: function (obj, str) {  return true; },
			// 上传之后回调
			onComplate: function (data) {
				//数据返回为空
	        	if(!data) {
	        		loan.tooltip("上传失败，请稍后再试",'error');
		        	return;
	        	}
				var obj = eval("("+data+")");
				if(obj == null || obj.success == false){
					loan.tooltip(returndata.response.errMsg,"error");
	        		 
				}else {
					 $("#picUrl").val(obj.depositPath);
	        		 $("#picFilename").val(obj.originalFilename);
	        		 $("#picNum").val(obj.uploadLimitNo);
	        		 var picFileStr = JSON.stringify(obj);
	        		 $("#picFileStr").val(picFileStr);
	        		 $("#oldfile").html(obj.originalFilename);
		        	 loan.tooltip("上传成功","succeed");
				}
				
				var file = $("#uploadFile");
				file.after(file.clone().val(""));
				file.remove();
				//恢复上传与提交按钮
				$("#uploadFile").removeAttr("disabled");
				$("#submit").removeAttr("disabled");
			}
		});
		$("#uploadFile").upload("ajaxSubmit");
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
	},

	/**获取文件为json字符串*/
	getFileJson : function() {
		var content = $("#picFilename").val();
		var fileStr = '';
		if(content) {
			var fileStr = $("#picFileStr").val();
		}
		return fileStr;
	},
};

$(function(){
	$('#startDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true,
		changeMonth:true,
		changeYear:true
	});	
	$('#endDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true,
		changeMonth:true,
		changeYear:true
	});
	loan.verify.verifyCheck("modifypicFormId","submit_button");
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#picGridId").jqGrid('getRowData',rowid);
	$("#advertTitle").attr("value",rowObj.advertTitle);
	$("#orderId").attr("value",rowObj.orderId);
	$("#startDate").attr("value",rowObj.startTimeFormatCn);
	$("#endDate").attr("value",rowObj.endTimeFormatCn);
	$("#linkUrl").attr("value",rowObj.linkUrl);
	$("#picFilename").attr("value",rowObj.picFilename);
	$("#advertContent").attr("value",rowObj.advertContent);
});

var seletedFn = function() {
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#picGridId").jqGrid('getRowData',rowid);
	var positionType = rowObj.positionType;
	$('[name=positionType] option').each(function(i,o){
		if(positionType == o.value) {
			o.selected = true;
		}
	});
};
var seletedFn1 = function() {
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#picGridId").jqGrid('getRowData',rowid);
	var orderId = rowObj.orderId;
	$('[name=orderId] option').each(function(i,o){
		if(orderId == o.value) {
			o.selected = true;
		}
	});
};
var submit = function() {
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#picGridId").jqGrid('getRowData',rowid);
	var positionType = $("#positionType").val();
	var advertTitle = $("#advertTitle").val();
	var startDate = $("#startDate").val();
	var linkUrl = $("#linkUrl").val();
	var orderId = $("#orderId").val();
	var advertContent=$("#advertContent").val();
	if(startDate == '' || startDate == null) {
		loan.tooltip("起始日期是为空","error"); 
		return;
	}
	if(!linkUrl){
		loan.tooltip("链接地址不能为空","error"); 
		return;
	}
	var startDateCn = startDate.replace("-", "").replace("-", "");
	var endDate = $("#endDate").val();
	if(endDate == '' || endDate == null) {
		loan.tooltip("结束日期为空","error"); 
		return;
	}
	var endDateCn = endDate.replace("-", "").replace("-", "");
	var compareResult = compareDate(startDate,endDate);
	if(compareResult) {
		loan.tooltip("起始日期大于结束日期","error"); 
		return;
	}
	var picFileStr = loan.modifypic.getFileJson();
	var picFilename = $("#picFilename").val();
	var advertId = rowObj.advertId;
	var pfOrgId = rowObj.pfOrgId;
	var opId = rowObj.opId;
	var advertStatus = rowObj.advertStatus;
	loan.ajaxDo({
  		url:"updateAdvertInfo",
  		params : {"menuId":"300202",'menuLog':'1',"advertId":advertId,"pfOrgId":pfOrgId,'advertContent':advertContent,'opId':opId,'advertStatus':advertStatus,
  			'positionType':positionType,'advertTitle':advertTitle,'startTimeCn':startDateCn,'endTimeCn':endDateCn,'picFileStr':picFileStr,
  			'picFilename':picFilename,'linkUrl':linkUrl,'advertContent':advertContent,'orderId':orderId,'menuLog':'1'},
		successCallback:loan.modifypic.callback
  	});
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