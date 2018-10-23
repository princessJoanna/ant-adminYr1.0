loan.leaguelist = loan.leaguelist || {
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
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
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
	 * 新增按钮
	 */
	addBtnFunc:function(menuId){	
		parent.loan.tabcut.childAddIframe("新增加盟商",loan.basePath+"/league/toAddLeague?menuId=" + menuId,"addleague",true,true);
	},
	
	importsBtnFunc:function(menuId){	
		loan.s_addPop("批量导入",loan.basePath+"/league/toImport?menuId=" + menuId,"",680,400);		
	},
	
	
	
	
	
	freezeOrUnfreeze:function(menuId){
		var checkboxArray = $("#gbox_userLeagueGridId").find("input[type=checkbox]");
		var userId = -1;
		var checkCount = 0;
		
		$(checkboxArray).each(function (i, item){
	        if($(item).prop("checked")){
	        	userId = $(item).parent().parent().find("td[aria-describedby=userLeagueGridId_userId]").attr("title");
	        	checkCount++;
	        }
	        
	        if(checkCount>1){
	        	loan.tooltip("一次只能启用/停用一位加盟商","error");
	        	return;
	        }
		});
		
		if(checkCount==0){
			loan.tooltip("请选择要启用/停用的加盟商","error");
			return;
		}
		
		if(userId!=-1 && checkCount==1){
			var rowid = $("#userLeagueGridId").jqGrid("getGridParam","selrow");
			var rowData = $("#userLeagueGridId").jqGrid('getRowData',rowid);
			var confirmStatus = rowData.confirmStatus;
			if(confirmStatus == '0') {
				loan.tooltip("加盟商【"+rowData.userName+"】未审核","error");
	        	return;
			} else if(confirmStatus == '3') {
				loan.tooltip("加盟商【"+rowData.userName+"】审核结果为拒绝","error");
	        	return;
			}
			loan.ajaxDo({
	            url:loan.basePath+"/league/updateLeagueStatus",
	            params:{'userId' : userId,'menuLog':'1','menuId': menuId},
	            successCallback:loan.leaguelist.freshGrid,
	            successTip:true, //提示
	            bizErrTip:true,  //提示
	            chainPar:this
	        });
		}
	},
	
	showBorrowerInfoBtn:function(menuId,rowid){	
		var userId = $("#userLeagueGridId").jqGrid('getCell',rowid,'userId');
		var leagueId = $("#userLeagueGridId").jqGrid('getCell',rowid,'leagueId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/league/viewLeague?userId="+userId
				+"&leagueId=" + leagueId + "&menuId=" + menuId,"toLeagueInfo",true);
	},
	
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		
		var leagueType = "";//客户分类
		var businessAddress = "";//地址
		var userName = "" ;//客户名称
		var league_status = "";//生效状态
		if($("#leagueType").val()!="-1"){
			leagueType = $("#leagueType").val();
		}
		
		if($("#league_status").val()!="-1"){
			league_status = $("#league_status").val();
		}
	
		businessAddress = $("#businessAddress").val();
		userName = $("#userName").val();

		$("#userLeagueGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'5001','leagueType':leagueType,'status':league_status,'businessAddress':businessAddress,'userName':userName,
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
	 * 删除
	 */
	delLeagueList:function(menuId,rowid) {
		var userName = $("#userLeagueGridId").jqGrid('getCell',rowid,'userName');
		var rowData = $("#userLeagueGridId").jqGrid('getRowData',rowid);
		var confirmStatus = rowData.confirmStatus;
		$.artDialog({
			title:"提示",
			content:"确定要删除【"+userName+"】加盟商信息吗？",
			ok:function(){
				var userId = $("#userLeagueGridId").jqGrid('getCell',rowid,'userId');
				loan.ajaxDo({
					url:loan.basePath+"/league/delLeague",
					params:{'menuId': menuId,'menuLog':'1','format':'json','userId':userId},
					successCallback:loan.leaguelist.freshGrid,
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
	
	/**
	 * 修改机构加盟商信息
	 * */
	editOrgLeague : function(menuId,rowid){
		var leagueProductId = $("#userLeagueGridId").jqGrid('getCell',rowid,'leagueProductId');
		var userName = $("#userLeagueGridId").jqGrid('getCell',rowid,'userName');
		var userId = $("#userLeagueGridId").jqGrid('getCell',rowid,'userId');
		var leagueId = $("#userLeagueGridId").jqGrid('getCell',rowid,'leagueId');
		parent.loan.tabcut.childAddIframe("修改加盟商信息",loan.basePath+"/league/toEditOrgLeague?userId="+userId 
				+ "&leagueId=" + leagueId+ "&menuId=" + menuId + "&leagueProductId=" + leagueProductId + "&userName=" + userName, "toLeagueEdit",true,true);
	}
};
	 
	