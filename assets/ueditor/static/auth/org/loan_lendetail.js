$(function() {
	var receiptId = $("#receiptId").val();
	var userId = $("#userId").val();
	var userName = $("#userName").val();
	var idKind = $("#idKind").val();
	var productId = $("#productId").val();
	var productName = $("#productName").val();
	var productType = $("#productType").val();
	var idNo = $("#idNo").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var status = $("#status").val();
	if(status == "repaycheck") {
		$("#leagueName").hide();
	}
	// 加载还款明细
	jQuery("#lendetailGridId").jqGrid({
		url: loan.basePath + "/org/queryRepaymentPlanPaged",
		mtype:'POST',
		datatype: "json",
		postData:{
			format:'json',
			'receiptId':receiptId,
			'userId':userId,
			'userName':userName,
			'idKind':idKind,
			'productId':productId,
			'productName':productName,
			'productType':productType,
			'idNo':idNo,
			'startDate':startDate,
			'endDate':endDate,
			'menuId':'700401'
		},
		colNames: ['应还日期', '租金（元）', '利息（元）', '罚息（元）', '应还款额（元）', '已还款额（元）', '利息减免（元）', '状态值', '状态'], 
		colModel: [
		           {name:'repaymentDate', index:'repaymentDate', sortable: false, align:'center'},
		           {name:'principalAmount', index:'principalAmount', sortable: false, align:'center', formatter:"formatMoneys"},
		           {name:'poundage', index:'poundage', sortable: false, align:'center', formatter:"formatMoneys"},
		           {name:'penalty', index:'penalty', sortable: false, align:'center', formatter:"formatMoneys"},
		           {name:'mustPayBalance', index:'mustPayBalance', sortable: false, align:'center', formatter:"formatMoneys"},
		           {name:'payBalance', index:'payBalance', sortable: false, align:'center', formatter:"formatMoneys"},
		           {name:'derateFees', index:'derateFees', sortable: false, align:'center', formatter:"formatMoneys"},
		           {name:'repayStatus', index:'repayStatus', sortable: false, align:'center', hidden:true},
		           {name:'repayStatusCn', index:'repayStatusCn', sortable: false, align:'center'}
		        ],
        jsonReader:{ 
			root: "response.pager.items",			// 数据项
			page: "response.pager.currentPageNo",	// 当前页码
			total: "response.pager.indexes", 		// 总页数
			records: "response.pager.totalResult",	// 总记录数
			repeatitems : false
		},      
	    pager:jQuery('#lendetailGridPanelId'),
	    rowNum : 10,
		rowList : [10, 20, 30],
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
		loadComplete:function(){},
		gridComplete : function() {}
	});
	var mydata = [
			{money:"1200.00"}
		];
	for(var i=0;i<=mydata.length;i++){
		jQuery("#lendetailGridId").jqGrid('addRowData',i+1,mydata[i]);
	}
	$(".openw").click(function(){
		loan.s_addPop("选择客户","selectloan.jsp","",650,400);
	})

});

$(window).resize(function(){
	loan.grid.mdetailconWidth("lendetailGridId");
})