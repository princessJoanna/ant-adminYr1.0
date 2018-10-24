loan.importcase = loan.importcase || {
	
	/**
	 * 提交要生成案件的逾期借据
	 * @param menuId
	 */
	submit:function(){
		var rowids = $("#importCaseGridId").jqGrid("getGridParam", "selarrrow");
		if(rowids.length<1){
			loan.tooltip("请选择借据","error"); 
			return;
		}
		var receiptIds = '';
	    for(var i = 0;i <rowids.length;i++){
	    	var vl = $("#importCaseGridId").jqGrid('getCell',rowids[i],'receiptId');
	    	var receiptId = vl+',';
	    	receiptIds = receiptIds + receiptId;
	    }
	    
	    loan.ajaxDo({
			url:loan.basePath+"/case/importCase",
			params:{'format':'json','menuLog':'1','receiptIds':receiptIds,'menuId':"12010101"},
			successCallback:function(){
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});

      
		
	},
	
	/**
	 * 查询
	 */
	searchFunc:function(){	
		
		var receiptNo = $("#receiptNo").val();
		var userName = $("#userName").val();
		var mobile = $("#mobile").val();
		var idNo=$("#idNo").val();
		
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
		

		$("#importCaseGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'','receiptNo':receiptNo,'userName':userName,'mobile':mobile,
				'minOverdueDays':minOverdueDays,'maxOverdueDays':maxOverdueDays,'idNo':idNo,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#receiptNo").val('');
		$("#userName").val('');
		$("#mobile").val('');
		$("#idNo").val('');
		$("#minOverdueDays").val('');
		$("#maxOverdueDays").val('');
	},

};





