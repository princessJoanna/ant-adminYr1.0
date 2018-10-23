loan.risktarget = loan.risktarget || {
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid , status){
		if(status){
			$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
		}
	},
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#rowid").val("");
		$("#targetGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'7010'}
	    }).trigger('reloadGrid'); 
	},
	
	
	/**
	 * 新增风险指标按钮
	 */
	add : function(menuId,rowid) {
		parent.loan.tabcut.childAddIframe("新增风险指标",loan.basePath+"/riskTarget/toAddRiskTarget?menuId="+menuId+"&targetId=0&opType=add","AddRiskTarget",true,true);
	},
	
	/**
	 * 修改风险等级按钮
	 */
	edit : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以修改
		var status = $("#targetGridId").jqGrid('getCell',rowid,'targetStatus');
		if(status != "0"&&status != "2") {
			loan.tooltip("只有未发布或已下架的风险指标可以修改","error");
			return;
		}
		//获取修改的id
		var id = $("#targetGridId").jqGrid('getCell',rowid,'targetId');
		parent.loan.tabcut.childAddIframe("修改风险指标",loan.basePath+"/riskTarget/toAddRiskTarget?menuId="+menuId+"&targetId="+id+"&opType=up","editRiskTarget",true,true);
	},
	
	/**
	 * 删除风险等级按钮
	 */
	del : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以删除
		var status = $("#targetGridId").jqGrid('getCell',rowid,'targetStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险指标可以删除","error");
			return;
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该风险指标吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.risktarget.delFunc(menuId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行删除
	 */
	delFunc:function(menuId,rowid){
		//获取要删除的id
		var id = $("#targetGridId").jqGrid('getCell',rowid,'targetId');
		loan.ajaxDo({
			url:loan.basePath+"/riskTarget/deleteRiskTarget",
			params:{'menuId':menuId,'menuLog':'1','targetId':id},
			successCallback:function(){
				loan.risktarget.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 注销风险指标按钮
	 */
	logout : function(menuId,rowid) {
		$("#rowid").val(rowid);
		//校验状态，是否可以注销
		var status = $("#targetGridId").jqGrid('getCell',rowid,'targetStatus');
		
		if(status != "1") {
			loan.tooltip("只有已发布的风险指标可以注销","error");
			return;
		}
		//确认是否要注销
		$.artDialog({
			title:"提示",
			content:"确定要注销该风险指标吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.risktarget.logoutFunc(menuId,rowid);//注销
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 执行注销操作
	 */
	logoutFunc:function(menuId,rowid){
		//获取要注销的id
		var id = $("#targetGridId").jqGrid('getCell',rowid,'targetId');
		loan.ajaxDo({
			url:loan.basePath+"/riskTarget/logoutRiskTarget",
			params:{'menuId':menuId,'menuLog':'1','targetId':id},
			successCallback:function(){
				loan.risktarget.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 风险指标发布按钮
	 */
	publish : function(menuId) {
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要发布的指标记录","error");
			return;
		}
		//校验状态，是否可以发布
		var status = $("#targetGridId").jqGrid('getCell',rowid,'targetStatus');
		if(status != "0") {
			loan.tooltip("只有未发布的风险指标可以发布","error");
			return;
		}
		
		//执行发布
		var id = $("#targetGridId").jqGrid('getCell',rowid,'targetId');
		loan.ajaxDo({
			url:loan.basePath+"/riskTarget/publishRiskTarget",
			params:{'menuId':menuId,'menuLog':'1','targetId':id},
			successCallback:function(){
				loan.risktarget.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 下架风险指标按钮
	 */
	lower : function(menuId) {
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要下架的指标记录","error");
			return;
		}
		//校验状态，是否可以下架
		var status = $("#targetGridId").jqGrid('getCell',rowid,'targetStatus');
		
		if(status != "1") {
			loan.tooltip("只有已发布的风险指标可以下架","error");
			return;
		}
		//确认是否要下架
		$.artDialog({
			title:"提示",
			content:"确定要下架该风险指标吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.risktarget.lowerFunc(menuId,rowid);//下架
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 执行下架操作
	 */
	lowerFunc:function(menuId,rowid){
		//获取要下架的id
		var id = $("#targetGridId").jqGrid('getCell',rowid,'targetId');
		loan.ajaxDo({
			url:loan.basePath+"/riskTarget/lowerRiskTarget",
			params:{'menuId':menuId,'menuLog':'1','targetId':id},
			successCallback:function(){
				loan.risktarget.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 重新发布风险指标按钮
	 */
	republish : function(menuId) {
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要重新发布的风险指标记录","error");
			return;
		}
		//校验状态，是否可以重新发布
		var status = $("#targetGridId").jqGrid('getCell',rowid,'targetStatus');
		
		if(status != "2") {
			loan.tooltip("只有已下架的风险指标可以重新发布","error");
			return;
		}
		//确认是否要重新发布
		$.artDialog({
			title:"提示",
			content:"确定要重新发布该风险指标吗？",
			ok:function(){
				var rowid = $("#rowid").val();
				loan.risktarget.rePublishFunc(menuId,rowid);//重新发布
			},
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 执行重新发布操作
	 */
	rePublishFunc:function(menuId,rowid){
		//获取要注销的id
		var id = $("#targetGridId").jqGrid('getCell',rowid,'targetId');
		loan.ajaxDo({
			url:loan.basePath+"/riskTarget/rePublishRiskTarget",
			params:{'menuId':menuId,'menuLog':'1','targetId':id},
			successCallback:function(){
				loan.risktarget.freshGrid();//刷新页面
			},
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
		var id = $("#targetGridId").jqGrid('getCell',rowid,'targetId');
		loan.s_addPop("查看详情",loan.basePath+"/riskTarget/toRiskTargetInfo?targetId="+id+"&menuId="+menuId,"",680,400,{isRefresh:true,isChangeClose:true});	
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var targetName ="";
		var targetStatus ="";
		var targetGroup ="";
		targetName = $("#targetName").val();
		targetStatus = $("#targetStatus").val();
		targetGroup = $("#targetGroup").val();
		$("#rowid").val("");
		$("#targetGridId").jqGrid("setGridParam", {   
			postData:{'targetName':targetName,'targetStatus':targetStatus,'targetGroup':targetGroup,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	
	/**加载指标树JSON数据成功后调用的方法*/
	loanTargetTreeJsonSuccFun:function (result){
		var targetNodes = result.riskTreeDomainList;
		$.fn.zTree.init($("#treeDemo"),loan.risktarget.riskTreeSettings, targetNodes);
		var targetTree = $.fn.zTree.getZTreeObj("treeDemo");
//		var rootNode = targetTree.getNodes()[0];
		targetTree.expandAll(true);
	},
	/**风险指标树设置*/
	riskTreeSettings : {
		view: {
			dblClickExpand: false,
			showTitle:true,
			showLine:false
		},
		data: {
			simpleData: {
				enable: true,
				idKey:"riskId",
				pIdKey:"parentRiskId",
				rootPId: null
			}
		,
			key: {
				name:"riskName",//节点名称
				title: ""
			}
		}
		,
		callback: {
			//clickRiskTree
			onClick: function(e, treeId, treeNode) {
				var targetGroup=treeNode.riskId
				$("#targetGridId").jqGrid("setGridParam", {   
					postData:{'targetGroup':targetGroup,
						'format':'json'},
				page:1
			    }).trigger('reloadGrid');
			} 
		}
	},
	
	/**单击机构树的方法
	function clickRiskTree(e, treeId, treeNode) {
		var targetGroup=treeNode.riskId
		$("#targetGridId").jqGrid("setGridParam", {   
			postData:{'targetGroup':targetGroup,
				'format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	}*/
	
};


$(document).ready(function(){
	loan.ajaxDo({
  		url:loan.basePath+"/riskTarget/queryRiskTree",  //查询菜单
  		params:{"menuId": $('#menuId').val()},
  		successCallback:loan.risktarget.loanTargetTreeJsonSuccFun,
  		chainPar:this
  	})
	
});


/*$(function(){
	$(".ztree").css("width",$("#orgInfo").width()+"px");
	loan.ajaxDo({
  		url:loan.basePath+"/org/queryOrgTree",
  		params:{"menuId":'2001'},
  		successCallback:loan.role.loanOrgTreeJsonSuccFun,
  		chainPar:this
  	})
});*/

	