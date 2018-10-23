var menuId;
loan.view = loan.view || {
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	/**
	 * 清空查询条件
	 */
	clearCondition:function() {
		$("#workUnit").val('');
		$("#idKind").val('-1');
		$("#idNo").val('');
		$("#userName").val('');
		$("#sourceKind").val('-1');
		$("#userType").val('-1');
		$("#provinceCode").val('-1');
		$("#cityCode").val('-1');
		$("#districtCode").val('-1');
		$("#recommendCode").val('');
		$("#user_status").val('-1');
		loan.view.showOrgTreeRoot("orgTree");
	},
	
	/**
	 * 查询
	 */
	search:function() {
		var orgId = $("#orgId").val();
		var pfOrgId = $("#pfOrgId").val();
		var userName = $("#userName").val();
		var userType = $("#userType").val();
		var sourceKind = $("#sourceKind").val();
		var recommendCode = $("#recommendCode").val();
		if(!userName) {
			userName = null;
		}
		if(userType && userType == "-1") {
			userType = null;
		}
		if(sourceKind && sourceKind == "-1") {
			sourceKind = null;
		}
		if(!recommendCode) {
			recommendCode = null;
		}
	
		//高级查询参数
		var workUnit = $("#workUnit").val();
		var idKind = $("#idKind").val();
		var idNo = $("#idNo").val();
		if(!workUnit) {
			workUnit = null;
		}
		if(!idNo) {
			idNo = null;
		}
		if(idKind && idKind == "-1") {
			idKind = null;
		}
		
		//区域查询
		var provinceCode = $("#provinceCode").find("option:selected").val();
		var cityCode = $("#cityCode").find("option:selected").val();
		var districtCode = $("#districtCode").find("option:selected").val();
		
		if(provinceCode == -1){
			provinceCode =null;
			cityCode = null;
			districtCode = null;
		}
		
		if(cityCode == -1){
			cityCode = null;
		}
		
				
		if(districtCode == -1){
			districtCode = null;
		}
		
		
		var user_status = $("#user_status").val();
		if(user_status == -1){
			user_status = null;
		}

		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'format':'json','searchOrgId':orgId,'userName':userName,'status':user_status,
				'sourceKind':sourceKind,'userType':userType,'pfOrgId':pfOrgId,'recommendCode':recommendCode,
				'workUnit':workUnit,'idKind':idKind,'idNo':idNo,'provinceCode':provinceCode,'cityCode':cityCode,'districtCode':districtCode},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 高级查询
	 */
	advanceSearch:function() {
		var workUnit = $("#workUnit").val();
		var idKind = $("#idKind").val();
		var idNo = $("#idNo").val();
		if(!workUnit) {
			workUnit = null;
		}
		if(!idNo) {
			idNo = null;
		}
		if(idKind && idKind == "-1") {
			idKind = null;
		}
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'format':'json','workUnit':workUnit,'idKind':idKind,
				'idNo':idNo,'searOrgId':null,'userName':null,'pfOrgId':null,'recommendCode':null,
				'userType':null,'sourceKind':null},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 加载机构树
	 */
	queryOrgFunc : function(callBackFunc) {
		loan.ajaxDo({
	  		url:loan.basePath+"/org/queryOrgTree",
	  		param:{"menuId":menuId},
	  		successCallback:callBackFunc,
	  		chainPar:this
	  	});
	},
	
	/**加载机构树JSON数据成功后调用的方法*/
	initOrgTreeFunc : function(result){
		var orgNodes = result.orgInfoList;
		$.fn.zTree.init($("#orgTree"), loan.view.orgTreeSettings, orgNodes);
		//显示根节点内容
		loan.view.showOrgTreeRoot("orgTree");
	},
	
	/**
	 * 显示根节点内容
	 */
	showOrgTreeRoot:function(treeid) {
		var orgTree = $.fn.zTree.getZTreeObj(treeid);
		orgTree.expandAll(true);
		//获取根节点
		var root = loan.view.getRoot(orgTree);
		$("#jglist").attr("value", root.shortName);
		if(root.orgType == "0") {
			$("#pfOrgId").attr("value",root.orgId);
			$("#orgId").attr("value","");
		} else if (root.orgType == "1") {
			$("#orgId").attr("value",root.orgId);
			$("#pfOrgId").attr("value","");
		}
	},
	
	/**
	 * 获取树的根节点
	 */
	getRoot:function(tree) {
		return tree.getNodesByFilter(function (node) { return node.level == 0 }, true);
	},
	
	/**
 	 * 查询机构树节点的设置
 	 */
	orgTreeSettings : {	
			view: {
				dblClickExpand: false,
				showLine: false
			},
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true,
					idKey:"orgId",
					pIdKey:"parentOrgId"
				},
				key: {
					name:"shortName"//节点名称
				}
			},
			callback: {
				onClick: clickOrgTreeNode
			}
	},
	
	lookCusdetail:function(menuId,rowid) {
		$("rowid").val(rowid);
		var userId = $("#userGridId").jqGrid('getCell',rowid,'userId');
		var userKind = $("#userGridId").jqGrid('getCell',rowid,'userKind');
		if($.trim(userId) == "") {
			loan.tooltip("未选择用户","error");
			return;
		}
		parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuLog=1&menuId="+menuId+"&userKind="+userKind+"&userId="+userId,"creditcusdetail",true);	
	}
	
}

/**单击机构树的方法*/
function clickOrgTreeNode(e, treeId, treeNode) {
	if(treeNode.orgType == "0") {
		$("#pfOrgId").attr("value",treeNode.orgId);
		$("#orgId").attr("value","");
	} else {
		$("#orgId").attr("value",treeNode.orgId);
		$("#pfOrgId").attr("value","");
	}
	$("#jglist").attr("value", treeNode.shortName);
	
	hideMenu();
};

function showMenu() {
	var cityObj = $("#jglist");
	var cityOffset = $("#jglist").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px","width":cityObj.outerWidth()+"px"}).slideDown("fast");
	$("a#menuBtn").addClass("current");
	$("body").bind("mousedown", onBodyDown);
};
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
};
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		$("a#menuBtn").removeClass("current");
		hideMenu();
	}
};
$(function(){
	menuId = $("#menuId").val();
	
	loan.selFun('selAll'); 
	loan.selFun('adv');
	loan.view.queryOrgFunc(loan.view.initOrgTreeFunc);
	$(".ui-pg-input").attr("id","focus");
	loan.view.setSelect("idKind");
	loan.view.setSelect("sourceKind");
	loan.view.setSelect("userType");
	loan.view.setSelect("user_status");
});