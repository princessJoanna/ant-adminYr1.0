loan.announce = loan.announce || {
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#announceGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'3001','format':'json'}
	    }).trigger('reloadGrid'); 
	},
	
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
	 * 清空查询条件
	 */
	clearCondition : function() {
		$("#startDate").val("");
		$("#endDate").val("");
		$("#receiveType").val("-1");
		$("#status").val("-1");
	},
	
	/**
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var receiveType = $("#receiveType").val();
		var status = $("#status").val()
		var startDate = $("#startDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		if(startDate && endDate && (startDate > endDate)) {
			loan.tooltip("开始日期应该小于或等于结束日期","error");
			return;
		}
		if(receiveType && receiveType == "-1") {
			receiveType = "";
		}
		if(status && status == "-1") {
			status = "";
		}
		$("#announceGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'3001','format':'json','status':status,
				'receiveType':receiveType,'endDate':endDate,'startDate':startDate},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 新增按钮
	 */
	addBtnFunc:function(menuId,rowid){
		parent.loan.tabcut.childAddIframe("新增公告",loan.basePath+"/announce/toaddannounce?menuId=300101","addannounce",true,true);
	},
	
	/**
	 * 新增提交按钮
	 */
	submitAdd:function() {
		var startDate = $("#startDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		if(startDate && endDate && (startDate > endDate)) {
			loan.tooltip("开始日期应该小于或等于结束日期","error");
			return;
		}
		var title = $("#title").val();
		var content = $("#content").val();
		var receiveType = $("#receiveType").val()
		var topStatus = $("input[name='topStatus']:checked").val();
		var picFileName = "";
		if(judgeEmp(content)) {
			loan.tooltip("请输入公告内容","error");
			return;
		}
		if(!topStatus) {
			loan.tooltip("请选择是否置顶","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/announce/addAnnounce",
			params:{'menuId':'300101','menuLog':'1','format':'json','title':title,
				'content':content,'receiveType':receiveType,'startDate':startDate,'endDate':endDate,
				'topStatus':topStatus,'pictureFileName':picFileName},
			successCallback:loan.announce.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 修改按钮
	 */
	editBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		var announce = $("#announceGridId").jqGrid('getRowData',rowid);
		if(announce.status && announce.status != 0) {
			loan.tooltip("该公告不是未发布状态，不可修改","error");
			return;
		}
		var announceId = announce.announceId;
		parent.loan.tabcut.childAddIframe("修改公告",loan.basePath+"/announce/toeditannounce?menuId=300102&&announceId="+announceId,"editannounce",true,true);
	},
	
	/**
	 * 修改提交按钮
	 */
	submitEdit:function() {
		var startDate = $("#startDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		if(startDate && endDate && (startDate > endDate)) {
			loan.tooltip("开始日期应该小于或等于结束日期","error");
			return;
		}
		var announceId = $("#announceId").val();
		var title = $("#title").val();
		var content = $("#content").val();
		var receiveType = $("#receiveType").val()
		var topStatus = $("input[name='topStatus']:checked").val();
		if(judgeEmp(content)) {
			loan.tooltip("请输入公告内容","error");
			return;
		}
		if(!topStatus) {
			loan.tooltip("请选择是否置顶","error");
			return;
		}
		var picFileName = $("#pictureFileName").val();
		loan.ajaxDo({
			url:loan.basePath+"/announce/updateAnnounce",
			params:{'menuId':'300102','menuLog':'1','format':'json','title':title,'announceId':announceId,
				'content':content,'receiveType':receiveType,'startDate':startDate,'endDate':endDate,
				'topStatus':topStatus},
			successCallback:loan.announce.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 删除按钮
	 */
	delBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		var announce = $("#announceGridId").jqGrid('getRowData',rowid);
		if(announce.status && announce.status != 0) {
			loan.tooltip("该公告不是未发布状态，不能删除","error");
			return;
		}
		var title = "提示";
		var content = "确定要删除该公告吗？";
		loan.announce.confirmDialog(title,content,loan.announce.delAnnounce);
	},
	
	/**
	 * 删除
	 */
	delAnnounce:function() {
		var rowid = $("#rowid").val();
		var announceId = $("#announceGridId").jqGrid("getCell", rowid, "announceId");
		loan.ajaxDo({
			url:loan.basePath+"/announce/delAnnounce",
			params:{'menuId':'300103','menuLog':'1','format':'json','announceId':announceId},
			successCallback:loan.announce.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	queryAnnounceById:function(announceId) {
		// var menuId = $("#menuId").val();
		// loan.ajaxDo({
		// 	url:loan.basePath+"/announce/queryAnnouncePaged",
		// 	params:{'menuId':menuId,'format':'json','announceId':announceId,'page':'1','rows':'1'},
		// 	successCallback:loan.announce.initEditPage,
		// 	successTip:false, //不提示
		// 	bizErrTip:false,  //不提示
		// 	chainPar:this
		// });
	},
	
	/**
	 * 初始化修改页面
	 */
	initEditPage:function(result) {
		var announces = result.pager.items;
		if(announces && announces.length > 0) {
			var top = $("input[name='topStatus']");
			for(var i = 0; i < top.length; i++) {
				if($(top[i]).val() == announces[0].topStatus) {
					$(top[i]).attr("checked","true");
					break;
				}
			}
			for ( var property in announces[0]) {
				$("#"+property).val(announces[0][property]);
			}
		}
	},
	
	/**
	 * 发布按钮
	 */
	releaseBtnFunc:function(menuId,row){	
		//$("#rowid").val(rowid);
		var rowid = $("#rowid").val();
		if(!rowid) {
			loan.tooltip("请选择要发布的公告","error");
			return;
		}
		var announce = $("#announceGridId").jqGrid('getRowData',rowid);
		if(announce.status && announce.status != 0) {
			loan.tooltip("该公告不是未发布状态，不能发布","error");
			return;
		}
		$.artDialog({
			title:"提示",
			content:"确定要发布【"+announce.title+"】公告吗？",
			ok:function(){
				var announceId = announce.announceId;
				loan.ajaxDo({
					url:loan.basePath+"/announce/releaseAnnounce",
					params:{'menuId':'300104','menuLog':'1','format':'json','announceId':announceId},
					successCallback:loan.announce.freshGrid,
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
				return true;
			},
			cancel:function(){
				return false;
			}
	    });
		
	},
	
	/**
	 * 停用按钮
	 */
	disableBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		var announce = $("#announceGridId").jqGrid('getRowData',rowid);
		if(announce.status && announce.status != 1) {
			loan.tooltip("该公告不是已发布状态，不能停用","error");
			return;
		}
		$.artDialog({
			title:"提示",
			content:"确定要停用【"+announce.title+"】公告吗？",
			ok:function(){
				var announceId = announce.announceId;
				loan.ajaxDo({
					url:loan.basePath+"/announce/disableAnnounce",
					params:{'menuId':'300105','menuLog':'1','format':'json','announceId':announceId},
					successCallback:loan.announce.freshGrid,
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
				return true;
			},
			cancel:function(){
				return false;
			}
	    });
	},
	enableBtnFunc : function(menuId, rowid){
		var announce = $("#announceGridId").jqGrid('getRowData',rowid);
		if(announce.status && announce.status != 2) {
			loan.tooltip("该公告不是无效状态，不能启用","error");
			return;
		}
		$.artDialog({
			title:"提示",
			content:"确定要启用【"+announce.title+"】公告吗？",
			ok:function(){
				var announceId = announce.announceId;
				loan.ajaxDo({
					url:loan.basePath+"/announce/enableAnnounce",
					params:{'menuId':'300106','menuLog':'1','format':'json','announceId':announceId},
					successCallback:loan.announce.freshGrid,
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
				return true;
			},
			cancel:function(){
				return false;
			}
	    });
		
		
	},
	
	/**
	 * 初始化页面
	 */
	initIndexPage:function() {
		$("#receiveType").prepend("<option value='-1'>所有</option>");
		$("#status").prepend("<option value='-1'>所有</option>");
		$("#receiveType,#status").val("-1");
	},
	
	/**
	 * 初始化选项
	 */
	setSelect:function() {
		var options = $("#receiveType option");
		if(options) {
			for(var i = 0; i < $(options).length; i++) {
				if($(options)[i].value == "0") {
					$(options)[i].remove();
					break;
				}
			}
		}
	}
	
}
function judgeEmp( str ){
	if ( str == "" ) return true;
	if(!str) return true;
	if (jQuery.trim(str)==''&&str.length>0){
		return true;
	}
 return false;
}