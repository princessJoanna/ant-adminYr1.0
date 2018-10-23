loan.caseinfo = loan.caseinfo || {
	menuId:'12010302',//菜单号

	/**
	 * 查询案件相关信息
	 * @param caseId
	 * @param menuId
	 */
	queryInfo:function (caseId,menuId){
		loan.ajaxDo({
			url:loan.basePath+"/case/queryInfo",
			params:{'format':'json','menuLog':'1','caseId':caseId,'menuId':menuId},
			successCallback:loan.caseinfo.initInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化案件信息
	 * @param result
	 */
	initInfo:function(result) {
		var info = result.caseInfoDto;
		for ( var property in info) {
			if(property=="caseId"){
				$("#"+property).attr("value",info[property]);
			}else{
				$("#"+property).text(info[property]);
			}
		}
	},
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	/**
	 * 查询催收记录
	 */
	queryOrderList:function(caseId,menuId){
		jQuery("#collectingOrderGridId").jqGrid({
			url: loan.basePath+ "/case/queryCollectingOrder",
			mtype:'POST',
			datatype: "json",
			postData:{'format':'json','menuId':menuId,"caseId":caseId,},
			colNames: ['工单id','工单号','工单生成时间','催收对象关系','催收对象','联系方式','催收方式','催收方式','操作'], 
			colModel: [
			   {name:'orderId',index:'orderId', sortable: false,align:'center',hidden: true},
			   {name:'orderNo',index:'orderNo',sortable: false, align:'center'},
			   {name:'createTimeStr',index:'createTimeStr',sortable: false, align:'center'},
			   {name:'relationTypeCn',index:'relationType',sortable: false, align:'center'},
			   {name:'relationName',index:'relationName',sortable: false, align:'center'},
			   {name:'relationPhone',index:'relationPhone',sortable: false, align:'center'},
			   {name:'orderType',index:'orderType',sortable: false, align:'center',hidden: true},
			   {name:'orderTypeCn',index:'orderTypeCn',sortable: false, align:'center'},
			   {name:'act',index:'act',sortable: false, align:'center'},
	        ],
	        jsonReader:{ 
				root: "response.orderDtos",//数据项
				repeatitems : false
			},
			pager:jQuery('#panelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			toolbarfilter : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#collectingOrderGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
	            	var addBtn = "<div class='operating'>";
	            	addBtn += "<a class='operating-comment icon-radius' title='详情' onclick=\"loan.caseinfo.orderInfo('"+rowIds[i]+"')\"><i class='icon-comment'></i></a>";	
					jQuery("#collectingOrderGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
		jQuery("#collectingOrderGridId").setGridWidth(1120);
		
	},
	
	/**
	 * 查看催收工单详情
	 */
	orderInfo:function(rowid){
		var id = $("#collectingOrderGridId").jqGrid('getCell',rowid,'orderId');
		var orderType = $("#collectingOrderGridId").jqGrid('getCell',rowid,'orderType');
		var flag='true';
		switch(orderType){
			case '0':
				parent.loan.tabcut.childAddIframe("查看工单详情",loan.basePath+
						"/collecting/toOutDetail?orderId="+id+"&flag="+flag+"&menuId="+loan.caseinfo.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
			case '1':
				parent.loan.tabcut.childAddIframe("查看工单详情",loan.basePath+
						"/collecting/toNoticeDetail?orderId="+id+"&flag="+flag+"&menuId="+loan.caseinfo.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
			case '2':
				parent.loan.tabcut.childAddIframe("查看工单详情",loan.basePath+
						"/collecting/toCallDetail?orderId="+id+"&flag="+flag+"&menuId="+loan.caseinfo.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
			case '3':
				parent.loan.tabcut.childAddIframe("查看工单详情",loan.basePath+
						"/collecting/toVisitDetail?orderId="+id+"&flag="+flag+"&menuId="+loan.caseinfo.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
			case '4':
				parent.loan.tabcut.childAddIframe("查看工单详情",loan.basePath+
						"/collecting/toLetterDetail?orderId="+id+"&flag="+flag+"&menuId="+loan.caseinfo.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
			case '5':
				parent.loan.tabcut.childAddIframe("查看工单详情",loan.basePath+
						"/assistOrder/toAssistDetail?orderId="+id+"&flag="+flag+"&menuId="+loan.caseinfo.menuId,"",680,450,{isRefresh:false,isChangeClose:true});	
				break;
		}
	},
	
	
	/**
	 * 查询
	 */
	searchFunc:function(meunId){	
		var meunId = $("#meunId").val();
		var orderNo = $("#orderNo").val();
		
		var orderType="";
		if($("#orderType").val()!="-1"){
			orderType = $("#orderType").val();
		}
		
		$("#collectingOrderGridId").jqGrid("setGridParam", {   
			postData:{'menuId':meunId,'orderNo':orderNo,'orderType':orderType,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},


};

/**
 * tab页切换功能
 */
function initTabChange() {
	//tab页切换
	loan.tabLiclick("m-tab-detail");
	
	
}