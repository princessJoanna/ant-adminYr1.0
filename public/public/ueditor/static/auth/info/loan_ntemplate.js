loan.ntemplate = loan.ntemplate || {
	
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var noticeKind = $("#noticeKind").val();
		if(noticeKind && noticeKind == "-1") {
			noticeKind = "";
		}
		$("#noticeGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1004','format':'json',
				'noticeKind':noticeKind},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 修改按钮
	 */
	editBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		var noticeTypeId = $("#noticeGridId").jqGrid("getCell", rowid, "noticeTypeId");
		parent.loan.tabcut.childAddIframe("修改消息模板",loan.basePath+"/notice/toEditTemplate?menuId=100402&&noticeTypeId="+noticeTypeId,"editmsg",true,true);
	},
	
	queryNTById:function(noticeTypeId) {
		loan.ajaxDo({
			url:loan.basePath+"/notice/queryNTPaged",
			params:{'menuId':'100402','format':'json','noticeTypeId':noticeTypeId,'page':'1','rows':'1'},
			successCallback:loan.ntemplate.initEditPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化修改页面
	 */
	initEditPage:function(result) {
		var nt = result.pager.items;
		if(nt && nt.length > 0) {
			$("#noticeTypeId").val(nt[0].noticeTypeId);
			$("#typeName").val(nt[0].typeName);
			$("#noticeKindCn").val(nt[0].noticeKindCn);
			$("#receiveSideCn").val(nt[0].receiveSideCn);
			$("#remark").val(nt[0].remark);
			//var content = htmlreplae(nt[0].contentTemplate);
			var content = nt[0].contentTemplate;
			$("#contentTemplate").text(content);
			
			$("#noticeTypeId").html(nt[0].noticeTypeId);
			$("#typeName").html(nt[0].typeName);
			$("#noticeKindCn").html(nt[0].noticeKindCn);
			$("#receiveSideCn").html(nt[0].receiveSideCn);
		}
	},
	
	/**
	 * 修改提交按钮
	 */
	submitEdit:function() {
		var noticeTypeId = $("#noticeTypeId").val();
		var remark = $("#remark").val();
		var content = $("#contentTemplate").val();
		//editor.sync();
		loan.ajaxDo({
			url:loan.basePath+"/notice/updateNT",
			params:{'menuId':'100402','menuLog':'1','format':'json','noticeTypeId':noticeTypeId,
				'remark':remark,'contentTemplate':content},
			successCallback:loan.ntemplate.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	}
	
}

function htmlreplae(str){
	
	str = str.replace(/&amp;/g, '&');
	str = str.replace(/&nbsp;/g, ' ');
	str = str.replace(/&gt;/g, '>');
	str = str.replace(/&lt;/g, '<');
	alert(str);
    return str;
 }