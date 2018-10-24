loan.waitvisitpage=loan.waitvisitpage||{
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#caseNo").val('');
		$("#orderNo").val('');
	},
	/**
	 * 查看案件详情
	 */
	detail:function(menuId,rowid){
		 var caseId=$("#visitCase").jqGrid('getCell',rowid,'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?caseId="+caseId
				+"&menuId=" + menuId,"toCaseInfo",true);	
	},
	/**
	 * 完成外访
	 */
	finishVisit:function(){
		var ids = $("#visitCase").jqGrid("getGridParam", "selrow");
	    if(ids==null){
	    	loan.tooltip("请选择需要处理的案件","error"); 
			return;
	    }
		var menuId=$("#menuId").val();
		 var orderId=$("#visitCase").jqGrid('getCell',ids,'orderId');
			parent.loan.tabcut.childAddIframe("完成外访",loan.basePath+"/collecting/toFinishVisit?orderId="+orderId
					+"&menuId=" + menuId,"toFinishVisit",true,true);	
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){
		var menuId=$("#menuId").val();
		var caseNo = $("#caseNo").val();//事件ID
		var orderNo =$("#orderNo").val();//工单ID
		$("#visitCase").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'caseNo':caseNo,'orderNo':orderNo,
				'status':status,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	setAddress:function(rowId){
		/****行政区域特殊处理*****/
		var provinceCode = $("#visitCase").jqGrid("getCell",rowId, "provinceCode");
		var cityCode = $("#visitCase").jqGrid("getCell",rowId, "cityCode");
		var districtCode = $("#visitCase").jqGrid("getCell",rowId, "districtCode");
		var address = $("#visitCase").jqGrid("getCell",rowId, "address");
		$("#area").attr("provinceid",provinceCode);
		$("#area").attr("cityid",cityCode);
		$("#area").attr("areaid",districtCode);
		var address=loan.getArea(provinceCode)+loan.getArea(cityCode)+loan.getArea(districtCode)+address;
		$("#visitCase").jqGrid("setCell",rowId,"areaCn",address);
	},
	loadAddress:function(){
		var ids=$("#visitCase").getDataIDs();
		var len=ids.length;
		for(var i=0;i<len;i++){
			loan.waitvisitpage.setAddress(ids[i]);
		}	
	}
}
