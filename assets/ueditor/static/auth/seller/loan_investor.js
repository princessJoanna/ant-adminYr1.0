loan.investor = loan.investor|| {
	
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#investGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'1003','orgType':'1'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 初始化选项
	 */
	initSelect:function() {
		var options = $("#orgType option");
		for(var i = 0; i < options.length; i++) {
			var option = options.get(i);
			if(option.value == '0') {
				option.remove();
				break;
			}
		}
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
	 * 检查选中项
	 */
	checkStatus:function(row) {
		var rowid = (row==null?$("#rowid").val():row);
		if(rowid == null || rowid == "") {
			loan.tooltip("请选中要操作的行","error");
			return false;
		}
		var status = jQuery("#investGridId").jqGrid('getCell',rowid,'orgStatus');
		if(status == 2) {
			loan.tooltip("该机构已经被注销","error");
			return false;
		}
		$("#rowid").val(rowid);
		return true;
	},
	
	/**
	 * 设置证件号的校验
	 */
	personIdCheck:function(idContainer) {
		var idKind = $(idContainer).val();
		switch(idKind) {//0身份证，1护照  2港澳通行整个 
			case "0":$("#legalPersonIdno").attr("verifyData","{type:'myCard',length:'1,18' ,required:'yes'}");
				     break;
			case "1":
			case "2":$("#legalPersonIdno").attr("verifyData","{type:'passport',length:'1,18' ,required:'yes'}");
			         break;
			default:$("#legalPersonIdno").attr("verifyData","{type:'notSpecial',length:'1,30' ,required:'yes'}");
	         		break;
		}
	},
	
	/**
	 * 设置证件号的校验
	 */
	orgTypeCheck:function(idContainer) {
		var idKind = $(idContainer).val();
		switch(idKind) {//0运营品台，1出资机构  2片区 
			case "2":
				$("#legalPerson").attr("verifyData","{type:'allcheck',required:'no'}");
				$("#legalPersonIdno").attr("verifyData","{type:'myCard' ,required:'no'}");
				$(".region").attr("hidden","hidden");
			    break;
			default:
				$("#legalPerson").attr("verifyData","{type:'allcheck',required:'yes'}");
				$("#legalPersonIdno").attr("verifyData","{type:'myCard' ,required:'yes'}");
				$(".region").removeAttr("hidden");
			    break;
		}
	},
	
	/**
	 * 校验行政区域
	 */
	validateArea:function() {
		var area = $("#area");
		var districtCode = $("#area").attr("areaid");
		var provinceCode = $("#area").attr("provinceid");
		var cityCode = $("#area").attr("cityid");
		var left = $("#area").width();
		var tip;
		if(!provinceCode) {
			tip = "请选择行政区域";
			//loan.tooltip(tip,"error");
			loan.verify.formValidatorShowMsg(area,tip,left);
			area.focus();
			return false;
		}
		if(!cityCode) {
			tip = "请选择行政区域城市";
			//loan.tooltip(tip,"error");
			loan.verify.formValidatorShowMsg(area,tip,left);
			area.focus();
			return false;
		}
		if(!districtCode) {
			tip = "请选择行政区域区县";
			//loan.tooltip(tip,"error");
			loan.verify.formValidatorShowMsg(area,tip,left);
			area.focus();
			return false;
		}
		/*var registryNo = $("#registryNo").val();
		var v = getGYanzheng(registryNo)+"";  //计算获得的校验位
		var v1 = registryNo.substr(registryNo.length-1, registryNo.length-1);   //输入的校验位		
		if(v != v1){
			tip = "工商注册号不符合规范";
			loan.verify.formValidatorShowMsg($("#registryNo"),tip,left);
			$("#registryNo").focus();
			return false;
		}	*/
		//area.siblings('div').remove();
		//loan.verify.formValidatorShowMsgTrue(area,left);
		return true;
	},
	
	
	/**
	 * 提交修改
	 */
	updateSummit:function() {
		if(!loan.investor.submitValidate()){
			return;
		}
		if(!loan.investor.validateArea()) {
			return;
		}
		
		loan.ajaxDo({
			url:loan.basePath+"/sellerOrg/updateOrg",
			params:loan.investor.getInvestorSubmitParams(),
			successCallback:loan.investor.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 注销
	 */
	delInvestor:function() {
		var rowid = $("#rowid").val();
		var orgId = $("#investGridId").jqGrid("getCell", rowid, "orgId");
		loan.ajaxDo({
			url:loan.basePath+"/sellerOrg/delOrg",
			params:{"menuId":"100303",'menuLog':'1',"orgId":orgId},
			successCallback:loan.investor.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 停启用
	 */
	updateInvestorStatus:function() {
		var rowid = $("#rowid").val();
		var orgId = $("#investGridId").jqGrid("getCell", rowid, "orgId");
		var orgStatus = jQuery("#investGridId").jqGrid('getCell',rowid,'orgStatus');
		var changeSta = orgStatus;
		switch(orgStatus) {//0-正常 1-停用 2-注销
		case "0": changeSta = 1;break;
		case "1": changeSta = 0;break;
		} 
		loan.ajaxDo({
			url:loan.basePath+"/sellerOrg/updateOrgStatus",
			params:{"menuId":"100304",'menuLog':'1',"orgId":orgId,"orgStatus":changeSta},
			successCallback:loan.investor.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
	},
	
	submitValidate:function(){
		var orgType = $("#orgType").val();
		if(!orgType) {
			loan.tooltip("请选择机构类型","error");
			$("#orgType").focus();
			return false;
		}
		return true;
	},
	
	getInvestorSubmitParams : function(){
		var parentOrgId = $("#parentOrgId").val();
		var orgType = $("#orgType").val();
		var orgId = $("#orgId").val();
		
		var fullName = $("#fullName").val();
		var shortName = $("#shortName").val();
		var area = $("#area").val();
		var address = $("#address").val();
		var legalPerson = $("#legalPerson").val();
		var legalPersonIdno = $("#legalPersonIdno").val();
		var legalPersionIdkind = $("#legalPersionIdkind").val();
		var relationMan = $("#relationMan").val();
		var relationPhone = $("#relationPhone").val();
		var creditNo = $("#creditNo").val();
		var payAccountNo = $("#payAccountNo").val();
		var accountId = $("#accountId").val();
		
		var area = $("#area").val();
		var districtCode = $("#area").attr("areaid");
		var provinceCode = $("#area").attr("provinceid");
		var cityCode = $("#area").attr("cityid");
		
		var registryNo = $("#registryNo").val();
		var businessLicence = $("#businessLicence").val();	
		// 2016-11-10 修改：新增支付信息
		var bankNo = $('#bankNo').val();// 银行代码
		var bankAccountType = $('#bankAccountType').val();//支付账号类型
		var payAccountNo = $('#payAccountNo').val();//企业支付账号
		var payAccountName = $('#payAccountName').val();// 企业支付名称
		var withholdStatus = $('input[name="withholdStatus"]:checked').val();// >是否支持代扣
		var bindAccountType = '';// 绑卡类型支持
		$("input[name='bindAccountType']:checked").each(function(){
			bindAccountType += $(this).val() + ",";
		});
		bindAccountType = bindAccountType.substr(0,bindAccountType.length-1);
		var withholdType = $('#withholdType').val();// 代扣签约维度
		
		var params={"menuId":$("#menuId").val(),
				'menuLog':'1',
				"fullName":fullName,
				"shortName":shortName,
				"address":address,
				"legalPerson":legalPerson,
				"legalPersonIdno":legalPersonIdno,
				"legalPersionIdkind":legalPersionIdkind,
			    "relationMan":relationMan,
			    "relationPhone":relationPhone,
			    "creditNo":creditNo,
			    "payAccountNo":payAccountNo,
			    "districtCode":districtCode,
			    "provinceCode":provinceCode,
			    "registryNo":registryNo,
			    "businessLicence":businessLicence,
			    "cityCode":cityCode,
			    "parentOrgId":parentOrgId,
			    "orgType":orgType,
			    "accountId":accountId,
			    "orgId":orgId,
			    bankNo : bankNo,
				bankAccountType : bankAccountType,
				payAccountNo : payAccountNo,
				payAccountName : payAccountName,
				withholdStatus : withholdStatus,
				bindAccountType : bindAccountType,
				withholdType : withholdType
			    };
		return params;
	},
	
	/**
	 * 新增
	 */
	addInvestor:function(menuId) {
		
		if(!loan.investor.submitValidate()){
			return;
		}	
		if(!loan.investor.validateArea()) {			
			return;
		}
		
		var params = loan.investor.getInvestorSubmitParams();
		loan.ajaxDo({
			url:loan.basePath+"/sellerOrg/addOrg",
			params:params,
			successCallback:loan.investor.closeChildWindow,
			successTip:true, //提示  
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	
	/**
	 * 名称模糊搜索
	 */
	searchInvestor:function() {
		var param = $("#param").val();
		$("#investGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','orgType':param},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	
	/**
	 * 查询父出资机构
	 */
	/*queryOrgByIdFunc : function(orgId,callBackFunc) {
		loan.ajaxDo({
	  		url:loan.basePath+"/sellerOrg/queryOrgInPf",
	  		params:{"menuId":null,"orgType":"1","orgStatus":"0","page":"1","rows":"1"},
	  		successCallback:callBackFunc,
	  		chainPar:this
	  	});
	},*/
	
	/**
	 * 设置父机构名 editinvestor.jsp
	 */
	/*initParentName:function(result) {
		var parent = result.pager.items;
		$("#parentOrgName").val(parent[0].shortName);
	},*/
	
	
	/**
	 * 修改页面初始化
	 */
	initEditInvestor:function() {
		var rowid = parent.$("#rowid").val();
		var org = parent.$("#investGridId").jqGrid('getRowData',rowid);
		var orgId = org.orgId;
		var orgNo = org.orgNo;
		var legalPersionIdkind = org.legalPersionIdkind;
		var districtCode = org.districtCode;
		var provinceCode = org.provinceCode;
		var cityCode = org.cityCode;
		
		$("#orgId").val(orgId);
		$("#orgNo").val(orgNo);
		$("#fullName").val(org.fullName);
		$("#shortName").val(org.shortName);
		//设置区域码
		$("#area").attr("areaid",districtCode);
		$("#area").attr("provinceid",provinceCode);
		$("#area").attr("cityid",cityCode);
		var area = org.area;//loan.getArea(provinceCode)+loan.getArea(cityCode)+loan.getArea(districtCode);
		$("#area").val(area);
		$("#area").attr("title",area);
		
		$("#address").val(org.address);
		$("#legalPerson").val(org.legalPerson);
		$("#legalPersionIdkind").val(org.legalPersionIdkind);
		$("#legalPersonIdno").val(org.legalPersonIdno);
		$("#relationMan").val(org.relationMan);
		$("#relationPhone").val(org.relationPhone);
		$("#creditNo").val(org.creditNo);
		$("#accountId").val(org.accountId);
		$("#payAccountNo").val(org.payAccountNo);
		$("#registryNo").val(org.registryNo);
		$("#parentOrgId").val(org.parentOrgId);
		$("#orgType").val(org.orgType);
		$("#businessLicence").val(org.businessLicence);
		loan.investor.orgTypeCheck("#orgType");
		loan.orgtree.selectOrg(org.parentOrgId,"#parentOrgId");
		loan.orgtree.removeOrg(org.orgId);
	},
	
	/**
	 * 初始化费率列表
	 */
	initGrid:function() {
		jQuery("#investGridId").jqGrid({
			url:"queryOrgInPf",
			mtype:'POST',
			datatype: "json",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			postData:{'menuId':null,'orgType':'1'},
			colNames: ['机构名称','机构码','法人','联系人','联系人电话','行政区域','地址','机构状态','操作','orgId','orgNo','parentOrgId',
			           'pfOrgId','orgType','orgStatus','districtCode','provinceCode','cityCode','legalPersionIdkind',
			           '全称','creditNo','legalPersonIdno'], 
			colModel: [
	           {name:'shortName',index:'shortName', align:'center',sortable: false},
	           {name:'orgNo',index:'orgNo',align:'center',width:90,sortable: false},
	           {name:'legalPerson',index:'legalPerson',hidden:true},
	           {name:'relationMan',index:'relationMan',align:'center',sortable: false,width:'70px'},
	           {name:'relationPhone',index:'relationPhone',align:'center',sortable: false},
	           {name:'area',index:'area',align:'center',sortable: false},
	           {name:'address',index:'address',align:'center',sortable: false},
	           {name:'orgStatusCn',index:'orgStatusCn',align:'center',sortable: false,width:'60px'},
	           {name:'act',index:'act',align:'center',sortable: false,width:'70px'},
	           
	           {name:'orgId',index:'orgId',align:'center',hidden:true},
	           {name:'orgNo',index:'orgNo', align:'center',hidden:true},
	           {name:'parentOrgId',index:'parentOrgId', align:'center',hidden:true},
	           {name:'pfOrgId',index:'pfOrgId', align:'center',hidden:true},
	           {name:'orgType',index:'orgType',align:'center',hidden:true},
	           {name:'orgStatus',index:'orgStatus',align:'center',hidden:true},
	           
	           {name:'districtCode',index:'districtCode', align:'center',hidden:true},
	           {name:'provinceCode',index:'provinceCode', align:'center',hidden:true},
	           {name:'cityCode',index:'cityCode',hidden:true},
	           {name:'legalPersionIdkind',index:'legalPersionIdkind',align:'center',hidden:true},
	           {name:'fullName',index:'fullName',hidden:true},
	           {name:'creditNo',index:'creditNo',hidden:true},
	           {name:'legalPersonIdno',index:'legalPersonIdno',align:'center',hidden:true}
	        ], 
	        jsonReader:{  //返回数据格式设置
	        	root: "response.pager.items",//数据项
	        	page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			sortname: 'orgId',   
		    sortorder: 'desc',
		    pager:jQuery('#investGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			onSelectRow:loan.investor.selectRowFunc,
			loadComplete:function(result){
				//alert(JSON.stringify(result));
			},
			gridComplete : function() {
				var rowIds = jQuery("#investGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var districtCode = $("#investGridId").jqGrid('getCell',rowIds[i],'districtCode');
					var provinceCode = $("#investGridId").jqGrid('getCell',rowIds[i],'provinceCode');
					var cityCode = $("#investGridId").jqGrid('getCell',rowIds[i],'cityCode');
					var areaValue = loan.getArea(provinceCode)+loan.getArea(cityCode)+loan.getArea(districtCode);
	            	var addBtn = "<div class='operating'>";		
					addBtn += "<a class='operating-pencil icon-radius' title='修改' onclick=\"edit('"+rowIds[i]+"')\"><i class='icon-pencil'></i></a>";
					addBtn += "<a class='operating-disable icon-radius' title='注销' onclick=\"del('"+rowIds[i]+"')\"><i class='icon-disable'></i></a></div>";
	            	jQuery("#investGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn,area : areaValue
					}); 
				}
			}
		});
		
	},
	
	/**
	 * 初始化行政区域
	 */
	initAreaInGrid:function() {
		var rowIds = jQuery("#investGridId").jqGrid('getDataIDs');
		for (var i = 0; i < rowIds.length; i++) {
			var districtCode = $("#investGridId").jqGrid('getCell',rowIds[i],'districtCode');
			var provinceCode = $("#investGridId").jqGrid('getCell',rowIds[i],'provinceCode');
			var cityCode = $("#investGridId").jqGrid('getCell',rowIds[i],'cityCode');
			var areaValue = loan.getArea(provinceCode)+loan.getArea(cityCode)+loan.getArea(districtCode);
        	jQuery("#investGridId").jqGrid('setRowData',rowIds[i], {
				area : areaValue
			}); 
		}
	}

};

function add(menuId){
	loan.s_addPop("新增出资方",loan.basePath+"/sellerOrg/toaddinvestor?menuId="+menuId,"",800,540,{isRefresh:true,isChangeClose:true});	
}

function edit(menuId,rowid){
	$("#rowid").attr("value",rowid);
	if(loan.investor.checkStatus(rowid)){
		loan.s_addPop("修改出资方",loan.basePath+"/sellerOrg/toEditInvestor?menuId="+menuId,"",800,450,{isRefresh:true,isChangeClose:true});
	}
}

function del(menuId,rowid){
	$("#rowid").attr("value",rowid);
	if(loan.investor.checkStatus(rowid)){
		var title = "提示";
		var shortName = $("#investGridId").jqGrid('getCell',rowid,'shortName');
		var content = "确定要注销【"+shortName+"】出资机构吗？";
		loan.investor.confirmDialog(title,content,loan.investor.delInvestor);
	}
}

function enable(row){
	//$("#rowid").attr("value",rowid);
	if(loan.investor.checkStatus(row)){
		var title = "提示";
		var rowid = $("#rowid").val();
		var orgStatus = $("#investGridId").jqGrid('getCell',rowid,'orgStatus');
		var shortName = $("#investGridId").jqGrid('getCell',rowid,'shortName');
		var content;
		switch(orgStatus) {
		case "0":content = "确定要停用【"+shortName+"】出资机构吗？"; break;
		case "1":content = "确定要启用【"+shortName+"】出资机构吗？"; break;
		}
		loan.investor.confirmDialog(title,content,loan.investor.updateInvestorStatus);
	}	
}
   //440307503397661
function getGYanzheng(x){
	
	var NUM = 16;
	       
	/*var reg = /^\d+$/;   //校验数字
	if (!reg.test(x))
		loan.tooltip("工商注册号不符合规范","error");*/ 	
	
    x = x.substr(0, x.length-1)
	var a = new Array(NUM);
	var p = new Array(NUM);
	var temp;
	
	if(x.length != NUM-2){
		loan.tooltip("工商注册号不符合规范","error");
		return false;
	}

	for(var i= 0; i < x.length; i++){
		if(isNaN(x.charAt(i))){
			loan.tooltip("工商注册号不符合规范","error");
			return false;
		}else{
			a[i+1] = parseInt(x.charAt(i));
		}

	}
	
	p[1] = 10
	for(var i = 2; i < NUM; i++){
		temp = (p[i-1]+a[i-1])%10;
		if(temp == 0){
			p[i] = (10*2)%11;
		}else{
			p[i] = temp*2 %11;
		}
	}
	var result = (11 - p[NUM-1])%10   //返回校验位
	
	return result;    
}
