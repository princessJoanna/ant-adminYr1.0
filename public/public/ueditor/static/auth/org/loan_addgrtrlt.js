loan.addgrtrlt = loan.addgrtrlt || {
	menuId:'701001',//菜单号
	url:loan.basePath+"/guarantee/addWarrantRelation",//提交的url
	
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function(contractId) {
		$("#warrantGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':loan.addgrtrlt.menuId,'contractId':contractId},
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 查询用户详情
	 */
	userDetail : function(userId) {
		var _userId = $("#userId").val();
		//判断是否已选择合同
		if(_userId) {
			userId = _userId;
			parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId="+loan.addgrtrlt.menuId+"&userId="+userId,"customerDetail",true);
		} else {
			loan.tooltip("请选择合同","error");
		}
	},

	
	submitAdd:function() {
		var userId = $("#userId").val();
		var contractId = $("#contractId").val();
		if(!contractId) {
			loan.tooltip("请选择合同","error");
			return;
		}
		var contractNo = $("#contractNo").val();
		//担保物列表
		var datas = $("#warrantGridId").jqGrid('getRowData');
		if(!datas || datas.length == 0) {
			loan.tooltip("请添加担保物","error");
			return;
		}
		var warrantlist = new Array();
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var warrantId = rowObj.warrantId;
			warrantlist.push(warrantId);
		}
		var warrantIds = JSON.stringify(warrantlist);
		var params = {
				'menuId':loan.addgrtrlt.menuId,
				'menuLog':'1',
				'userId':userId,
				'contractId':contractId,
				'contractNo':contractNo,
				'warrantIds':warrantIds,
		}
		loan.ajaxDo({
			url:loan.basePath+"/guarantee/addWarrantRelation",
			params:params,
			successCallback:function(){
				//关闭子框架
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	submitEdit:function() {
		var userId = $("#userId").val();
		var contractId = $("#contractId").val();
		if(!contractId) {
			loan.tooltip("请选择合同","error");
			return;
		}
		var contractNo = $("#contractNo").val();
		//担保物列表
		var datas = $("#warrantGridId").jqGrid('getRowData');
		if(!datas || datas.length == 0) {
			loan.tooltip("请添加担保物","error");
			return;
		}
		var warrantlist = new Array();
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var warrantId = rowObj.warrantId;
			warrantlist.push(warrantId);
		}
		var warrantIds = JSON.stringify(warrantlist);
		var warrantRelId = $("#warrantRelId").val();
		var params = {
				'menuId':loan.addgrtrlt.menuId,
				'menuLog':'1',
				'userId':userId,
				'warrantRelId':warrantRelId,
				'contractId':contractId,
				'contractNo':contractNo,
				'warrantIds':warrantIds,
		}
		loan.ajaxDo({
			url:loan.basePath+"/guarantee/updateWarrantRel",
			params:params,
			successCallback:function(){
				//关闭子框架
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
    
	
	/**
	 * 查询关系详情
	 */
	queryWarrantRelInfo:function(warrantRelId){
		loan.ajaxDo({
            url:loan.basePath+"/guarantee/queryWarrantRel",
            params:{ 'menuId':loan.addgrtrlt.menuId,'format':'json','warrantRelId':warrantRelId},
            successCallback:function(result){
        		var domain = result.domain;
        		var amount = result.contractAmount;
        		
        		if(domain) {
        			$("#userName").html(domain.userName);
        			$("#idNo").html(domain.idNo);
        			$("#idKind").html(domain.idKindCn);
        			$("#userId").attr("value",domain.userId);
        			$("#contractId").attr("value",domain.contractId);
        			$("#contractNo").attr("value",domain.contractNo);
        		}
        		$("#contractAmount").html(amount);
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 初始化担保物 
	 */
	initWarrantGrid:function(warrantRelId) {
		jQuery("#warrantGridId").jqGrid({
			url: loan.basePath+ "/guarantee/queryWarrantList",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json','menuId':loan.addgrtrlt.menuId,'warrantRelId':warrantRelId},//这个后面加上
			colNames: ['担保物(人)名称','担保关系','担保证件类型','担保证件编号','担保额度(元)','操作',
			           '担保关系码','担保证件类型码','关系id'], 
			colModel: [
	           {name:'warrantName',index:'warrantName',sortable: false, align:'center'},
	           {name:'warrantTypeCn',index:'warrantTypeCn',sortable: false, align:'center'},
	           {name:'warrantIdKindCn',index:'warrantIdKindCn',sortable: false, align:'center'},
	           {name:'warrantIdNo',index:'warrantIdNo',sortable: false, align:'center'},
			   {name:'amount',index:'amount',sortable: false, align:'center'},
			   {name:'act',index:'act', sortable: false,align:'center'},
			   
			   {name:'warrantType',index:'warrantType', sortable: false,align:'center',hidden:true},
	           {name:'warrantIdKind',index:'warrantIdKind',sortable: false, align:'center',hidden:true},
	           {name:'warrantId',index:'warrantId',sortable: false, align:'center',hidden:true},
	        ],
	        jsonReader:{ 
				root: "response.warrantlist",//数据项
				//records: "response.totalResult",//总记录数
				repeatitems : false
			},
	        rowNum : -1,
	        pager:jQuery('#warrantPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			height: 'auto',
			autowidth: true,	
			forceFit:true,//调整列宽不会改变表格宽度
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#warrantGridId").jqGrid('getDataIDs');
				var warrantAmount = 0;
				for (var i = 0; i < rowIds.length; i++) {
					var amount = jQuery("#warrantGridId").jqGrid('getCell',rowIds[i],'amount');
					amount = new Number(amount);
					warrantAmount = warrantAmount+amount;
	            	var addBtn = "<div class='operating'>";
	            	addBtn += "<a class='operating-comment icon-radius' title='查看' onclick=\"loan.addgrtrlt.lookWarrant('"+rowIds[i]+"')\"><i class='icon-comment'></i></a>";	
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"loan.addgrtrlt.delWarrant('"+rowIds[i]+"')\"><i class='icon-trash'></i></a></div>";
					jQuery("#warrantGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
				$("#warrantAmount").html(warrantAmount);
			}
		});
	  	jQuery("#warrantGridId").setGridWidth($(window).width()-160);
	},
	
	/**
	 * 查看担保物详情
	 */
	lookWarrant:function(rowid){
		var id = $("#warrantGridId").jqGrid('getCell',rowid,'warrantId');
		var warrantType = $("#warrantGridId").jqGrid('getCell',rowid,'warrantType');
		switch(warrantType){
			case '0':
				loan.s_addPop("查看详情",loan.basePath+"/guarantee/toPledageInfo?warrantId="+id+"&menuId="+loan.addgrtrlt.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
			case '1':
				loan.s_addPop("查看详情",loan.basePath+"/guarantee/toMortgageInfo?warrantId="+id+"&menuId="+loan.addgrtrlt.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
			case '2':
				loan.s_addPop("查看详情",loan.basePath+"/guarantee/toGuaranteeInfo?warrantId="+id+"&menuId="+loan.addgrtrlt.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
		}
	},
	
	/**
	 * 删除担保物
	 */
	delWarrant:function(rowid){
		$("#warrantGridId").jqGrid('delRowData',rowid);
	},
	
	/**
	 * 添加担保物
	 */
	addWarrant:function(){
		var userId = $("#userId").val();
		if(!userId){
			loan.tooltip("请选择合同","error");
			return;
		}
		loan.s_addPop("添加担保物",loan.basePath+"/guarantee/toSelectWarrant?userId="+userId+"&menuId="+loan.addgrtrlt.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
	},
	
	/**
	 * 初始化页面性质修改，新增
	 */
	initPageType:function() {
		//根据操作类型设置页面参数
		var menuId = $("#menuId").val();
		if(menuId) {
			loan.addgrtrlt.menuId = menuId;
		}
		loan.verify.verifyCheck("iform","submit_button");
	},

	initUpdateData:function(){
		var id = $("#warrantRelId").val();
		if(id && id != 0) {
			loan.addgrtrlt.queryWarrantRelInfo(id);
			$("#contractNo").unbind("click");
		}
	},
};

$(function(){
	//选择合同
	var menuId = $("#menuId").val();
	$(".openw").click(function(){
		loan.s_addPop("选择合同",loan.basePath+"/common/toSelectContract?submitFunc=submit2WarrantRel&opType=warrantrel&menuId="+menuId,"",800,380,{isChangeClose:true});
	});
	var warrantRelId = $("#warrantRelId").val();
	loan.addgrtrlt.initWarrantGrid(warrantRelId);
	$("#contractId").bind("change",function(){
		jQuery("#warrantGridId").jqGrid("clearGridData");
	}); 
});

