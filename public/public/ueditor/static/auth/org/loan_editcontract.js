loan.editcontract = loan.editcontract || {
	/**
	 * 修改前，显示初始合同数据
	 */
	initUpdateData:function(){
		var contractId = $("#contractId").val();
		loan.editcontract.queryContractInfo(contractId);
		loan.editcontract.queryAttachInfo(contractId);
	},
	/**
	 * 查询用户详情
	 */
	userDetail : function() {
		var userId = $("#userId").val();
		parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId=700901&userId="+userId,"customerDetail",true);
	},
	/**
	 * 查询合同详情
	 */
	queryContractInfo:function(contractId){
		loan.ajaxDo({
            url:loan.basePath+"/contract/queryContractInfo",
            params:{'format':'json','contractId':contractId},
            successCallback:function(result){
        		var domain = result.domain;
        		loan.editcontract.initWarrantGrid();
        		if(domain) {
        			//$("#productId").val(domain.productName);
        			$("#productId").prepend("<option value='"+domain.productId+"'>"+domain.productName+"</option>");
        			$("#userId").val(domain.userId);
        			$("#userName").html(domain.userName);
        			$("#idKind").html(domain.idKindCn);
        			$("#contractId").val(domain.contractId);
        			$("#loanAmount").val(domain.contractAmount);
        			$("#loanAmount").blur();
        			$("#idNo").html(domain.idNo);
        			$("#warrantType").html(domain.warrantTypeCn);
        			$("#loanDatelimit").val(domain.loanDatelimit);
        			$("#datelimitUnit").val(domain.datelimitUnit);
        			$("#startDate").val(domain.startDateStr);
        			$("#endDate").val(domain.endDateStr);
        			//$("#contractNo").val(domain.contractNo);
        			//$("#canAmountLi").remove();
        			//$("productName").val(domain.productName);
        			$("input[name='loanType']").eq(domain.loanType).attr("checked","checked");
        			var interestRate = domain.interestRate;
        			$("#interestRate").val(formatMoney(interestRate*1000,".",3));
        			var dinterestRate = domain.dinterestRate;
        			$("#dinterestRate").val(formatMoney(dinterestRate*1000,".",3));
        			$("#repaymentType").val(domain.repaymentType);
        			$("#loanPurpose").val(domain.loanPurpose);
        			$("#purposeRemark").val(domain.purposeRemark);
        			$("#paperContractNo").val(domain.paperContractNo);
        			$("#remark").val(domain.remark);
        			$('#confirmStatus').val(domain.confirmStatus);
        			var obj = new Object();
        			obj.creditAmount = formatMoney(domain.creditAmount,".",2);
        			obj.guaranteeAmount = formatMoney(domain.guaranteeAmount,".",2);
        			obj.mortgageAmount = formatMoney(domain.mortgageAmount,".",2);
        			obj.pledageAmount = formatMoney(domain.pledageAmount,".",2);
        			var flag = jQuery("#warrantGridId").jqGrid('addRowData',1,obj);
        		}
        	},
            successTip:false, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
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
			}
		});
		//大写金额
		$("#loanAmount").live("blur",function(){
			var value = $(this).val();
			if(v_Regular.money.test(value)) {
				var money = loan.numberToDX(value);
				$("#chAmount").html(money);
			}
		});
	},
	initWarrantGrid:function() {
		jQuery("#warrantGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['信用(元)','保证(元)','抵押(元)','质押(元)'], 
			colModel: [
				{name:'creditAmount',index:'creditAmount', align:'center',width:'25%',editable: true,
					   formatter: 'number',
					   sortable: false,
					   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
					   editrules: {custom:true, custom_func:check,maxValue:999999999}
				},
				{name:'guaranteeAmount',index:'guaranteeAmount', align:'center',width:'25%', editable:true,
					   formatter: 'number',
					   sortable: false,
					   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
					   editrules: {custom:true, custom_func:check,maxValue:999999999}
				},
				{name:'pledageAmount',index:'pledageAmount', align:'center',width:'25%', editable:true,
				   formatter: 'number',
				   sortable: false,
				   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
				   editrules: {custom:true, custom_func:check,maxValue:999999999}
			    },
				{name:'mortgageAmount',index:'mortgageAmount', align:'center',width:'25%', editable:true,
				   formatter: 'number',
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
			'cellsubmit': 'clientArray', //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
		    sortorder: 'desc',
			loadComplete:function(){},
			afterEditCell:loan.editcontract.afterEditCellFunc,
			gridComplete : function() {
			}
		})
		
		$("#warrantGridId").setGridWidth(950);
	},
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(contractId){
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':'700901',"checkId":contractId},//'menuId':'7009'这个后面加上
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			var ids = $("#attachGridId").jqGrid("getDataIDs");
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
	     					if(item.setId == rowdata.setId) {
	     						$("#attachGridId").jqGrid("setRowData",ids[j],{
	     			        		  filelistId : item.filelistId,
	     			        		  uploadFileName : "<a href='"+item.depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>",
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
	/**
	 * 
	 */
	afterEditCellFunc:function(rowid,name,val,iRow,iCol){
		$("#rowid").attr("value",iRow);
		$("#iCol").attr("value",iCol);
		$("#cellName").attr("value",name);
	},/**
	 * 页面点击事件
	 */
	clickPage : function(evt) {
		var e = evt || window.event;
		var obj = e.srcElement ? e.srcElement : e.target;
		var target = $(obj.parentElement.offsetParent).attr("id");
		var rowid = $("#rowid").val();
		var colid = $("#iCol").val();
		var cellName = $("#cellName").val();
		if(target != "warrantGridId" && rowid && colid) {
			var ev = jQuery.Event("keydown");
			ev.keyCode = 13 //enter key
			jQuery("#"+rowid+"_"+cellName).trigger(ev);
		}
	},
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function(type) {
		if(type && type == 'flowUpdate'){
			loan.tabcut.childClosedIframe(false);
		}else{
			loan.tabcut.childClosedIframe(true);
		}
	},
	/**
	 * 初始化上传附件页面
	 */
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select', sortable: false,align:'center',width:300,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.editcontract.upload("+options.rowId+")' value='上传' />"+
						"<label id='labelId'></label>"+
						"</form>";
					}},
			   {name:'uploadFileName',index:'uploadFileName', align:'center'}
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
	  	jQuery("#attachGridId").setGridWidth(950);
	  	//设置附件条目
		loan.editcontract.queryAttachItem();
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':'700901','status':'0','functionId':'7009','page':'1','rows':'9999'},
            successCallback:loan.editcontract.attachItemCallBack,
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
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			var rowid = i+1;
    			$("#attachGridId").jqGrid("addRowData",rowid,item);
    		}
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
		
		$("#loanUpload_"+rowid).upload({
			url: loan.basePath+'/org/upload?extenString='+extenString+"&orgId="+orgId+"&checkId="+checkId+"&filelistId="+filelistId+"&setId="+setId,
			// 其他表单数据
			params: {"menuId":'700901'},
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
					jQuery("#attachGridId").jqGrid('setRowData',rowid, {
		        		  filelistId : obj.domain.filelistId,
		        		  uploadFileName : "<a href='"+obj.domain.depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>",
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
		loan.editcontract.fileUpdate = false;
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
			//校验是否重新上传的文件未提交
			var fileValue = $("#loanUpload_"+rowid).val();
			if(fileValue) {
				loan.editcontract.fileUpdate = true;
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
				fileObj.filelistId = rowObj.filelistId;
				filelist.push(fileObj);
			}
		}
		return JSON.stringify(filelist);
	},
	/**
	 * 修改合同
	 */
	editContract:function(type){
		var details = jQuery("#warrantGridId").jqGrid("getRowData");
		var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		//var fileList=loan.addapply.parseFileJson();
		//校验必传文件
		var fileList;
		if(!loan.editcontract.validateFiles()){
			return;
		} else {
			fileList = loan.editcontract.parseFileJson();
		}
		
		var editparams={
			menuId:'700901',
			format:'json',
			contractId:$("#contractId").val(),
			contractAmount:$("#loanAmount").val(),
			loanDatelimit:$("#loanDatelimit").val(),
			datelimitUnit:$("#datelimitUnit option:selected").val(),
			startDate:dateStrToStr($("#startDate").val()),
			endDate:dateStrToStr($("#endDate").val()),
			repaymentType:$("#repaymentType option:selected").val(),
			interestRate:($("#interestRate").val()/1000),
			dinterestRate:($("#dinterestRate").val()/1000),
			loanType:$('#loanType1 input[name="loanType"]:checked').val(),
			loanPurpose:$("#loanPurpose option:selected").val(),
			purposeRemark:$("#purposeRemark").val(),
			paperContractNo:$("#paperContractNo").val(),
			remark:$("#remark").val(),
			attachFileInfo:fileList,
			pledageAmount:details[0].pledageAmount,
			creditAmount:details[0].creditAmount,
			guaranteeAmount:details[0].guaranteeAmount,
			mortgageAmount:details[0].mortgageAmount,
			editType : $('#editType').val(),
			confirmStatus : $('#confirmStatus').val()
		};
		if(editparams.loanPurpose=="-1"){
			loan.tooltip("请选择贷款用途","error");
			return;
		}
		if(editparams.repaymentType=="-1"){
			loan.tooltip("请选择还款方式","error");
			return;
		}
		if(loan.editcontract.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.editcontract.doSubmit(editparams,type);
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.editcontract.doSubmit(editparams,type);
		}
		
	},
	/**
	 * 执行提交
	 */
	doSubmit:function(editparams,type){
		loan.ajaxDo({
			url:loan.basePath + "/contract/editContract",
			params:editparams,
			successCallback:function() {
				if(!type) {
					loan.editcontract.closeChildFrame(true);
				}
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
};

/**
 * 金额格式化
 * @param nData
 * @param decimalSeparator
 * @param decimalPlaces
 * @returns
 */
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
	
/**
 * 把日期格式转化为纯数字格式字符
 */
function dateStrToStr(dateStr) {
	if(dateStr != null) {
		return dateStr.replace(/\-/g,"");
	}
	return dateStr;
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

/**单元格校验*/
function check(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		return [false," ["+colname+"]不能为空！",''];
	}
	if(isNaN(cellvalue)){
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	if(Number(cellvalue) < 0){
		return [false," ["+colname+"]不能小于0 元！",''];
	}
	if(v_Regular.float.test(cellvalue)) {
		//计算行和
		cellvalue = Number(Number(cellvalue).toFixed(2));
		//var money = loan.numberToDX(cellvalue);
		var rowid = $("#rowid").val();
		var colid = $("#iCol").val();
		var rowData = $("#warrantGridId").jqGrid('getRowData',rowid);
		var columnArray = $("#warrantGridId").jqGrid('getGridParam','colModel'); 
		var editname = columnArray[colid].name;
		var amount = 0;
		for ( var property in rowData) {
			var m = Number(rowData[property]);
			if(property == editname) {
				m = cellvalue
			}
			amount=amount+m;
		}
		$('#loanAmount').val(amount);
		$("#loanAmount").blur();
	} else {
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	$("#rowid").val("");
	$("#iCol").val("");
	$("#cellName").val("");
	return [true,'',''];
}