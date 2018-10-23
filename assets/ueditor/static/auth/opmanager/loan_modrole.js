loan.modrole = loan.modrole || {

	/**机构树状态：1-展开状态 0-收起状态*/
	showStat : 0,
	
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
	
	/**提交**/
	submit : function(){
		var roleName = $("#roleName").val();
		var roleId = $("#roleId").val();
		var remark = $("#remark").val();
		var orgId = $("#orgId").val();
		var zTreeObj = $.fn.zTree.getZTreeObj("rightTree");
		var checkedNodes = zTreeObj.getCheckedNodes(true);
		var nodesArray = new Array();
		for(var i=0;i<checkedNodes.length;i++){
			if(checkedNodes[i].menuId != "0"){
				var obj = new Object();
				obj.menuId = checkedNodes[i].menuId;
				obj.pfOrgId = checkedNodes[i].pfOrgId;
				obj.menuTip = checkedNodes[i].menuTip;
				nodesArray.push(obj);
			}
		}
		menulist = JSON.stringify(nodesArray);
		loan.ajaxDo({
	  		url:loan.basePath+"/role/updateRole",
	  		params : {"menuId":"200102",'menuLog':'1',"roleId":roleId,"orgId":orgId,"roleName":roleName,"remark":remark,"menulist":menulist},
	  		chainPar:this,
	  		successTip:true,
	  		successCallback:loan.modrole.submitSuccFun
	  	})
	},
	
	/**交易成功后关闭页面*/
	submitSuccFun : function(){
		parent.closeFn();
		loan.s_Pop_closedChild(false,true);
		
		/*var orgId = parent.$("#orgId").val();
		parent.$("#roleGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','orgId':orgId,'menuId':'2001'},
			page:1
	    }).trigger('reloadGrid');   
		parent.$("#rowid").attr("value","");*/
	},
	
	/**权限树的设置*/
	menuTreesettings : {
		check: {
			enable: true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "ps", "N": "s" }
		},
		view: {
			dblClickExpand: false,
			showTitle:true,
			showLine:false
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
	//loan.modrole.expandLevel(zTree,rootNode,1);  
	zTree.expandAll(true);
	/**加载角色权限数据*/
	loan.ajaxDo({
  		url:loan.basePath+"/role/queryRoleRights",
  		params:{'menuId':'200102','roleId':$("#roleId").val()},
  		successCallback:loanRoleRightJsonSuccFun,
  		chainPar:this
	})
}

var loanRoleRightJsonSuccFun = function(result){
	var menulist = result.menulist;
	var zTree = $.fn.zTree.getZTreeObj("rightTree");
	if(menulist.length > 0){
		var rootNode = zTree.getNodes()[0]; 
		zTree.checkNode(rootNode, true, false);
	}
	for(var i=0;i<menulist.length;i++){
		var node = zTree.getNodeByParam("menuId", menulist[i].menuId, null);
		zTree.checkNode(node, true, false);
	}
}


$(function(){	
	loan.verify.verifyCheck("iform","submit_button");
	/**从父页面加载数据*/
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#roleGridId").jqGrid('getRowData',rowid);
    $("#orgInfo").attr("value",rowObj.orgShortName);
    $("#roleName").attr("value",rowObj.roleName);
    $("#roleId").attr("value",rowObj.roleId);
    $("#roleTypeCn").attr("value",rowObj.roleTypeCn);
    $("#remark").attr("value",rowObj.remark);
    $("#orgId").attr("value",rowObj.orgId);
    if(rowObj.roleType == "0"){
    	orgType = "0";
    }else{
    	orgType = "1";
    }
    /**加载机构菜单树*/
    loan.ajaxDo({
  		url:loan.basePath+"/menu/queryMenus",
  		params:{'menuId':'200102','modelType':orgType,'menuStatus':'0'},
  		successCallback:loanMenuTreeJsonSuccFun,
  		chainPar:this
  	})
})




