loan.userborrower = loan.userborrower || {

	submit : function(){
		var rowid = $("#rowid").val();
		var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
		parent.$("#userName").attr("value",rowObj.userName);
		parent.$("#idNo").attr("value",rowObj.idNo);
		parent.$("#userId").attr("value",rowObj.userId);
		parent.$("#idKind").attr("value",rowObj.idKind);
		loan.userborrower.close2credit();
	},
	selectRowFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	searchFn :function(){
		var userName = $("#userName").val();
		var idNo = $("#idNo").val();
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','userName':userName,'idNo':idNo},
			page:1
	    }).trigger('reloadGrid');   
	},
	
	
	
	
	close2credit:function() {
		parent.$("#advCon").addClass("dropDownList");
		parent.loan.selFun('adv');
		parent.$("#adv").addClass('open');
		parent.$("#adv").html("收起高级搜索");
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(false,false);
	},
	
	
	
	/**
	 * 更具身份证判断年龄
	 */
	getAgeById:function(idno) {
		var myDate = new Date();
	    var month = myDate.getMonth() + 1;
	    var day = myDate.getDate();
	    var age = myDate.getFullYear() - idno.substring(6, 10) - 1;
	    if (idno.substring(10, 12) < month || idno.substring(10, 12) == month && idno.substring(12, 14) <= day) {
	        age++;
	    }
		return age;
	},
	
	

	submit2black: function(){
		var rowid = $("#rowid").val();
		if(loan.userborrower.checkSelectRow(rowid)) {
			var rowObj = $("#userGridId").jqGrid('getRowData',rowid);
			parent.$("#userName").attr("value",rowObj.userName);
			parent.$("#idNo").attr("value",rowObj.idNo);
		//	parent.$("#userId").attr("value",rowObj.userId);
			parent.$("#focus").focus();
			loan.s_Pop_closedChild(false,false);
		}
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
			$("#submit_button").attr("href","javascript:loan.userborrower."+submitFunc+"();");
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
			$("#close").attr("href","javascript:loan.userborrower."+closeFunc+"();");
			switch(closeFunc) {
			case "close2credit":
				parent.$('#sPopClose').bind("click",loan.userborrower.close2credit);
				break;
			}
		}
	},
	
	
	initGrid:function() {
		jQuery("#userGridId").jqGrid({
			url: loan.basePath+"/common/queryUserBorrowerPaged",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json'},
			onSelectRow:loan.userborrower.selectRowFn,
			colNames: ['姓名','性别','年龄','证件号','用户ID','idKind','idkindCn','age',
			           'blacklistStatus','cityCode','districtCode','provinceCode'], 
			colModel: [
			           {name:'userName',index:'userName', align:'center',width:'20%',sortable: false},
			           {name:'sexTypeCn',index:'sexTypeCn', align:'center',width:'20%',sortable: false},
			           {name:'age',index:'age',align:'center',width:'20%',sortable: false,hidden:true},
			           {name:'idNo',index:'idNo',align:'center',width:'40%',sortable: false},
			           {name:'userId',index:'userId',hidden:true},
			           {name:'idKind',index:'idKind',hidden:true},
			           {name:'idkindCn',index:'idkindCn',hidden:true},
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
	loan.userborrower.initGrid();
	var status = $("#status").val();
	if(status == 'userName') {
		$("#userIdNum").hide();
	}
	if(status == 'idNo') {
		$("#userRealName").hide();
	}
	var submitFunc = $("#submitFunc").val();
	var closeFunc = $("#closeFunc").val();
	loan.userborrower.initSubmitFunc(submitFunc);
	loan.userborrower.initCloseFunc(closeFunc);
})

