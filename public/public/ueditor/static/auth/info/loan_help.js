loan.help = loan.help || {
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#questionGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1006','format':'json'}
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
	 * 搜索按钮
	 */
	searchFunc:function(){	
		var questionType = $("#questionType").val();
		if(questionType && questionType == "-1") {
			questionType = "";
		}
		$("#questionGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1006','format':'json',
				'questionType':questionType},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 新增按钮
	 */
	addBtnFunc:function(menuId,rowid){
		parent.loan.tabcut.childAddIframe("新增帮助问答",loan.basePath+"/help/toaddhelp?menuId=100601","addhelp",true,true);
	},
	
	/**
	 * 新增提交按钮
	 */
	submitAdd:function() {
		var questionType = $("#questionType").val();
		var questionContent = $("#questionContent").val();
		var answerContent = $("#answerContent").val();
		if(answerContent && !v_Regular.canSpecial.test(answerContent)){
			loan.tooltip("回答不得包含特殊字符","error");
			return;
		}
		answerContent = answerContent.replace(/\n|\r\n/g,"<br>");
		loan.ajaxDo({
			url:loan.basePath+"/help/addQuestion",
			params:{'menuId':'100601','menuLog':'1','format':'json','questionType':questionType,
				'questionContent':questionContent,'answerContent':answerContent},
			successCallback:loan.help.closeChildFrame,
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
		var question = $("#questionGridId").jqGrid('getRowData',rowid);
		if(question.status && question.status != 0) {
			loan.tooltip("该问答不是未发布状态，不可删除","error");
			return;
		}
		var title = "提示";
		var content = "确定要删除该问答吗？";
		loan.help.confirmDialog(title,content,loan.help.delQuestion);
	},
	
	/**
	 * 删除
	 */
	delQuestion:function() {
		var rowid = $("#rowid").val();
		var questionId = $("#questionGridId").jqGrid("getCell", rowid, "questionId");
		loan.ajaxDo({
			url:loan.basePath+"/help/delQuestion",
			params:{'menuId':'100603','menuLog':'1','format':'json','questionId':questionId},
			successCallback:loan.help.freshGrid,
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
		var question = $("#questionGridId").jqGrid('getRowData',rowid);
		if(question.status && question.status != 0) {
			loan.tooltip("该问答不是未发布状态，不可修改","error");
			return;
		}
		var questionId = $("#questionGridId").jqGrid("getCell", rowid, "questionId");
		parent.loan.tabcut.childAddIframe("修改问答",loan.basePath+"/help/toedithelp?menuId=100602&&questionId="+questionId,"edithelp",true,true);
	},
	
	/**
	 * 发布按钮
	 */
	releaseBtnFunc:function(menuId,rowid){	
		var question = $("#questionGridId").jqGrid('getRowData',rowid);
		if(question.status && question.status != 0) {
			loan.tooltip("该问答不是未发布状态，不可发布","error");
			return;
		}
		$.artDialog({
			title:"提示",
			content:"确定要发布该问题吗？",
			ok:function(){
				var questionId = question.questionId;
				loan.ajaxDo({
					url:loan.basePath+"/help/releaseQuestion",
					params:{'menuId':'100604','menuLog':'1','format':'json','questionId':questionId},
					successCallback:loan.help.freshGrid,
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
		var question = $("#questionGridId").jqGrid('getRowData',rowid);
		if(question.status && question.status != 1) {
			loan.tooltip("该问答不是发布状态，不可停用","error");
			return;
		}
		$.artDialog({
			title:"提示",
			content:"确定要停用该问题吗？",
			ok:function(){
				var questionId = question.questionId;
				loan.ajaxDo({
					url:loan.basePath+"/help/disableQuestion",
					params:{'menuId':'100605','menuLog':'1','format':'json','questionId':questionId},
					successCallback:loan.help.freshGrid,
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
	
	queryQuestionById:function(questionId) {
		loan.ajaxDo({
			url:loan.basePath+"/help/queryQuestionPaged",
			params:{'menuId':'100602','format':'json','questionId':questionId,'page':'1','rows':'1'},
			successCallback:loan.help.initEditPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化修改页面
	 */
	initEditPage:function(result) {
		var questions = result.pager.items;
		if(questions && questions.length > 0) {
			$("#questionTypeCn").html(questions[0].questionTypeCn);
			var reg = new RegExp("<br>","g");
			for ( var property in questions[0]) {
				$("#"+property).val(questions[0][property].replace(reg,"\n"));
			}
		}
	},
	
	/**
	 * 修改提交按钮
	 */
	submitEdit:function() {
		var questionId = $("#questionId").val();
		var questionContent = $("#questionContent").val();
		var answerContent = $("#answerContent").val();
		if(answerContent && !v_Regular.canSpecial.test(answerContent)){
			loan.tooltip("回答不得包含特殊字符","error");
			return;
		}
		answerContent = answerContent.replace(/\n|\r\n/g,"<br>");
		loan.ajaxDo({
			url:loan.basePath+"/help/updateQuestion",
			params:{'menuId':'100602','menuLog':'1','format':'json','questionId':questionId,
				'questionContent':questionContent,'answerContent':answerContent},
			successCallback:loan.help.closeChildFrame,
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