loan.oplog = loan.oplog || {
//	loadGridFn: function(){
//		jQuery("#oplogGridId").jqGrid({
//			url:'queryOpLogForPage',
//			mtype:'POST',
//			datatype: "json",
//			postData:{format:'json'},
//			colNames: ['操作员','所属机构','操作功能','操作内容','发生日期','发生时间','操作时间','备注','机构代码'], 
//			colModel: [
//			   {name:'opName',index:'opName', align:'center',sortable: false},
//	           {name:'orgShortName',index:'orgShortName',align:'center',sortable: false},
//	           {name:'functionName',index:'functionName', align:'center',sortable: false},
//	           {name:'logContent',index:'logContent',align:'center',sortable: false},
//	           {name:'occurDate',index:'occurDate',align:'center',sortable: false},
//	           {name:'occurTime',index:'occurTime',align:'center',sortable: false},
//	           {name:'createTime',index:'status',align:'center',hidden:true},
//	           {name:'remark',index:'rekark',align:'center',sortable: false},
//	           {name:'orgId',index:'orgId',align:'center',hidden:true}
//	        ], 
//	        jsonReader:{ 
//				root: "response.pager.items",//数据项
//				page: "response.pager.currentPageNo",//当前页码
//				total: "response.pager.indexes", //总页数
//				records: "response.pager.totalResult",//总记录数
//				repeatitems : false
//			},
//	        pager:jQuery('#oplogGridPageId'),//翻页栏
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
//			loadComplete:function(result){
//			},
//			gridComplete : function() {//当表格所有数据都加载完成
//			}
//		});
//	},

	/**加载机构树JSON数据成功后调用的方法*/
	loanOrgTreeJsonSuccFun:function (result){
		var orgNodes = result.orgInfoList;
		$.fn.zTree.init($("#treeDemo"),loan.oplog.orgTreeSettings, orgNodes);
		var orgTree = $.fn.zTree.getZTreeObj("treeDemo");
		var rootNode = orgTree.getNodes()[0];
		$("#orgInfo").attr("value",rootNode.shortName);
		$("#orgId").attr("value",rootNode.orgId);
		orgTree.expandAll(true);
		//loan.oplog.loadGridFn();
	},
	/**机构树设置*/
	orgTreeSettings : {
		view: {
			dblClickExpand: false,
			showTitle:true,
			showLine:false
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
					var tree = $.fn.zTree.getZTreeObj("treeDemo");
					tree.expandNode(treeNode);
				}
			},
			onClick: clickOrgTree 
		}
	},
	searchFn : function(){
		var orgId = $("#orgId").val();
		var startDate = $("#startDate").val().replace(/-/gm,'');
		var endDate = $("#endDate").val().replace(/-/gm,'');
		var functionName = $("#functionName").val();
		if(startDate!="" && endDate!="" && startDate>endDate){
			loan.tooltip("开始日期不能大于结束日期!","error");
			return;
		}
		$("#oplogGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'2003','format':'json','orgId':orgId,'startTime':startDate,"endTime":endDate,"functionName":functionName},
			page:1
	    }).trigger('reloadGrid');   
	}
};

/**单击机构树的方法*/
function clickOrgTree(e, treeId, treeNode) {
	$("#orgInfo").attr("value", treeNode.shortName);
	$("#orgId").attr("value",treeNode.orgId);
	hideMenu();
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

opinionFn = function(menuId,rowid) {
    $("#rowid").attr("value",rowid);
    var rowData = $("#opinionGridId").jqGrid("getRowData", rowid);
    var opinion = rowData.opinion;
    loan.s_addPop("反馈意见详情",loan.basePath+"/opinion/opinion?opinion="+opinion,"",480,200,{isRefresh:false});
}


selectOpinionRowFunc = function(rowid){
    $("#rowid").attr("value",rowid);//记录当前选中的行的rowid
}
/**初始化Grid*/
$(function(){
	$(".ztree").css("width",$("#orgInfo").width()+"px");
	loan.ajaxDo({
  		url:loan.basePath+"/org/queryOrgTree",
  		params:{"menuId":"2003"},
  		successCallback:loan.oplog.loanOrgTreeJsonSuccFun,
  		chainPar:this
  	})
  	
	$('#startDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});	
	$('#endDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});
	
});

