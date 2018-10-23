loan.sendapplyinf= loan.sendapplyinf|| {
	menuId:'701106',//菜单号
	
	/**
	 * 查询申请详情
	 */
	queryApplyInfo:function(loanApplyId){
		loan.ajaxDo({
            url:loan.basePath+"/sendloan/querySendApplyInfo",
            params:{ 'menuId':loan.sendapplyinf.menuId,'format':'json','loanApplyId':loanApplyId,'menuLog':'1'},
            successCallback:function(result){
        		var domain = result.domain;
        		if(domain) {
        			$("#contractNo").html(domain.contractNo);
        			$("#userName").html(domain.userName);
        			$("#idKindCn").html(domain.idKindCn);
        			$("#idNo").html(domain.idNo);
        			$("#loanAmount").html(formatMoney(domain.loanAmount,".",2)+"(元)");
        			$("#termNumber").html(domain.termNumber);
        			$("#termUnitCn").html(domain.termUnitCn);
        			var interestRate = domain.interestRate * 1000;
        			$("#interestRate").html(formatMoney(interestRate,".",3)+"‰");
        			$("#productName").html(domain.productName);
        			var dinterestRate = domain.dinterestRate * 1000;
        			$("#dinterestRate").html(formatMoney(dinterestRate,".",3)+"‰");
        			$("#repaymentTypeCn").html(domain.repaymentTypeCn);
        			$("#loanPurposeCn").html(domain.loanPurposeCn);
        			$("#purposeRemark").html(domain.purposeRemark);
        			$("#contractRemark").html(domain.contractRemark);
        			$("#warrantRemark").html(domain.warrantRemark);
        			$("#remark").html(domain.remark);
        			$('#userId').val(domain.userId);
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 上传附件grid
	 */
	initAttachInfo:function(warrantId){
		var menuId=$("#menuId").val();
		jQuery("#attachGridId").jqGrid({
			url: loan.basePath+ "/org/queryAttachFiles",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json',"menuId":menuId,"checkId":warrantId},
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath', sortable: false,align:'center',hidden:true},
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
			   {name:'annexName',index:'annexName', sortable: false,align:'center'},
			   {name:'originalFilename',index:'originalFilename',sortable: false, align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename  +"'  target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
			   }
	        ],
	        jsonReader:{ 
				root: "response.list",//数据项
				repeatitems : false
			},
			pager:jQuery('#attachGridId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
		jQuery("#attachGridId").setGridWidth($(window).width()-60);
	}
}
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
