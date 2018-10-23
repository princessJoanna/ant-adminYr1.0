/**
 * 
 */
loan.startcollection=loan.startcollection || {
	
	
	
	
	
};
$(function(){
	/*//短信催收页面
	initNoticePage();*/
	//tab页切换功能
	initTabChange();
	/*//电催页面
	initCallPage();*/
})
/*//**查询短信催收列表*//*
function initNoticePage(){
	jQuery("#noticeOrderGridId").jqGrid({
		url: loan.basePath+ "/collecting/queryNoticeOrderPage",
		mtype:'POST',
		datatype: "json",
		colNames: ['工单号','短信发送时间','联系人电话','联系人关系','联系人姓名','短信模板'], 
		colModel: [
           {name:'orderId',index:'orderId', align:'center'},
           {name:'acceptTime',index:'acceptTime', align:'center'},
           {name:'relationPhone',index:'relationPhone', align:'center'},
           {name:'relationType',index:'relationType', align:'center'},
           {name:'relationName',index:'relationName', align:'center'},
           {name:'noticeTypeId',index:'noticeTypeId', align:'center'}
        ], 
		rowNum : 10,
		rowList : [10, 20, 30],
		toolbarfilter : true,
		viewrecords : true,
		autowidth : true,
		rownumbers: true,
		sortname: '',   
		multiselect : true,
	    sortorder: 'desc',
	    pager:jQuery('#noticeOrderGridId'),
		pagerpos:'center',	
		pgbuttons:true,
		pginput: true,	
		loadComplete:function(){},
		gridComplete : function() {
			var rowIds = jQuery("#noticeOrderGridId").jqGrid('getDataIDs');
			for (var i = 0; i < rowIds.length; i++) {
            	var addBtn = "<div class='operating'>";		
				addBtn += "<a class='operating-comment icon-radius' title='查看详情' onclick=\"lookNotice('"+rowIds[i]+"')\"><i class='icon-comment'></i></a></div>";
				jQuery("#noticeOrderGridId").jqGrid('setRowData',rowIds[i], {
					act : addBtn
				}); 
			}
		}
	});*/
	/*function lookNotice(rowid){	
		var orderId=$("#noticeOrderGridId").jqGrid('getCell',rowid,'orderId');
		var opId=$("#opId").val();
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/collecting/noticeDetail?orderId="+orderId
				+"&opId=" + opId + "&menuId=" + menuId,"noticeDetail",true);
	};	
	jQuery("#noticeOrderGridId").setGridWidth($(window).width()-60);
}
$(window).resize(function(){
	jQuery("#noticeOrderGridId").setGridWidth($(window).width()-60);
})*/
//**查询电催列表*//*
/*function initCallPage(){
	jQuery("#callOrderGridId").jqGrid({
		url: loan.basePath+ "/collecting/queryCallOrderPage",
		mtype:'POST',
		datatype: "json",
		colNames: ['工单号','联系时间','联系人电话','联系人关系','联系人姓名','拨打结果','拨打结果','谈判结果','谈判结果'], 
		colModel: [
           {name:'orderId',index:'orderId', align:'center'},
           {name:'acceptTime',index:'acceptTime', align:'center'},
           {name:'relationPhone',index:'relationPhone', align:'center'},
           {name:'relationType',index:'relationType', align:'center'},
           {name:'relationName',index:'relationName', align:'center'},
           {name:'callResult',index:'callResult', align:'center',hidden:'true'},
           {name:'callResultCn',index:'callResultCn', align:'center'},
           {name:'negoResult',index:'negoResult', align:'center',hidden:'true'},
           {name:'negoResultCn',index:'negoResultCn', align:'center'}
        ], 
		rowNum : 10,
		rowList : [10, 20, 30],
		toolbarfilter : true,
		viewrecords : true,
		autowidth : true,
		rownumbers: true,
		sortname: '',   
		multiselect : true,
	    sortorder: 'desc',
	    pager:jQuery('#callOrderGridId'),
		pagerpos:'center',	
		pgbuttons:true,
		pginput: true,	
		loadComplete:function(){},
		gridComplete : function() {
			var rowIds = jQuery("#callOrderGridId").jqGrid('getDataIDs');
			for (var i = 0; i < rowIds.length; i++) {
            	var addBtn = "<div class='operating'>";		
				addBtn += "<a class='operating-comment icon-radius' title='查看详情' onclick=\"lookCall('"+rowIds[i]+"')\"><i class='icon-comment'></i></a></div>";
				jQuery("#callOrderGridId").jqGrid('setRowData',rowIds[i], {
					act : addBtn
				}); 
			}
		}
	});
	function lookCall(rowid){	
		var orderId=$("#callOrderGridId").jqGrid('getCell',rowid,'orderId');
		var opId=$("#opId").val();
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/collecting/callDetail?orderId="+orderId
				+"&opId=" + opId + "&menuId=" + menuId,"callDetail",true);
	};	
	jQuery("#callOrderGridId").setGridWidth($(window).width()-60);
}*/
/*$(window).resize(function(){
	jQuery("#noticeOrderGridId").setGridWidth($(window).width()-60);
	jQuery("#callOrderGridId").setGridWidth($(window).width()-60);
})*/
/*
 * tab切换
 */
function initTabChange() {
	//tab页切换
	loan.tabLiclick("m-tab-detail");
}
	

