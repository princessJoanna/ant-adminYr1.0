var menuId = -1;
loan.selectcontract = loan.selectcontract || {
	url:loan.basePath+"/contract/queryCanUseContractPaged",
	params:{},
	/**
	 * 搜索
	 */
	searchFn :function(){
		var userName = $("#userName").val();
		searchOrgId = $("#parentOrgId").val();
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','userName':userName,'searchOrgId':searchOrgId},
			page:1
	    }).trigger('reloadGrid');   
	},
	
	/**
	 * 只能选择循环合同或者未放款的单次合同或者有剩余额度的多次合同
	 */
	initGrid:function(opType) {
		menuId = $("#menuId").val();
		loan.selectcontract.params = {format:'json','menuId':menuId};
		if(opType == 'warrantrel') {//担保关系
			loan.selectcontract.params = {
					'format':'json',
					'menuId':menuId,
					'confirmStatus':'2',
					'contractStatus':'1',
			};
			loan.selectcontract.url = loan.basePath+"/contract/queryContractPaged"
		}
		jQuery("#userGridId").jqGrid({
			url: loan.selectcontract.url,
			mtype:'POST',
			datatype: "json",
			postData:loan.selectcontract.params,
			onSelectRow:function(rowid,status){
				$("#rowid").attr("value",rowid);
			},
			colNames: ['客户名称','证件类型','证件号','合同号','合同开始日期','合同结束日期','可用金额(元)',
			           '客户id','合同类型码','证件类型码','担保方式码','状态码','合同id',
			           '利率','罚息利率','暂封金额','已用金额','冻结金额','返还金额','合同金额(元)',
			           '产品id','还款方式','借款期限','借款期限单位','借款用途','用途描述'], 
			colModel: [
	           {name:'userName',index:'userName',align:'center',sortable: false},
	           {name:'idKindCn',index:'idKindCn',align:'center',sortable: false},
	           {name:'idNo',index:'idNo',align:'center',sortable: false},
	           
	           {name:'contractNo',index:'contractNo',align:'center',sortable: false},
	           {name:'startDate',index:'startDate',align:'center',sortable: false},
	           {name:'endDate',index:'endDate',align:'center',sortable: false},
	           {name:'canAmount',index:'canAmount',align:'center',sortable: false},
	           
	           {name:'userId',index:'userId',hidden:true},
	           {name:'contractType',index:'contractType',hidden:true},
	           {name:'idKind',index:'idKind',hidden:true},
	           {name:'warrantType',index:'warrantType',hidden:true},
	           {name:'contractStatus',index:'contractStatus',hidden:true},
	           {name:'contractId',index:'contractId',hidden:true},
	           
	           {name:'interestRate',index:'interestRate',hidden:true},
	           {name:'dinterestRate',index:'dinterestRate',hidden:true},
	           {name:'adjustAmount',index:'adjustAmount',hidden:true},
	           {name:'usedAmount',index:'usedAmount',hidden:true},
	           {name:'freezeAmount',index:'freezeAmount',hidden:true},
	           {name:'returnAmount',index:'returnAmount',hidden:true},
	           {name:'contractAmount',index:'contractAmount',align:'center',sortable: false},
	           {name:'productId',index:'productId',hidden:true},
	           {name:'repaymentType',index:'repaymentType',hidden:true},
	           {name:'loanDatelimit',index:'loanDatelimit',hidden:true},
	           {name:'datelimitUnit',index:'datelimitUnit',hidden:true},
	           {name:'loanPurpose',index:'loanPurpose',hidden:true},
	           {name:'purposeRemark',index:'purposeRemark',hidden:true}
	           ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			pager:jQuery('#userGridPanelId'),
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
			gridComplete : function() {
				
			}
		})
	},
	/**
	 * 设置提交按钮的方法
	 */
	initSubmitFunc:function(submitFunc) {
		if(submitFunc) {
			$("#submit_button").attr("href","javascript:loan.selectcontract."+submitFunc+"();");
		}
	},
	
	/**
	 * 选择确定
	 */
	submit2WarrantRel:function(){
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选中要操作的行","error");
			return;
		}
		//父页面赋值
		var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
		parent.$("#userName").html(rowObj.userName);
		parent.$("#idNo").html(rowObj.idNo);
		parent.$("#idKind").html(rowObj.idKindCn);
		var oldUserId = parent.$("#userId").val();
		parent.$("#userId").attr("value",rowObj.userId);
		parent.$("#contractId").attr("value",rowObj.contractId);
		parent.$("#contractNo").attr("value",rowObj.contractNo);
		parent.$("#contractAmount").html(rowObj.contractAmount);
		if(rowObj.userId != oldUserId) {
			parent.$("#contractId").change();
		}
		
		//关闭选择窗口
		loan.selectcontract.closePage();
	},
	
	/**
	 * 放款申请选择确定
	 */
	submitLoanApply:function(){
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选中要操作的行","error");
			return;
		}
		//父页面赋值
		var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
		parent.$("#userName").html(rowObj.userName);
		parent.$("#idNo").html(rowObj.idNo);
		parent.$("#idKind").html(rowObj.idKindCn);
		parent.$("#userId").val(rowObj.userId);
		parent.$("#contractId").val(rowObj.contractId);
		parent.$("#contractNo").val(rowObj.contractNo);
		var interestRate = (rowObj.interestRate*1000).toFixed(3);
		parent.$("#interestRate").val(interestRate);
		var dinterestRate = (rowObj.dinterestRate*1000).toFixed(3);
		parent.$("#dinterestRate").val(dinterestRate);
		parent.$("#contractNo").val(rowObj.contractNo);
		if(rowObj.productId && rowObj.productId != '0') {
			parent.$("#productId").val(rowObj.productId);
		}
		parent.$("#canAmount").html(rowObj.canAmount);
		parent.$("#repaymentType").val(rowObj.repaymentType);
		parent.$("#loanPurpose").val(rowObj.loanPurpose);
		parent.$("#term").val(rowObj.loanDatelimit);
		parent.$("#unit").val(rowObj.datelimitUnit);
		parent.$("#purposeDetail").val(rowObj.purposeRemark);
		//关闭选择窗口
		loan.selectcontract.closePage();
	},
	closePage:function(){
		if(parent.$("#focus").length == 1) {
			parent.$("#focus").focus();
		}else if(parent.$("#contractNo").length == 1){
			parent.$("#contractNo").focus();
		}
		loan.s_Pop_closedChild(false,false);
	}
	
}

$(function(){
	//重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",loan.selectcontract.closePage);
	//初始化参数
	menuId = $('#menuId').val();
	var submitFunc = $("#submitFunc").val();
	loan.selectcontract.initSubmitFunc(submitFunc);
	loan.selectcontract.initGrid($('#opType').val());
});


