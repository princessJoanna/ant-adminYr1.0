loan.adjustfeeinfo = loan.adjustfeeinfo || {
	menuId:-1,
	/**
	 * 查询信息
	 */
	queryAdjustFeeInfo: function(applyId) {
		loan.ajaxDo({
			url:loan.basePath+"/feesAdjust/queryFeesAdjustInfo",
			params:{'menuId':loan.adjustfeeinfo.menuId,'menuLog':'1','format':'json','applyId':applyId},
			successCallback:loan.adjustfeeinfo.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	initPage:function(result) {
		var domain = result.domain;
		loan.adjustfeeinfo.initAttachGrid(domain.applyId);
		if(domain) {
			var idKindCn = $("#idKindCn").val();
			$("#receiptNo").html(domain.receiptNo);//借据号
			$("#userName").html(domain.userName);//客户名称
			$("#idKind").html(idKindCn);//证件类型
			$("#idNo").html(domain.idNo);//证件号码
			$("#applyId").val(domain.applyId);
			$("#loanAmount").html(domain.loanAmount + "元");//贷款金额
			$("#loanDate").html(domain.loanDate);//贷款开始日期
			$("#limitDate").html(domain.limitDate);//贷款到期日期
			var interestRate = domain.interestRate*1000;
			$("#interestRate").html(interestRate+"‰");//原执行月利率
			$("#interestAmount").html(formatMoney(domain.interestAmount,".",2)+"元");//调整利息
			$("#defaultInterestAmount").html(formatMoney(domain.defaultInterestAmount,".",2)+"元");//调整罚息
			$("#poundageAmount").html(formatMoney(domain.poundageAmount,".",2)+"元");//调整手续费
			$("#lateFeesAmount").html(formatMoney(domain.lateFeesAmount,".",2)+"元");//调整滞纳金
			$("#remark").val(domain.remark);

		}
		
	},
	
	initAttachGrid:function(applyId) {
		jQuery("#attachGridId").jqGrid({
			url: loan.basePath+ "/org/queryAttachFiles",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json',"menuId":loan.adjustfeeinfo.menuId,"checkId":applyId,'menuLog':'1'},//'menuId':'7004'这个后面加上
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath',sortable: false, align:'center',hidden:true},
	           {name:'orgId',index:'orgId',sortable: false, align:'center',hidden:true},
	           {name:'setId',index:'setId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName', sortable: false,align:'center'},
			   {name:'originalFilename',index:'originalFilename',sortable: false, align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename +"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
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
	var applyId = $("#applyId").val();
	loan.adjustfeeinfo.menuId = $("#menuId").val();
	loan.adjustfeeinfo.queryAdjustFeeInfo(applyId);
	
})