loan.borrowerAmountApplyRisk = loan.borrowerAmountApplyRisk||{
	queryRiskDetail:function(amountApplyId){
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url:loan.basePath + "/borrower/queryBorrowerAmountApplyRiskDetail",
			params:{'menuId':menuId, 'menuLog':'1', 'format':'json', 'amountApplyId':amountApplyId},
			successCallback:loan.borrowerAmountApplyRisk.initPage,
			successTip:false, // 不提示
			bizErrTip:false,  // 不提示
			chainPar:this
		});
	},
	
	initPage:function(result){
		var domain = result.riskDomain;
		$("#userName").html(domain.userName);
		$("#idKindCn").html(domain.idKindCn);
		$("#idNo").html(domain.idNo);
		$("#applyAmount").html(formatMoney(domain.applyAmount, ".", 2) + "元");
		$("#productName").html(domain.productName);
		if (null != domain.adviceAmount) {
			$("#adviceAmount").html(formatMoney(domain.adviceAmount, ".", 2) + "元");
		}
		
		$("#riskScore").html(domain.riskScore);
		$("#ruleResultCn").html(domain.ruleResultCn);
		
		if (isNull(domain.zmScore)) {
			$("#zmxyDIV").hide();
		} else {
			$("#zmScore").html(domain.zmScore);
		}
		
		if (isNull(domain.education)) {
			$("#educationDIV").hide();
		} else {
			$("#name").html(domain.name);
			$("#idCard").html(domain.idCard);
			$("#graduate").html(domain.graduate);
			$("#education").html(domain.education);
			$("#enrolDate").html(domain.enrolDate);
			$("#specialityName").html(domain.specialityName);
			$("#graduateTime").html(domain.graduateTime);
			$("#studyResult").html(domain.studyResult);
			$("#studyStyle").html(domain.studyStyle);
		}
		
		if (isNull(domain.finalDecisionCn)) {
			$("#antiDIV").hide();
		} else {
			$("#finalScore").html(domain.finalScore);
			$("#finalDecisionCn").html(domain.finalDecisionCn);
			$("#creditScore").html(domain.creditScore);
		}
		
		if (isNull(domain.moxieFlag)) {
			$("#moxieDIV").hide();
		} else {
			if (isNull(domain.taobaoCallbackUrl)) {
				$("#taobao").hide();
			} else {
				$("#taobao").attr("href", domain.taobaoCallbackUrl);
			}
			if (isNull(domain.jdCallbackUrl)) {
				$("#jingdong").hide();
			} else {
				$("#jingdong").attr("href", domain.jdCallbackUrl);
			}
			if (isNull(domain.fundCallbackUrl)) {
				$("#fund").hide();
			} else {
				$("#fund").attr("href", domain.fundCallbackUrl);
			}
			if (isNull(domain.mobileCallbackUrl)) {
				$("#mobile").hide();
			} else {
				$("#mobile").attr("href", domain.mobileCallbackUrl);
			}
			if (isNull(domain.securityCallbackUrl)) {
				$("#security").hide();
			} else {
				$("#security").attr("href", domain.securityCallbackUrl);
			}
		}
	},
	
	initAntiFraudInfo:function(){
		var menuId = $("#menuId").val();
		var amountApplyId = $("#amountApplyId").val();
		var userId = $("#userId").val();
		jQuery("#antiFraudGridId").jqGrid({
			url:loan.basePath + "/borrower/queryAntiFraudInfo",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json', "menuId":menuId, "amountApplyId":amountApplyId, "userId":userId},
			colNames: ['风险编号','风险描述','风险等级','风险项分组'], 
			colModel: [
			   {name:'itemId',index:'itemId', align:'center',sortable:false},
			   {name:'itemName',index:'itemName', align:'center',sortable:false},
	           {name:'riskLevelCn',index:'riskLevelCn', align:'center',sortable:false},
			   {name:'itemGroup',index:'itemGroup', align:'center',sortable:false}
	        ], 
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			pager:jQuery('#antiFraudGridId'),
			rowNum : 5,//每页显示记录数
			toolbarfilter : true,
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:true,//是否显示翻页按钮
			pginput: true,	//是否显示跳转页面的输入框
			height: 'auto',
			cellsubmit: 'clientArray',  //不进行ajax提交
			autowidth: true,	
			forceFit:true,//调整列宽不会改变表格宽度
			cellEdit : true,  //设置可编辑单元格
			afterEditCell:function(rowid,name,val,iRow,iCol){
				$("#iCol").attr("value",iCol);
				$("#rowid").attr("value",iRow);
				$("#cellName").attr("value",name);
			},
			loadComplete:function(result){
				maxValue = Number(result.response.maxValue);
			},//当从服务器返回响应时执行
			gridComplete : function() {//当表格所有数据都加载完成
				var total = $("#userGridId").jqGrid('getGridParam','records');
				total = total * 40 + 218;// 40是表格每行的高度，118是从顶部到表格标题的高度，加上100才完整展示
				var obj = document.getElementsByTagName('body')[0];
				obj.style.height = total + 'px';
			}
		});
		$("#antiFraudGridId").setGridWidth(1100);
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
	var amountApplyId = $("#amountApplyId").val();
	loan.borrowerAmountApplyRisk.initAntiFraudInfo();
	loan.borrowerAmountApplyRisk.queryRiskDetail(amountApplyId);
	// 重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",function(){
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(false,false);
	});
});

/** 
* 判断是否null 
* @param data 
*/
function isNull(data){ 
	return (data == "" || data == undefined || data == null); 
}