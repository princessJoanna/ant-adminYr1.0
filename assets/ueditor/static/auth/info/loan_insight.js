var menuId;
loan.insight = loan.insight || {
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
		$.fn.zTree.init($("#orgTree"), loan.insight.orgTreeSettings, orgNodes);
		//显示根节点内容
		loan.insight.showOrgTreeRoot("orgTree");
	},
	
	/**
	 * 显示根节点内容
	 */
	showOrgTreeRoot:function(treeid) {
		var orgTree = $.fn.zTree.getZTreeObj(treeid);
		orgTree.expandAll(true);
		//获取根节点
		var root = loan.insight.getRoot(orgTree);
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
	
	uploadInSight:function(){
		var orgId = $("#orgId").val();
		var startDate = $("#startDate").val();
		if(!orgId){
			loan.tooltip("请先选择机构","error");
			return;
		}
		if(!startDate){
			loan.tooltip("请先选择要下载的文件的日期","error");
			return;
		}
		var date = $("#startDate").val().replace(/-/g,"");
		window.location.href = loan.basePath + "/org/queryInSight?orgId="+orgId+"&menuId="+menuId+"&date="+date;
	},
	
	getInSight:function(){
		var pfOrgId = $("#pfOrgId").val();
		var orgId = $("#orgId").val();
		var startDate = $("#startDate").val();
		if(!orgId&&!pfOrgId){
			loan.tooltip("请先选择机构","error");
			return;
		}
		if(!startDate){
			loan.tooltip("请先选择要生成的文件日期","error");
			return;
		}
		var nowDate=new Date();
		var start=new Date(startDate)
		if(start && (start> nowDate)) {
			loan.tooltip("日期应该小于当前系统日期","error");
			return;
		}
		var relOrg;
	    if(orgId){
				relOrg=	orgId;
		}else{
				relOrg=pfOrgId;
		}
		var date = $("#startDate").val().replace(/-/g,"");
		loan.ajaxDo({
			url:loan.basePath+"/org/againInSight",
			params:{'menuId':menuId,'orgId':relOrg,'date':date},
			successCallback:function(){
				//loan.risktarget.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
}

/**单击机构树的方法*/
function clickOrgTreeNode(e, treeId, treeNode) {
	if(treeNode.orgType == "0") {
		$("#pfOrgId").attr("value",treeNode.orgId);
		$("#orgId").attr("value","");
	} else if (treeNode.orgType == "1") {
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
	loan.insight.queryOrgFunc(loan.insight.initOrgTreeFunc);
	$(".ui-pg-input").attr("id","focus");
});