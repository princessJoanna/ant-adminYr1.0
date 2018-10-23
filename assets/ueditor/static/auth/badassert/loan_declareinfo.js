loan.declareinfo = loan.declareinfo || {
	
	
	
	saveDeclare : function(){
		if(loan.declareinfo.isOk == false) {
			loan.declareinfo.isOk = true;
			return;
		}
		var menuId = $('#menuId').val();
		var applyId =$('#applyId').val();
		var scenarioName= $('#scenarioName').val();
		var writeoffSum= $('#writeoffSum').val();
		// debugger;
		var ifHoldRecourse=$("input[name='ifHoldRecourse']:checked").val();
		if(ifHoldRecourse==null){
			loan.tooltip('"是否保留对借款人的追索权"不能为空',"error")
			return;
		}
		var ifExistLitigationFee=$("input[name='ifExistLitigationFee']:checked").val();
		if(ifExistLitigationFee==null){
			loan.tooltip('"是否存在待结案诉讼费"不能为空',"error")
			return;
		}
		var litigationFee=$('#litigationFee').val()
		loan.ajaxDo({
			url:loan.basePath+"/writeoff/modifyDeclareInfo",
			params:{'format':'json','menuId':menuId,'applyId':applyId,'scenarioName':scenarioName,'writeoffSum':writeoffSum,
				'ifHoldRecourse':ifHoldRecourse,'ifExistLitigationFee':ifExistLitigationFee,'litigationFee':litigationFee},
			successCallback:function(){
				var declareInfoList=JSON.stringify(jQuery("#writeoffMoney").jqGrid("getRowData"));
				loan.ajaxDo({
					url:loan.basePath+"/writeoff/modifyDeclareMoneyList",
					params:{'format':'json','menuLog':'1','declareInfoList':declareInfoList,'applyId':applyId,'menuId':menuId},
					successCallback:null,
					successTip:false, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	isOK: true,
    
	queryDeclareMoneyList:function(){
		var menuId = $('#menuId').val();
		var applyId =$('#applyId').val();
		jQuery("#writeoffMoney").jqGrid({
			url: loan.basePath+ "/writeoff/queryDeclareMoneyList",
			mtype:'POST',
			datatype: "json",
			autowidth: true,	
			forceFit:true,
			height:'auto',
			postData:{'format':'json','menuId':menuId,"applyId":applyId},
			colNames: ['主键','合同编号','*申报核销本金(元)','*申报核销应收费息(元)'], 
			colModel: [
               {name:'declareId', sortable: false,align:'center',hidden:true},
			   {name:'contractNo', sortable: false,align:'center'},
			   {name:'writeoffPrincipal',sortable: false, align:'center',editable:true,
				   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:999999999}},
			   {name:'writeoffReceivableInterest',sortable: false, align:'center',editable:true,
				   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:999999999}}
	        ],
	        jsonReader:{ 
				root: "response.models",//数据项
				repeatitems : false
			},
			rowNum : 999,
			pager:jQuery('#panelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			'cellsubmit': 'clientArray',  //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
			sortname: '',  
		    sortorder: 'desc',
		    scrollrows: false, 
			loadComplete:function(){},
			gridComplete : function() {
				$("#writeoffMoney").parents(".ui-jqgrid-bdiv").css("overflow-x","hidden");
				var ids=$("#writeoffMoney").jqGrid("getDataIDs");
				if(ids.length>10){
					 $("#writeoffMoney").setGridHeight(350); 	 
				}
			},
			beforeEditCell: function(rowid,name,value,iRow,iCol){
				loan.declareinfo.isOk = true;
			},
			beforeSaveCell:function(rowid,name,value,iRow,iCol){
					if(!isNaN(value) && value != "") {
						var val = parseFloat(value);
						var arr=jQuery("#writeoffMoney").jqGrid("getRowData");
						var writeoffSum=0;
						for(var i=0;i<arr.length;i++){
							var writeoffPrincipal = parseFloat(arr[i].writeoffPrincipal);
							var writeoffReceivableInterest = parseFloat(arr[i].writeoffReceivableInterest);
							writeoffSum += (isNaN(writeoffPrincipal)? val: writeoffPrincipal) + 
							(isNaN(writeoffReceivableInterest)? val: writeoffReceivableInterest) 
							}
						$('#writeoffSum').text(writeoffSum.toFixed(2));
					}else {
						loan.declareinfo.isOk = false;
					}
			},
		});
		jQuery("#writeoffMoney").setGridWidth(900);
		
	},
	
	
};

/**单元格校验*/
function checkMoney(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		return [false," ["+colname+"]不能为空！",''];
	}
	// debugger;
	if(isNaN(cellvalue)){
		return [false," ["+colname+"]格式不正确！",''];
	}
	if(Number(cellvalue) < 0){
		return [false," ["+colname+"]不能小于0 ！",''];
	}
	
	return [true,'',''];
}