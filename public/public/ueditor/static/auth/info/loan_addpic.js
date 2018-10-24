loan.addpic = loan.addpic || {
	/**保存*/
	submit : function() {
		var positionType = $("#positionType").val();
		var advertTitle = $("#advertTitle").val();
		var picFilename = $("#picFilename").val();
		var startTime = $("#startDate").val();
		var linkUrl = $("#linkUrl").val();
		var orderId = $("#orderId").val();
		var advertContent=$("#advertContent").val();
		var rowObjs = parent.$("#picGridId").jqGrid('getRowData');
		if(startTime == '' || startTime == null) {
			loan.tooltip("起始日期是为空","error"); 
			return;
		}
		var startTimeCn = startTime.replace("-", "").replace("-", "");
		var endTime = $("#endDate").val();
		if(endTime == '' || endTime == null) {
			loan.tooltip("结束日期为空","error"); 
			return;
		}
		var endTimeCn = endTime.replace("-", "").replace("-", "");
		var compareResult = compareDate(startTime,endTime);
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		/*
		if(!linkUrl){
			loan.tooltip("链接地址不能为空","error"); 
			return;
		}
		*/
		var picFileStr = loan.addpic.getFileJson();
		if(!picFileStr){
			loan.tooltip("请选择要上传的图片","error"); 
			return;
		}
		loan.ajaxDo({
	  		url:"addAdvertInfo",
	  		params : {"menuId":"300201",'menuLog':'1',"positionType":positionType,"advertTitle":advertTitle,"startTimeCn":startTimeCn,"endTimeCn":endTimeCn,
	  			'picFileStr':picFileStr,'picFilename':picFilename,'linkUrl':linkUrl,'advertContent':advertContent,'orderId':orderId,'menuLog':'1'},
	  		chainPar:this,
	  		successCallback:loan.addpic.callback
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
		$("#submit").removeAttr("disabled");
	},
	
	
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
		var logContent = "新增广告管理[上传文件]";
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
					loan.tooltip(obj.errMsg,'error');
	        		 
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
	
	loan.verify.verifyCheck("iformId","submit_button");
});

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
