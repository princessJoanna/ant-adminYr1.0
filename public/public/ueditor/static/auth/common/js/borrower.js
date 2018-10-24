var menuId = -1;
var busiDate = -1;
loan.borrower = loan.borrower || {
	
	/**
	 * 获取系统时间
	 */
	getBusiDate:function() {
		loan.ajaxDo({
			url:loan.basePath+"/common/queryBusiDate",
			params:{'menuId':menuId,},
			successCallback:function(result){
				busiDate = result.busiDate;
			},
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},

	submit : function(){
		var rowid = $("#rowid").val();
		if(!rowid){
			loan.tooltip("请选中需要的数据行!","error");
			return;
		}
		var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
		parent.$("#userRealName").attr("value",rowObj.userName);
		parent.$("#userIdNum").attr("value",rowObj.idNo);
		parent.$("#userId").attr("value",rowObj.userId);
		parent.$("#idType").attr("value",rowObj.idKind);
		parent.$("#prompt").html("");
		loan.borrower.queryUserPreloan(rowObj.userId);
		if(parent.$("#focus").length>0) {
			parent.$("#focus").focus();
		}
		if(parent.$("#remark").length>0) {
			parent.$("#remark").focus();
		}
		loan.s_Pop_closedChild(false,false);
	},
	selectRowFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	searchFn :function(){
		var userName = $("#userName").val();
		var idNo = $("#idNo").val();
		var relationStatusCn = $("#relationStatusCn").val();
		var flag = $("#flag").val();
		searchOrgId = $("#parentOrgId").val();
		var params = {
			'format':'json',
			'userName':userName,
			'relationStatusCn':relationStatusCn,
			'idNo':idNo
		}
		if(flag) {
			var flagValue = $("#"+flag).prop("checked");
			if(flag == 'unCreditFlag') {
				params = {
					'format':'json',
					'userName':userName,
					'relationStatusCn':relationStatusCn,
					'idNo':idNo,
					'unCreditFlag':flagValue
				}	
			}else if(flag == 'unPreCheckFlag') {
				params = {
					'format':'json',
					'userName':userName,
					'relationStatusCn':relationStatusCn,
					'idNo':idNo,
					'unPreCheckFlag':flagValue
				}			
			}
		}
		params['searchOrgId'] = searchOrgId;
		$("#userGridId").jqGrid("setGridParam", {   
			postData:
				params,
			page:1
	    }).trigger('reloadGrid');   
	},
	/**
	 * 贷前调查
	 */
	submit2preloan : function(){
		var rowid = $("#rowid").val();
		if(!rowid){
			loan.tooltip("请选中需要的数据行!","error");
			return;
		}
		var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
		parent.$("#userRealName").attr("value",rowObj.userName);
		parent.$("#userIdNum").attr("value",rowObj.idNo);
		parent.$("#userId").attr("value",rowObj.userId);
		parent.$("#idType").attr("value",rowObj.idKind);
		parent.$("#prompt").html("");
		loan.borrower.queryUserBlacklist(rowObj.userId);
		loan.borrower.queryUserPreloan(rowObj.userId);
		if(parent.$("#focus").length>0) {
			parent.$("#focus").focus();
		}
		if(parent.$("#remark").length>0) {
			parent.$("#remark").focus();
		}
		loan.s_Pop_closedChild(false,false);
	},

	/**
	 * 黑名单
	 */
	submit2black: function(){
		var rowid = $("#rowid").val();
		if(loan.borrower.checkSelectRow(rowid)) {
			var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
			parent.$("#customName").attr("value",rowObj.userName);
			parent.$("#certNo").attr("value",rowObj.idNo);
			parent.$("#userId").attr("value",rowObj.userId);
			parent.$("#certType").attr("value",rowObj.idKind);
			parent.$("#certNoCn").html(rowObj.idNo);
			parent.$("#certTypeCn").html(rowObj.idKindCn);
			if(parent.$("#focus").length>0) {
				parent.$("#focus").focus();
			}
			if(parent.$("#remark").length>0) {
				parent.$("#remark").focus();
			}
			loan.s_Pop_closedChild(false,false);
		}
	},
	
	/**
	 * 担保物
	 */
	close2warrant: function(){
		if(parent.$("#remark").length>0) {
			parent.$("#remark").focus();
		}
		loan.s_Pop_closedChild(false,false);
	},
	/**
	 * 担保物新增
	 */
	submit2warrant: function(){
		var rowid = $("#rowid").val();
		if(loan.borrower.checkSelectRow(rowid)) {
			var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
			parent.$("#userName").attr("value",rowObj.userName);
			parent.$("#userId").attr("value",rowObj.userId);
			parent.$("#idNo").html(rowObj.idNo);
			parent.$("#idKindCn").html(rowObj.idKindCn);
			parent.$("#userName").blur();
			loan.borrower.close2warrant();
		}
	},
	
	
	/**
	 * 授信/贷款申请
	 */
	submit2credit: function(){
		var rowid = $("#rowid").val();
		if(loan.borrower.checkSelectRow(rowid)) {
			var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
			parent.$("#customName").attr("value",rowObj.userName);
			parent.$("#userName").text(rowObj.userName);
			parent.$("#certNo").attr("value",rowObj.idNo);
			parent.$("#userId").attr("value",rowObj.userId);
			parent.$("#certType").attr("value",rowObj.idKind);
			parent.$("#certNo").html(rowObj.idNo);
			parent.$("#certTypeCn").html(rowObj.idKindCn);
			parent.$("#age").val(rowObj.age);
			parent.$("#userId").change();
			loan.borrower.verityUser(rowObj.userId,rowObj.idNo,rowObj.idKind);
			loan.borrower.close2credit();
		}
	},
	
	close2credit:function() {
		parent.$("#advCon").addClass("dropDownList");
		parent.loan.selFun('adv');
		parent.$("#adv").addClass('open');
		parent.$("#adv").html("收起高级搜索");
		if(parent.$("#focus").length>0) {
			parent.$("#focus").focus();
		}
		if(parent.$("#remark").length>0) {
			parent.$("#remark").focus();
		}
		loan.s_Pop_closedChild(false,false);
	},
	
	/**
	 * 新增授信页面的校验提示
	 */
	verityUser:function(userId,idno,idKind){
		var menuId = menuId;
		var prompt = "";
		if(idKind == "0") {
			loan.borrower.getBusiDate();//获取系统时间
			if(busiDate != -1) {
				var age = loan.borrower.getAgeById(idno);
				if(age < 18) {
					prompt = " 客户"+age+"周岁，未满18周岁。";
				}
			}
		}
		parent.$("#prompt").html(prompt);
		loan.borrower.queryUserBlacklist(userId);
		loan.borrower.queryUserPreloan(userId);
		loan.borrower.queryUserVCredit(userId);
	},
	
	/**
	 * 更具身份证判断年龄
	 */
	getAgeById:function(idno) {
		var myDate = busiDate.toString();
	    var month = myDate.substring(4, 6);
	    var day = myDate.substring(6, 8);
	    var age = myDate.substring(0,4) - idno.substring(6, 10) - 1;
	    if (idno.substring(10, 12) < month || idno.substring(10, 12) == month && idno.substring(12, 14) <= day) {
	        age++;
	    }
		return age;
	},
	
	/**
	 * 查询黑名单 
	 */
	queryUserBlacklist:function(userId) {
		loan.ajaxDo({
			url:loan.basePath+"/blacklist/queryBlacklistPaged",
			params:{'menuId':menuId,'userId':userId,'page':'1','rows':'1','status':'1'},
			successCallback:loan.borrower.verityBlack,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	verityBlack:function(result) {
		var black = result.pager.items;
		if(black && black.length > 0) {
			parent.$("#prompt").append(" 客户已列入黑名单。");
		}
	},
	
	/**
	 * 查询贷前调查 
	 */
	queryUserPreloan:function(userId) {
		loan.ajaxDo({
			url:loan.basePath+"/org/queryUserHasPreck",
			params:{'menuId':menuId,'userId':userId,'type':'0'},
			successCallback:loan.borrower.verityPreloan,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	verityPreloan:function(result) {
		var success = result.preckSuccess;
		var refused = result.preckRefused;
		var unvalid = result.preckUnvalid;
		var prompt = " 客户未做贷前调查。";
		if(success) {//
			prompt = " 客户已于"+success.createStr+"做贷前调查,结果接受贷款。";
		} else if (refused) {
			prompt = " 客户已于"+refused.createStr+"做贷前调查,结果拒绝贷款。";
		} else if (unvalid) {
			prompt = " 客户不存在有效的贷前调查记录。";
		}
		parent.$("#prompt").append(prompt);
	},
	
	/**
	 * 查询生效的授信记录 
	 */
	queryUserVCredit:function(userId) {
		loan.ajaxDo({
			url:loan.basePath+"/credit/queryCredit",
			params:{'menuId':menuId,'userId':userId,'page':'1','rows':'1','status':'1','confirmStatus':'1'},
			successCallback:function(result) {
				var credit = result.pager.items;
				var prompt = "";
				if(credit && credit.length > 0) {//
					prompt = " 客户存在生效的授信记录。";
					//break;
				}
				parent.$("#prompt").append(prompt);
			},
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 检查选中项
	 */
	checkSelectRow:function(row) {
		var rowid = (row==null?$("#rowid").val():row);
		if(rowid == null || rowid == "") {
			loan.tooltip("请选中要操作的行","error");
			return false;
		}
		return true;
	},
	
	
	/**
	 * 设置提交按钮的方法
	 */
	initSubmitFunc:function(submitFunc) {
		if(submitFunc) {
			$("#submit_button").attr("onclick","javascript:loan.borrower."+submitFunc+"();");
		}
	},
	
	/**
	 * 设置取消按钮的方法（取消按钮与顶部X按钮）
	 * 1.在本命名空间里创建关闭方法 eg。close2credit()
	 * 2.case
	 */
	initCloseFunc:function(closeFunc) {
		if(closeFunc) {
			//设置取消按钮
			$("#close").attr("onclick","javascript:loan.borrower."+closeFunc+"();");
			closeFunc = "loan.borrower."+closeFunc;
			var func = eval(closeFunc);
			parent.$('#sPopClose').bind("click",func);
		} else {
			parent.$('#sPopClose').bind("click",function(){
				if( parent.$('#focus').length > 0) {
					parent.$("#focus").focus();
				}
				loan.s_Pop_closedChild(false,false);
			});
		}
	},
	
	
	initGrid:function() {
		menuId = $("#menuId").val();
		var flag = $("#flag").val();
		var params = {
			format:'json',
			'relationStatus':'1',
			'menuId':menuId
		}
		if(flag) {
			var flagValue = $("#"+flag).prop("checked");
			if(flag == 'unCreditFlag') {
				params = {
					format:'json',
					'relationStatus':'1',
					'menuId':menuId,
					unCreditFlag:flagValue
				}	
			}else if(flag == 'unPreCheckFlag') {
				params = {
					format:'json',
					'relationStatus':'1',
					'menuId':menuId,
					unPreCheckFlag:flagValue
				}			
			}
		}
		jQuery("#userGridId").jqGrid({
			url: loan.basePath+"/common/queryUserBorrowerPaged",
			mtype:'POST',
			datatype: "json",
			postData:params,
			onSelectRow:loan.borrower.selectRowFn,
			colNames: ['姓名','证件类型','年龄','证件号','用户ID','idKind','sexTypeCn','age',
			           'blacklistStatus','cityCode','districtCode','provinceCode'], 
			colModel: [
	           {name:'userName',index:'userName', align:'center',width:'20%',sortable: false},
	           {name:'idKindCn',index:'idKindCn', align:'center',width:'20%',sortable: false},
	           {name:'age',index:'age',align:'center',width:'20%',sortable: false,hidden:true},
	           {name:'idNo',index:'idNo',align:'center',width:'40%',sortable: false},
	           {name:'userId',index:'userId',hidden:true},
	           {name:'idKind',index:'idKind',hidden:true},
	           {name:'sexTypeCn',index:'sexTypeCn',hidden:true},
	           {name:'age',index:'age',hidden:true},
	           
	           {name:'blacklistStatus',index:'blacklistStatus',hidden:true},
	           {name:'cityCode',index:'cityCode',hidden:true},
	           {name:'districtCode',index:'districtCode',hidden:true},
	           {name:'provinceCode',index:'provinceCode',hidden:true}
	           ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			pager:jQuery('#userGridPanelId'),
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			pgbuttons:true,
			pginput: true,	
			height: 'auto',
			loadComplete:function(){},
			gridComplete : function() {
				
			}
		})
	}
}

$(function(){
	loan.borrower.initGrid();
	var status = $("#status").val();
	if(status == 'userName') {
		$("#userIdNum").hide();
	}
	if(status == 'idNo') {
		$("#userRealName").hide();
	}
	//授信，贷前标志
	var flag = $("#flag").val();
	if(!flag) {
		$("#checkflag").hide();
	}else if(flag == 'unCreditFlag') {
		$("#flagPrompt").html("未授信");	
	}else if(flag == 'unPreCheckFlag') {
		$("#flagPrompt").html("未贷前调查");		
	}
	var submitFunc = $("#submitFunc").val();
	var closeFunc = $("#closeFunc").val();
	loan.borrower.initSubmitFunc(submitFunc);
	loan.borrower.initCloseFunc(closeFunc);
})

