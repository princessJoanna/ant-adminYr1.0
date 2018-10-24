loan.beforeloan = loan.beforeloan || {
	/**新增和再次调查页面*/
	choseRole : function(menuId,rowid) {
		if(menuId == '60010101') {
			parent.loan.tabcut.childAddIframe("增加贷前调查",loan.basePath+"/org/loanagin?operatstatus=addbeforeloan&menuId=600101","addbeforeloan",true,true);
		}else{
			$("#rowid").attr("value",rowid);
			var rowObj = $("#beforeloanGridId").jqGrid('getRowData',rowid);
			var orgId = rowObj.orgId;
			var userName = rowObj.userName;
			var idKind = rowObj.idKind;
			var idNo = rowObj.idNo;
			var shortName = rowObj.shortName;
			var userId = rowObj.userId;
			var idKindCn = rowObj.idKindCn;
			parent.loan.tabcut.childAddIframe('再次调查',loan.basePath+"/org/loanagin?orgId="+orgId+"&userName="+userName+
					"&idKind="+idKind+"&idNo="+idNo+"&shortName="+shortName+"&userId="+userId+"&idKindCn="+idKindCn+"&operatstatus=loanagin&menuId=600102","loanagin",true,true);
		}
	},
	
	
	sell_sellorderquery : function() {
		var userRealName = $("#userRealName").val();
		var idType = $("#idType").val();
		var userIdNum = $("#userIdNum").val();
		var searchOrgId = $("#parentOrgId").val();
		$("#beforeloanGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','userName':userRealName,'menuId':'6001','idKind':idType,'idNo':userIdNum,'searchOrgId':searchOrgId},
			page:1
	    }).trigger('reloadGrid');
	},
	
	/**作废*/
	updPreloancheck : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		if($("#rowid").val() == ""){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var rowid = $("#rowid").val();
		var rowObj = $("#beforeloanGridId").jqGrid('getRowData',rowid);
		if(rowObj.status != "2"){
			$.artDialog({
				title:'提示',
				content:"是否确定作废当前这条记录？",
				ok:function(){
					loan.beforeloan.canselPreloanCheck(menuId,rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}else{
			loan.tooltip("当前记录已是作废记录","error");
		}
	},
	
	/**作废*/
	canselPreloanCheck : function(menuId,rowid) {
		searchOrgId = $("#parentOrgId").val();
		var rowObj = $("#beforeloanGridId").jqGrid('getRowData',rowid);
		if(rowObj.status == "3"){
			loan.tooltip("当前记录已是作废记录","error");
		}else{
			loan.ajaxDo({
		  		url:loan.basePath+"/org/canselPreloanCheck",
		  		params:{'checkId':rowObj.checkId,'menuLog':'1','status':'2','menuId':menuId},
		  		successCallback:loan.beforeloan.commSuccFun,
		  		successTip:true
		  	})
		}
	},
	
	/**刷新当前页面*/
	commSuccFun : function(){
		loan.s_Pop_closedParent(true,false);
	},
	
	/** 选中行的触发事件*/
	selectRowFunc : function(rowid) {
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**清空文本框值*/
	clearVal : function(){
		$("#userRealName").val("");
		$("#userIdNum").val("");
		$("#idType").val("");
	},
	
	/**查看详情*/
	checkPrecheck : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		var rowObj = $("#beforeloanGridId").jqGrid('getRowData',rowid);
		var orgId = rowObj.orgId;
		var userName = rowObj.userName;
		var idKind = rowObj.idKind;
		var idNo = rowObj.idNo;
		var shortName = rowObj.shortName;
		var userId = rowObj.userId;
		var idKindCn = rowObj.idKindCn;
		var checkId = rowObj.checkId;
		parent.loan.tabcut.childAddIframe("查看调查情况",loan.basePath+"/org/preloanCheck?orgId="+orgId+"&userName="+userName+
				"&idKind="+idKind+"&idNo="+idNo+"&shortName="+shortName+"&userId="+userId+"&idKindCn="+idKindCn+"&checkId="+checkId+"&menuId="+menuId,"preloanCheck",true,true);
	}
};
$(function(){
	/*$("#userRealName").click(function(){
		loan.s_addPop("选择客户",loan.basePath+"/common/selectloan?status=userName","",650,400);
	})
	
	$("#userIdNum").click(function(){
		loan.s_addPop("选择客户",loan.basePath+"/common/selectloan?status=idNo","",650,400);
	})*/
});
$(window).resize(function(){
	loan.grid.mdetailconWidth("beforeloanGridId");
})