loan.applyinfo = loan.applyinfo||{
	queryLoanApply:function(applyId){
		var menuId=$("#menuId").val();
		loan.ajaxDo({
			url:loan.basePath+"/loan/queryPreLoanApply",
			params:{'menuId':menuId,'menuLog':'1','format':'json','applyId':applyId},
			successCallback:loan.applyinfo.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	initPage:function(result){
		var loanApply=result.preLoanApplyDomian;
		$("#userName").html(loanApply.userName);
		$("#idKindCn").html(loanApply.idKindCn);
		$("#idNo").html(loanApply.idNo);
		$("#loanAmount").html(formatMoney(loanApply.loanAmount,".",2)+"元");
		$("#productName").html(loanApply.productName);
		$("#repaymentTypeCn").html(loanApply.repaymentTypeCn);
		$("#warrantTypeCn").html(loanApply.warrantTypeCn);
		$("#loanDatelimit").html(loanApply.loanDatelimit+loanApply.datelimitUnitCn);
		$("#interestRate").html(formatMoney(loanApply.interestRate*1000,".",3)+"‰");
		$("#dinterestRate").html(formatMoney(loanApply.dinterestRate*1000,".",3)+"‰");
		$("#loanTypeCn").html(loanApply.loanTypeCn);
		$("#loanPurposeCn").html(loanApply.loanPurposeCn);
		$("#purposeRemark").html(loanApply.purposeRemark);
		// 2016-11-08 
		$('#userId').val(loanApply.userId);
		var obj = new Object();
		obj.creditAmount = formatMoney(loanApply.creditAmount,".",2);
		obj.guaranteeAmount = formatMoney(loanApply.guaranteeAmount,".",2);
		obj.pledageAmount = formatMoney(loanApply.pledageAmount,".",2);
		obj.mortgageAmount = formatMoney(loanApply.mortgageAmount,".",2);
		var flag = jQuery("#loanApplyGridId").jqGrid('addRowData',1,obj);
	},
	initLoanApplyInfo:function(){
		jQuery("#loanApplyGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['信用金额（元）','保证金额（元）','抵押金额（元）','质押金额（元）'], 
			colModel: [
	           {name:'creditAmount',index:'creditAmount', align:'center',width:'25%',editable: true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:''}
	           },
	           {name:'guaranteeAmount',index:'guaranteeAmount', align:'center',width:'25%', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:''}
	        	},
	        	{name:'pledageAmount',index:'pledageAmount', align:'center',width:'25%', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:''}
		        },
		        {name:'mortgageAmount',index:'mortgageAmount', align:'center',width:'25%', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:''}
			    }
	        ], 
			rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			'cellsubmit': 'clientArray',  //不进行ajax提交
			cellEdit : false,  //设置可编辑单元格
			sortname: '',  
		    sortorder: 'desc',
			loadComplete:function(){},
			afterEditCell:function(){},
			gridComplete : function() {
				
			}
		})
		$("#loanApplyGridId").setGridWidth(580);
	},
	initAttachInfo:function(warrantId){
		var menuId=$("#menuId").val();
		jQuery("#loanFileGridId").jqGrid({
			url: loan.basePath+ "/org/queryAttachFiles",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json',"menuId":menuId,"checkId":warrantId},
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath', sortable: false,align:'center',hidden:true},
	           {name:'orgId',index:'orgId', align:'center',sortable: false,hidden:true},
	           {name:'setId',index:'setId', align:'center',sortable: false,hidden:true},
			   {name:'annexName',index:'annexName', sortable: false,align:'center'},
			   {name:'originalFilename',index:'originalFilename', sortable: false,align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename  +"'  target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
			   }
	        ],
	        jsonReader:{ 
				root: "response.list",//数据项
				repeatitems : false
			},
			pager:jQuery('#loanFileGridId'),
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
		jQuery("#loanFileGridId").setGridWidth(580);
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
$(function(){
	var applyId = $("#applyId").val();
	loan.applyinfo.initLoanApplyInfo();
	loan.applyinfo.queryLoanApply(applyId);
	loan.applyinfo.initAttachInfo(applyId);
	//重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",function(){
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(false,false);
	});
})