loan.orgleaguelist = loan.orgleaguelist || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#userLeagueGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'5001'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	

	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 确认提示框
	 */
	confirmDialog:function(dtitle,dcontent,callBackFunc) {
		$.artDialog({
			title:dtitle,
			content:dcontent,
			ok:callBackFunc,
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	
	
	
	showBorrowerInfoBtn:function(menuId,rowid){	
		var userId = $("#userLeagueGridId").jqGrid('getCell',rowid,'userId');
		var leagueId = $("#userLeagueGridId").jqGrid('getCell',rowid,'leagueId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/league/viewLeague?userId="+userId
				+"&leagueId=" + leagueId + "&menuId=" + menuId,"toLeagueInfo",true);
	},
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		
		var leagueType = "";//客户分类
		var businessAddress = "";//地址
		var userName = "" ;//客户名称
		var productId = "" ;//客户名称
		
		if($("#leagueType").val()!="-1"){
			leagueType = $("#leagueType").val();
		}
		productId = $("#productId").val();
		if(productId == -1){
			productId = null;
		}
	
		businessAddress = $("#businessAddress").val();
		userName = $("#userName").val();

		$("#userLeagueGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'850102','productId':productId,'leagueType':leagueType,'businessAddress':businessAddress,'userName':userName,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#workUnit").val('');
		$("#userKind").val('0');
		$("#idKind").val('0');
		$("#sourceKind").val('0');
		$("#idNo").val('');
		$("#userName").val('');
	},
	
	
	
	
	
	
	/**
	 * 修改信息
	 *  
	 * @param menuId
	 * @param rowid
	 */
	
	editLeagueInfoBtn:function(menuId,rowid){
		var userId = $("#userLeagueGridId").jqGrid('getCell',rowid,'userId');
		var leagueId = $("#userLeagueGridId").jqGrid('getCell',rowid,'leagueId');
		parent.loan.tabcut.childAddIframe("修改加盟商信息",loan.basePath+"/league/toLeagueEdit?userId="+userId 
				+ "&leagueId=" + leagueId+ "&menuId=" + menuId, "toLeagueEdit",true,true);
	},	
	
	
	initProductList:function(){
	     
	     loan.ajaxDo({
				url:loan.basePath+"/league/productListAjax",
				params:{"menuId" : "850102"},
				successCallback:loan.orgleaguelist.ajaxProductList,
				chainPar:this
			});
	},

	ajaxProductList:function(result){
		var productObj = $("#productId");
		productObj.append("<option value='-1'\>所有<\li>");
		var productList = result.list;
		for(var i = 0; i < productList.length; i++) {
			var productId = productList[i].productId;
			var productName = productList[i].productName;
			productObj.append("<option value='"+productId+"'\>"+productName+"<\li>");
		}
	}

};
	 
	