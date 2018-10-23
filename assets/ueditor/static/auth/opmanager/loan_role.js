loan.role = loan.role || {
	/**菜单栏禁用/启用角色按钮事件*/
	updRoleStatusFn : function() {
        var rowid = $("#rowid").val();
        if($("#rowid").val() == ""){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var rowObj = $("#roleGridId").jqGrid('getRowData',rowid);
		if(rowObj.adminStatus == "1" ){
            loan.tooltip("不可禁用管理员账号！","error");
            return;
		}
		if(rowObj.status == "0"){
			$.artDialog({
				title:'提示',
				content:"是否确定禁用【"+rowObj.roleName+"】角色？",
				ok:function(){
					loan.role.disableRoleFn(rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}else{
			$.artDialog({
				title:'提示',
				content:"是否确定启用【"+rowObj.roleName+"】角色？",
				ok:function(){
					loan.role.enableRoleFn(rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}
	},
	
	/**增加*/
	addRoleFn : function() {
		loan.s_addPop("新增角色",loan.basePath+"/role/toaddrole?menuId=200101","",720,430,{isRefresh:false});	
	},
	
	/**查看*/
	displayRoleFn : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		loan.s_addPop("查看角色",loan.basePath+"/role/todisplayrole?menuId=200104&menuLog=1","",650,450,{isRefresh:false});	
	},
	
	/**修改*/
	updRoleFn : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		loan.s_addPop("修改角色",loan.basePath+"/role/tomodrole?menuId=200102","",720,430,{isRefresh:false});	
	},
	
	/**删除*/
	delRoleFn : function(menuId,rowid) {
		var rowObj = $("#roleGridId").jqGrid('getRowData',rowid);
		$.artDialog({
			title:'提示',
			content:"是否确定删除【"+rowObj.roleName+"】角色？",
			ok:function(){
				var rowObj = $("#roleGridId").jqGrid('getRowData',rowid);
				 loan.ajaxDo({
			  		url:loan.basePath+"/role/deleteRole",
			  		params:{'menuId':'200103','roleId':rowObj.roleId,'menuLog':'1'},
			  		successCallback:loan.role.delRoleSucFn,
			  		successTip:true
			  	});
			},
			cancel:function(){
				return false;
			}
	    })	
	},
	
	/**删除成功翻页的处理*/
	delRoleSucFn : function(){
		var rows = $("#roleGridId").jqGrid('getRowData').length;
		var page = $("#roleGridId").jqGrid('getGridParam','page');
		if(rows < 2){
			if(page > 1){
				page = page -1;
			}
		}
		var orgId = $("#orgId").val();
		$("#roleGridId").jqGrid("setGridParam", {   
			'postData':{'format':'json','orgId':orgId,'menuId':'2001'},
			'page':page
	    }).trigger('reloadGrid');   
		$("#rowid").attr("value","");
	},
	
	/**启用*/
	enableRoleFn : function(rowid) {
		var rowObj = $("#roleGridId").jqGrid('getRowData',rowid);
		if(rowObj.status == "0"){
			loan.tooltip("该角色已经是启用状态","error");
		}else{
			loan.ajaxDo({
		  		url:loan.basePath+"/role/updateRoleStatus",
		  		params:{'menuId':'200105','menuLog':'1','roleId':rowObj.roleId,'status':'0',},
		  		successCallback:loan.role.commSuccFun,
		  		successTip:true
		  	})
		}
	},
	
	/**禁用*/
	disableRoleFn : function(rowid) {
		var rowObj = $("#roleGridId").jqGrid('getRowData',rowid);
		if(rowObj.status == "1"){
			loan.tooltip("该角色已经是禁用状态","error");
		}else{
			loan.ajaxDo({
		  		url:loan.basePath+"/role/updateRoleStatus",
		  		params:{'menuId':'200105','menuLog':'1','roleId':rowObj.roleId,'status':'1'},
		  		successCallback:loan.role.commSuccFun,
		  		successTip:true
		  	})
		}
	},
	
	/**刷新当前页面*/
	commSuccFun : function(){
		var orgId = $("#orgId").val();
		$("#roleGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','orgId':orgId,'menuId':'2001'}
	    }).trigger('reloadGrid');   
		$("#rowid").attr("value","");
		//loan.s_Pop_closedParent(true,false);
	},
	
	/**单击行触发事件*/
	selectFn : function(rowid){
        $("#rowid").attr("value",rowid);//记录当前选中的行的rowid
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
			onCheck: clickOrgTree 
		}
	},
//	loadGridFn: function(){
//		$("#rowid").attr("value",""); //每次刷新页面清空记录ID
//		jQuery("#roleGridId").jqGrid({
//			url:'queryRolesForPage',
//			mtype:'POST',
//			datatype: "json",
////			postData:{format:'json'},
//			onSelectRow:loan.role.selectFn,
//			colNames: ['角色编号','角色名称','角色类型','角色状态','是否管理员','所属机构','角色描述','操作',"角色类型代码","角色状态代码","是否管理员状态代码","所属机构ID"],
//			colModel: [
//			   {name:'roleId',index:'roleId', align:'center',width:'120',sortable: false,hidden:true},
//	           {name:'roleName',index:'roleName', align:'center',width:'120',sortable: false},
//	           {name:'roleTypeCn',index:'roleType',align:'center',width:'100',sortable: false},
//	           {name:'statusCn',index:'status',align:'center',width:'80',sortable: false},
//	           {name:'adminStatusCn',index:'adminStatus',align:'center',width:'80',hidden:true,sortable: false},
//	           {name:'orgShortName',index:'orgFullName',align:'center',sortable: false},
//	           {name:'remark',index:'remark',align:'center',sortable: false},
//	           {name:'act',index:'act',align:'center',width:'100',sortable: false},
//	           {name:'roleType',index:'roleType',align:'center',hidden:true,sortable: false},
//	           {name:'status',index:'status',align:'center',hidden:true,sortable: false},
//	           {name:'adminStatus',index:'adminStatus',align:'center',hidden:true,sortable: false},
//	           {name:'orgId',index:'orgId',align:'center',hidden:true,sortable: false}
//	        ],
//	        jsonReader:{
//				root: "response.pager.items",//数据项
//				page: "response.pager.currentPageNo",//当前页码
//				total: "response.pager.indexes", //总页数
//				records: "response.pager.totalResult",//总记录数
//				repeatitems : false
//			},
//	        pager:jQuery('#roleGridPanelId'),//翻页栏
//			rowNum : 10,//每页显示记录数
//			rowList : [10, 20, 30],
//			toolbarfilter : true,
//			viewrecords : true,//是否要显示总记录数
//			autowidth : true, //自动宽度
//			rownumbers: true,
//			multiselect : false,
//			pagerpos:'center',	//指定分页栏的位置
//			pgbuttons:true,//是否显示翻页按钮
//			pginput: true,	//是否显示跳转页面的输入框
//			height: 'auto',
//			autowidth: true,
//			forceFit:true,//调整列宽不会改变表格宽度
//			loadComplete:function(){},//当从服务器返回响应时执行
//			gridComplete : function() {//当表格所有数据都加载完成
//				var rowIds = jQuery("#roleGridId").jqGrid('getDataIDs');
//				for (var i = 0; i < rowIds.length; i++) {
//	            	var addBtn = "<div class='operating'>";
//	            	addBtn += "<a class='operating-trash icon-radius' title='查看' onclick=\"loan.role.displayRoleFn()\"><i class='icon-comment'></i></a>";
//					addBtn += "<a class='operating-pencil icon-radius' title='修改' onclick=\"loan.role.updRoleFn('"+rowIds[i]+"')\"><i class='icon-pencil'></i></a>";
//					addBtn += "<a class='operating-authority icon-radius' title='删除' onclick=\"loan.role.delRoleFn('"+rowIds[i]+"')\"><i class='icon-trash'></i></a></div>";
//					jQuery("#roleGridId").jqGrid('setRowData',rowIds[i], {
//						act : addBtn
//					});
//				}
//			}
//		});
//	},
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
	loanOrgTreeJsonSuccFun:function (result){
		var orgNodes = result.orgInfoList;
		$.fn.zTree.init($("#treeDemo"),loan.role.orgTreeSettings, orgNodes);
		var orgTree = $.fn.zTree.getZTreeObj("treeDemo");
		var rootNode = orgTree.getNodes()[0];
		$("#orgInfo").attr("value",rootNode.shortName);
		$("#orgId").attr("value",rootNode.orgId);
		loan.role.invalidRegionNode(orgNodes,orgTree);
		orgTree.expandAll(true);
		//loan.role.loadGridFn();
	},
	searchFn : function(){
		var orgId = $("#orgId").val();
		$("#roleGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','orgId':orgId,'menuId':'2001'},
			page:1
	    }).trigger('reloadGrid');   
		$("#rowid").attr("value","");
	}
};

function closeFn(){
	var orgId = $("#orgId").val();
	$("#roleGridId").jqGrid("setGridParam", {   
		postData:{'format':'json','orgId':orgId,'menuId':'2001'},
		page:1
    }).trigger('reloadGrid');   
	$("#rowid").attr("value","");
}

/**单击机构树的方法*/
function clickOrgTree(e, treeId, treeNode) {
	$("#orgInfo").attr("value", treeNode.shortName);
	$("#orgId").attr("value",treeNode.orgId);
	hideMenu();
//	if (treeNode.isParent) {
//		var tree = $.fn.zTree.getZTreeObj("orgTree");
//		tree.expandNode(treeNode);
//	}else{
//		
//	}
}

function showMenu() {
	var cityObj = $("#orgInfo");
	var cityOffset = $("#orgInfo").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	$("a#menuBtn").addClass("current");
	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		$("a#menuBtn").removeClass("current");
		hideMenu();
	}
}

/**初始化Grid*/
$(function(){
	$(".ztree").css("width",$("#orgInfo").width()+"px");
	loan.ajaxDo({
  		url:loan.basePath+"/org/queryOrgTree",
  		params:{"menuId":'2001'},
  		successCallback:loan.role.loanOrgTreeJsonSuccFun,
  		chainPar:this
  	})
});
