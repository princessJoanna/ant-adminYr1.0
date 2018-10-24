loan.caseassign = loan.caseassign || {
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function(result) {
		if(result.success){
			$("#caseAssignGridId").jqGrid("setGridParam", {   
				postData:{'format':'json'}
		    }).trigger('reloadGrid');
		}
	},
	
	/**
	 * 内部催收案件
	 * @param menuId
	 */
	innerAssignCaseBtn:function(menuId){
		var rowids = $("#caseAssignGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择案件","error"); 
			return;
		}
		var caseIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#caseAssignGridId").jqGrid('getCell',rowids[i],'caseId');
	    	var caseId = vl+',';
	    	caseIds = caseIds + caseId;
	    }
		loan.s_addPop("内部催收",loan.basePath+"/case/toCaseInnerAssign?menuId="+menuId+"&caseIds="+caseIds,"",1000,400,{isChangeClose:true});
	},

	/**
	 * 案件委外催收
	 */
	outCaseBtn:function(menuId){
		var rowids = $("#caseAssignGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择案件","error"); 
			return;
		}
		var caseIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#caseAssignGridId").jqGrid('getCell',rowids[i],'caseId');
	    	var caseId = vl+',';
	    	caseIds = caseIds + caseId;
	    }
	    
	    $.artDialog({
			title:"提示",
			content:"确定要委外催收吗？",
			ok:function(){
				loan.ajaxDo({
					url:loan.basePath+"/case/assignOut",
					params:{'format':'json','menuLog':'1','caseIds':caseIds,'assignOutType':'0','menuId':menuId},
					successCallback:loan.caseassign.freshGrid,
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
			},
			cancel:function(){
				return false;
			}
		});
	    
	    
	},
	
	
	/**
	 * 关闭案件
	 * @param menuId
	 */
	closeCaseBtn:function(menuId){
		var rowids = $("#caseAssignGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择案件","error"); 
			return;
		}
		var caseIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#caseAssignGridId").jqGrid('getCell',rowids[i],'caseId');
	    	var caseId = vl+',';
	    	caseIds = caseIds + caseId;
	    }
		loan.s_addPop("关闭案件",loan.basePath+"/case/toCaseClose?menuId="+menuId+"&caseIds="+caseIds,"",600,300,{isChangeClose:true});


		
	},
	
    /**
     * 查看案件详情
     * @param menuId
     */
	showCaseInfoBtn:function(menuId){
		var rowids = $("#caseAssignGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length!=1){
			loan.tooltip("请选择一条案件","error"); 
			return;
		}
		var caseId = $("#caseAssignGridId").jqGrid('getCell',rowids[0],'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?menuId="+menuId+"&caseId="+caseId,"toCaseInfo",true);
	},
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	/**
	 * 查询
	 */
	searchFunc:function(){	
		
		var caseNo = $("#caseNo").val();
		var receiptNo = $("#receiptNo").val();
		var userName = $("#userName").val();
		var mobile = $("#mobile").val();
		
		var status="";
		if($("#status").val()!="-1"){
			status = $("#status").val();
		}
		
		var minOverdueDays = $("#minOverdueDays").val();
		var maxOverdueDays = $("#maxOverdueDays").val();
		
		if(!(minOverdueDays==''&&maxOverdueDays=='')){
			if(!/^\+?[1-9][0-9]*$/.test(minOverdueDays)){
				loan.tooltip("最小天数请输入大于0的整数","error"); 
			    return;
			}
			if(!/^\+?[1-9][0-9]*$/.test(maxOverdueDays)){
				loan.tooltip("最大天数请输入大于0的整数","error"); 
			    return;
			}
			if(parseInt(minOverdueDays)>parseInt(maxOverdueDays)) {
				loan.tooltip("最小天数必须小于或等于最大天数","error"); 
				return;	
			}
		}
		

		$("#caseAssignGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'120102','caseNo':caseNo,'receiptNo':receiptNo,'userName':userName,'mobile':mobile,
				'status':status,'minOverdueDays':minOverdueDays,'maxOverdueDays':maxOverdueDays,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#caseNo").val('');
		$("#receiptNo").val('');
		$("#userName").val('');
		$("#mobile").val('');
		$("#status").val('-1');
		$("#minOverdueDays").val('');
		$("#maxOverdueDays").val('');
	},

};






