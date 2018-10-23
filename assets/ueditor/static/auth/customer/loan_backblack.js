loan.backblack = loan.backblack || {
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
	},
	
	submitBack:function() {
		var rowid = parent.$("#rowid").val();
		var blacklistId = parent.$("#blacklistGridId").jqGrid("getCell", rowid, "blacklistId");
		var userId = parent.$("#blacklistGridId").jqGrid("getCell", rowid, "userId");
		var content = $("#content").val();
		loan.ajaxDo({
			url:loan.basePath+"/blacklist/cancelBlacklist",
			params:{'menuId':'800204','menuLog':'1','format':'json','blacklistId':blacklistId,'confirmContent':content,
				'userId':userId},
			successCallback:loan.backblack.closeChildWindow,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
}

$(function(){
	parent.$('#sPopClose').bind("click",function(){
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(false,false);
	});
	jQuery("#userGridId").jqGrid({
		datatype: "local",
		height: 'auto',
		autowidth: true,	
		forceFit:true,
		colNames: ['客户名称','证件类型','证件号','加入黑名单日期','详情'], 
		colModel: [
           {name:'userName',index:'userName', align:'center',sortable: false},
           {name:'idKindCn',index:'idKindCn', align:'center',sortable: false},
           {name:'idNo',index:'idNo', align:'center',sortable: false},
		   {name:'addDate',index:'addDate', align:'center',sortable: false},
           {name:'act',index:'act',align:'center',sortable: false}
        ], 
		rowNum : 10,
		rowList : [10, 20, 30],
		toolbarfilter : true,
		viewrecords : true,
		autowidth : true,
		rownumbers: true,
		pagerpos:'center',	
		pgbuttons:true,
		pginput: true,	
		cellsubmit: 'clientArray',  //不进行ajax提交
		loadComplete:function(){},
		gridComplete : function() {
			var rowIds = jQuery("#userGridId").jqGrid('getDataIDs');
			for (var i = 0; i < rowIds.length; i++) {
            	var addBtn ="<a style='color:#0082c8' href='javascript:;' title='查看客户详情' onclick=\"look('"+rowIds[i]+"')\">查看客户详情</a>";
				jQuery("#userGridId").jqGrid('setRowData',rowIds[i], {
					act : addBtn
				}); 
			}
		}
	})
	var rowid = parent.$("#rowid").val();
	var target = parent.$("#blacklistGridId").jqGrid('getRowData',rowid);
	var rowdata = new Object();
	rowdata.userName = target.userName;
	rowdata.idKindCn = target.idKindCn;
	rowdata.idNo = target.idNo;
	rowdata.addDate = target.addDate;
	jQuery("#userGridId").jqGrid('addRowData',1,rowdata);
});
function look(){
	var rowid = parent.$("#rowid").val();
	var userId = parent.$("#blacklistGridId").jqGrid('getCell',rowid,'userId');
	parent.loan.tabcut.childAddIframe("黑名单客户详情",loan.basePath+"/customer/toCusDetail?userId="+userId+"&&menuId=800204","blackcusdetail",true,true);	
}