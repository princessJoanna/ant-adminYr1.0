loan.pendingletter=loan.pendingletter||{
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#caseNo").val('');
		$("#orderNo").val('');
	},
	/**
	 * 拒绝
	 */
	refuse:function(){
		var ids = $("#letterOrderGridId").jqGrid("getGridParam", "selrow");
	    if(ids==null){
	    	loan.tooltip("请选择需要处理的案件","error"); 
			return;
	    }
	    var menuId=$("#menuId").val();
	    var orderId=$("#letterOrderGridId").jqGrid('getCell',ids,'orderId');
	    loan.ajaxDo({
	        url:loan.basePath+"/collecting/refuseLetter",
	        params:{'format':'json','menuId':menuId,'menuLog':'1','orderId':orderId},
	        successCallback:function(){
	        	$("#letterOrderGridId").trigger('reloadGrid');
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},

	/**
	 * 
	 * 发送催收函
	 */
		approval:function(){
			var ids = $("#letterOrderGridId").jqGrid("getGridParam", "selrow");
		    if(ids==null){
		    	loan.tooltip("请选择需要处理的案件","error"); 
				return;
		    }
		    var menuId=$("#menuId").val();
		    var orderId=$("#letterOrderGridId").jqGrid('getCell',ids,'orderId');
		 	loan.s_addPop("发送催收函",loan.basePath+"/collecting/toSendLetter?orderId="+orderId + "&menuId=" +menuId,"",950,500,{isRefresh:true});
	},
	/**
	 * 查看案件详情
	 */
	detail:function(menuId,rowId){
		 var caseId=$("#letterOrderGridId").jqGrid('getCell',rowId,'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?caseId="+caseId
				+"&menuId=" + menuId,"toVisitDetail",true);	
	},
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var menuId=$("#menuId").val();
		var caseNo = $("#caseNo").val();//事件ID
		var orderNo =$("#orderNo").val();//工单ID
		$("#letterOrderGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'caseNo':caseNo,'orderNo':orderNo,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},	
	
	
	
	
	
	
	
}