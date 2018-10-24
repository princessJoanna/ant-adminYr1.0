loan.attach = loan.attach|| {
	
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
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#attachGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'4004'},
			page:1
		   }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 检查选中项
	 */
	checkStatus:function(row) {
		var rowid = row==null?$("#rowid").val():row;
		if(rowid == null || rowid == "") {
			loan.tooltip("请选中要操作的行","error");
			return false;
		}
		var status = jQuery("#attachGridId").jqGrid('getCell',rowid,'status');
		if(status == 2) {
			loan.tooltip("该附件配置已经被注销","error");
			return false;
		}
		$("#rowid").val(rowid);
		return true;
	},
	
	searchTopMenu:function() {
		loan.ajaxDo({
			url:loan.basePath+"/menu/queryMenus",//,"modelType":"1"
			params:{"menuType":"1","menuId":"4004","menuStatus":"0"},
			successCallback:loan.attach.initModel,
			chainPar:this
		});
	},
	
	initModel:function(result) {
		var func = $("#functionId");
		var menuList = result.menulist;
		for(var i = 0; i < menuList.length; i++) {
			var menuId = menuList[i].menuId;
			var menuName = menuList[i].menuTip;
			func.append("<option value='"+menuId+"'\>"+menuName+"<\li>");
		}
	},
	
	/**
	 * 新增
	 */
	addAttach:function() {
		var annexName = $("#annexName").val();
		var mustStatus = $("input[name='mustStatus']:checked").val();
		var functionId = $("#functionId option:selected").val();
		var orderId = $("#orderId").val();
		loan.ajaxDo({
			url:loan.basePath+"/attach/addAttach",
			params:{"menuId":"400401",'menuLog':'1',"annexName":annexName,"mustStatus":mustStatus,"status":"0","orderId":orderId,"functionId":functionId},
			successCallback: loan.attach.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 删除
	 */
	delAttach:function() {
		var rowid = $("#rowid").val();
		var setId = $("#attachGridId").jqGrid('getCell',rowid,'setId');
		var orgId = $("#attachGridId").jqGrid('getCell',rowid,'orgId');
		loan.ajaxDo({
			url:loan.basePath+"/attach/delAttach",
			params:{"menuId":"400403",'menuLog':'1',"setId":setId,"orgId":orgId},
			successCallback:loan.attach.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 名称模糊搜索
	 */
	searchAttach:function() {
		var annexName = $("#param").val();
		$("#attachGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'4004','annexName':annexName},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 修改页面初始化
	 */
	initEditAttach:function() {
		var rowid = parent.$("#rowid").val();
		var setId = parent.$("#attachGridId").jqGrid('getCell',rowid,'setId');
		var orgId = parent.$("#attachGridId").jqGrid('getCell',rowid,'orgId');
		var annexName = parent.$("#attachGridId").jqGrid('getCell',rowid,'annexName');
		var mustStatus = parent.$("#attachGridId").jqGrid('getCell',rowid,'mustStatus');
		var orderId = parent.$("#attachGridId").jqGrid('getCell',rowid,'orderId');
		$("#setId").attr("value",setId);
		$("#orgId").attr("value",orgId);
		$("#annexName").attr("value",annexName);
		$("#orderId").attr("value",orderId);
		if(mustStatus == "0") {
			$("input[name='mustStatus']").eq(1).attr("checked",true);
		} else if(mustStatus == "1") {
			$("input[name='mustStatus']").eq(0).attr("checked",true);
		}
	
	},
	
	/**
	 * 初始化费率列表
	 */
	initGrid:function() {
		jQuery("#attachGridId").jqGrid({
			url:"queryAttach",
			mtype:'POST',
			datatype: "json",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			/*postData:{format:'json'},*/
			colNames: ['使用模块','机构名称','附件名称','是否必须','排序','状态','操作','orgId','setId','functionId','mustStatus','status'], 
			colModel: [
			   {name:'menuName',index:'menuName', align:'center',sortable: false},       
	           {name:'orgShortName',index:'orgShortName', align:'center',sortable: false},
	           {name:'annexName',index:'annexName',align:'center',width:90,sortable: false},
	           {name:'mustStatusCn',index:'mustStatusCn', align:'center',sortable: false},
	           {name:'orderId',index:'orderId',align:'center',width:60,sortable: false},
	           {name:'statusCn',index:'statusCn',align:'center',sortable: false},
	           {name:'act',index:'act',align:'center',sortable: false},
	           
	           {name:'orgId',index:'orgId',align:'center',hidden:true},
	           {name:'setId',index:'setId', align:'center',hidden:true},
	           {name:'functionId',index:'functionId', align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', align:'center',hidden:true},
	           {name:'status',index:'status',align:'center',hidden:true}
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
			sortname: 'orderId',   
		    sortorder: 'desc',
		    pager:jQuery('#attachGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			onSelectRow:loan.attach.selectRowFunc,
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#attachGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var rowData = jQuery("#attachGridId").jqGrid('getRowData', rowIds[i]);				               	
	            	var addBtn = "<div class='operating'>";
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"del('"+rowIds[i]+"')\"><i class='icon-trash'></i></a></div>";
	            	jQuery("#attachGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
		
	},
	
	/**
	 * 提交修改
	 */
	/*updateSubmit:function() {
		var setId = $("#setId").val();
		var orgId = $("#orgId").val();
		var annexName = $("#annexName").val();
		var mustStatus = $("input[name='mustStatus']:checked").val();
		var orderId = $("#orderId").val();
		loan.ajaxDo({
			url:loan.basePath+"/attach/updateAttach",
			params:{"menuId":"400401","setId":setId,"orgId":orgId,"annexName":annexName,"mustStatus":mustStatus,"orderId":orderId},
			successCallback: loan.attach.closeChildWindow,
			successTip:true, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},*/
	
	/**
	 * 停启用
	 */
	/*updateAttachStatus:function() {
		var rowid = $("#rowid").val();
		var setId = $("#attachGridId").jqGrid('getCell',rowid,'setId');
		var orgId = $("#attachGridId").jqGrid('getCell',rowid,'orgId');
		loan.ajaxDo({
			url:loan.basePath+"/attach/updateAttachStatus",
			params:{"setId":setId,"orgId":orgId},
			successCallback:loan.attach.freshGrid,
			successTip:true, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	}*/

};

function add(){
	loan.s_addPop("新增附件资料管理",loan.basePath+"/attach/toadddata?menuId=400401","",530,360,{isRefresh:true,isChangeClose:true});
}

function edit(rowid){
	if(loan.attach.checkStatus(rowid)){
		loan.s_addPop("修改附件资料管理",loan.basePath+"/attach/toeditdata","",530,360,{isRefresh:true,isChangeClose:true});
	}
}

function del(menuId,rowid){
	if(loan.attach.checkStatus(rowid)){
		var title = "提示";
		var annexName = $("#attachGridId").jqGrid('getCell',rowid,'annexName');
		var content = "确定要删除【"+annexName+"】附件配置吗？";
		loan.attach.confirmDialog(title,content,loan.attach.delAttach);
	}
}

function enable(menuId,rowid){
	if(loan.attach.checkStatus(rowid)){
		var title = "提示";
		var annexName = $("#attachGridId").jqGrid('getCell',rowid,'annexName');
		var status = $("#attachGridId").jqGrid('getCell',rowid,'status');
		var content;
		switch(status) {
		case "0":content = "确定要停用【"+annexName+"】附件配置吗？"; break;
		case "1":content = "确定要启用【"+annexName+"】附件配置吗？"; break;
		}
		loan.attach.confirmDialog(title,content,loan.attach.delAttach);
	}	
}