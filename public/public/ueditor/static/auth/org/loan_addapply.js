loan.addapply=loan.addapply||{
	
	addLoanApply:function(){
		
		var details = jQuery("#loanAmountCom").jqGrid("getRowData");
		var amounts = Number(details[0].pledageAmount) + Number(details[0].creditAmount)
		amounts = amounts + Number(details[0].guaranteeAmount) + Number(details[0].mortgageAmount);
		var LoanAmount = Number($("#loanAmount").val());
		if(amounts!=LoanAmount){
			loan.tooltip("各项金额总和不等于借款金额","error");
			return;
		}
		if(LoanAmount<=0){
			loan.tooltip("借款金额必须大于0","error");
			return;
		}
		var fileList;
		if(!loan.addapply.validateFiles()){
			return;
		} else {
			fileList = loan.addapply.parseFileJson();
		}
		var warrant=$("#warrantType").val();
		switch(warrant){
		 case "0":
			 if(Number(details[0].creditAmount)<=0){
				 loan.tooltip("信用金额必须大于0","error");
				 return;
			 }
			 break;
		 case "1":
			 if(Number(details[0].pledageAmount)<=0){
				 loan.tooltip("抵押金额必须大于0","error");
				 return;
			 }
			 break;
		 case "2":
			 if(Number(details[0].mortgageAmount)<=0){
				 loan.tooltip("质押金额必须大于0","error");
				 return;
			 }
			 break;
		 case "3":
			 if(Number(details[0].guaranteeAmount)<=0){
				 loan.tooltip("保证金额必须大于0","error");
				 return;
			 }
			 break;
		}
		var menuId=$("#menuId").val();
		var addparams={
			menuId:menuId,
			format:'json',
			userId:$("#userId").val(),
			amountApplyId:$("#amountApplyId").val(),
			userName:$("#userName").text(),
			idKind:$("#certType").val(),
			idNo:$("#certNo").text(),
			loanAmount:$("#loanAmount").val(),
			productName:$("#productName option:selected").text(),
			productId:$("#productName").val(),
			repaymentType:$("#repaymentType").val(),
			loanDatelimit:$("#loanDatelimit").val(),
			datelimitUnit:$("#datelimitUnit").val(),
			warrantType:$("#warrantType").val(),
			interestRate:($("#interestRate").val()/1000),
			dinterestRate:($("#dinterestRate").val()/1000),
			loanPurpose:$("#loanPurpose").val(),
			attachFileInfo:fileList,
			purposeRemark:$("#purposeRemark").val(),
			loanType:$('#loanType input[name="zge"]:checked').val(),
			remark:$("#remark").val(),
			pledageAmount:details[0].pledageAmount,
			creditAmount:details[0].creditAmount,
			guaranteeAmount:details[0].guaranteeAmount,
			mortgageAmount:details[0].mortgageAmount
		};
		if(addparams.productName=="请选择"){
			loan.tooltip("请选择借款产品","error");
			return;
		}
		if(addparams.warrantType=="-1"){
			loan.tooltip("请选择担保方式","error");
			return;
		}
		if(addparams.repaymentType=="-1"){
			loan.tooltip("请选择还款方式","error");
			return;
		}
		if(addparams.loanType=="-1"){
			loan.tooltip("请选择放款方式","error");
			return;
		}
		if(addparams.loanPurpose=="-1"){
			loan.tooltip("请选择贷款用途","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/loan/addLoanApply",
			params:addparams,
			successCallback:loan.addapply.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true  //提示
		});
	},
	editLoanApply:function(){
		
		var details = jQuery("#loanAmountCom").jqGrid("getRowData");
		var amounts = Number(details[0].pledageAmount)+Number(details[0].creditAmount)
		amounts = amounts+Number(details[0].guaranteeAmount)+Number(details[0].mortgageAmount);
		var LoanAmount=Number($("#loanAmount").val());
		if(amounts!=LoanAmount){
			loan.tooltip("各项金额总和不等于借款金额","error");
			return;
		}
		if(LoanAmount<=0){
			loan.tooltip("借款金额必须大于0","error");
			return;
		}
		var warrant=$("#warrantType").val();
		switch(warrant){
		 case '0':
			 if(Number(details[0].creditAmount)<=0){
				 loan.tooltip("信用金额必须大于0","error");
				 return;
			 }
			 break;
		 case '1':
			 if(Number(details[0].pledageAmount)<=0){
				 loan.tooltip("抵押金额必须大于0","error");
				 return;
			 }
			 break;
		 case '2':
			 if(Number(details[0].mortgageAmount)<=0){
				 loan.tooltip("质押金额必须大于0","error");
				 return;
			 }
			 break;
		 case '3':
			 if(Number(details[0].guaranteeAmount)<=0){
				 loan.tooltip("保证金额必须大于0","error");
				 return;
			 }
			 break;
		}
		var menuId=$("#menuId").val();
		var fileList;
		if(!loan.addapply.validateFiles()){
			return;
		} else {
			fileList = loan.addapply.parseFileJson();
		}
		var editparams={
			menuId:menuId,
			format:'json',
			applyId:$("#applyId").val(),
			userId:$("#userId").val(),
			userName:$("#userName").text(),
			loanAmount:$("#loanAmount").val(),
			productName:$("#productName option:selected").text(),
			productId:$("#productName").val(),
			repaymentType:$("#repaymentType").val(),
			loanDatelimit:$("#loanDatelimit").val(),
			datelimitUnit:$("#datelimitUnit").val(),
			warrantType:$("#warrantType").val(),
			interestRate:($("#interestRate").val()/1000),
			dinterestRate:($("#dinterestRate").val()/1000),
			loanPurpose:$("#loanPurpose").val(),
			attachFileInfo:fileList,
			purposeRemark:$("#purposeRemark").val(),
			loanType:$('#loanType input[name="zge"]:checked').val(),
			remark:$("#remark").val(),
			pledageAmount:details[0].pledageAmount,
			creditAmount:details[0].creditAmount,
			guaranteeAmount:details[0].guaranteeAmount,
			mortgageAmount:details[0].mortgageAmount
		};
		if(editparams.productName=="请选择"){
			loan.tooltip("请选择借款产品","error");
			return;
		}
		if(editparams.warrantType=="-1"){
			loan.tooltip("请选择担保方式","error");
			return;
		}
		if(editparams.repaymentType=="-1"){
			loan.tooltip("请选择还款方式","error");
			return;
		}
		if(editparams.loanType=="-1"){
			loan.tooltip("请选择放款方式","error");
			return;
		}
		if(editparams.loanPurpose=="-1"){
			loan.tooltip("请选择贷款用途","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/loan/updatePreLoanApply",
			params:editparams,
			successCallback:loan.addapply.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
	},
	/**
	 * 初始化loan金额列表
	 */
	initAddLoanApply:function(){
		jQuery("#loanAmountCom").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['信用金额（元）','保证金额（元）','抵押金额（元）','质押金额（元）'], 
			colModel: [
	           {name:'creditAmount',index:'creditAmount', align:'center',width:'25%',editable: true,
	        	   formatter: 'formatMoneys',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:check,maxValue:999999999}
	           },
	           {name:'guaranteeAmount',index:'guaranteeAmount', align:'center',width:'25%', editable:true,
	        	   formatter: 'formatMoneys',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:check,maxValue:999999999}
	        	},
	        	{name:'pledageAmount',index:'pledageAmount', align:'center',width:'25%', editable:true,
	        	   formatter: 'formatMoneys',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:check,maxValue:999999999}
		        },
		        {name:'mortgageAmount',index:'mortgageAmount', align:'center',width:'25%', editable:true,
	        	   formatter: 'formatMoneys',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:check,maxValue:999999999}
			    }
	        ], 
			rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			'cellsubmit': 'clientArray',  //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
			sortname: '',  
		    sortorder: 'desc',
			loadComplete:function(){},
			afterEditCell:loan.addapply.afterEditCellFunc,
			gridComplete : function() {
				
			}
		})
		$("#loanAmountCom").setGridWidth(765);
	},
	
	/**
	 * 
	 */
	afterEditCellFunc:function(rowid,name,val,iRow,iCol){
		$("#rowid").attr("value",iRow);
		$("#iCol").attr("value",iCol);
		$("#cellName").attr("value",name);
	},
	/**
	 * 页面点击事件
	 */
	clickPage : function(evt) {
		var e = evt || window.event;
		var obj = e.srcElement ? e.srcElement : e.target;
		var target = $(obj.parentElement.offsetParent).attr("id");
		var rowid = $("#rowid").val();
		var colid = $("#iCol").val();
		var cellName = $("#cellName").val();
		if(target != "loanAmountCom" && rowid && colid) {
			var ev = jQuery.Event("keydown");
			ev.keyCode = 13 //enter key
			jQuery("#"+rowid+"_"+cellName).trigger(ev);
		}
	},
	/**上传文件*/
	upload:function(rowid) {
		if($("#loanUpload_"+rowid).val() == '' || $("#loanUpload_"+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			return;
		}
		var menuId=$("#menuId").val();
		var rowObj = $("#loanFileGridId").jqGrid('getRowData',rowid);
		var setId = rowObj.setId;
		var orgId = rowObj.orgId;
		var extenString = rowObj.extenString;
		var mustStatus = rowObj.mustStatus;
		var checkId = rowObj.checkId;
		var filelistId = rowObj.filelistId;
		//判断文件大小
		
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
					var url = "<a href='"+loan.basePath + "/loan/downFile?ossName=" + obj.domain.depositFilename + "&fileName=" + encodeURIComponent(obj.domain.originalFilename)+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>";
					jQuery("#loanFileGridId").jqGrid('setRowData',rowid, {
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
		var datas = $("#loanFileGridId").jqGrid('getRowData');
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
		var datas = $("#loanFileGridId").jqGrid('getRowData');
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
	
	queryLoanApply:function(applyId,menuId){
		loan.ajaxDo({
			url:loan.basePath+"/loan/queryPreLoanApply",
			params:{'menuId':menuId,'menuLog':'1','format':'json','applyId':applyId},
			successCallback:loan.addapply.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化额度申请信息
	 */
	queryAmountApply:function(amountApplyId, menuId){
		loan.ajaxDo({
			url:loan.basePath + "/borrower/queryAmountApply",
			params:{'menuId':menuId,'menuLog':'1','format':'json','amountApplyId':amountApplyId},
			successCallback:loan.addapply.initAmountApplyInfo,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化上传附件页面
	 */
	initAnnexPage:function(){
		var orgId = $("#orgId").val();
		jQuery("#loanFileGridId").jqGrid({
			//url: loan.basePath+ "/attach/queryAttach",
			//mtype:'POST',
			datatype: "local",
			//postData:{format:'json',"orgId":orgId,'menuId':700801,'functionId':'7008'},//这个后面加上
//			onSelectRow:loan.survey.selectFn,
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId', align:'center',sortable: false,hidden:true},
	           {name:'setId',index:'setId', align:'center',sortable: false,hidden:true},
	           {name:'filelistId',index:'filelistId', align:'center',sortable: false,hidden:true},
	           {name:'checkId',index:'checkId', align:'center',sortable: false,hidden:true},
			   {name:'annexName',index:'annexName', sortable: false,align:'center'},
			   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select', sortable: false,align:'center',width:270,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addapply.upload("+options.rowId+")' value='上传' />"+
						"<label id='labelId'></label>"+
						"</form>";
					}},
			   {name:'uploadFileName',index:'uploadFileName',sortable: false, align:'center'}
	        ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				repeatitems : false
			},
	        rowNum : 9999,
			rowList : [9999, 9999, 9999],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
			pgbuttons:true,
			pginput: true,	
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
	  	jQuery("#loanFileGridId").setGridWidth($(window).width()-60);
	  	
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){
		var menuId=$("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':menuId,'status':'0','functionId':'6005','page':'1','rows':'9999'},
            successCallback:loan.addapply.attachItemCallBack,
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
    		loan.addapply.initAnnexPage();
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			var rowid = i+1;
    			$("#loanFileGridId").jqGrid("addRowData",rowid,item);
    		}
    	}
    	var applyId=$("#applyId").val();
	  	if(applyId && applyId!=""){
	  		loan.addapply.queryAttachInfo(applyId);
	  	}
	},
	queryAttachInfo:function(WarrantId){
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':'6005',"checkId":WarrantId},//'menuId':'7004'这个后面加上
            successCallback:function(result){
	       		var list = result.list;
	       		var ids = $("#loanFileGridId").jqGrid("getDataIDs");
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#loanFileGridId").jqGrid("getRowData",ids[j]);
	     					var url = "<a href='"+loan.basePath + "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + encodeURIComponent(item.originalFilename)+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>";
	     					if(item.setId == rowdata.setId) {
	     						$("#loanFileGridId").jqGrid("setRowData",ids[j],{
	     			        		  filelistId : item.filelistId,
	     			        		  uploadFileName : url,
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
	
	initPage:function(result){
		var loanApply=result.preLoanApplyDomian;
		$("#customName").val(loanApply.userName);
		$("#userName").html(loanApply.userName);
		$("#userId").val(loanApply.userId);
		$("#certTypeCn").html(loanApply.idKindCn);
		$("#certNo").html(loanApply.idNo);
		$("#certType").val(loanApply.idKind);
		$("#loanAmount").val(loanApply.loanAmount);
		var moneyDX=loan.numberToDX(loanApply.loanAmount); 
		$("#loanAmoutDX").html(moneyDX);
		$("#productName").val(loanApply.productId);
		$("#repaymentType").val(loanApply.repaymentType);
		$("#warrantType").val(loanApply.warrantType);
		$("#loanDatelimit").val(loanApply.loanDatelimit);
		$("#datelimitUnit").val(loanApply.datelimitUnit)
		$("#interestRate").val(formatMoney(loanApply.interestRate*1000,".",3));
		$("#dinterestRate").val(formatMoney(loanApply.dinterestRate*1000,".",3));
		$("input[name='zge']").eq(loanApply.loanType).attr("checked","checked");
		$("#loanPurpose").val(loanApply.loanPurpose);
		$("#purposeRemark").val(loanApply.purposeRemark);
		$("#remark").val(loanApply.remark);
		var obj = new Object();
		obj.creditAmount = formatMoney(loanApply.creditAmount,".",2);
		obj.guaranteeAmount = formatMoney(loanApply.guaranteeAmount,".",2);
		obj.pledageAmount = formatMoney(loanApply.pledageAmount,".",2);
		obj.mortgageAmount = formatMoney(loanApply.mortgageAmount,".",2);
		var flag = jQuery("#loanAmountCom").jqGrid('addRowData',1,obj);
	},
	
	/**
	 * 初始化额度申请信息
	 */
	initAmountApplyInfo:function(result){
		var amountApply = result.riskDomain;
		$("#customName").val(amountApply.userName);
		$("#customName").css("background-color","#ddd");
		$("#userName").html(amountApply.userName);
		$("#userId").val(amountApply.userId);
		$("#certTypeCn").html(amountApply.idKindCn);
		$("#certNo").html(amountApply.idNo);
		$("#certType").val(amountApply.idKind);
		$("#loanAmount").val(amountApply.applyAmount);
		var moneyDX = loan.numberToDX(amountApply.applyAmount); 
		$("#loanAmoutDX").html(moneyDX);
		$("#adviceAmount").val(amountApply.adviceAmount);
		$("#adviceAmount").css("background-color", "#ddd");
		if (!isNull(amountApply.adviceAmount)) {
			var adviceAmountDX = loan.numberToDX(amountApply.adviceAmount); 
			$("#adviceAmountDX").html(adviceAmountDX);
		}
		$("#productName").val(amountApply.productId);
		$("#productName").attr("disabled","disabled");
		$("#productName").css("background-color", "#ddd");
		$("#repaymentType").val(amountApply.repaymentType);
		$("#warrantType").val(amountApply.warrantType);
		$("#interestRate").val(formatMoney(amountApply.interestRate*1000,".",3));
		$("#interestRate").attr("disabled","disabled");
		$("#interestRate").css("background-color", "#ddd");
		$("#dinterestRate").val(formatMoney(amountApply.dinterestRate*1000,".",3));
		$("#dinterestRate").attr("disabled", "disabled");
		$("#dinterestRate").css("background-color", "#ddd");
		
		var warrant = $("#warrantType").val();
		var loanAmount = $("#loanAmount").val();
		switch(warrant){
		 case '0':
			 jQuery("#loanAmountCom").jqGrid("setCell", 1, "creditAmount", loanAmount);
			 break;
		 case '1':
			 jQuery("#loanAmountCom").jqGrid("setCell", 1, "pledageAmount", loanAmount);
			 break;
		 case '2':
			 jQuery("#loanAmountCom").jqGrid("setCell", 1, "mortgageAmount", loanAmount);
			 break;
		 case '3':
			 jQuery("#loanAmountCom").jqGrid("setCell", 1, "guaranteeAmount", loanAmount);
			 break;
		}
	},
	
	queryUser:function(userId){
		loan.ajaxDo({
			url:loan.basePath+"/borrower/queryBorrowerInfo",
			params:{'menuId':'800109','menuLog':'1','format':'json','userId':userId},
			successCallback:loan.addapply.userInfoInit,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	userInfoInit:function(result){
		var borrower=result.domain;
		$("#customName").val(borrower.userName);
		$("#userName").html(borrower.userName);
		$("#userId").val(borrower.userId);
		$("#certTypeCn").html(borrower.idKindCn);
		$("#certType").val(borrower.idKind);
		$("#certNo").html(borrower.idNo);
	},
	rateVerify:function(){
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
		
	},
	
	queryProduct:function() {
		var menuId = $("#menuId").val();
    	loan.ajaxDo({
            url:loan.basePath + "/signProduct/queryProduct",
            params:{ 'menuId':menuId,'format':'json'},
            successCallback:loan.addapply.showProductResult,
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
			$("#productName").html("");
			var html = "<option value= '-1'>请选择</option>";
			$(response.list).each(function (index, item) {
				html = html + "<option value='" + item.productId
							+ "' retype='" + item.repaymentType
							+ "' retypeCn='" + item.repaymentTypeCn
							+ "' warrantType='" + item.warrantType
							+ "' warrantTypeCn='" + item.warrantTypeCn
							+ "' interestRate='" + item.interestRate
							+ "' dinterestRate='" + item.dinterestRate
							+ "'>"
							+ item.productName 
							+ "</option>";
				
			});
			$("#productName").html(html);
			$("#productName").change(function () {
				$("#repaymentType").html("");
				var type = $(this).find("option:selected").attr("retype");
				var typeCn = $(this).find("option:selected").attr("retypeCn");
				if(type) {
					var types = type.split(",");
					var typeCns = typeCn.split(",");
					for(var i=0;i<types.length;i++){
						var option ="<option value='"
							+ types[i]
							+ "'>"
							+ typeCns[i]
							+ "</option>";
						$("#repaymentType").append(option);
					}
				}
				$("#warrantType").html("");
				var warrantType = $(this).find("option:selected").attr("warrantType");
				var warrantTypeCn = $(this).find("option:selected").attr("warrantTypeCn");
				if (warrantType) {
					var warrantTypes = warrantType.split(",");
					var warrantTypeCns = warrantTypeCn.split(",");
					for(var i=0;i<warrantTypes.length;i++){
						var option ="<option value='" + warrantTypes[i] + "'>" + warrantTypeCns[i] + "</option>";
						$("#warrantType").append(option);
					}
				}
				
				var interestRate = $(this).find("option:selected").attr("interestRate");
				$("#interestRate").val(formatMoney(interestRate*1000,".",3));
				var dinterestRate = $(this).find("option:selected").attr("dinterestRate");
				$("#dinterestRate").val(formatMoney(dinterestRate*1000,".",3));
				
				var warrant = $("#warrantType").val();
				var loanAmount = $("#loanAmount").val();
				switch(warrant){
				 case '0':
					 jQuery("#loanAmountCom").jqGrid("setCell", 1, "creditAmount", loanAmount);
					 break;
				 case '1':
					 jQuery("#loanAmountCom").jqGrid("setCell", 1, "pledageAmount", loanAmount);
					 break;
				 case '2':
					 jQuery("#loanAmountCom").jqGrid("setCell", 1, "mortgageAmount", loanAmount);
					 break;
				 case '3':
					 jQuery("#loanAmountCom").jqGrid("setCell", 1, "guaranteeAmount", loanAmount);
					 break;
				}
			});
		}
	},
}

jQuery.extend($.fn.fmatter,{
	formatMoneys:function(cellvalue,option,rowdata){
		if(isNaN(cellvalue) || cellvalue == ''){
			cellvalue = 0;
		}
		cellvalue = formatMoney(cellvalue,".",2);
		return cellvalue;
	}
});

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

/**单元格校验*/
function check(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		cellvalue = 0;
		//return [false," ["+colname+"]不能为空！",''];
	}
	if(isNaN(cellvalue)){
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	if(Number(cellvalue) < 0){
		return [false," ["+colname+"]不能小于0 元！",''];
	}
	if(v_Regular.float.test(cellvalue)) {

//		var amount = 0;
//		for(var i = 0; i < list.length; i++) {
//			var c = Number(list[i].creditAmount);
//			var g = Number(list[i].guaranteeAmount);
//			var p = Number(list[i].pledageAmount);
//			var m = Number(list[i].mortgageAmount);
//			if(i == (rowid-1)){
//				m = cellvalue;
//			}
//			amount=amount+m;
//		}
	} else {
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	$("#rowid").val("");
	$("#iCol").val("");
	$("#cellName").val("");
	return [true,'',''];
}
/**金额大写*/
function moneyDX(){
	$("#loanAmount").blur(function(){
		var input=$("#loanAmount").val();
		if(input!=""){
			var money=loan.numberToDX(input); 
			$("#loanAmoutDX").text(money);
		}
	})
}

/** 
* 判断是否null 
* @param data 
*/
function isNull(data){ 
	return (data == "" || data == undefined || data == null); 
}
