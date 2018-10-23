loan.addsendapply = loan.addsendapply || {
	menuId:$("#menuId").val(),//菜单号
	url:loan.basePath+"/",//提交的url
	/**
	 * 初始化选项
	 */
	setSelect:function(id,chose) {
		if(!chose) {
			chose = '-1';
		}
		$("#"+id).prepend("<option value='-1'>请选择</option>");
		$("#"+id).val(chose);
	},
	/**
	 * 查询用户详情
	 */
	userDetail : function(userId) {
		var _userId = $("#userId").val();
		var menuId=$("#menuId").val();
		//判断是否已选择合同
		if(_userId) {
			userId = _userId;
			parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId="+menuId+"&userId="+userId,"customerDetail",true);
		} else {
			loan.tooltip("请选择合同","error");
		}
	},
	
	/**
	 * 提交,参数校验，提交方法
	 */
	submit:function(type) {
		var userId = $("#userId").val();
		var contractId = $("#contractId").val();
		if(!contractId) {
			loan.tooltip("请选择合同","error");
			return;
		}
		var contractNo = $("#contractNo").val();
		var loanAmount = $("#loanAmount").val();
		var maxAmount = $("#canAmount").html();
		if(maxAmount) {
			loanAmount = new Number(loanAmount);
			maxAmount = new Number(maxAmount);
			if(maxAmount < loanAmount) {
				loan.tooltip("贷款金额不能大于合同可用金额","error");
				return;
			}
		}
		if(loanAmount<=0){
			loan.tooltip("放款申请金额不能为0","error");
			return;
		}
		var term = $("#term").val();
		var unit = $("#unit").val();
		var productId = $("#productId").val();
		if(productId == '-1') {
			loan.tooltip("请选择贷款产品","error");
			return;
		}
		/*if(productId=="10000"){
			loan.tooltip("不能放款消费产品","error");
			return;
		}*/
		var productName = $("#productId").find("option:selected").text();
		/*var interestRate = $("#interestRate").val();
		interestRate = (interestRate/1000);
		var dinterestRate = $("#dinterestRate").val();
		dinterestRate = (dinterestRate/1000);*/
		var repaymentType = $("#repaymentType").val();
		var loanPurpose = $("#loanPurpose").val();
		if(repaymentType == '-1') {
			loan.tooltip("请选择还款方式","error");
			return;
		}
		var remark = $("#remark").val();
		var loanApplyId = $("#loanApplyId").val();
		var purposeDetail = $("#purposeDetail").val();
		var contractRemark = $("#contractRemark").val();//合同签署
		var warrantRemark = $("#warrantRemark").val();//担保措施
		//校验必传文件
		var fileList;
		if(!loan.addsendapply.validateFiles()){
			return;
		} else {
			fileList = loan.addsendapply.parseFileJson();
		}
		var menuId=$("#menuId").val();
		var params = {
				'menuId':menuId,
				'menuLog':'1',
				'userId':userId,
				'contractId':contractId,
				'contractNo':contractNo,
				'loanAmount':loanAmount,
				'term':term,
				'unit':unit,
				'productId':productId,
				'productName':productName,
				'loanPurpose':loanPurpose,
				'repaymentType':repaymentType,
				'purposeDetail':purposeDetail,
				'contractRemark':contractRemark,
				'warrantRemark':warrantRemark,
				'remark':remark,
				'loanApplyId':loanApplyId,
				'fileList':fileList,
		}
		
		loan.ajaxDo({
			url:loan.addsendapply.url,
			params:params,
			successCallback:function(){
				//关闭子框架
				if(type && type == 'flowUpdate'){
					//loan.tabcut.childClosedIframe(false);
				}else{
					loan.tabcut.childClosedIframe(true);
				}
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 查询产品列表
	 */
	queryProduct:function() {
		var menuId=$("#menuId").val();
    	loan.ajaxDo({
            url:loan.basePath+"/signProduct/queryProduct",
            params:{ 'menuId':menuId,'format':'json'},
            successCallback:loan.addsendapply.showProductResult,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
    },
    
    /**
	 * 查询产品列表结果
	 */
	showProductResult:function(response){
		//判断产品列表是否为空
		if(response.list!=null){
			$("#productId").html("");
			$(response.list).each(function (index, item) {
				var html = "<option value='"
							+ item.productId
							+ "' retype='"
							+ item.repaymentType
							+ "'>"
							+ item.productName 
							+ "</option>";
				$("#productId").append(html);
			});
		}
	},
	
	/**上传文件*/
	upload:function(rowid) {
		if($("#loanUpload_"+rowid).val() == '' || $("#loanUpload_"+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			return;
		}
		var rowObj = $("#attachGridId").jqGrid('getRowData',rowid);
		var setId = rowObj.setId;
		var orgId = rowObj.orgId;
		var extenString = rowObj.extenString;
		var mustStatus = rowObj.mustStatus;
		var checkId = rowObj.checkId;
		var filelistId = rowObj.filelistId;
		var menuId=$("#menuId").val();
		$("#loanUpload_"+rowid).upload({
			url: loan.basePath+'/org/upload?extenString='+extenString+"&orgId="+orgId+"&checkId="+checkId+"&filelistId="+filelistId+"&setId="+setId,
			// 其他表单数据
			params: {"menuId":menuId},
			dataType: 'text',
			onSend: function (obj, str) {  
				return true; 
			},
			// 上传之后回调
			onComplate: function (data) {
				//数据返回为空
				if(!data) {
	        		loan.tooltip("上传失败，请稍后再试",'error');
		        	return;
	        	}
				var obj = eval("("+data+")");
				if(obj.success){
					loan.tooltip("上传成功","succeed");
					$("#loanUpload_"+rowid).val("");
					var url = "<a href='"+obj.domain.depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>";
					jQuery("#attachGridId").jqGrid('setRowData',rowid, {
		        		  filelistId : obj.domain.filelistId,
		        		  uploadFileName : url,
		        		  filebackinfo : JSON.stringify(obj.domain)
					}); 
				}else{
					loan.tooltip(obj.errMsg,"error");
					$("#loanUpload_"+rowid).removeAttr("disabled");
				}
				var file = $("#loanUpload_"+rowid);
				file.after(file.clone().val(""));
				file.remove();
			}
		});
		$("#loanUpload_"+rowid).upload("ajaxSubmit");
	},

	/**
	 * 校验文件
	 */
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var rowid = i+1;
			//判断必传文件是否已上传
			var content = rowObj.uploadFileName;
			if(rowObj && rowObj.mustStatus == '1') {
				if(!content) {
					loan.tooltip("请上传的第"+rowid+"个文件","error"); 
					return false;
				}
			}
		}
		return true;
	},
	
	/**解析文件为json字符串*/
	parseFileJson : function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		var filelist = new Array();
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var content = rowObj.uploadFileName;
			if(content) {
				var fileObj = $.parseJSON(rowObj.filebackinfo);
				fileObj.setId = rowObj.setId;
				fileObj.orgId = rowObj.orgId;
				filelist.push(fileObj);
			}
		}
		return JSON.stringify(filelist);
	},
	/**
	 * 查询申请详情
	 */
	queryApplyInfo:function(loanApplyId){
		var menuId=$("#menuId").val();
		loan.ajaxDo({
            url:loan.basePath+"/sendloan/querySendApplyInfo",
            params:{ 'menuId':menuId,'format':'json','loanApplyId':loanApplyId},
            successCallback:function(result){
        		var domain = result.domain;
        		if(domain) {
        			// debugger;
        			$("#productId").val(domain.productId);
        			$("#userId").val(domain.userId);
        			$("#contractId").val(domain.contractId);
        			$("#contractNo").val(domain.contractNo);
        			//$("#canAmountLi").remove();
        			$("#canAmount").html(domain.canAmount);
        			$("#userName").html(domain.userName);
        			$("#idKind").html(domain.idKindCn);
        			$("#idNo").html(domain.idNo);
        			$("#loanAmount").val(domain.loanAmount);
        			$("#term").val(domain.termNumber);
        			$("#unit").val(domain.termUnit);
        			var interestRate = domain.interestRate * 1000;
        			$("#interestRate").val(formatMoney(interestRate,".",3));
        			$("#loanAmount").val(domain.loanAmount);
        			var dinterestRate = domain.dinterestRate * 1000;
        			$("#dinterestRate").val(formatMoney(dinterestRate,".",3));
        			$("#repaymentType").val(domain.repaymentType);
        			$("#loanPurpose").val(domain.loanPurpose);
        			$("#purposeDetail").val(domain.purposeRemark);
        			$("#contractRemark").val(domain.contractRemark);
        			$("#warrantRemark").val(domain.warrantRemark);
        			$("#remark").val(domain.remark);
        			$("#loanAmount").blur();
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 初始化上传附件页面
	 */
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
//			url: loan.basePath+ "/attach/queryAttach",
//			mtype:'POST',
			datatype: "local",
//			postData:{format:'json','menuId':loan.addsendapply.menuId,'functionId':'7011'},//这个后面加上
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId',sortable: false, align:'center',hidden:true},
	           {name:'setId',index:'setId', sortable: false,align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId', sortable: false,align:'center',hidden:true},
	           {name:'checkId',index:'checkId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus',sortable: false, align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select', sortable: false,align:'center',width:270,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addsendapply.upload("+options.rowId+")' value='上传' />"+
						"<label id='labelId'></label>"+
						"</form>";
					}},
			   {name:'uploadFileName',index:'uploadFileName',sortable: false, align:'center'}
	        ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
	        rowNum : 9999,
	        pager:jQuery('#attachPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			height: 'auto',
			autowidth: true,	
			forceFit:true,//调整列宽不会改变表格宽度
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
	  	jQuery("#attachGridId").setGridWidth($(window).width()-160);
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){
		var menuId=$("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':menuId,'status':'0','functionId':'7011','page':'1','rows':'9999'},
            successCallback:loan.addsendapply.attachItemCallBack,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 查询已上传文件的回调
	 */
	attachItemCallBack:function(result){
		var list = result.pager.items;
    	if(list && list.length > 0) {
    		loan.addsendapply.initAttachPage();
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			var rowid = i+1;
    			$("#attachGridId").jqGrid("addRowData",rowid,item);
    		}
    	}
	  	var loanApplyId=$("#loanApplyId").val();
	  	if(loanApplyId!=""){
	  		loan.addsendapply.queryAttachInfo(loanApplyId);	
	  	}
	},
	queryAttachInfo:function(WarrantId){
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':'7011',"checkId":WarrantId},//'menuId':'7004'这个后面加上
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			var ids = $("#attachGridId").jqGrid("getDataIDs");
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
	     					var url = "<a href='"+item.depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>";
	     					if(item.setId == rowdata.setId) {
	     						$("#attachGridId").jqGrid("setRowData",ids[j],{
	     			        		  filelistId : item.filelistId,
	     			        		  uploadFileName : item.originalFilename,
	     			        		  filebackinfo : JSON.stringify(item),
	     						});
	     						break;
	     					}
	     				}
	     			});
	     		}
	     	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	setPageCss:function(){
		//重新编写校验利率的规则
		$.extend(loan.verify,{
			verifyFloat:function($this,value){
				var left = $this.width();
				if(value == ""){
					var Tip = '不能为空';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				if(!v_Regular.float.test(value)){
					var Tip = '类型错误';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				if(value >= 1000){
					var Tip = '最多只能输入3位整数';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				var values=new Array();
				values=value.split(".");
				if(values.length>1 && values[1].length>3){
					var Tip = '最多只能输入3位小数';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				loan.verify.formValidatorShowMsgTrue($this,left);
				return true;
			},
			verifyNumber:function($this,value){
				var left = 178;
				if(value == ""){
					var Tip = '不能为空';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}else if(!v_Regular.number.test(value)){
					var Tip = '格式输入有误,请输入数字';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}else{
					loan.verify.formValidatorShowMsgTrue($this,left);
					return true;
				}
				
			}
		});
		
		
		//大写金额
		$("#loanAmount").live("blur",function(){
			var value = $(this).val();
			if(v_Regular.money.test(value)) {
				var money = loan.numberToDX(value);
				$("#chamount").html(money);
			}
		});
	},
	
	/**
	 * 初始化页面性质修改，新增
	 */
	initPageType:function(opType) {
		//根据操作类型设置页面参数
		//opType = $("#opType").val();
		loan.verify.verifyCheck("iform","submit_button");
		if(opType == "add") {
			loan.addsendapply.url = loan.basePath+"/sendloan/addSendApply";
		}else if(opType == "update") {
			loan.addsendapply.url = loan.basePath+"/sendloan/updateSendApply";
		}
	},

	initUpdateData:function(){
		opType = $("#opType").val();
		if(opType == "update") {
			var applyId = $("#loanApplyId").val();
			loan.addsendapply.queryApplyInfo(applyId);
			$("#contractNo").removeClass("openw");
		}
	},

	initSelectDefaultValue:function() {
		loan.addsendapply.setSelect("productId");//产品id
	}
};
function formatMoney(nData,decimalSeparator,decimalPlaces) {
	var floatRegex = /^[0-9]+(\.[0-9]+)?$/ ;
	if(floatRegex.test(nData)) {
		var bNegative = (nData < 0);
		var sOutput = String(nData);
		var sDecimalSeparator = decimalSeparator || ".";
		var nDotIndex;
		var nDecimalPlaces = decimalPlaces || 2;
		var nDecimal = Math.pow(10, nDecimalPlaces);
		sOutput = String(Math.round(nData*nDecimal)/nDecimal);
		nDotIndex = sOutput.lastIndexOf(".");
		if(nDecimalPlaces > 0) {
			// Add the decimal separator
			if(nDotIndex < 0) {
				sOutput += sDecimalSeparator;
				nDotIndex = sOutput.length-1;
			}
			// Replace the "."
			else if(sDecimalSeparator !== "."){
				sOutput = sOutput.replace(".",sDecimalSeparator);
			}
			// Add missing zeros
			while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
				sOutput += "0";
			}
		}
		return sOutput;
	}
	return '';
}