loan.company = loan.company || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#company").jqGrid("setGridParam", {   
			postData:{'format':'json'}
	    }).trigger('reloadGrid'); 
	},

	/**
	 * 确认提示框
	 */
	confirmDialog:function(dtitle,dcontent,callBackFunc) {
		$.artDialog({
			title:dtitle,
			content:dcontent,
			ok:callBackFunc,
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		parent.loan.company.freshGrid();
		loan.s_Pop_closedChild(false,false);
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var companyName = $("#shortName").val();
		$("#company").jqGrid("setGridParam", {   
			postData:{'companyName':companyName,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/** 
	 * 删除按钮 
	 */
	deleteCompany : function(menuId,rowid){
		var com = $("#company").jqGrid('getRowData',rowid);
		var companyId = com.companyId;
		$.artDialog({
			title:"提示",
			content:"确定要删除吗？",
			ok:function(){
				loan.ajaxDo({
					url : loan.basePath + "/company/deleteCompany",
					params : { "companyId" : companyId , format : 'json' , menuId : $('#menuId').val() },
					successCallback:function(result){
						loan.company.freshGrid();
					},
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	initCompany:function(){
		//初始化催收公司数据
		var rowid = parent.$("#rowid").val();
		var company = parent.$("#company").jqGrid('getRowData',rowid);
		$("#companyName").val(company.companyName);
		$("#businessLicence").val(company.businessLicence);
		$("#registeredCapital").val(company.registeredCapital);
		$("#legalPerson").val(company.legalPerson);
		$("#legalIdNo").val(company.legalIdNo);
		$("#mobile").val(company.mobile);
		$("#provinceCode").val(company.provinceCode);
		$("#cityCode").val(company.cityCode);
		$("#districtCode").val(company.districtCode);
		$("#address").val(company.address);
		$("#area").val(company.areaAddr);
		$("#area").attr("provinceid", company.provinceCode);
		$("#area").attr("cityid", company.cityCode);
		$("#area").attr("areaid", company.districtCode);
	},

 	commitAdd : function() {
 		var rowid = parent.$("#rowid").val();
 		var company = parent.$("#company").jqGrid('getRowData',rowid);
 		var companyId = company.companyId;
		var companyName = $("#companyName").val();
		var businessLicence = $("#businessLicence").val();
		var registeredCapital = $("#registeredCapital").val();
		var legalPerson = $("#legalPerson").val();
		var legalIdNo = $("#legalIdNo").val();
		var mobile = $("#mobile").val();	
		var provinceCode = $("#area").attr("provinceid");
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
		var address = $("#address").val();
		loan.ajaxDo({ 
			url:loan.basePath+"/company/addCompany",
			params:{"menuId":$('#menuId').val(),"companyId":companyId,"companyName":companyName,
				"businessLicence":businessLicence,
				"registeredCapital":registeredCapital,"legalPerson":legalPerson,"legalIdNo":legalIdNo,
				'mobile':mobile,"address":address,'provinceCode':provinceCode, 'cityCode':cityCode, 'districtCode':districtCode},
			successCallback:loan.company.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
 	},
 	
 	/** 更新催收公司*/
 	commitUpdate : function() {
 		var rowid = parent.$("#rowid").val();
 		var company = parent.$("#company").jqGrid('getRowData',rowid);
 		var companyId = company.companyId;
		var companyName = $("#companyName").val();
		var businessLicence = $("#businessLicence").val();
		var registeredCapital = $("#registeredCapital").val();
		var legalPerson = $("#legalPerson").val();
		var legalIdNo = $("#legalIdNo").val();
		var mobile = $("#mobile").val();	
		var provinceCode = $("#area").attr("provinceid");
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
		var address = $("#address").val();
		loan.ajaxDo({ 
			url:loan.basePath+"/company/updateCompany",
			params:{"menuId":$('#menuId').val(),"companyId":companyId,"companyName":companyName,
				"businessLicence":businessLicence,
				"registeredCapital":registeredCapital,"legalPerson":legalPerson,"legalIdNo":legalIdNo,
				'mobile':mobile,"address":address, 'provinceCode':provinceCode, 'cityCode':cityCode, 'districtCode':districtCode},
			successCallback:loan.company.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
 	}
};

/**
 * 跳转新增催收公司页面
 */
function addCompany(menuId,rowid){
	loan.s_addPop("新增催收公司",loan.basePath + "/company/toAddCompany?menuId=" + menuId,"",760,400,{isRefresh:true,isChangeClose:true});
};

/**
 * 跳转修改催收公司页面
 */
function updateCompany(menuId,rowid){
	$("#rowid").val(rowid);
	loan.s_addPop("修改催收公司",loan.basePath + "/company/toEditCompany?menuId=" + menuId,"",760,400,{isRefresh:true,isChangeClose:true});
};