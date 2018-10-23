loan.contractinfo = loan.contractinfo || {
	menuId:-1,
	/**
	 * 查询信息
	 */
	queryContractInfo: function(contractId) {
		loan.ajaxDo({
			url:loan.basePath+"/contract/queryContractInfo",
			params:{'menuId':loan.contractinfo.menuId,'menuLog':'1','format':'json','contractId':contractId},
			successCallback:loan.contractinfo.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
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
	},
	initPage:function(result) {
		var contract = result.domain;
		loan.contractinfo.initWarrantGrid();
		loan.contractinfo.initAttachGrid(contract.contractId);
		if(contract) {
			$("#userName").html(contract.userName);
			$("#idNo").html(contract.idNo);
			$("#idKindCn").html(contract.idKindCn);
			$("#appStatusCn").html(contract.appStatusCn);
			$("#warrantType").html(contract.warrantTypeCn);
			$("#loanAmount").html(contract.contractAmount+"元");
			$("#contractNo").html(contract.contractNo);
			if(contract.contractAmount) {
				var money = loan.numberToDX(contract.contractAmount);
				$("#chamount").html("大写金额："+money);
			}
			$("#productName").html(contract.productName);
			$("#loanDatelimit").html(contract.loanDatelimit);
			$("#datelimitUnit").html(contract.datelimitUnitCn);
			$("#startDate").html(contract.startDate);
			$("#endDate").html(contract.endDate);
			$("#repaymentType").html(contract.repaymentTypeCn);
			$("#loanType").html(contract.loanTypeCn);
			var interestRate = contract.interestRate*1000;
			$("#interestRate").html(formatMoney(interestRate,".",3)+"‰");
			var dinterestRate = contract.dinterestRate*1000;
			$("#dinterestRate").html(formatMoney(dinterestRate,".",3)+"‰");
			$("#paperContractNo").html(contract.paperContractNo);
			$("#loanPurpose").html(contract.loanPurposeCn);
			$("#purposeRemark").html(contract.purposeRemark);
			$("#remark").html(contract.remark);
			var obj = new Object();
			obj.creditAmount = formatMoney(contract.creditAmount,".",2);
			obj.guaranteeAmount = formatMoney(contract.guaranteeAmount,".",2);
			obj.mortgageAmount = formatMoney(contract.mortgageAmount,".",2);
			obj.pledageAmount = formatMoney(contract.pledageAmount,".",2);
			var flag = jQuery("#warrantGridId").jqGrid('addRowData',1,obj);
			$('#userId').val(contract.userId);
		}
		
	},
	
	initWarrantGrid:function() {
		jQuery("#warrantGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['信用(元)','保证(元)','抵押(元)','质押(元)'], 
			colModel: [
	           {name:'creditAmount',index:'creditAmount', align:'center',sortable: false},
	           {name:'guaranteeAmount',index:'guaranteeAmount', align:'center',sortable: false},   
	           {name:'pledageAmount',index:'pledageAmount', align:'center',sortable: false},
	           {name:'mortgageAmount',index:'mortgageAmount', align:'center',sortable: false},
	        ], 
			rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
		    sortorder: 'desc',
			loadComplete:function(){},
			gridComplete : function() {
			}
		})
		
		$("#warrantGridId").setGridWidth(850);
	},
	
	initAttachGrid:function(contractId) {
		jQuery("#attachGridId").jqGrid({
			url: loan.basePath+ "/org/queryAttachFiles",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json',"menuId":loan.contractinfo.menuId,"checkId":contractId,'menuLog':'1'},//'menuId':'7004'这个后面加上
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath',sortable: false, align:'center',hidden:true},
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'originalFilename',index:'originalFilename',sortable: false, align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename  +"'  target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
			   }
	        ],
	        jsonReader:{ 
				root: "response.list",//数据项
				repeatitems : false
			},
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			pgbuttons:true,
			pginput: true,	
			height: 'auto',	
			loadComplete:function(xhr){
//				console.log(xhr);
//				console.log(xhr.response.list);
				if(xhr.response.list.length == 0){
					$('#agId').hide();
				}
			},
			gridComplete : function() {
//				var detail = jQuery("#attachGridId").jqGrid("getRowData",1);
//				if(detail.orgId == undefined){
//					$('#agId').hide();
//				}
			}
		});
		jQuery("#attachGridId").setGridWidth(850);
	}
}
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
$(function(){
	var contractId = $("#contractId").val();
	loan.contractinfo.menuId = $("#menuId").val();
	loan.contractinfo.queryContractInfo(contractId);
	
})