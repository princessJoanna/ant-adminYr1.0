loan.queryvisitpage=loan.queryvisitpage||{
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#status").val('');
		$("#caseNo").val('');
		$("#orderNo").val('');
	},
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var menuId=$("#menuId").val();
		var caseNo = $("#caseNo").val();//事件ID
		var orderNo =$("#orderNo").val();//工单ID
		var status=$('#status').val();
		$("#visitCase").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'caseNo':caseNo,'orderNo':orderNo,'status':status,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 查看案件详情
	 */
	detail:function(menuId,rowId){
		 var caseId=$("#visitCase").jqGrid('getCell',rowId,'caseId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/case/toCaseInfo?caseId="+caseId
				+"&menuId=" + menuId,"toCaseInfo",true);	
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
			loan.queryvisitpage.setAddress(ids[i]);
		}	
	}
	
	
}