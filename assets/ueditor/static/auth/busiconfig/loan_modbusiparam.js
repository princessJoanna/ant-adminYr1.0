loan.modbusiparam = loan.modbusiparam || {
	submit : function(){
		var paraId = $("#paraId").val();
		var paraCnName = $("#paraCnName").val();
		var paraEnName = $("#paraEnName").val();
		var paraValue = $("#paraValue").val();
		var remark = $.trim($("#remark").val());
		var dataType = $.trim($("#dataType").val());
		if(dataType == "0"){//整数
			var reg=/^[1-9]\d*$/;
		    if(!reg.test(paraValue)){
		    	if(paraValue != "0"){
		    		loan.verify.formValidatorShowMsg($("#paraValue"),"输入整数",150);
		    		return;
		    	}
		    }  
		}
		if(dataType == "1"){ //小数
			var reg1=/^([1-9]\d*|0)(\.\d{1,16})?$/;
		    if(!reg1.test(paraValue)){
			  loan.verify.formValidatorShowMsg($("#paraValue"),"非法数字",150);
		      return;
		    }  	
		}
		
		if(dataType == "3"){ //时间
			var reg1=/^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/;
		    if(!reg1.test(paraValue)){
			  loan.verify.formValidatorShowMsg($("#paraValue"),"HH:mm",150);
		      return;
		    }  	
		}
		var orgId = $("#orgId").val();
		loan.ajaxDo({
	  		url:loan.basePath+"/busiparam/updateBusiParam",
	  		params : {"menuId":'400101','menuLog':'1',"orgId":orgId,"paraId":paraId,"paraCnName":paraCnName,"paraEnName":paraEnName,"paraValue":paraValue,"remark":remark},
	  		chainPar:this,
	  		successCallback:loan.modbusiparam.submitSuccFun,
	  		successTip:true
	  	});
	},
	
	/**提交成功后提示信息并关闭页面*/
	submitSuccFun : function(){
		loan.s_Pop_closedChild(true,false);
	}
}

$(function(){
	loan.verify.verifyCheck("iform","submit_button");
	/**填充修改页面的值*/
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#busiparamGridId").jqGrid('getRowData',rowid);
	$("#paraId").attr("value",rowObj.paraId);
	$("#paraCnName").attr("value",rowObj.paraCnName);
	$("#paraEnName").attr("value",rowObj.paraEnName);
	$("#accessLevelCn").attr("value",rowObj.accessLevelCn);
	$("#accessLevel").attr("value",rowObj.accessLevel);
	$("#paraValue").attr("value",rowObj.paraValue);
	$("#remark").attr("value",rowObj.remark);
	$("#orgInfo").attr("value",rowObj.orgShortName);
	$("#orgId").attr("value",rowObj.orgId);
	$("#dataType").attr("value",rowObj.dataType);
})
