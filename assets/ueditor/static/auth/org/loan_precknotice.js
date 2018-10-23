
var checkStatus = "";
var opId = $("opId").val();
loan.precknotice = loan.precknotice || {
	/**清空文本框值*/
	clearVal : function(){
		$("#userRealName").val("");
		$("#userIdNum").val("");
		$("#idType").val("");
	},
	
	sell_sellorderquery : function() {
		var userRealName = $("#userRealName").val();
		var idType = $("#idType").val();
		var userIdNum = $("#userIdNum").val();
		var searchOrgId = $("#parentOrgId").val();
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','userName':userRealName,'menuId':'6004','idKind':idType,'idNo':userIdNum,'searchOrgId':searchOrgId},
			page:1
	    }).trigger('reloadGrid');
	},
	/**
	 * 查询贷前提醒信息
	 */
	queryNoticeInfo:function (noticeId){
		var flag=true;
		loan.ajaxDo({
			url:loan.basePath+"/notice/checkPreNoticeStatus",
			params:{'format':'json','menuLog':'1','menuId':'6004','noticeId':noticeId},
			//successCallback:loan.precknotice.setNoticeStatus,
			successTip:false, //提示
			bizErrTip:true,  //提示
			bizErrCallback:function(){
				
				flag=false;
			},
			chainPar:this
		});
		return flag;
	},
	/**
	 * 设置贷前提醒执行状态
	 */
	setNoticeStatus:function(response){
		//判断产品列表是否为空
		if(response.noticeDomain!=null){
			var checkOperator = response.noticeDomain.checkOperator;
			var checkOperatorName = response.noticeDomain.checkOperatorName;
			var noticeId = response.noticeDomain.noticeId;
			var _checkStatus = response.noticeDomain.checkStatus;
			checkStatus = _checkStatus;
			if(checkStatus == "1"){
				if(checkOperator!=null && typeof(checkOperator) != "undefined" && checkOperator != ""){
					if(opId != checkOperator){
						loan.tooltip("该调查提醒目前正在由"+checkOperatorName+"进行调查","error");
					}
				}
			}else{
				loan.ajaxDo({ 
					url:loan.basePath+"/notice/updateNoticeInfo",
					params:{'noticeId':noticeId,'checkStatus':'1','menuLog':'1','menuId':'6004'},
					successCallback:loan.precknotice.closeChildWindow,
					successTip:false, //提示
					bizErrTip:false,  //提示
					chainPar:this
				});
			}
		}
	},
	
	addPreck:function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
		var noticeId = rowObj.noticeId;
		//检验是否已经有操作员在对该提醒做贷前调查
		var flag=loan.precknotice.queryNoticeInfo(noticeId);
		
	    if(!flag){
	    	return;
	    }
		var orgId = rowObj.orgId;
		var userName = rowObj.userName;
		var idKind = rowObj.idKind;
		var idNo = rowObj.idNo;
		var shortName = rowObj.shortName;
		var userId = rowObj.userId;
		var idKindCn = rowObj.idKindCn;
		parent.loan.tabcut.childAddIframe('增加贷前调查',loan.basePath+"/org/loanagin?orgId="+orgId+"&userName="+userName+
				"&idKind="+idKind+"&idNo="+idNo+"&shortName="+shortName+"&userId="+userId+"&idKindCn="+idKindCn+"&operatstatus=addbynotice&menuId=600401","loanagin",true,true);
	
		/*
		//贷前调查页面打开之后则设置执行贷前调查状态checkStatus=1;
		loan.ajaxDo({ 
			url:loan.basePath+"/notice/updateNoticeInfo",
			params:{'noticeId':noticeId,'checkStatus':'1','menuLog':'1','menuId':'6004'},
			successCallback:loan.precknotice.closeChildWindow,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});*/
	}
	
}