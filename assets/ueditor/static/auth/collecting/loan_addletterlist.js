loan.addletterlist=loan.addletterlist||{
	/**
	 * 提交按钮
	 */
	submit:function(){
		var caseId = $("#caseId").val();
		var relationPhone = $('#relationPhone').val();
		var relationType = $('#relationType').val();
		var relationName = $('#relationName').val();
		var provinceCode = $("#area").attr("provinceid");
		var address=$("#address").val();
		var zipCode=$("#zipCode").val();
		var template=$("#templateId").val();
		var left = $("#area").width();
		if(!provinceCode) {
			var Tip ="请选择行政区域";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			return;
		}
		var cityCode = $("#area").attr("cityid");
		if(!cityCode) {
			var Tip ="请选择行政区域城市";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			return;
		}
		var districtCode = $("#area").attr("areaid");
		if(!districtCode) {
			var Tip ="请选择行政区域区县";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			$("#area").focus();
			return;
		}
		if(relationType==""){
			loan.tooltip("请选择联系人关系","error"); 
			return;
		}
		/*if(template==""){
			loan.tooltip("请选择信函模板","error"); 
			return;
		}*/
		var params = {
			'menuLog' : '1',
			"caseId" : caseId,
			"relationPhone" : relationPhone,
			"relationType" : relationType,
			"relationName" : relationName,
			"provinceCode" : provinceCode,
			"cityCode" : cityCode,
			"districtCode" : districtCode,
			"address":address,
			"zipCode":zipCode,
			"template":"1001"
		};
		loan.ajaxDo({
			url : loan.basePath + "/collecting/addLetterOrder",
			params : params,
			chainPar : this,
			successTip : true,
			successCallback : function() {
				loan.s_Pop_closedChild(true,false);
			}
		});
		
	}
}
$(function() {
	loan.verify.verifyCheck("iform", "submit_button");
	new AdrInputPopDiv().init("area");
	$('#area').click(function(){  
		var errorClass="m-tipShow-error";
		var objectClass =$("#area").next().attr("class");
		if(objectClass==errorClass){
			$("#area").next().remove();
		}
	}); 
})