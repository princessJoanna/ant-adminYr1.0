loan.lend = loan.lend || {
	sell_sellorderquery : function() {
		var userRealName = $("#userRealName").val();
		var searchOrgId = $("#parentOrgId").val();
		var productType = $("#productType").val();
		var userIdNum = $("#userIdNum").val();
		var idType = $("#idType").val();
		var receiptNo = $("#receiptNo").val();
		var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var startDate = dateStrToStr($("#startDate").val());
		var endDate = dateStrToStr($("#endDate").val());
		var userIdNum = $("#userIdNum").val();
		var workUnit = $("#unitName").val();
		$("#lendGridId").jqGrid("setGridParam", {   
			postData:{'userRealName':userRealName,'menuId':'7004','productType':productType,
				'startDate':startDate,'endDate':endDate,'idNo':userIdNum,
				'unitName':workUnit,"idType":idType,"receiptNo":receiptNo,
				'searchOrgId':searchOrgId,'format':'json'},
			page:1
	    }).trigger('reloadGrid');
	},
	
	/**选中行的触发事件*/
	selectRowFunc : function(rowid) {
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 导出明细
	 */
	exportLend:function(menuId){
		// 请选择要导出的放款核对数据
		var rowIds = jQuery("#lendGridId").jqGrid('getDataIDs');
		if (!rowIds || rowIds.length == 0) {
			loan.tooltip("请选择要导出的还款明细数据！","error");
			return;
		}
		// 获取导出条件
		var startDate = dateStrToStr($("#startDate").val());
    	var endDate = dateStrToStr($("#endDate").val());
    	var userRealName = $("#userRealName").val();
    	var idNo = $("#userIdNum").val();
		var receiptNo = $("#receiptNo").val();
		var searchOrgId = $("#parentOrgId").val();
    	var idType = "";	// 证件类型
		var productId = "";	// 产品ID
		var fourKind = "";	// 四级状态
		productId = $("#productId").val();
		if (productId == '-1') {
			productId = "";
		}
		fourKind = $("#fourKind").val();
		if (fourKind == '-1') {
			fourKind = "";
		}
		idType = $("#idType").val();
		if (idType == '-1') {
			idType = "";
		}
		loan.tooltip("正在导出还款明细数据，请稍后...", "succeed");
		window.location.href = loan.basePath + "/org/exportLend?startDate=" + startDate 
				+ "&endDate=" + endDate 
				+ "&userRealName=" + userRealName 
				+ "&idNo=" + idNo 
				+ "&receiptNo=" + receiptNo 
				+ "&searchOrgId=" + searchOrgId 
				+ "&idType=" + idType 
				+ "&productId=" + productId 
				+ "&fourKind=" + fourKind 
				+ "&allChoose=" + true;
	},
	
	/**
	 * 还款详情
	 */
	look : function(memuId,rowId) {
    	$("#rowid").attr("value",rowId);
    	var rowObj = $("#lendGridId").jqGrid('getRowData', rowId);
    	var receiptId = rowObj.receiptId;
    	var receiptNo = rowObj.receiptNo;
    	var userName = rowObj.userName;
    	var userId = rowObj.userId;
    	var orgId = rowObj.orgId;
    	var idKindCn = rowObj.idKindCn;
    	var idKind = rowObj.idKind;
    	var idNo = rowObj.idNo;
    	var productTypeCn = rowObj.productTypeCn;
    	var productType = rowObj.productType;
    	var productId = rowObj.productId;
    	var productName = rowObj.productName;
    	var loanDate = rowObj.loanDate;
    	var loanAmount = rowObj.loanAmount;
    	var repayStatusCn = rowObj.repayStatusCn;
    	var loanAmount = rowObj.loanAmount;
    	var limitDate = rowObj.limitDate;
    	var leagueName = rowObj.leagueName;
    	var startDate = dateStrToStr($("#startDate").val());
    	var endDate = dateStrToStr($("#endDate").val());
    	var status = "lend";
    	var urlSuffix = "?receiptId=" + receiptId 
    					+ "&receiptNo=" + receiptNo 
    					+ "&userName=" + userName 
    					+ "&userId=" + userId 
    					+ "&orgId" + orgId 
    					+ "&idKindCn=" + idKindCn 
    					+ "&idKind=" + idKind 
    					+ "&idNo=" + idNo 
    					+ "&productTypeCn=" + productTypeCn 
    					+ "&productType=" + productType 
    					+ "&productId=" + productId 
    					+ "&productName=" + productName 
    					+ "&loanDate=" + loanDate 
    					+ "&loanAmount=" + loanAmount 
    					+ "&repayStatusCn=" + repayStatusCn 
    					+ "&startDate=" + startDate 
    					+ "&endDate=" + endDate 
    					+ "&memuId=" + memuId 
    					+ "&limitDate=" + limitDate 
    					+ "&leagueName=" + leagueName 
    					+ "&status=" + status;
    	
    	parent.loan.tabcut.childAddIframe("还款详情", loan.basePath+"/org/lendetail" + urlSuffix, "lendetail", true);
    },

	/**查看合同*/
	lookContract : function(memuId,rowId) {
		$("#rowid").attr("value",rowId);
		var rowObj = $("#lendGridId").jqGrid('getRowData',rowId);
		var urlSuffix="?param="+encodeURI(JSON.stringify(rowObj));
		parent.loan.tabcut.childAddIframe("查看合同",loan.basePath+"/org/previewContract"+urlSuffix,"previewContract",true);
	},

	/**下载合同*/
	downloadContract : function(memuId,rowId) {
		$("#rowid").attr("value",rowId);
		var rowObj = $("#lendGridId").jqGrid('getRowData',rowId);
		var urlSuffix=JSON.stringify(rowObj);
		this.downLoad(urlSuffix,loan.basePath+"/org/downloadContract")
	},

	/**下载签章合同*/
	downloadReceipt : function(memuId,rowId) {
		$("#rowid").attr("value",rowId);
		var rowObj = $("#lendGridId").jqGrid('getRowData',rowId);
		rowObj.contractType = "2";
		var urlSuffix=JSON.stringify(rowObj);
		this.downLoad(urlSuffix,loan.basePath+"/org/downloadContractFile")
	},

	downLoad:function(id,path){
		var whj = $("<form></form>");
		whj.attr('method', 'post');
		whj.attr('action', path);

		var input1 = $('<input>');
		input1.attr('type', 'hidden');
		input1.attr('name', 'param');
		input1.attr('value', id);
		whj.append(input1);   //将查询参数控件提交到表单上
		whj.appendTo("body");
		var _5 = "sui_frame_" + (new Date().getTime());
		var _6 = $("<iframe id=" + _5 + " name=" + _5 + "></iframe>").attr(
			"src",
			window.ActiveXObject ? "javascript:false" : "about:blank").css(
			{
				position : "absolute",
				top : -1000,
				left : -1000
			});
		whj.attr("target", _5);
		try {
			_6.appendTo("body");
			_6.bind("load", cb);
			whj[0].submit();
		} finally {
			whj.removeAttr("action");
			whj.removeAttr("target");
		}
		var _7 = 10;
		function cb() {
			_6.unbind();
			var _8 = $("#" + _5).contents().find("body");
			var _9 = _8.html();
			if (_9 == "") {
				if (--_7) {
					setTimeout(cb, 100);
					return;
				}
				return;
			}
			var ta = _8.find(">textarea");
			if (ta.length) {
				_9 = ta.val();
			} else {
				var _a = _8.find(">pre");
				if (_a.length) {
					_9 = _a.html();
				}
			}
			try{
				var _json = $.parseJSON(_9);
				if(_json.success){
					loan.tooltip("下载成功","info");
				}else{
					loan.tooltip("下载失败,请联系管理员","error");
				}
			}catch(e){

			}
			setTimeout(function() {
				_6.unbind();
				_6.remove();
			}, 100);
		};
	},

	/**清空查询条件*/
	clearlendVal : function() {
		$("#userRealName").val("");
		$("#userIdNum").val("");
		$("#startDate").val("");
		$("#endDate").val("");
		$("#unitName").val("");
		$("#idType").val("");
		$("#productType").val("");
		$("#receiptNo").val("");
	}
};

/**
 * 把日期格式转化为纯数字格式字符
 */
function dateStrToStr(dateStr) {
	if(dateStr != null) {
		return dateStr.replace(/\-/g,"");
	}
	return dateStr;
}

/**比较日期的大小*/
function compareDate(startDate, endDate){
	var start=new Date(startDate.replace("-", "/").replace("-", "/"));
	var end=new Date(endDate.replace("-", "/").replace("-", "/")); 
	if(end<start){ 
        return true;  
    }else{
    	return false;
    }  
}

$(function(){
	loan.selFun('selAll'); 
	loan.selFun('adv');
	$('#startDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});	
	$('#endDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});
})
$(window).resize(function(){
	loan.grid.mdetailconWidth("lendGridId");
})
