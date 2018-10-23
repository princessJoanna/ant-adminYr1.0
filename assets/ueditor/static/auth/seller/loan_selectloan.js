loan.selectloan = loan.selectloan || {

	selectRowFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	searchFn :function(){
		var userName = $("#userName").val();
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','userName':userName,'idNo':userName},
			page:1
	    }).trigger('reloadGrid');   
	},
	/**
	 * 授信等查询
	 */
	selectUserSubmit: function(){
		var rowid = $("#rowid").val();
		if(loan.selectloan.checkSelectRow(rowid)) {
			var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
			parent.$("#customName").attr("value",rowObj.userName);
			parent.$("#certNo").attr("value",rowObj.idNo);
			parent.$("#userId").attr("value",rowObj.userId);
			parent.$("#certType").attr("value",rowObj.idKind);
			parent.$("#certNo").html(rowObj.idNo);
			parent.$("#certTypeCn").html(rowObj.idkindCn);
			parent.$("#age").val(rowObj.age);
			loan.selectloan.verityUser(rowObj.userId,rowObj.age);
			loan.s_Pop_closedChild(false,false);
		}
	},
	
	/**
	 * 
	 */
	verityUser:function(userId,age){
		var prompt = "";
		if(age < 16) {
			prompt = " 客户未满16周岁";
		}
		parent.$("#prompt").html(prompt);
		loan.selectloan.queryUserBlacklist(userId);
		loan.selectloan.queryUserPreloan(userId);
	},
	
	/**
	 * 查询黑名单 
	 */
	queryUserBlacklist:function(userId) {
		loan.ajaxDo({
			url:loan.basePath+"/blacklist/queryBlacklistPaged",
			params:{'menuId':'600201','userId':userId,'page':'1','rows':'1','status':'1'},
			successCallback:loan.selectloan.verityBlack,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	verityBlack:function(result) {
		var black = result.pager.items;
		if(!black) {
			return;
		}
		for(var i = 0; i < black.length; i++) {
			if(black[i].status == "1") {
				parent.$("#prompt").append(" 客户已列入黑名单");
			}
		}
	},
	
	/**
	 * 查询贷前调查 
	 */
	queryUserPreloan:function(userId) {
		loan.ajaxDo({
			url:loan.basePath+"/org/queryPreloanPagedCheck",
			params:{'menuId':'600201','userId':userId,'page':'1','rows':'1','status':'1','sucessed':'1'},
			successCallback:loan.selectloan.verityPreloan,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	verityPreloan:function(result) {
		var preloan = result.pager.items;
		var prompt = " 客户未做贷前调查";
		if(preloan){
			for(var i = 0; i < preloan.length; i++) {
				if(preloan[i].status == "1" && preloan[i].sucessed == "1") {//
					prompt = " 客户已于"+preloan[i].createStr+"做贷前调查";
					break;
				}
			}
		}
		parent.$("#prompt").append(prompt);
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
	initGrid:function() {
		jQuery("#userGridId").jqGrid({
			url: loan.basePath+"/common/queryUserBorrowerPaged",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json','relationStatus':'1'},
			onSelectRow:loan.selectloan.selectRowFn,
			colNames: ['姓名','性别','年龄','证件号','用户ID','idKind','idkindCn','age'], 
			colModel: [
	           {name:'userName',index:'userName', align:'center',width:'20%',sortable: false},
	           {name:'sexTypeCn',index:'sexTypeCn', align:'center',width:'20%',sortable: false},
	           {name:'age',index:'age',align:'center',width:'20%',sortable: false},
	           {name:'idNo',index:'idNo',align:'center',width:'40%',sortable: false},
	           {name:'userId',index:'userId',hidden:true},
	           {name:'idKind',index:'idKind',hidden:true},
	           {name:'idkindCn',index:'idkindCn',hidden:true},
	           {name:'age',index:'age',hidden:true}
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
			gridComplete : function() {}
		})
	}
}

$(function(){
	loan.selectloan.initGrid();
})

