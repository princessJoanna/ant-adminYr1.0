var menuId;
loan.loanDataKeepView = loan.loanDataKeepView || {
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 清空查询条件
	 */
	clearCondition : function() {
		$("#startDate").val("");
		$("#endDate").val("");
		$("#userName").val("");
		$("#mobile").val("");
		$("#itemKey").val("");
		loan.loanDataKeepView.showOrgTreeRoot("orgTree");
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var orgId = $("#orgId").val();
		var pfOrgId = $("#pfOrgId").val();
		var userName = $("#userName").val();
		var itemKey = $("#itemKey").val();
		var mobile = $("#mobile").val()
		var startDate = $("#startDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		if(orgId == "" || orgId == null){
			orgId = pfOrgId;
		}
		if(startDate && endDate && (startDate > endDate)) {
			loan.tooltip("开始日期应该小于结束日期","error");
			return;
		}
		$("#loanDataKeepViewGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'5102','format':'json','userName':userName,
				'mobile':mobile,'endDate':endDate,'startDate':startDate,'itemKey':itemKey,'orgId':orgId},
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
		$.fn.zTree.init($("#orgTree"), loan.loanDataKeepView.orgTreeSettings, orgNodes);
		//显示根节点内容
		loan.loanDataKeepView.showOrgTreeRoot("orgTree");
	},
	
	/**
	 * 显示根节点内容
	 */
	showOrgTreeRoot:function(treeid) {
		var orgTree = $.fn.zTree.getZTreeObj(treeid);
		orgTree.expandAll(true);
		//获取根节点
		var root = loan.loanDataKeepView.getRoot(orgTree);
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
	loan.loanDataKeepView.queryOrgFunc(loan.loanDataKeepView.initOrgTreeFunc);
	$(".ui-pg-input").attr("id","focus");
});