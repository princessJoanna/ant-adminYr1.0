loan.addrole = loan.addrole || {

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
	
	/**展开机构树的方法*/
	showOrgTree : function(){
		if(loan.addrole.showStat == 0){
			$("#selectTree").show();
			$("#menuBtn").html("收起");
			loan.addrole.showStat = 1;
		}else{
			$("#selectTree").hide();
			$("#menuBtn").html("选择");
			loan.addrole.showStat = 0;
		}
	},
	showCode : function(str) {
		if (!code) code = $("#code");
		code.empty();
		code.append("<li>"+str+"</li>");
	},
	
	/**提交**/
	submit : function(){
		var roleName = $("#roleName").val();
		var roleType = $("#roleType").val();
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
				obj.menuName = checkedNodes[i].menuName;
				nodesArray.push(obj);
			}
		}
		menulist = JSON.stringify(nodesArray);
		loan.ajaxDo({
	  		url:loan.basePath+"/role/addRole",
	  		params : {"menuId":"200101",'menuLog':'1',"orgId":orgId,"roleName":roleName,"roleType":roleType,"remark":remark,"menulist":menulist},
	  		chainPar:this,
	  		successTip:true,
	  		successCallback:loan.addrole.submitSuccFun
	  	})
	},
	
	/**交易成功后关闭页面*/
	submitSuccFun : function(){
		parent.closeFn();
		loan.s_Pop_closedChild(false,false);
	},
	
	/**树的设置*/
	menuTreesettings : {
		view: {
			dblClickExpand: false,
			showTitle:true,
			showLine:false
		},
		check: {
			enable: true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "ps", "N": "s" }
			
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
	},
	/**机构树设置*/
	orgTreeSettings : {
			view: {
				dblClickExpand: false,
				showLine: false
			},
			check: {
				enable: true,
				chkStyle: "radio",
				radioType: "all"
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
				beforeClick: function(treeId, treeNode) {
					if (treeNode.isParent) {
						var tree = $.fn.zTree.getZTreeObj("orgTree");
						tree.expandNode(treeNode);
					}
				},
				onCheck: clickOrgTree,
			}
		},
		invalidRegionNode:function(orgNodes,orgTree){
			for(var i in orgNodes) {
				var org = orgNodes[i];
				if(org.orgType == "2") {
					var node = orgTree.getNodeByParam("orgId",org.orgId);
					node.nocheck = true;
					orgTree.updateNode(node);
				}
			}
		},
		/**加载机构树JSON数据成功后调用的方法*/
		loanOrgTreeJsonSuccFun : function(result){
			var orgNodes = result.orgInfoList;
			$.fn.zTree.init($("#orgTree"),loan.addrole.orgTreeSettings, orgNodes);
			var orgTree = $.fn.zTree.getZTreeObj("orgTree");
			var rootNode = orgTree.getNodes()[0];
			//loan.addrole.expandLevel(orgTree,rootNode,2); 
			loan.addrole.invalidRegionNode(orgNodes,orgTree);
			orgTree.expandAll(true);
		},
		/**加载权限树JSON数据成功后调用的方法*/
		loanMenuTreeJsonSuccFun : function(result){
			var menulist = result.menulist;
			var orgName = $("#orgInfo").val();
			var rootMenu = {"menuId":"0","menuName":orgName,"menuTip":orgName};
			menulist.push(rootMenu);
			$.fn.zTree.init($("#rightTree"), loan.addrole.menuTreesettings, menulist);
			var zTree = $.fn.zTree.getZTreeObj("rightTree");
			var rootNode = zTree.getNodes()[0];  
			//loan.addrole.expandAll(zTree,rootNode,4);  
			zTree.expandAll(true);
		},
		/**加载权限树JSON数据*/
		loanMenuTreeJson : function(orgType){
			loan.ajaxDo({
		  		url:loan.basePath+"/menu/queryMenus",
		  		params:{'menuId':'200101','modelType':orgType,'menuStatus':'0'},
		  		successCallback:loan.addrole.loanMenuTreeJsonSuccFun,
		  		chainPar:this
		  	})
		},
		showMenu : function() {
			var cityObj = $("#orgInfo");
			var cityOffset = $("#orgInfo").offset();
			$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
			$("a#menuBtn").addClass("current");
			$("body").bind("mousedown", loan.addrole.onBodyDown);
		},
		hideMenu : function() {
			$("#menuContent").fadeOut("fast");
			$("body").unbind("mousedown", loan.addrole.onBodyDown);
		},
		
		onBodyDown: function(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
				$("a#menuBtn").removeClass("current");
				loan.addrole.hideMenu();
			}
		}
}
/**单击机构树的方法*/
function clickOrgTree(e, treeId, treeNode) {
	$("#orgInfo").attr("value", treeNode.shortName);
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
	loan.addrole.hideMenu();
	 $("#orgInfo").blur();
}


$(function(){	
	$("#orgTree").css("width",$("#orgInfo").width()+2+"px");
	loan.verify.verifyCheck("iform","submit_button");
	/**加载机构树的JSON数据*/
	loan.ajaxDo({
  		url:loan.basePath+"/org/queryOrgTree?menuId=200101",
  		params:{"menuId":"200101"},
  		successCallback:loan.addrole.loanOrgTreeJsonSuccFun,
  		chainPar:this
  	})
})
