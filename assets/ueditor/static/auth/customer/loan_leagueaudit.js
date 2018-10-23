loan.leagueaudit = loan.leagueaudit || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#userLeagueGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'5002'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	setSelect:function(id,chose) {
		if(!chose) {
			chose = '-1';
		}
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val(chose);
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 确认提示框
	 */
	confirmDialog:function(dtitle,dcontent,callBackFunc) {
		$.artDialog({
			title:dtitle,
			content:dcontent,
			ok:callBackFunc,
			cancel:function(){
				return false;
			}
	    });
	},
	
	/**
	 * 查看加盟商信息按钮
	 */
	lookBtnFunc:function(menuId,rowid){	
		var userId = $("#userLeagueGridId").jqGrid('getCell',rowid,'userId');
		var leagueId = $("#userLeagueGridId").jqGrid('getCell',rowid,'leagueId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/league/viewLeague?menuLog=1&menuId=" + menuId
				+ "&userId="+userId+ "&leagueId="+leagueId,
				"toLeagueInfo",true,true);
	},
	
	/**
	 * 审核加盟商信息按钮
	 */
	auditBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		// 城市 、 地区编码为0，则说明是批量导入的加盟商，需要补全信息
		var cityCode = jQuery("#userLeagueGridId").jqGrid('getCell',rowid,'cityCode');
		if(!cityCode || cityCode == 0){
			loan.tooltip("该加盟商行政区域未填城市，请先补全！","error");
			return;
		}
		var districtCode = jQuery("#userLeagueGridId").jqGrid('getCell',rowid,'districtCode');
		if(!districtCode || districtCode == 0){
			loan.tooltip("该加盟商行政区域未填区县，请先补全！","error");
			return;
		}
		
		var confirmstatus = jQuery("#userLeagueGridId").jqGrid('getCell',rowid,'confirmStatus');
		var status = jQuery("#userLeagueGridId").jqGrid('getCell',rowid,'status');
		if(confirmstatus != 0) {//0-未审核
			loan.tooltip("该加盟商已经不处于未审核状态，不可以审核","error");
			return;
		}
		if(status == 2) {//2-注销
			loan.tooltip("该加盟商已经被注销","error");
			return;
		}
		loan.s_addPop("加盟商审核",loan.basePath+"/league/toExamLeague?menuId=500202","",430,420,{isChangeClose:true});
	},

	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var leagueType = leagueType = $("#leagueType").val();//客户分类
		var confirmStatus = $("#confirmStatus").val();//审核状态
		var userName = $("#userName").val();//客户名称

		if(leagueType && leagueType === "-1"){
			leagueType = "";
		}
		if(confirmStatus && confirmStatus === "-1"){
			confirmStatus = "";
		}
		$("#userLeagueGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'5002','leagueType':leagueType,'confirmStatus':confirmStatus,'userName':userName,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 提交审核
	 */
	submitAudit:function() {
		var rowid = parent.$("#rowid").val();
		//var leaque = $("#userLeagueGridId").jqGrid('getRowData',rowid);
		var userId = parent.$("#userLeagueGridId").jqGrid("getCell", rowid, "userId");
		var leagueId = parent.$("#userLeagueGridId").jqGrid("getCell", rowid, "leagueId");
		var confirmContent = $("#confirmContent").val();
		var confirmStatus = $("input[name='confirmStatus']:checked").val();
		var canRecomment = $("input[name='canRecomment']:checked").val();
		if(!confirmStatus) {
			loan.tooltip("请选择表决意见","error");
			return;
		}
		if(confirmStatus === '2' && !canRecomment) {
			loan.tooltip("请确定是否可以推荐客户","error");
			return;
		}
		var orglist;
		if(confirmStatus === '2') {
			var zTreeObj = $.fn.zTree.getZTreeObj("orgTree");
			var checkedNodes = zTreeObj.getCheckedNodes(true);
			if(!checkedNodes || checkedNodes.length < 1) {
				loan.tooltip("请选择要小贷公司","error");
				return;
			}
			var nodesArray = new Array();
			for(var i=0;i<checkedNodes.length;i++){
				if(checkedNodes[i].menuId != "0"){
					nodesArray.push(checkedNodes[i].orgId);
				}
			}
			if(nodesArray.length > 1){
				loan.tooltip("加盟商只能签约一家小贷公司！","error");
				return;
			}
		}
		
		orglist = JSON.stringify(nodesArray);
		
		loan.ajaxDo({
			url:loan.basePath+"/league/confirmLeague",
			params:{'menuId':'500202','menuLog':'1','format':'json',
				'userId':userId,'leagueId':leagueId,
				'confirmContent':confirmContent,'confirmStatus':confirmStatus,
				'canRecommend':canRecomment,'leagueOrgs':orglist},
			successCallback:loan.leagueaudit.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 加载出资机构机构树(所有启用状态的) 机构树方法步骤----1
	 */
	showEnableOrgFunc : function(callBackFunc) {
		if(!callBackFunc) {
			callBackFunc = loan.leagueaudit.loanOrgTreeJsonSuccFun;
		}
		loan.ajaxDo({
	  		url:loan.basePath+"/sellerOrg/queryOrgInPf",
	  		params:{'format':'json','menuId':'500202','orgStatus':'0','orgType':'1','page':'1','rows':'10000'},
	  		successCallback:callBackFunc,
	  		chainPar:this
	  	});
	},
	
	/**
	 * 加载机构树JSON数据成功后调用的方法 机构树方法步骤----2
	 * */
	loanOrgTreeJsonSuccFun : function(result){
		var orgNodes = result.pager.items;
		$.fn.zTree.init($("#orgTree"), loan.leagueaudit.orgTreeSettings, orgNodes);
		var orgTree = $.fn.zTree.getZTreeObj("orgTree");
		orgTree.expandAll(true);
	},
	
	/**
 	 * 机构树树节点的设置 机构树方法步骤----3
 	 */
	orgTreeSettings : {	
			view: {
				dblClickExpand: false,
				showTitle:true,
				showLine:false
			},
			check: {
				enable: true,
				chkStyle: "radio",
				chkboxType: { "N": "ps", "N": "ps" }
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
				}
			}
	},
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
	
	