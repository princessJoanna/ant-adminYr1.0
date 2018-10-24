
loan.riskModelData = loan.riskModelData || {
	
	init : function(){
		
	},
	selectFunc : function(rowid,status){
		if(status){
			$("#rowid").attr("value",rowid);
		}
	},
	/***
	 * 查询分页数据
	 */
	queryRiskModelDataPage : function(){
		
		
	},
	/** 搜索风险模型数据 */
	sell_sellorderquery : function(){
		var name = $('#name').val();
		var idKind = $('#idKind').val();
		var idNo = $('#idNo').val();
		var confirmStatus = $('#confirmStatus').val();
		var searchOrgId = $("#parentOrgId").val();
		$("#riskModelDataGrid").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId': $('#menuId').val() , name : name, idKind : idKind ,idNo : idNo, confirmStatus : confirmStatus,'searchOrgId':searchOrgId },
			page:1
		 }).trigger('reloadGrid'); 
	},
	/** 清除查询参数 */
	clearSearchParams : function(){
		$("#name,#idKind,#idNo,#status").val("");
	},
	/** 查看评级 */
	view : function(menuId,rowid){
		var rowData = $("#riskModelDataGrid").jqGrid('getRowData',rowid);
		parent.loan.tabcut.childAddIframe("查看评级",loan.basePath + "/riskModelData/riskModelDataDetail?modeldataId=" + rowData.modeldataId + "&menuId=600602","view",true,true);
	},
	/** 新增评级 */
	addRiskModelData : function(){
		parent.loan.tabcut.childAddIframe("新增评级",loan.basePath + "/riskModelData/toAddRiskModelData?menuId=600601","addRiskModelData",true,true);
	},
	/** 删除评级 */
	del : function(menuId,rowid){
		$.artDialog({
			title:"提示",
			content:"确定要删除吗？",
			ok:function(){
				var rowData = $("#riskModelDataGrid").jqGrid('getRowData',rowid);
				var dataId = rowData.modeldataId;
				loan.ajaxDo({
					url : loan.basePath + "/riskModelData/deleteRiskModelData",
					params : { modelDataId : dataId , format : 'json' , menuId : '600605' },
					successCallback:function(result){
						$("#riskModelDataGrid").jqGrid("setGridParam", {   
							postData:{'format':'json','menuId': $('#menuId').val()},
							page:1
						   }).trigger('reloadGrid'); 
					},
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

	/** 修改评级 */
	modify : function(menuId,rowid){
		var rowData = $("#riskModelDataGrid").jqGrid('getRowData',rowid);
		
		parent.loan.tabcut.childAddIframe("修改评级",loan.basePath + "/riskModelData/toUpdateRiskModelData?menuId=" + menuId + "&modelDataId=" + rowData.modeldataId + "&orgId=" + rowData.orgId,"editRiskModelData",true,true);
	},
	
	/** 再评级 */
	rerating : function(menuId,rowid){
		var rowData = $("#riskModelDataGrid").jqGrid('getRowData',rowid);
		var url = "&modeldataId=" + rowData.modeldataId + "&userId=" + rowData.userId + "&userName=" + rowData.userName 
		+ "&degreeName=" + rowData.degreeName + "&idKind=" + rowData.idKind + "&idKindCn=" + rowData.idKindCn + "&idNo=" + rowData.idNo + "&modelId=" + rowData.modelId + "&modelName=" + rowData.modelName;
		parent.loan.tabcut.childAddIframe("再评级",loan.basePath + "/riskModelData/toReRating?menuId=" + menuId + url,"reRiskModelData",true,true);
	}
	
}