Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

loan.cusdetail = loan.cusdetail || {
	queryRecore: function(menuId, rowId, obj) {
		// debugger;
		if(obj.type == "score") {
			loan.riskUser.queryscorerecore(menuId, rowId);
		}else if(obj.type == "agree") {
			loan.riskUser.queryagreerecore(menuId, rowId);
		}
	},
	checkResult: function(menuId, rowId, obj) {
		// debugger;
		if(obj.type == "score") {
			loan.riskUser.checkScoreResult(menuId, rowId);
		}else if(obj.type == "agree") {
			loan.riskUser.checkAgreeResult(menuId, rowId);
		}
	},
	
	convertTime:function(cellvalue, options, rowObject) {
		var reg = new RegExp("^[0-9]*$");
		if(reg.test(cellvalue)) {
			var date = new Date(Number(cellvalue));
			return date.Format("yyyyMMdd");
		}
		return "";
	},
	
	/**
	 * 查询客户信息（借款人及相关联系人）
	 * date 2015-9-9 11:08:22
	 */
	queryUserInfo:function (userId){
		var menuId=$("#menuId").val();
		var info=$("#info").val();
		var mapping = "/borrower/queryBorrowerInfo";
		if(info == 'company'){
			mapping = "/borrower/queryUserCompany"
				$("#borrowerinfo").remove();
		} else {
			$("#companyinfo").remove();
		}
		loan.ajaxDo({
			url:loan.basePath+mapping,
			params:{'format':'json','menuLog':'1','userId':userId,'menuId':menuId},
			successCallback:loan.cusdetail.initUserInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化用户信息
	 */
	initUserInfo:function(result) {
		var UserDetail = result.domain;
		var RelationArry = UserDetail.list;
		var bankCardList = UserDetail.bankCardDomains;

		for ( var property in UserDetail) {
			if(property !== "userId" || property != "identityFrontUrl" || property != "identityEeverseUrl" || property != "faceUrl") {
				$("#" + property).text(null == UserDetail[property] ? "" : UserDetail[property]);
			}
			if (property == "identityFrontUrl" || property == "identityEeverseUrl" || property == "faceUrl") {
				$("#" + property).attr("src", UserDetail[property]);
			}
		}
		
		/****行政区域特殊处理*****/
		$("#area").attr("provinceid",UserDetail['provinceCode']),
		$("#area").attr("cityid",UserDetail['cityCode']),
		$("#area").attr("areaid",UserDetail['districtCode'])
		
		$("#areaCn").text(loan.getArea(UserDetail['provinceCode'])+loan.getArea(UserDetail['cityCode'])+loan.getArea(UserDetail['districtCode']));
		
		
		loan.cusdetail.initRaletionInfo(RelationArry);
		loan.cusdetail.initBankCardInfo(bankCardList);
	},
	
	initRaletionInfo:function(RelationArry) {
		if(!RelationArry){
			return;
		}
        var innerHtml = "";
		for (var i = 0; i < RelationArry.length; i++) {
            var name = "<li class=\"f-w33pre\">" +
                    "<label>联系人姓名：</label><label  id=\"relationName_9\" class=\"right\">" +
                    RelationArry[i].relationName +
                    "</label></li>";
            var mobile = "<li class=\"f-w33pre\">" +
                "<label>联系电话：</label><label  id=\"relationPhone_9\" class=\"right\">" +
                RelationArry[i].relationPhone +
                "</label></li>";
            var relationType = "<li class=\"f-w33pre\">" +
                "<label>关系：</label><label  id=\"relationTypeCn_1\" class=\"right\">" +
                RelationArry[i].relationTypeCn +
                "</label></li>";

                innerHtml = innerHtml + name + mobile + relationType;
            }
        $("#lianxiren").html(innerHtml);
	},

    initBankCardInfo:function(bankCardList) {
        if(!bankCardList){
            return;
        }
        var innerHtml = "";
        for (var i = 0; i < bankCardList.length; i++) {
            var bankNo = "<li class=\"f-w100pre\">" +
                "<label>"+bankCardList[i].bankName+"  "+bankCardList[i].mainStatus+"</label><label id=\"bankcardNo\" class=\"right\">" +
                "</li>";
            var bankcardNo = "<li class=\"f-w33pre\">" +
                "<label>银行卡号：</label><label  id=\"bankcardNo\" class=\"right\">" +
                bankCardList[i].bankcardNo +
                "</label></li>";
			var userName = "<li class=\"f-w33pre\">" +
				"<label>持卡人：</label><label  id=\"userName\" class=\"right\">" +
				bankCardList[i].userName +
				"</label></li>";
            var bankName = "<li class=\"f-w33pre\">" +
                "<label>银行预留手机号：</label><label  id=\"bankName\" class=\"right\">" +
                bankCardList[i].mobile +
                "</label></li>";
				innerHtml = innerHtml + bankNo+bankcardNo + userName+bankName ;
        }


        $("#bankInfo").html(innerHtml);
    },
	
	/**
	 * 查询客户信息（借款人及相关联系人）
	 * date 2015-9-9 11:08:22
	 */
	queryUserDemand:function (userId){
		var menuId=$("#menuId").val();
		loan.ajaxDo({
			url:loan.basePath+"/borrower/queryBorrowerDemandInfo",
			params:{'format':'json','menuLog':'1','userId':userId,'menuId':menuId},
			successCallback:loan.cusdetail.initUserDemandInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	/**
	 * 初始化用户意向信息
	 */
	initUserDemandInfo:function(result) {
		var UserDetail = result.userDemandDomain;
		for ( var property in UserDetail) {
			if(property !== "userId") {
				$("#"+property).text(null == UserDetail[property]?"":UserDetail[property]);
			}
		}
	},
	/**
	 * 初始化授信tab页
	 */
	initCreditGrid:function(userId) {
		var menuId=$("#menuId").val();
		jQuery("#creditGridId").jqGrid({
			url:loan.basePath+"/credit/queryCredit",
			mtype:'POST',
			datatype: "json",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			postData:{'menuId':menuId,'format':'json','userId':userId},
			colNames: ['授信日期','授信总金额(元)','授信开始日期','授信结束日期','审核状态','记录状态',
			          ], 
			colModel: [
			   {name:'createTime',index:'createTime',align:'center',sortable: false,
				   formatter:loan.cusdetail.convertTime},
	           {name:'amounts',index:'amounts',align:'center',sortable: false},
	           {name:'beginDate',index:'beginDate',align:'center',sortable: false},
	           {name:'endDate',index:'endDate',align:'center',sortable: false},
	           {name:'confirmStatusCn',index:'confirmStatusCn',align:'center',sortable: false},
	           {name:'statusCn',index:'statusCn',align:'center',sortable: false}
	        ], 
	        jsonReader:{  //返回数据格式设置
	        	root: "response.pager.items",//数据项
	        	page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			sortname: 'createTime',   
		    sortorder: 'desc',
		    pager:jQuery('#creditGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			//onSelectRow:loan.credit.selectRowFunc,
			loadComplete:function(result){},
			gridComplete : function(){}
		});
		jQuery("#creditGridId").setGridWidth($(window).width()-60);
	},
	
	/**
	 * 查看贷前调查详情
	 */
	lookPreloan:function(rowid) {
		var menuId=$("#menuId").val();
		$("#preloanRowid").attr("value",rowid);
		var rowObj = $("#preloanGridId").jqGrid('getRowData',rowid);
		var orgId = rowObj.orgId;
		var userName = rowObj.userName;
		var idKind = rowObj.idKind;
		var idNo = rowObj.idNo;
		var shortName = rowObj.shortName;
		var userId = rowObj.userId;
		var idKindCn = rowObj.idKindCn;
		var checkId = rowObj.checkId;
		parent.loan.tabcut.childAddIframe("查看调查情况",loan.basePath+"/org/preloanCheck?menuId="+menuId+"&&orgId="+orgId+"&userName="+userName+
				"&idKind="+idKind+"&idNo="+idNo+"&shortName="+shortName+"&userId="+userId+"&idKindCn="+idKindCn+"&checkId="+checkId,"preloanCheck",true);
	},

	/**
	 * 选择借款信息
	 */
	selectPreloanRow:function(rowid) {
		$("#preloanRowid").val(rowid);
	},
	/**
	 * 初始化贷前调查tab页
	 */
	initPreloanGrid:function(userId) {
		var menuId=$("#menuId").val();
		jQuery("#preloanGridId").jqGrid({
			url:loan.basePath+"/org/queryPreloanPagedCheck",
			mtype:'POST',
			datatype: "json",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			postData:{'menuId':menuId,'format':'json','userId':userId},
			colNames: ['贷前调查日期','详情','checkId','shortName','orgId','userId','userName',
			           'idKind','idKindCn','idNo','createTime','status','statusCn'
			          ], 
			colModel: [
			   {name:'createStr',index:'createStr',align:'center',sortable: false},
	           {name:'act',index:'act',align:'center',sortable: false},
	           {name:'checkId',index:'checkId',hidden:true},
	           {name:'shortName',index:'shortName',hidden:true},
	           {name:'orgId',index:'orgId',hidden:true},
	           {name:'userId',index:'userId',hidden:true},
	           {name:'userName',index:'userName', hidden:true},
	           {name:'idKind',index:'idKind',hidden:true},
	           {name:'idKindCn',index:'idKindCn',hidden:true},
	           {name:'idNo',index:'idNo',hidden:true},
	           {name:'createTime',index:'createTime',hidden:true},
	           {name:'status',index:'status',hidden:true},
	           {name:'statusCn',index:'statusCn',hidden:true}
	           ], 
	        jsonReader:{  //返回数据格式设置
	        	root: "response.pager.items",//数据项
	        	page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			sortname: 'createStr',   
		    sortorder: 'desc',
		    pager:jQuery('#preloanGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			onSelectRow:loan.cusdetail.selectPreloanRow,
			loadComplete:function(result){},
			gridComplete : function(){
				if($('#type').val() != 'view'){
				var rowIds = jQuery("#preloanGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var addBtn = "<div class='operating'>";	
	            	addBtn += "<a class='operating-comment icon-radius' title='查看详情' onclick=\"loan.cusdetail.lookPreloan('"+rowIds[i]+"')\"><i class='icon-comment'></i></a></div>";
					jQuery("#preloanGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
				}
			}
		});
		jQuery("#preloanGridId").setGridWidth($(window).width()-60);
		
	},
	
	/**
	 * 查看借款信息详情
	 */
	lookLoanInfo:function(rowid) {
		var menuId=$("#menuId").val();
		$("#loanRowid").attr("value",rowid);
		var rowObj = $("#loanInfoGridId").jqGrid('getRowData',rowid);
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
    	var status = "lend";
    	var urlSuffix = "?menuId="+menuId+"&&receiptId="+receiptId+"&receiptNo="+receiptNo+"&userName="+userName+"&userId="+userId+"&orgId"+orgId+"&idKindCn="+idKindCn+"&idKind="+idKind+
    	"&idNo="+idNo+"&productTypeCn="+productTypeCn+"&productType="+productType+"&productId="+productId+"&productName="+productName+"&loanDate="+loanDate+
    	"&loanAmount="+loanAmount+"&repayStatusCn="+repayStatusCn+"&memuId=700401&limitDate="+limitDate+
    	"&leagueName="+leagueName+"&status="+status;
    	parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/org/lendetail"+urlSuffix,"lendetail",true);
	},
	
	/**
	 * 选择借款信息
	 */
	selectLoanInfo:function(rowid) {
		$("#loanRowid").val(rowid);
	},
	
	/**
	 * 初始借款信息tab页
	 */
	initLoanInfoGrid:function(userId) {
		var menuId=$("#menuId").val();
		jQuery("#loanInfoGridId").jqGrid({
			url: loan.basePath+"/org/queryLoanReceiptPaged",
			mtype:'POST',
			datatype: "json",
			postData:{'menuId':menuId,format:'json','userId':userId},
			onSelectRow:loan.cusdetail.selectLoanInfo,
			colNames: ['借据id','借据号','产品id','产品名称','出资方id','客户的id','客户名称','证件类型','证件类型值','证件号','贷款产品种类','贷款产品种类值','放款日期','贷款金额','结束日期','贷款余额','贷款的状态','加盟商名称','操作'], 
			colModel: [
	           {name:'receiptId',index:'receiptId', align:'center',hidden:true},
	           {name:'receiptNo',index:'receiptNo', align:'cneter',hidden:true},
	           {name:'productId',index:'productId', align:'center',hidden:true},
	           {name:'productName',index:'productName', align:'center',hidden:true},
	           {name:'orgId',index:'orgId', align:'center',hidden:true},
	           {name:'userId',index:'userId', align:'center',hidden:true},
	           {name:'userName',index:'userName', align:'center',hidden:true},
	           {name:'idKindCn',index:'idKindCn', align:'center',hidden:true},
	           {name:'idKind',index:'idKind', align:'center',hidden:true},
	           {name:'idNo',index:'idNo', align:'center',hidden:true},
	           {name:'productTypeCn',index:'productTypeCn', align:'center',sortable: false},
	           {name:'productType',index:'productType', align:'center',hidden:true},
	           {name:'loanDate',index:'loanDate', align:'center',sortable: false},
	           {name:'loanAmount',index:'loanAmount', align:'center',sortable: false},
	           {name:'limitDate',index:'limitDate', align:'center',sortable: false},
	           {name:'loanBalance',index:'loanBalance',align:'center',sortable: false},
	           {name:'repayStatusCn',index:'repayStatusCn', align:'center',hidden:true},
	           {name:'leagueName',index:'leagueName', align:'center',hidden:true},
	           {name:'act',index:'act',align:'center',sortable: false}
	        ], 
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
	        pager:jQuery('#loanInfoGridPanelId'),
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
				if($('#type').val() != 'view'){
					var rowIds = jQuery("#loanInfoGridId").jqGrid('getDataIDs');
					for (var i = 0; i < rowIds.length; i++) {
		            	var addBtn = "<div class='operating'>";		
						addBtn += "<a class='operating-comment icon-radius' title='查看详情' onclick=\"loan.cusdetail.lookLoanInfo('"+rowIds[i]+"')\"><i class='icon-comment'></i></a></div>";
						jQuery("#loanInfoGridId").jqGrid('setRowData',rowIds[i], {
							act : addBtn
						}); 
					}
				}
			}
		});
		jQuery("#loanInfoGridId").setGridWidth($(window).width()-60);
	},

}


$(function(){
	loan.tabLiclick("m-tab-detail");
	var userId = $("#userId").val();
	loan.cusdetail.queryUserInfo(userId);
	//loan.cusdetail.queryUserDemand(userId);
	//loan.cusdetail.initLoanInfoGrid(userId);
	//loan.cusdetail.initPreloanGrid(userId);
	//loan.cusdetail.initCreditGrid(userId);
	
});