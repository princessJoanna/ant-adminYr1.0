loan.addrisktarget = loan.addrisktarget || {
	menuId:'520101',//菜单号
	isCheck:false,
	/*url:loan.basePath+"/riskTarget/addRiskTarget",//提交的url
*/	/**
	 * 执行提交
	 */
	doSubmit:function(params){
		loan.ajaxDo({
			url:loan.addrisktarget.url,
			params:params,
			successCallback:function(){
				//关闭子框架
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	
	/**
	 * 提交按钮函数参数校验
	 */
	submit:function() {
		var targetId = $("#targetId").val();//指标名称
		var targetName = $("#targetName").val();//指标名称
		var expreType = $("#expreType").val();//公式类别
		var targetUnit = $("#targetUnit").val();//指标单位
		var targetGroup = $("#targetGroup").val();//所属组
		var targetExpre = $("#targetExpre").val();//指标公式
		var remark = $("#remark").val();//指标说明
		var isCheck= loan.addrisktarget.isCheck;//公式是否校验通过
		if(!targetName) {
			loan.tooltip("请输入指标名称","error");
			return;
		}
		
		if(!expreType) {
			loan.tooltip("请选择公式类别","error");
			return;
		}
		if(!targetUnit) {
			loan.tooltip("请输入指标单位","error");
			return;
		}
		if(!targetGroup) {
			loan.tooltip("请选择所属组","error");
			return;
		}
		if(!targetExpre) {
			loan.tooltip("请输入指标公式","error");
			return;
		}
		if(!isCheck) {
			loan.tooltip("指标公式需校验通过","error");
			return;
		}
		var params = {
				'menuId':loan.addrisktarget.menuId,
				'menuLog':'1',
				'targetId':targetId, 
				'targetName':targetName, 
				'expreType':expreType,
				'targetUnit':targetUnit,
				'targetGroup':targetGroup,
				'targetExpre':targetExpre,
				'remark':remark,
		}
		
			loan.addrisktarget.doSubmit(params);
		
	},
	
	/**
	 * 初始化页面性质修改，新增
	 */
	initPageType:function() {
		//根据操作类型设置页面参数
		var menuId = $("#menuId").val();
		var opType = $("#opType").val();
		//loan.verify.verifyCheck("iform","submit_button");
		if(menuId){
			loan.addrisktarget.menuId = menuId;
		}
		if(opType == 'add') {
			loan.addrisktarget.url = loan.basePath+"/riskTarget/addRiskTarget";
		}else if(opType == 'up') {
			loan.addrisktarget.url = loan.basePath+"/riskTarget/modifyRiskTarget";
		}
	},
	
	initUpdateData:function(){
		if(loan.addrisktarget.menuId == "520102") {
			var id = $("#targetId").val();
			loan.addrisktarget.queryTargetInfo(id);
		}
	},
	
	/**
	 * 新增时需检查姓名
	 */
	checkTargeName:function(targetName){
		loan.ajaxDo({
            url:loan.basePath+"/riskTarget/checkRiskTargetName",
            params:{ 'menuId':loan.addrisktarget.menuId,'format':'json','targetName':targetName},
            successCallback:function(result){
        		//var domain = result.isAgain;
        		var domain = result.again;
        		if(domain) {
        			//后面追加标签样式
        			$("#targetNameCheck").show().css("color","red");
        			//loan.tooltip("该名称已存在,请重新输入","error");
        		}else{
        			$("#targetNameCheck").css("display","none");
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 校验公式
	 */
	checkFormula:function(){
		var expreType=$("#expreType").val();//公式类型
		var targetExpre=$("#targetExpre").val();//公式值
		if(!expreType) {
			loan.tooltip("请选择公式类别","error");
			return;
		}
		if(!targetExpre) {
			loan.tooltip("请输入指标公式","error");
			return;
		}
		loan.ajaxDo({
            url:loan.basePath+"/riskTarget/checkFormula",
            params:{ 'menuId':loan.addrisktarget.menuId,'format':'json','expreType':expreType,'targetExpre':targetExpre},
            successCallback:function(result){
        		var domain = result.formula;
        		if(domain) {
        			loan.addrisktarget.isCheck=true;
        			loan.tooltip("公式校验成功!","succeed");
        			/*//后面追加标签样式
        			$("#targetNameCheck").show().css("color","red");//校验失败
        			//loan.tooltip("该名称已存在,请重新输入","error");*/
        		}else{
        			loan.tooltip("公式校验失败，请重新输入!"+"<br/>"+result.errMsg,"error");
        			//$("#targetNameCheck").css("display","none");
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	
	/**
	 * 查询详情
	 */
	queryTargetInfo:function(targetId){
		loan.ajaxDo({
            url:loan.basePath+"/riskTarget/queryRiskTarget",
            params:{ 'menuId':loan.addrisktarget.menuId,'format':'json','targetId':targetId},
            successCallback:function(result){
        		var domain = result.riskTargetDomain;
        		if(domain) {
        			$("#targetId").val(domain.targetId);//指标名称
        			$("#targetName").val(domain.targetName);//指标名称
        			$("#expreType").val(domain.expreType);//公式类别
        			$("#targetUnit").val(domain.targetUnit);//指标单位
        			$("#targetGroup").val(domain.targetGroup);//所属组
        			$("#targetExpre").val(domain.targetExpre);//指标公式
        			$("#remark").val(domain.remark);//指标说明
        			if(domain.targetStatus=="2"){
        			  $("#targetName").attr("disabled","disabled"); //下架指标名称不能修改
        		    }
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
};

$(function(){
	$("#targetName").blur(function(){
		var menuId = $("#menuId").val();
		var opType = $("#opType").val();
		var targetName=$("#targetName").val();
		if(opType=='add'&&targetName!=""){ 	
		    loan.addrisktarget.checkTargeName(targetName);
		}
	});
	
	
});


	

