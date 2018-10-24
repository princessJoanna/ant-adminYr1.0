loan.operator = loan.operator|| {
	
	initOperator:function(){
		//初始化操作员数据
		var rowid = parent.$("#rowid").val();
		var user = parent.$("#userGridId").jqGrid('getRowData',rowid);
		var orgId = user.orgId;
		var pfOrgId = user.pfOrgId;
		var opId = user.opId;
		$("#opName").attr("value",user.opName);
		$("#opId").attr("value",opId);
		$("#opCode").attr("value",user.opCode);
		$("#orgId").attr("value",orgId);
		$("#mobile").attr("value",user.mobile);
		$("#email").attr("value",user.email);
		$("#jglist").attr("value",user.orgShortName);
		$("#idNo").attr("value",user.idNo);
		$("#manageType").attr("value",user.manageType);
		//加载角色
		loan.operator.showRoleFunc(orgId);
		//初始化用户角色
		loan.operator.queryRoleByOpIdFunc(opId);
		//初始化消息定制
		var orgType = '1';
     if(orgId === pfOrgId) {
			orgType = '0';
		}
     loan.operator.initNT(orgType);
     loan.operator.initNTChecked(rowid);
     },

     /**
	 * 查询消息模板成功后的执行方法
	 */
	initNTChecked : function(rowid) {
		var notices = $("[name='noticeIds']");
		var noticeStr = parent.$("#userGridId").jqGrid('getCell',rowid,'noticeStr');
		var noticeList = noticeStr.split(',');
		for(var i = 0; i < noticeList.length; i++) {
			for(var j = 0; j < notices.length; j++) {
				if($(notices[j]).val() == noticeList[i]) {
					$(notices[j]).attr("checked","true");
					break;
				}
			}
		}
		
	},
	
	submitValidate:function(id,prompt){
		var value = $(id).val();
		if(!value) {
			loan.tooltip(prompt,"error");
			$(id).focus();
			return false;
		}
		return true;
	},
	
	/**
	 * 查询消息模板成功后的执行方法
	 */
	initNTCallBack : function(result) {
		var ntList = result.pager.items;
		var notices = $("#notices");
		notices.empty();
		if(!ntList || ntList.length == 0) {
			return;
		}
		
		for(var i = 0; i < ntList.length; i++) {
			var noticeKind = ntList[i].noticeKind;
			if(noticeKind == 2) {
				continue;
			}
			var noticeId = ntList[i].noticeTypeId;
			var typeName = ntList[i].typeName;
			notices.append("<li class='f-fl f-pt5'><input type='checkbox' class='f-mr5' name='noticeIds' value='"
					+noticeId+"'\>"+typeName+"<\li>");
		}
	},
	/**
	 * 查询消息模板
	 */
	initNT:function(orgType) {
		if(!orgType) return;
		var receiveSide = '';
		if(orgType === '0') {//运营平台
			receiveSide = '4';
		} else if(orgType === '1') {//出资机构
			receiveSide = '0';
		}
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url:loan.basePath+"/notice/queryNTPaged",
			params:{'menuId':menuId,'format':'json','page':'1','rows':'100000',
				'receiveSide' : receiveSide},
			successCallback:loan.operator.initNTCallBack,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 查询登录操作员的信息
	 */
	queryOnLineOp:function(sucCallback) {
		loan.ajaxDo({
			url:loan.basePath+"/operator/queryOperators",
			params:{"menuId":null,"opCode":opCode,"rows":"1","page":"1"},
	  		chainPar:this
		});
	},
	
	/**
	 * 查询操作员byorg
	 */
	queryOpByOrgId:function(orgId) {
		$("#userGridId").jqGrid('setGridParam',{  
	        datatype:'json',
	        url:'queryOperators',
        	postData:{'menuId':'2002','orgId':orgId}, //发送数据  
            page:1
	    }).trigger("reloadGrid"); 
	},
	
	/**
	 * 修改密码成功后清空input内信息
	 */
	successModifyPwdFunc : function() {
		$('#newPwd').val("");
		$('#confirmPwd').val("");
		$('#oldPwd').val("");
	},
	
	/**
	 * 修改密码的form调用
	 */
	modifyPwdFunc : function() {
		var action = $('#action').val();
		var pfOrgId = $('#pfOrgId').val();
		var opId = $('#opId').val();
		var menuId =  $('#menuId').val();
		var menuLog = $('#menuLog').val();
		var opCode = $('#opCode').val();
		var oldPwd = $('#oldPwd').val();
		var newPwd = $('#newPwd').val();
		
	    // RSA加密
		oldPwd =loan.encrypt.encrypt(oldPwd);
		newPwd =loan.encrypt.encrypt(newPwd);
	    
		var params = {
				"action" : action,
				"pfOrgId" : pfOrgId,
				"opId" : opId,
				"menuId" : menuId,
				"menuLog" : menuLog,
				"opCode" : opCode,
				"oldPwd" : oldPwd,
				"newPwd" : newPwd
		};
		loan.ajaxDo({
            url:loan.basePath+"/operator/modifyOperatorPwd",
            params:params,
            successCallback: loan.operator.closeChildWindow,
            successTip:true, //提示
        });
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		parent.loan.operator.freshOperatorGrid();
		loan.s_Pop_closedChild(false,false);
	},
	
	/**
	 * 关闭父窗口 刷新操作
	 */
	freshOperatorGrid : function() {
		$("#userGridId").jqGrid('setGridParam',{  
			"menuId":'2002',datatype:'json'
	    }).trigger("reloadGrid"); 
	},
	
	deleteOpSuccFn : function(){
		var orgId = $("#orgId").val();
		var rows = $("#userGridId").jqGrid('getRowData').length;
		var page = $("#userGridId").jqGrid('getGridParam','page');
		if(rows < 2){
			if(page > 1){
				page = page -1;
			}
		}
		$("#userGridId").jqGrid("setGridParam", {
			'page':page
	    }).trigger('reloadGrid');   
		$("#rowid").attr("value","");
	},

	/**新增操作员的ajax 调用*/
	addOpFn : function() {
		var menuId = $("#menuId").val();
		var orgId = $("#orgId").val();
		var opName = $("#opName").val();
		var opCode = $("#opCode").val();
		var mobile = $("#mobile").val();
		var email = $("#email").val();
		var idNo = $("#idNo").val();
		/**获取token标签中的值*/
		var csrfToken =$("#csrfToken").val();
		var manageType = $("#manageType").val();
		if(!loan.operator.submitValidate("#manageType","请选择数据权限")){
			return;
		}
		var roleIds = $("[name='roleIds']");
		var roleArray = new Array();
		for(var i = 0; i < roleIds.length; i++) {
			if(roleIds[i].checked) {
				var obj = new Object();
				obj.roleId = $(roleIds[i]).val();
				roleArray.push(obj);
			}
		}
		var rolelist = JSON.stringify(roleArray);
		
		var notices = $("[name='noticeIds']");
		var noticeStr = "";
		for(var i = 0; i < notices.length; i++) {
			if(notices[i].checked) {
				if(noticeStr != "") {
					noticeStr = noticeStr + ",";
				}
				noticeId = $(notices[i]).val();
				noticeStr = noticeStr + noticeId;
			}
		}
		loan.ajaxDo({ 
			url:loan.basePath+"/operator/addOperator",
			params:{"menuId":menuId,'menuLog':'1',"orgId":orgId,"opName":opName,"opCode":opCode,"mobile":mobile,
				"email":email,"idNo":idNo,"roleIds":rolelist,"noticeStr":noticeStr,"manageType":manageType
				,"csrfToken":csrfToken},
			successCallback:loan.operator.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
 	},
	
 	/**修改操作员的ajax 调用*/
 	updateOpFn : function() {
		var orgId = $("#orgId").val();
		var opId = $("#opId").val();
		var opName = $("#opName").val();
		var opCode = $("#opCode").val();
		var mobile = $("#mobile").val();
		var email = $("#email").val();
		var idNo = $("#idNo").val();	
		var manageType = $("#manageType").val();
		if(!loan.operator.submitValidate("#manageType","请选择数据权限")){
			return;
		}
		var roleIds = $("[name='roleIds']");
		var roleArray = new Array();
		for(var i = 0; i < roleIds.length; i++) {
			if(roleIds[i].checked) {
				var obj = new Object();
				obj.roleId = $(roleIds[i]).val();
				roleArray.push(obj);
			}
		}
		var rolelist = JSON.stringify(roleArray);
		//消息定制
		var notices = $("[name='noticeIds']");
		var noticeStr = "";
		for(var i = 0; i < notices.length; i++) {
			if(notices[i].checked) {
				if(noticeStr != "") {
					noticeStr = noticeStr + ",";
				}
				noticeId = $(notices[i]).val();
				noticeStr = noticeStr + noticeId;
			}
		}
		loan.ajaxDo({ 
			url:loan.basePath+"/operator/updateOperator",
			params:{"menuId":"200204",'menuLog':'1',"opId":opId,"orgId":orgId,"opName":opName,"opCode":opCode,"mobile":mobile,
				"email":email,'idNo':idNo,"roleIds":rolelist,"noticeStr":noticeStr,"manageType":manageType},
			successCallback:loan.operator.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
 	},
 	/**
 	 * 新增操作员的树节点的设置
 	 */
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
				onCheck: clickOrgTreeShowRole
			}
	},
	
	/**
 	 * 查询机构操作员的树节点的设置
 	 */
	orgTreeShowOpSettings : {	
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
			onCheck: clickOrgTreeShowOp
		}
	},
	
	/**
	 * 工具orgId获取机构名称
	 */
	queryOrgNameById : function(orgId) {
		var orgTree = $.fn.zTree.getZTreeObj("orgTree");
		var org = orgTree.getNodeByParam("orgId", orgId, null);
		$("#jglist").attr("value", org.fullName);
	},
	
	/**
	 * 成功回调函数通过orgId获取机构名称 ajaxDo
	 */
	showOrgNameInEdit : function(result) {
		var org = result.orgInfolist;
		if(org[0] != null) {
			$("#jglist").attr("value", org[0].fullName);
		}
	},
	/**
	 * 通过orgId获取机构名称 ajaxDo
	 */
	queryOrgNameByIdAjax : function(orgId) {
		loan.ajaxDo({
	  		url:loan.basePath+"/org/queryOrgInfo",
	  		param:{"menuId":null,"orgId":orgId,"page":"1","rows":"1"},
	  		successCallback:loan.operator.showOrgNameInEdit,
	  		chainPar:this
	  	});
	},
	
	/**加载机构树JSON数据成功后调用的方法  设置树节点点击显示role方法*/
	loanOrgTreeJsonSuccRoleFun : function(result){
		var orgNodes = result.orgInfoList;
		$.fn.zTree.init($("#orgTree"), loan.operator.orgTreeSettings, orgNodes);
		var orgTree = $.fn.zTree.getZTreeObj("orgTree");
		loan.operator.invalidRegionNode(orgNodes,orgTree);
		orgTree.expandAll(true);
	},
	/**加载机构树JSON数据成功后调用的方法  设置树节点点击显示operator方法*/
	loanOrgTreeJsonSuccOpFun : function(result){
		var orgNodes = result.orgInfoList;
		$.fn.zTree.init($("#orgTree"), loan.operator.orgTreeShowOpSettings, orgNodes);
		var orgTree = $.fn.zTree.getZTreeObj("orgTree");
		orgTree.expandAll(true);
		//获取根节点
		loan.operator.invalidRegionNode(orgNodes,orgTree);
		var root = loan.operator.getRoot(orgTree);
		$("#jglist").attr("value", root.shortName);
		$("#orgId").attr("value",root.orgId);
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
	
	/**
	 * 获取树的根节点
	 */
	getRoot:function(tree) {
		return tree.getNodesByFilter(function (node) { return node.level == 0 }, true);
	},
	/**
	 * 加载机构树
	 */
	showOrgFunc : function(callBackFunc) {
		var menuId = $("#menuId").val();
		loan.ajaxDo({
	  		url:loan.basePath+"/org/queryOrgTree",
	  		params:{"menuId":menuId},
	  		successCallback:callBackFunc,
	  		chainPar:this
	  	});
	},
	
	/**
	 * 加载机构树(所有启用状态的)
	 */
	showEnableOrgFunc : function(callBackFunc) {
		var menuId = $("#menuId").val();
		loan.ajaxDo({
	  		url:loan.basePath+"/org/queryOrgTree",
	  		params:{'format':'json','orgStatus':'0','menuId':menuId},
	  		successCallback:callBackFunc,
	  		chainPar:this
	  	});
	},
	
	/**
	 * 加载角色成功后的执行方法
	 */
	loanRoleTreeJsonSuccFun : function(result) {
		var roleList = result.pager.items;
		var roleTree = $("#rolechk");
		var orgId = $("#orgId").val();
		roleTree.empty();
		if(!roleList) {
			return;
		}
		for(var i = 0; i < roleList.length; i++) {
			if(roleList[i].orgId != orgId) {
				continue;
			}
			var roleName = roleList[i].roleName;
			var roleId = roleList[i].roleId;
			roleTree.append("<li class='f-fl f-pt5'><input type='checkbox' class='f-mr5' name='roleIds' value='"
					+roleId+"'\>"+roleName+"<\li>");
		}
	},
	/**
	 * 加载角色 ajaxDo
	 */
	showRoleFunc : function(orgId) {
		var menuId = $("#menuId").val();
		loan.ajaxDo({
	  		url:loan.basePath+"/role/queryRolesForPage",
	  		params:{"menuId":menuId,"orgId":orgId,"page":"1","rows":"100000","status":"0"},
	  		successCallback:loan.operator.loanRoleTreeJsonSuccFun,
	  		chainPar:this
	  	})
	},
	/**
	 * 特定操作员的角色页面勾选
	 */
	setCheckTheRole : function(result) {
		var roleIds = $("[name='roleIds']");
		var roleList = result.body;
		for(var j = 0; j < roleList.length; j++) {
			var choosedId = roleList[j].roleId;
			for(var i = 0; i < roleIds.length; i++) {
				if(choosedId == $(roleIds[i]).val()) {
					$(roleIds[i]).attr("checked",true);
				}
			}
		}
		
	},
	/**
	 * 加载属于特定操作员的角色
	 */
	queryRoleByOpIdFunc : function(opId) {
		loan.ajaxDo({
	  		url:loan.basePath+"/operator/queryOpRole",
	  		params:{"menuId":"200104","opId":opId,"page":"1","rows":"100000"},
	  		successCallback:loan.operator.setCheckTheRole,
	  		chainPar:this
	  	})
	},
	/**
	 * 验证code是否可以使用
	 */
	checkOpCodeSuccFunc : function(result) {
		var backOp = result.operator;
		$('#opCode').siblings('div').remove();//清除提示
		if(backOp != null && backOp.opId != null) {//有数据返回
			var opId = $("#opId").val();//返回的opId值
			var backId = backOp.opId;
			var left = $('#opCode').width();
			//有返回值可插入的情形：修改时----被修改的操作员没有更改opCode
			if(opId != null && opId == backId) {
				loan.verify.formValidatorShowMsgTrue($("#opCode"),left);
			} else { //不可插入
				loan.verify.formValidatorShowMsg($("#opCode"),"帐号已经存在",left);
				return false;
			}
		} else {//无数据返回表明opCode尚不存在 可以插入
			loan.verify.formValidatorShowMsgTrue($("#opCode"),150);
		}
	},
	/**
	 * 验证opCode的ajax
	 */
	checkOpCode : function() {
		$('#opCode').siblings('div').remove();
		var opCode = $("#opCode").val().toLowerCase();
		var opId = $("#opId").val();
		if(opCode.length == 0) {
			loan.verify.formValidatorShowMsg($("#opCode"),"不能为空",150);
			return false;
		}else if(jQuery.trim(opCode)==''&&opCode.length>0) {
			loan.verify.formValidatorShowMsg($("#opCode"),"不能全为空格",150);
			return false;
		}else if(!v_Regular.userCode.test(opCode)) {
			loan.verify.formValidatorShowMsg($("#opCode"),"请输入英文或数字",150);
			return false;
		}else {
			loan.ajaxDo({
				url:loan.basePath+"/operator/queryOpById",
				params:{"menuId":'200204',"opCode":opCode},
				successCallback:loan.operator.checkOpCodeSuccFunc,
		  		chainPar:this
			});
		}
		
	},
	
	/** 选中operator行的触发事件*/
	selectOpRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	/**
	 * 加载operator列表
	 */
	freshPage:function () {
		jQuery("#userGridId").jqGrid({
			url:'queryOperators',
			mtype:'POST',
			datatype: "json",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			onSelectRow:loan.operator.selectOpRowFunc,
			/*postData:{format:'json'},*/
			colNames: ['用户帐号','用户名称','机构名称','手机','身份证号','邮件','状态','操作',
			           'status','pfOrgId','orgId','用户ID'],
			colModel: [   
			  
	           {name:'opCode',index:'opCode', align:'center',sortable: false},
	           {name:'opName',index:'opName', align:'center',sortable: false},
	           {name:'orgShortName',index:'orgFullName',align:'center',sortable: false},
	           {name:'mobile',index:'mobile',align:'center',sortable: false},
	           
	           {name:'idNo',index:'idNo',align:'center',sortable: false},
	           
	           {name:'email',index:'email', align:'center',sortable: false},
	           {name:'statusCn',index:'statusCn',align:'center',width:'50',sortable: false},	           
	           {name:'act',index:'act',align:'center',sortable: false},	           
			   {name:'status',index:'status',align:'center',hidden:true},
			   {name:'pfOrgId',index:'pfOrgId', align:'center',hidden:true},
	           {name:'orgId',index:'orgId',align:'center',hidden:true},
	           {name:'opId',index:'opId', align:'center',hidden:true}
	        ], 
	        jsonReader:{  //返回数据格式设置
	        	root: "response.pager.items",//数据项
	        	page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			sortname: 'opCode',   
		    sortorder: 'desc',
		    pager:jQuery('#userGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#userGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var rowData = jQuery("#userGridId").jqGrid('getRowData', rowIds[i]);	
	             	var addBtn = "<div class='operating'>";				
					addBtn += "<a class='operating-pencil icon-radius' title='修改' onclick=\"updUser('"+rowIds[i]+"')\"><i class='icon-pencil'></i></a>";
					addBtn += "<a class='operating-authority icon-radius' title='修改密码' onclick=\"modifyPwd('"+rowIds[i]+"')\"><i class='icon-authority'></i></a>";
					addBtn += "<a class='operating-back icon-radius' title='清密' onclick=\"javascript:loan.operator.toClearPwd('"+rowIds[i]+"')\"><i class='icon-back'></i></a></div>";
					//addBtn += "<a class='operating-role icon-radius' title='分配角色' onclick=\"choseRole('"+rowIds[i]+"')\"><i class='icon-role'></i></a></div>";		
					jQuery("#userGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
	},
	
	/**
	 * 清密执行判断 清密按钮
	 */
	toClearPwd:function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		if(loan.operator.checkOpStatus(rowid)) {
			var opCode =  $("#userGridId").jqGrid("getCell", rowid, "opCode");
			var title = "提示";
			var content = "确认要对【"+opCode+"】操作员执行清密操作吗？";
			loan.operator.confirmDialog(loan.operator.doClearPwd,title,content,rowid);
		}
	},
	
	/**
	 * 清密
	 */
	doClearPwd:function(){
		var rowid= $("#rowid").val();
		var pfOrgId = $("#userGridId").jqGrid("getCell", rowid, "pfOrgId");
		var opId = $("#userGridId").jqGrid("getCell", rowid, "opId");
        var opCode =  $("#userGridId").jqGrid("getCell", rowid, "opCode");
		loan.ajaxDo({
			url:loan.basePath+"/operator/clearOpPwd",
			params:{"menuId":"200207",'menuLog':'1',"pfOrgId" : pfOrgId, "opId" : opId,"opCode" : opCode},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this  
		});
	},
	
	/**
	 * 停用启用操作员
	 */
	enableOp:function(menuId,rowid) {
		var rowid = $("#rowid").val();
		var opId = $("#userGridId").jqGrid("getCell", rowid, "opId");
		var pfOrgId = $("#userGridId").jqGrid("getCell", rowid, "pfOrgId");
		var status = jQuery("#userGridId").jqGrid('getCell',rowid,'status');
		var changeSta = status;
		var urlpath = loan.basePath+"/operator/updateOpStatus";
		switch(status) {//0-正常 1-停用 2-注销
		case "0": changeSta = 1;break;
		case "1": changeSta = 0;break;
		} 
		loan.ajaxDo({
			url:urlpath,
			params:{"menuId":"200208",'menuLog':'1',"pfOrgId" : pfOrgId, "opId" : opId, "status":changeSta},
			successCallback:loan.operator.freshOperatorGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this  
		});	
	},
	/**
	 * 注销操作员
	 */
	deleteOp:function(menuId,rowid) {
		var rowid = $("#rowid").val();
		var opId = $("#userGridId").jqGrid("getCell", rowid, "opId");
		var pfOrgId = $("#userGridId").jqGrid("getCell", rowid, "pfOrgId");
		loan.ajaxDo({
			url:loan.basePath+"/operator/delOperator",
			params:{"menuId":"200205",'menuLog':'1',"pfOrgId" : pfOrgId, "opId" : opId},
			successCallback:loan.operator.deleteOpSuccFn,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this 
		});
	},
	
	/**
	 * 确认提示框
	 */
	confirmDialog:function(callBackFunc,dtitle,dcontent,rowid) {
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
	 * 验证op员状态
	 */
	checkOpStatus:function(rowid) {
		if(rowid == null || rowid == "") {
			loan.tooltip("请选中要执行的操作员","error");
			return false;
		}
		return true;
	}
};

/**单击机构树的方法 显示角色 显示消息定制*/
function clickOrgTreeShowRole(e, treeId, treeNode) {
	$("#jglist").attr("value", treeNode.shortName);
	$("#orgId").attr("value",treeNode.orgId);
	//显示角色
	loan.operator.showRoleFunc(treeNode.orgId);
	//显示消息定制
	loan.operator.initNT(treeNode.orgType);
	hideMenu();
	$('#jglist').siblings('div').remove();//清除提示
	loan.verify.formValidatorShowMsgTrue($("#jglist"),150);//提示正确信息
};

/**单击机构树的方法 in user.jsp*/
function clickOrgTreeShowOp(e, treeId, treeNode) {
	$("#jglist").attr("value", treeNode.shortName);
	$("#orgId").attr("value",treeNode.orgId);
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

function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
};


/**
 * 新增按钮 user界面 
 */
function addUserFn(menuId){
	$("#rowid").attr("value",null);
	loan.s_addPop("新增用户","toadduser?menuId=200203","",800,430,{isRefresh:true,isChangeClose:true});	
};
/**
 * 停启用按钮 user界面 
 */
function disUserFn(menuId){
	var rowid = $("#rowid").val();
	var adminStatus =  $("#userGridId").jqGrid("getCell", rowid, "adminStatus");
	if(adminStatus == "1"){
		loan.tooltip("默认管理员不能改动",'error');
		return;
	}
	if(loan.operator.checkOpStatus(rowid)) {
		var opCode =  $("#userGridId").jqGrid("getCell", rowid, "opCode");
		var title = "提示";
		var status = jQuery("#userGridId").jqGrid('getCell',rowid,'status');
		var content;
		switch(status) {//0-正常 1-停用 2-注销
		case "0": content = "确认要停用【"+opCode+"】操作员吗？";break;
		case "1": content = "确认要启用【"+opCode+"】操作员吗？";break;
		} 
		loan.operator.confirmDialog(loan.operator.enableOp,title,content,rowid);
	}
};

/**
 * 删除按钮 user界面 
 */
function delUserFn(menuId,rowid){
	var rowid = $("#rowid").val();
	var adminStatus =  $("#userGridId").jqGrid("getCell", rowid, "adminStatus");
	if(adminStatus == "1"){
		loan.tooltip("默认管理员不能改动",'error');
		return;
	}
	if(loan.operator.checkOpStatus(rowid)) {
		var opCode =  $("#userGridId").jqGrid("getCell", rowid, "opCode");
		var title = "提示";
		var content = "确认要删除【"+opCode+"】操作员吗？";
		loan.operator.confirmDialog(loan.operator.deleteOp,title,content,rowid);
	}
};
/**
 * 修改按钮 user界面 
 */
function updUser(menuId,rowid){
	$("#rowid").attr("value",rowid);
	/*var adminStatus =  $("#userGridId").jqGrid("getCell", rowid, "adminStatus");
	if(adminStatus == "1"){
		loan.tooltip("默认管理员不能改动",'error');
		return;
	}*/
	loan.s_addPop("修改用户",loan.basePath+"/operator/toEditUser?menuId="+menuId,"",800,430,{isRefresh:true});
};
/**
 * 修改密码按钮 user界面 
 */
function modifyPwd(menuId,rowid){
	$("#rowid").attr("value",rowid);
	loan.s_addPop("修改密码",loan.basePath+"/operator/toModifyPwd?menuId="+menuId,"",800,430,{isRefresh:true,isChangeClose:true});	
};
/**
 * 分配角色按钮 user界面 
 */
function choseRole(rowid){
	$("#rowid").attr("value",rowid);
	loan.s_addPop("分配角色","togiverole","",450,250,{isChangeClose:true});	
};
/**
 * 搜索按钮 user界面 
 */
function searchOpByOrg() {
	var orgId = $("#orgId").val();
	if(orgId != null) {
		loan.operator.queryOpByOrgId(orgId);
	}
};


