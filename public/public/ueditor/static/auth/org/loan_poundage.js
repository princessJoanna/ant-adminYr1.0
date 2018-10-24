var menuId;
loan.poundage = loan.poundage || {
	/**
	 * 条件查询
	 */
	search:function() {
		var startDate = $("#startDate").val();
		var endDate = $("#endDate").val();
		endDate = endDate.replace(/\-/g,"");
		startDate = startDate.replace(/\-/g,"");
		if(endDate && startDate && startDate > endDate) {
			loan.tooltip("结束日期不应大于开始日期","error");
			return;
		}
		var settleStatus = $("#settleStatus").val();
		if(settleStatus == '-1') {
			settleStatus = '';
		}
		var orgId = $("#orgId").val();
		$("#poundageGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','startDate':startDate,'endDate':endDate,'settleStatus':settleStatus,
				"settleOrgId":orgId},
			page:1
	    }).trigger('reloadGrid');
	},
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id,chose) {
		if(!chose) {
			chose = '-1';
		}
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val(chose);
	},
	
	/**
	 * 清空查询条件
	 */
	clear:function() {
		$("#startDate").val("");
		$("#endDate").val("");
		$("#settleStatus").val("-1");
		if($("#orgQueryDiv").length == 1) {
			$("#orgTree_1_a").click();
		}
	},
}

$(function(){
	menuId = $("#menuId").val();
	loan.poundage.setSelect("settleStatus","-1");
	$('#endDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true,
		changeMonth:true,
		changeYear:true
	});
	$('#startDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true,
		changeMonth:true,
		changeYear:true
	});
	
	//金额格式化，两位小数
	jQuery.extend($.fn.fmatter,{
		formatMoneys:function(cellvalue,option,rowdata){
			cellvalue = formatMoney(cellvalue,".",2);
			return cellvalue;
		}
	});
	
})

