loan.addriskdegree = loan.addriskdegree || {
	menuId:'-1',//菜单号
	/**
	 * 新增提交
	 */
	submitAdd:function() {
		//等级项列表
		var datas = $("#detailGridId").jqGrid('getRowData');
		if(!datas || datas.length == 0) {
			loan.tooltip("请添加等级项","error");
			return;
		}
		var details = loan.addriskdegree.getDetailStr(datas);
		
		var degreeName = $("#degreeName").val();
		var remark = $("#remark").val();
		var params = {
				'menuId':loan.addriskdegree.menuId,
				'menuLog':'1',
				'degreeName':degreeName,
				'remark':remark,
				'detailListStr':details,
		}
		
		loan.ajaxDo({
			url:loan.basePath+"/riskDegree/addRiskDegree",
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
	 * 修改提交
	 */
	submitUpdate:function() {
		//等级项列表
		var datas = $("#detailGridId").jqGrid('getRowData');
		if(!datas || datas.length == 0) {
			loan.tooltip("请添加等级项","error");
			return;
		}
		var details = loan.addriskdegree.getDetailStr(datas);
		
		var degreeId = $("#degreeId").val();
		var degreeName = $("#degreeName").val();
		var remark = $("#remark").val();
		var params = {
				'menuId':loan.addriskdegree.menuId,
				'menuLog':'1',
				'degreeId':degreeId,
				'degreeName':degreeName,
				'remark':remark,
				'detailListStr':details,
		}
		
		loan.ajaxDo({
			url:loan.basePath+"/riskDegree/updateRiskDegree",
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
	 * 获取等级项json串
	 */
	getDetailStr:function(datas){
		var detaillist = new Array();
		for(var i = 0; i < datas.length; i++) {
			var suggestRatio = new Number(datas[i].suggestRatio);
			suggestRatio = (suggestRatio/1000).toFixed(6);
			var target = new Object();
			target.degreeDetailName = datas[i].degreeDetailName;
			target.maxScore = datas[i].maxScore;
			target.minScore = datas[i].minScore;
			target.suggestBalance = datas[i].suggestBalance;
			target.suggestRatio = suggestRatio;
			target.triggerStatus = datas[i].triggerStatus;
			target.remark = datas[i].remark;
			detaillist.push(target);
		}
		return JSON.stringify(detaillist);
	},
    
	
	/**
	 * 查询等级详情
	 */
	queryDegreeInfo:function(degreeId){
		loan.ajaxDo({
            url:loan.basePath+"/riskDegree/queryRiskDegree",
            params:{ 'menuId':loan.addriskdegree.menuId,'format':'json','degreeId':degreeId},
            successCallback:function(result){
        		var degree = result.degree;
        		var details = result.details;
        		//设置页面信息
        		if(degree) {
        			$("#degreeName").val(degree.degreeName);
        			$("#remark").val(degree.remark);
        		}
        		//设置等级项
        		if(details && details.length > 0) {
        			jQuery("#detailGridId").jqGrid("clearGridData");
        			for(var i = 0; i < details.length; i++) {
        				details[i].suggestRatio = details[i].suggestRatio*1000;
            			jQuery("#detailGridId").jqGrid('addRowData',i+1,details[i]);
            		}
        		}
        		
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 初始化等级项 
	 */
	initDetailGrid:function() {
		jQuery("#detailGridId").jqGrid({
			datatype: "local",
			colNames: ['风险等级项名称','分值下限(含)','分值上限','建议授信额度(元)','建议利率(‰)','操作',
			           '是否触发码','是否触发','备注'], 
			colModel: [
	           {name:'degreeDetailName',index:'degreeDetailName',sortable: false, align:'center'},
	           {name:'minScore',index:'minScore',sortable: false, align:'center',width:'110px'},
	           {name:'maxScore',index:'maxScore',sortable: false, align:'center',width:'100px'},
	           {name:'suggestBalance',index:'suggestBalance',sortable: false, align:'center'},
			   {name:'suggestRatio',index:'suggestRatio',sortable: false, align:'center', formatter:loan.addriskdegree.suggestRatioFmatter},
			   {name:'act',index:'act', sortable: false,align:'center'},
			   
			   {name:'triggerStatus',index:'triggerStatus', sortable: false,align:'center',hidden:true},
			   {name:'triggerStatusCn',index:'triggerStatusCn', sortable: false,align:'center',hidden:true},
	           {name:'remark',index:'remark', align:'center',sortable: false,hidden:true},
	        ],
	        jsonReader:{ 
				root: "response.details",//数据项
				//records: "response.totalResult",//总记录数
				repeatitems : false
			},
	        rowNum : -1,
	        pager:jQuery('#detailPanelId'),
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
				var rowIds = jQuery("#detailGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
	            	var addBtn = "<div class='operating'>";
	            	addBtn += "<a class='operating-comment icon-radius' title='查看' onclick=\"loan.addriskdegree.lookDetail('"+rowIds[i]+"')\"><i class='icon-comment'></i></a>";	
	            	addBtn += "<a class='operating-pencil icon-radius' title='修改' onclick=\"loan.addriskdegree.editDetail('"+rowIds[i]+"')\"><i class='icon-pencil'></i></a>";	
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"loan.addriskdegree.delDetail('"+rowIds[i]+"')\"><i class='icon-trash'></i></a></div>";
					jQuery("#detailGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
	  	jQuery("#detailGridId").setGridWidth(650);
	},
	
	suggestRatioFmatter: function(cellvalue, options, rowObject) {
		return parseFloat(cellvalue + "").toFixed(3);
	},
	
	/**
	 * 查看等级项详情
	 */
	lookDetail:function(rowid){
		$("#rowid").val(rowid);
		loan.s_addPop("查看详情",loan.basePath+"/riskDegree/toDegreeDetailInfo?menuId="+loan.addriskdegree.menuId,"",500,400,{isRefresh:false,isChangeClose:true});	
	},
	
	/**
	 * 删除等级项
	 */
	delDetail:function(rowid){
		$("#detailGridId").jqGrid('delRowData',rowid);
	},
	
	/**
	 * 添加风险等级项
	 */
	addDetail:function(){
		loan.s_addPop("添加风险等级项",loan.basePath+"/riskDegree/toAddDegreeDetail?opType=add&menuId="+loan.addriskdegree.menuId,"",530,430,{isRefresh:false,isChangeClose:true});	
	},
	
	/**
	 * 添加风险等级项
	 */
	editDetail:function(rowid){
		$("#rowid").val(rowid);
		loan.s_addPop("修改风险等级项",loan.basePath+"/riskDegree/toAddDegreeDetail?opType=up&menuId="+loan.addriskdegree.menuId,"",530,430,{isRefresh:false,isChangeClose:true});	
	},
};

$(function(){
	var menuId = $("#menuId").val();
	if(menuId) {
		loan.addriskdegree.menuId = menuId;
	}
	loan.addriskdegree.initDetailGrid();
	var degreeId = $("#degreeId").val();
	if(degreeId) {
		loan.addriskdegree.queryDegreeInfo(degreeId);
	}
	loan.verify.verifyCheck("iform","submit_button");
});

