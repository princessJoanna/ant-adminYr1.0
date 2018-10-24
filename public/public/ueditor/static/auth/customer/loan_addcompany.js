loan.addcompany = loan.addcompany  || {
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
	},
	
	/**
	 * 下拉选项初始化
	 */
	setSelect:function(id,value,temp) {
		$("#"+id).prepend("<option value='"+value+"'>"+temp+"</option>");
		$("#"+id).val(value);
	},

	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	saveInfo:function (){
		
		var districtCode = $("#area").attr("areaid");
		var left = $("#area").width();
		if(!districtCode){
			var Tip ="不能为空"
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			$("#area").focus();
			return;
		}
		if(!loan.addcompany.validateSelect('companyPrep','企业属性')) {
			return;
		};
		if(!loan.addcompany.validateSelect('tradeType','所属行业')) {
			return;
		};
		/*if(!loan.addcompany.validateSelect('businessRights','经营场地所有权')) {
			return;
		};
		if(!loan.addcompany.validateSelect('registerType','登记注册类型')) {
			return;
		};
		
		if(!loan.addcompany.validateSelect('startDate','证件签发日期')) {
			return;
		};
		
		if(!loan.addcompany.validateSelect('endDate','证件失效日期')) {
			return;
		};
		
		if(!loan.addcompany.validateSelect('formedYears','成立年份')) {
			return;
		};*/
		
		var  listedCompany;
		var  listedCompanys =	 $("input[name='isListing']");
		$(listedCompanys).each(function (i, item){
			var val = $(item).val();
			if($(item).prop("checked")){
				listedCompany = val;
			}
		});
		var busiParams = {
				menuId : $("#menuId").val(),
				menuLog:'1',
				format:'json',
				userId : $("#userId").val(),
				userName : $("#userName").val(),
				idStartDate : $("#startDate").val().replace('-','').replace('-',''),
				idNo : $("#idNo").val(),
				idEndDate : $("#endDate").val().replace('-','').replace('-',''),
				tradeType : $("#tradeType").val(),
				mainBusiness : $("#mainBusiness").val(),
				listedCompany : listedCompany,
				secondBusiness : $("#secondBusiness").val(),
				employeeNumber : $("#employeeNumber").val(),
				provinceCode : $("#area").attr("provinceid"),
				cityCode : $("#area").attr("cityid"),
				districtCode : $("#area").attr("areaid"),
				companyPrep : $("#companyPrep").val(),
				businessAddress : $("#businessAddress").val(),
				businessRights : $("#businessRights").val(),
				nationCertificateNo:$("#nationCertificateNo").val(),
				localtionCertificateNo : $("#localtionCertificateNo").val(),
				areaMeasure : $("#areaMeasure").val(),
				haveMeasure : $("#haveMeasure").val(),
				registeredCapital : $("#registeredCapital").val(),
				registerType : $("#registerType").val(),
				formedYears : $("#formedYears").val(),
				stockCode : $("#stockCode").val(),
				relationMan : $("#relationMan").val(),
				relationPhone : $("#relationPhone").val(),
			}
		
		if($("#method").val()=="edit"){
			//执行修改操作
			loan.addcompany.executeEditBorrower(busiParams);
		}else{
			//执行新增操作
			loan.addcompany.executeAddBorrower(busiParams);
		}		

	},
	
	
	/**
	 * 借款人（信息修改）
	 * date 2015-9-12 11:08:22
	 */
	executeEditBorrower:function (busiParams){
		
		
		loan.ajaxDo({
			url:loan.basePath+"/borrower/updateUserCompany",
			params:busiParams,
			successCallback:loan.addcompany.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	validateSelect:function(id,Tip) {
		var left = $("#"+id).width();
		var targer = $("#"+id).val();
		if(!targer) {
			loan.verify.formValidatorShowMsg( $("#"+id),Tip,left);
			$("#"+id).focus();
			return false;
		}
		return true;
	},
	
	/**
	 * 新增执行
	 */
	executeAddBorrower:function(busiParams) {
		
		loan.ajaxDo({
			url:loan.basePath+"/borrower/addUserCompany",
			params:busiParams,
			successCallback:loan.addcompany.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	
	
	/**
	 * 查询客户信息（借款人及相关联系人）
	 * date 2015-9-12 11:08:22
	 */
	queryUserInfo:function (userId){
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url:loan.basePath+"/borrower/queryUserCompany",
			params:{'format':'json','userId':userId,'menuId':menuId},
			successCallback:loan.addcompany.initUserInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化用户信息
	 */
	initUserInfo:function(result) {
		
		var UserDetail = result.domain;
		$("#userName").val(UserDetail.userName);
		$("#startDate").val(UserDetail.idStartDate);
		$("#idNo").val(UserDetail.idNo);
		$("#endDate").val(UserDetail.idEndDate);
		$("#mainBusiness").val(UserDetail.mainBusiness);
		$("#registerType").val(UserDetail.registerType);
		$("#secondBusiness").val(UserDetail.secondBusiness);
		$("#employeeNumber").val(UserDetail.employeeNumber);
		$("#tradeType").val(UserDetail.tradeType);
		
		$("#companyPrep").val(UserDetail.companyPrep);
		$("#businessAddress").val(UserDetail.businessAddress);
		$("#businessRights").val(UserDetail.businessRights);
		$("#nationCertificateNo").val(UserDetail.nationCertificateNo);
		$("#localtionCertificateNo").val(UserDetail.localtionCertificateNo);
		$("#areaMeasure").val(UserDetail.areaMeasure);
		$("#haveMeasure").val(UserDetail.haveMeasure);
		$("#registeredCapital").val(UserDetail.registeredCapital);
		$("#formedYears").val(UserDetail.formedYears);
		$("#stockCode").val(UserDetail.stockCode);
		$("#relationMan").val(UserDetail.relationMan);
		$("#relationPhone").val(UserDetail.relationPhone);
		
		/****单选框赋值*****/
		
		var  listedCompanys =	 $("input[name='isListing']");
		$(listedCompanys).each(function (i, item){
			var val = $(item).val();
			if($(item).val()==UserDetail['listedCompany']){
				sexType = val;
				$(item).attr('checked',true);
			}
		});
		
		/****行政区域特殊处理*****/
		$("#area").attr("provinceid",UserDetail['provinceCode']),
		$("#area").attr("cityid",UserDetail['cityCode']),
		$("#area").attr("areaid",UserDetail['districtCode'])
		
		$("#area").val(loan.getArea(UserDetail['provinceCode'])+loan.getArea(UserDetail['cityCode'])+loan.getArea(UserDetail['districtCode']));
		
		
	},
	
}
