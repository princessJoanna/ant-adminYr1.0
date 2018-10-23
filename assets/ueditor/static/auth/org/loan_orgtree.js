var menuId = '7007';
loan.orgtree = loan.orgtree || {
	/**
	 * 获取树的根节点
	 */
	getRoot:function(tree) {
		return tree.getNodesByFilter(function (node) { return node.level == 0 }, true);
	},
	
	getTree:function(treeid){
		var zTree = $.fn.zTree.getZTreeObj(treeid);
		return zTree;
	},
	
	/**
 	 * 机构树节点的设置
 	 */
	orgTreeSettings : {	
			view: {
				dblClickExpand: false,
				showLine: false
			},
			check: {
				enable: true/*,
				chkStyle: "checkbox",
				chkboxType: { "Y": "ps", "N": "ps" }*/
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
				onClick: clickOrgTree
			}
	},
	
	selectOrg:function(orgId,id){
		if(!id) {
			id = "#orgId";
		}
		var zTree = $.fn.zTree.getZTreeObj("orgTree");
		var node = zTree.getNodeByParam("orgId", orgId);
		zTree.selectNode(node);
		$("#jglist").attr("value", node.shortName);
		$(id).attr("value",node.orgId);
	},
	
	selectRoot:function(id){
		if(!id) {
			id = "#orgId";
		}
		var zTree = $.fn.zTree.getZTreeObj("orgTree");
		var node = loan.orgtree.getRoot(zTree);
		zTree.selectNode(node);
		$("#jglist").attr("value", node.shortName);
		$(id).attr("value",node.orgId);
	},
	
	removeOrg:function(orgId){
		var zTree = $.fn.zTree.getZTreeObj("orgTree");
		var node = zTree.getNodeByParam("orgId", orgId);
		zTree.removeNode(node);
	},
	
	
	/**
 	 * 机构树节点的设置
 	 */
	orgTreeSettingsOpera : {	
			view: {
				dblClickExpand: false,
				showLine: false
			},
			check: {
				enable: true/*,
				chkStyle: "checkbox",
				chkboxType: { "Y": "ps", "N": "ps" }*/
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
				onClick: clickOrgTreeOpera
			}
	},
	/**
	 * 加载机构树
	 */
	queryOrgFunc : function(callback) {
		menuId = $("#menuId").val();
		 
		loan.ajaxDo({
	  		url:loan.basePath+"/org/queryOrgTree",
	  		params:{'menuId':menuId,'format':'json'},
	  		successCallback:callback,
	  		chainPar:this
	  	});
	},
	
	/**
	 * 展示树
	 */
	showOrgTreeForSearch:function(result) {
		var orgNodes = result.orgInfoList;
		if(orgNodes) {
			$.fn.zTree.init($("#orgTree"), loan.orgtree.orgTreeSettings, orgNodes);
			var orgTree = $.fn.zTree.getZTreeObj("orgTree");
			orgTree.expandAll(true);
			//获取根节点
			var root = loan.orgtree.getRoot(orgTree);
			root.shortName = "所有";
			orgTree.updateNode(root);
			$("#jglist").attr("value", root.shortName);
			$("#orgId").attr("value",root.orgId);
		}
	},
	
	/**
	 * 展示树
	 */
	showOrgTreeRealName4Search:function(result) {
		var orgNodes = result.orgInfoList;
		if(orgNodes) {
			$.fn.zTree.init($("#orgTree"), loan.orgtree.orgTreeSettings, orgNodes);
			var orgTree = $.fn.zTree.getZTreeObj("orgTree");
			orgTree.expandAll(true);
			//获取根节点
			var root = loan.orgtree.getRoot(orgTree);
			$("#jglist").attr("value", root.shortName);
			$("#orgId").attr("value",root.orgId);
		}
	},
	
	/**
	 * 展示树
	 */
	showOrgTreeRealName:function(result) {
		var orgNodes = result.orgInfoList;
		if(orgNodes) {
			$.fn.zTree.init($("#orgTree"), loan.orgtree.orgTreeSettingsOpera, orgNodes);
			var orgTree = $.fn.zTree.getZTreeObj("orgTree");
			orgTree.expandAll(true);
			
		}
	},
	
	
}

function clickOrgTree(e, treeId, treeNode) {
	$("#jglist").attr("value", treeNode.shortName);
	$("#orgId").attr("value",treeNode.orgId);
	hideMenu();
};

function clickOrgTreeOpera(e, treeId, treeNode) {
	$("#jglist").attr("value", treeNode.shortName);
	$("#parentOrgId").attr("value",treeNode.orgId);
	hideMenu();
	$('#jglist').siblings('div').remove();//清除提示
	if($("#jglist.verify").length > 0) {
		loan.verify.formValidatorShowMsgTrue($("#jglist"),150);//提示正确信息
	}
	
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

function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
};


