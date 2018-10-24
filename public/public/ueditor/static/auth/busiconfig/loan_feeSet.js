loan.feeSet = loan.feeSet|| {
	
	/**
	 * 提交修改费率参数
	 */
	updateFeeSetSummit:function() {
		//如果费率类型为比率，执行自定义的校验
		var obj = $("#feeValue").attr("verifyData");
		if(obj){
			obj = eval('(' + obj + ')');
			if(obj.type=="float" && !loan.feeSet.validateFloat("#feeValue")){
				return;
			}
		}	
		var feeId = $("#feeId").val();
		var orgId = $("#orgId").val();
		var feeValue = $("#feeValue").val();
		var remark = $("#remark").val();
		loan.ajaxDo({
			url:loan.basePath+"/interest/updateFeeSet",
			params:{"menuId":"400201",'menuLog':'1',"feeId":feeId,"orgId":orgId,"feeValue":feeValue,"remark":remark},
			successCallback: loan.feeSet.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
	},
	
	
	/**
	 * 名称模糊搜索
	 */
	searchFee:function() {
		var param = $("#param").val();
		$("#feeSetGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','cnName':param,'enName':param},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	validateFloat:function(container) {
		var value = $(container).val();
		$(container).siblings('div').remove();//清除提示
		var left = $(container).width();
		var flag=/^(\d{1,2}([.]{1}[0-9]{1,6})?)$/;
		if(loan.verify.verifyFloat($(container),value)){
			
			if(value >= 100) {
				var Tip = '应小于100';
				loan.verify.formValidatorShowMsg($(container),Tip,left);
				return false;
			}
			if(!flag.test(value)){
				var Tip = '最多6位小数';
				loan.verify.formValidatorShowMsg($(container),Tip,left);
				return false;
			}
				return true;
		}
	},
	
	/**
	 * 修改费率参数页面初始化
	 */
	initEditFee:function() {
		var rowid = parent.$("#rowid").val();
		var feeId = parent.$("#feeSetGridId").jqGrid('getCell',rowid,'feeId');
		var orgId = parent.$("#feeSetGridId").jqGrid('getCell',rowid,'orgId');
		var orgShortName = parent.$("#feeSetGridId").jqGrid('getCell',rowid,'orgShortName');
		//根据不同公式添加比率值得校验规则
		var feeRule = parent.$("#feeSetGridId").jqGrid('getCell',rowid,'feeRule');
		switch(feeRule) {//0固定值，1比率
			case "0":$("#feeValue").attr("verifyData","{type:'number',length:'1,16' ,required:'yes'}");break;
			case "1":$("#feeValue").attr("verifyData","{type:'float',length:'1,16' ,required:'yes'}");
			$("#feeValue").unbind("blur").bind("blur",function(){
				loan.feeSet.validateFloat("#feeValue");
			});
			break;
		}
		$("#feeId").attr("value",feeId);
		$("#orgId").attr("value",orgId);
		$("#paySide").html(parent.$("#feeSetGridId").jqGrid('getCell',rowid,'paySideCn'));
		$("#incomeSide").html(parent.$("#feeSetGridId").jqGrid('getCell',rowid,'incomeSideCn'));
		$("#orgShortName").html(orgShortName);
		$("#feeRule").html(parent.$("#feeSetGridId").jqGrid('getCell',rowid,'feeRuleCn'));
		
		$("#feeValue").attr("value",parent.$("#feeSetGridId").jqGrid('getCell',rowid,'feeValueStr'));
		$("#remark").attr("value",parent.$("#feeSetGridId").jqGrid('getCell',rowid,'remark'));
	},
	/** 选中feeset行的触发事件*/
	selectFeeSetRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	/**
	 * 初始化费率列表
	 */
	initFeeSetgGrid:function() {
		jQuery("#feeSetGridId").jqGrid({
			url:"queryFeeSetPaged",
			mtype:'POST',
			datatype: "json",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			/*postData:{format:'json'},*/
			colNames: ['机构名称','付费方','收益方','费率中文名称','费率英文名称','费率公式','费率值','说明','操作','费用ID','出资机构ID','paySide','incomeSide','feeRule'], 
			colModel: [
	           {name:'orgShortName',index:'orgShortName', align:'center',sortable: false},
	           {name:'paySideCn',index:'paySideCn', align:'center',sortable: false},
	           {name:'incomeSideCn',index:'incomeSideCn', align:'center',sortable: false},
	           {name:'cnName',index:'cnName',align:'center',width:90,sortable: false},
	           {name:'enName',index:'enName', align:'center',sortable: false},
	           {name:'feeRuleCn',index:'feeRuleCn',align:'center',width:60,sortable: false},
	           {name:'feeValue',index:'feeValue',align:'center',sortable: false},
	           {name:'remark',index:'remark',align:'center',width:90,sortable: false},
	           {name:'act',index:'act',align:'center',sortable: false},
	           
	           {name:'feeId',index:'feeId',align:'center',hidden:true},
	           {name:'orgId',index:'orgId', align:'center',hidden:true},
	           {name:'paySide',index:'paySide', align:'center',hidden:true},
	           {name:'incomeSide',index:'incomeSide', align:'center',hidden:true},
	           {name:'feeRule',index:'feeRule',align:'center',hidden:true}
	        ], 
	        jsonReader:{  //返回数据格式设置
	        	root: "response.pager.items",//数据项
	        	page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			sortname: 'feeId',   
		    sortorder: 'desc',
		    pager:jQuery('#feeSetGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			onSelectRow:loan.feeSet.selectFeeSetRowFunc,
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#feeSetGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var rowData = jQuery("#feeSetGridId").jqGrid('getRowData', rowIds[i]);				               	
	            	var addBtn = "<div class='operating'>";
	            	addBtn += "<a class='operating-pencil icon-radius' title='修改' onclick=\"edit('"+rowIds[i]+"')\"><i class='icon-pencil'></i></a></div>";	
					jQuery("#feeSetGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
		
	}

}

function edit(menuId,rowid){
	$("#rowid").attr("value",rowid);
	loan.s_addPop("修改费率参数",loan.basePath+"/interest/toeditrate?menuId="+menuId,"",500,400,{isRefresh:true,isChangeClose:true});	
}