loan.modrole = loan.modrole || {
	/**按层级展开树*/
	expandLevel : function(treeObj,node,level) {  
		var childrenNodes = node.children;  
		for(var i=0;i<childrenNodes.length;i++){  
			treeObj.expandNode(childrenNodes[i], true, false, false);  
			level=level-1;  
			if(level>0){  
		    	expandLevel(treeObj,childrenNodes[i],level);  
			}  
		}  
	},
	
	/**权限树的设置*/
	menuTreesettings : {
		check: {
			enable: true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "ps", "N": "ps" },
			chkDisabledInherit: false
		},
		data: {
			simpleData: {
				enable: true,
				idKey:"menuId",
				pIdKey:"parentMenuId"
			},
			key: {
				name:"menuTip"//节点名称
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				if (treeNode.isParent) {
					var tree = $.fn.zTree.getZTreeObj("rightTree");
					tree.expandNode(treeNode);
				}
			}
		}
	}
}
/**单击机构树的方法*/
function clickOrgTree(e, treeId, treeNode) {
	$("#orgInfo").attr("value", treeNode.fullName);
	$("#orgId").attr("value",treeNode.orgId);
	if(treeNode.orgType == "0"){  //运营平台
		$("#roleTypeName").attr("value","0-平台角色");
		$("#roleType").attr("value","0");
		loan.addrole.loanMenuTreeJson("0");
	}
	if(treeNode.orgType == "1"){ //出资机构
		$("#roleTypeName").attr("value","1-出资机构角色");
		$("#roleType").attr("value","1");
		loan.addrole.loanMenuTreeJson("1");
	}
}

/**加载权限树JSON数据成功后调用的方法*/
var loanMenuTreeJsonSuccFun = function(result){
	var menulist = result.menulist;
	var orgName = $("#orgInfo").val();
	var rootMenu = {"menuId":"0","menuName":orgName,"menuTip":orgName}; //设置根节点
	menulist.push(rootMenu);
	$.fn.zTree.init($("#rightTree"), loan.modrole.menuTreesettings, menulist);
	var zTree = $.fn.zTree.getZTreeObj("rightTree");
	var rootNode = zTree.getNodes()[0];  
	zTree.expandAll(true);
	/**加载角色权限数据*/
	loan.ajaxDo({
  		url:loan.basePath+"/role/queryRoleRights",
  		params:{'menuId':'200104','roleId':$("#roleId").val()},
  		successCallback:loanRoleRightJsonSuccFun,
  		chainPar:this
	})
}

/**加载将角色权限数据*/
var loanRoleRightJsonSuccFun = function(result){
	var menulist = result.menulist;
	var zTree = $.fn.zTree.getZTreeObj("rightTree");
	var rootNode = zTree.getNodeByParam("menuId","0",null);
	if(menulist.length > 0){
		for(var i=0;i<menulist.length;i++){
			var node = zTree.getNodeByParam("menuId", menulist[i].menuId, null);
			zTree.checkNode(node, true, false);
			zTree.setChkDisabled(node, true);
		}
		zTree.checkNode(rootNode, true, false);
		zTree.setChkDisabled(rootNode, true,false,true);
	}else{
		zTree.checkNode(rootNode, true, false);
		zTree.setChkDisabled(rootNode, true,false,true);
	}
}

$(function(){	
	/**从父页面加载数据*/
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#roleGridId").jqGrid('getRowData',rowid);
    $("#orgInfo").attr("value",rowObj.orgShortName);
    $("#roleName").attr("value",rowObj.roleName);
    $("#roleId").attr("value",rowObj.roleId);
    $("#roleTypeCn").attr("value",rowObj.roleTypeCn);
    $("#remark").attr("value",rowObj.remark);
    if(rowObj.roleType == "0"){
    	orgType = "0";
    }else{
    	orgType = "1";
    }
    /**加载机构菜单树*/
    loan.ajaxDo({
  		url:loan.basePath+"/menu/queryMenus",
  		params:{'menuId':'200104','modelType':orgType,'menuStatus':'0'},
  		successCallback:loanMenuTreeJsonSuccFun,
  		chainPar:this
  	})
})