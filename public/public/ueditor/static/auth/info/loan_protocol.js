loan.protocol = loan.protocol || {
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#protocolGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'1008'}
	    }).trigger('reloadGrid'); 
	},
	
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 新增协议按钮
	 */
	/*add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增协议",loan.basePath+"/guarantee/toAddPledage?menuId="+menuId,"AddPledage",true,true);
	},*/
	addBtnFunc:function(menuId,rowid){
		//loan.s_addPop("查看详情",loan.basePath+,"",650,450,{isRefresh:false});	
		//loan.s_addPop("新增协议",loan.basePath+"/protocol/toAddProtocol?menuId="+menuId+"&opType=add","addprotocol",650,450,{isRefresh:false});
		parent.loan.tabcut.childAddIframe("新增协议","protocol/toAddProtocol?menuId="+menuId+"&opType=add","addprotocol",true,true);
	},
	/**
	 * 修改抵押物按钮
	 */
	/*edit : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var status = $("#warrantGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {
			loan.tooltip("只有状态为未登记的抵押物可以修改","error");
			return;
		}
		//获取修改的id
		var id = $("#warrantGridId").jqGrid('getCell',rowid,'warrantId');
		parent.loan.tabcut.childAddIframe("修改抵押物",loan.basePath+"/guarantee/toAddPledage?menuId="+menuId+"&warrantId="+id,"edittoPledage",true,true);
	},*/
	
	/**
	 * 修改协议按钮
	 */
	editBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		var protocolGridId = $("#protocolGridId").jqGrid('getRowData',rowid);
		var orgId =$("#orgId").val();
		var userorgId=protocolGridId.orgId
		if(userorgId!=orgId) {
			loan.tooltip("该协议不是平台协议，无操作权限","error");
			return;
		}
		if(protocolGridId.status && protocolGridId.status != 0) {
			loan.tooltip("该协议不是未发布状态，不可修改","error");
			return;
		}
		var docId = $("#protocolGridId").jqGrid("getCell", rowid, "docId");
		var depositPath = $("#protocolGridId").jqGrid("getCell", rowid, "depositPath");//存放路径
		var originalName = $("#protocolGridId").jqGrid("getCell", rowid, "originalName");//存放名称
		//var depositFileName = $("#protocolGridId").jqGrid("getCell", rowid, "depositFileName");//存放名称
		var protocolCode = $("#protocolGridId").jqGrid("getCell", rowid, "protocolCode");//获取code码
		parent.loan.tabcut.childAddIframe("修改协议",loan.basePath+"/protocol/toAddProtocol?menuId="+menuId+"&opType=up&&docId="+docId+"&&depositPath="+depositPath+"&&originalName="+originalName+"&&protocolCode="+protocolCode,"editprotocol",true,true);
	},
	/**
	 * 发布按钮
	 */
	releaseBtnFunc:function(menuId,row){
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要发布的协议","error");
			return;
		}

		var protocolGridId = $("#protocolGridId").jqGrid('getRowData',rowid);
		var orgId =$("#orgId").val();
		var userorgId=protocolGridId.orgId;
		var protocolCode=protocolGridId.protocolCode;
		if(userorgId!=orgId) {
			loan.tooltip("该协议不是平台协议，无操作权限","error");
			return;
		}
		if(protocolGridId.status && protocolGridId.status != 0) {
			loan.tooltip("只能发布状态为未发布状态的协议","error");
			return;
		}
		var con = "";
		if(protocolCode=='8'){
			con = "确定要发布该协议吗？该协议为协议模板，发布成功后将采用新发布的协议模板！";
		}else{
			con = "确定要发布该协议吗？发布成功后使用中的协议将停用！";
		}
		$.artDialog({
			title:"提示",
			content : con,
			ok:function(){
				var docId = protocolGridId.docId;
				loan.ajaxDo({
					url:loan.basePath+"/protocol/validProtocol",
					params:{'menuId':'100804','menuLog':'1','format':'json','docId':docId},
					successCallback:loan.protocol.freshGrid,
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
				return true;
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 停用按钮
	 */
	disableBtnFunc:function(menuId,rowid){	
		var protocolGridId = $("#protocolGridId").jqGrid('getRowData',rowid);
		var orgId =$("#orgId").val();
		var userorgId=protocolGridId.orgId
		if(userorgId!=orgId) {
			loan.tooltip("该协议不是平台协议，无操作权限","error");
			return;
		}
		if(protocolGridId.status && protocolGridId.status != 1) {
			loan.tooltip("该协议不是发布状态，不可停用","error");
			return;
		}
		$.artDialog({
			title:"提示",
			content:"确定要停用该协议吗，停用后该协议将无效！",
			ok:function(){
				var docId = protocolGridId.docId;
				loan.ajaxDo({
					url:loan.basePath+"/protocol/invalidProtocol",
					params:{'menuId':'100805','menuLog':'1','format':'json','docId':docId},
					successCallback:loan.protocol.freshGrid,
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
				return true;
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 删除协议按钮
	 */
	delBtnFunc : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var protocolGridId = $("#protocolGridId").jqGrid('getRowData',rowid);
		var orgId =$("#orgId").val();
		var userorgId=protocolGridId.orgId
		if(userorgId!=orgId) {
			loan.tooltip("该协议不是平台协议，无操作权限","error");
			return;
		}
		var status = $("#protocolGridId").jqGrid('getCell',rowid,'status');
		if(status != "0") {
			loan.tooltip("只能删除未发布状态的协议","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该协议吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.protocol.delFunc(rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行删除
	 */
	delFunc:function(rowid){
		//获取要删除的id
		var docId = $("#protocolGridId").jqGrid('getCell',rowid,'docId');
		loan.ajaxDo({
			url:loan.basePath+"/protocol/delProtocol",
			params:{'menuId':'100803','menuLog':'1','docId':docId},
			successCallback:loan.protocol.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 查看详情按钮
	 */
	lookInfo:function(menuId,rowid){
		$("#rowid").val(rowid);
		var protocolCode = $("#protocolGridId").jqGrid('getCell',rowid,'protocolCode');
		//var url="http://localhost:8080/loan-web-home/view/protocol/a88d5a2f891743fda2c540dde387bd2b.html";
		loan.s_addPop("查看详情",loan.basePath+"/protocol/toProtocolInfo?protocolCode="+protocolCode+"&menuId="+menuId,"",700,500,{isRefresh:false});	
		//loan.s_addPop("查看详情",loan.basePath+"/guarantee/queryWarrant?warrantId="+id+"&menuId="+menuId,"",680,450,{isRefresh:true,isChangeClose:true});	
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var protocolName= "";//协议名字
		var protocolCode= "";//协议模块
		var status ="";//协议状态
		protocolName = $("#protocolName").val();
		protocolCode = $("#protocolCode").val();
		status = $("#status").val();
		
		$("#protocolGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1008','protocolName':protocolName,'protocolCode':protocolCode,'status':status,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 高级搜索按钮
	 *//*
	searchGreatFunc:function(){	
		var userType= "";//客户分类
		var userName ="";//客户名称
		var idKind= "";//证件类型
		var idNo ="";//证件号

		idKind = $("#idKind").val();
		idNo = $("#idNo").val();
		
		$("#warrantGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'6008','userType':userType,'userName':userName,
				'idKind':idKind,'idNo':idNo,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	*/
	
};

	