loan.poundagesettle = loan.poundagesettle || {
	/**
	 * 提取账单
	 */
	queryRecord : function() {
		//校验结算开始日期是否小于batchdate
		var buziStr = parent.$(".head-small-nav .date").text();//batchdate
		var buziDate = buziStr.replace(/\//g,"");
		var startDate = $("#startDate").val();
		startDate = startDate.replace(/\-/g,"");
		if(startDate >= buziDate) {
			loan.tooltip("营业日当天不结算手续费","error");
			return;
		}
		//结算截止日期判断
		var endDate = $("#endDate").val();
		if(!endDate) {
			loan.tooltip("请选择结算截止日期","error");
			return;
		}
		//没有点过提取账单0-初次加载，1-提取未结算，2-结算
		var readyFlag = $("#readyFlag").attr("value");
		if(!readyFlag || readyFlag == "0") {
			loan.poundagesettle.initGrid();
			$("#readyFlag").attr("value","1");
			$("#submit_button").removeClass("u-btn-bg-blue-disabled").addClass("u-btn-bg-blue");
			$("#submit_button").attr("href","javascript:loan.poundagesettle.settleSubmit();");
		} else if(readyFlag == "1"){
			endDate = endDate.replace(/\-/g,"");
			$("#poundagesGridId").jqGrid("setGridParam", {   
				postData:{'format':'json','menuId':'7006','startDate':startDate,'endDate':endDate}
		    }).trigger('reloadGrid');
		} else if(readyFlag == "2"){
			endDate = endDate.replace(/\-/g,"");
			$("#poundagesGridId").jqGrid("setGridParam", {   
				postData:{'format':'json','menuId':'7006','startDate':startDate,'endDate':endDate}
		    }).trigger('reloadGrid');
			$("#readyFlag").attr("value","1");
			$("#submit_button").removeClass("u-btn-bg-blue-disabled").addClass("u-btn-bg-blue");
			$("#submit_button").attr("href","javascript:loan.poundagesettle.settleSubmit();");
		}
	},
	
	/**
	 * 结算提交
	 */
	settleSubmit : function() {
		//校验是否已选择结束日期
		var endDate = $("#endDate").val();
		if(!endDate) {
			loan.tooltip("请选择结算截止日期","error");
			return;
		}
		
		//校验结束日期与开始时期的先后判断
		endDate = endDate.replace(/\-/g,"");
		var startDate = $("#startDate").val();
		startDate = startDate.replace(/\-/g,"");
		if(startDate > endDate) {
			loan.tooltip("截止日期应大于等于结算开始日期","error");
			return;
		}
		var totalFee = $("#totalPoundage").html()
		/*if(totalFee && totalFee <= 0) {
			loan.tooltip("没有需要结算的账单","error");
			return;
		}*/
		var csrfToken = $("#csrfToken").val();
		//提交请求
		loan.ajaxDo({
			url:loan.basePath+"/poundage/addPoundage",
			params:{"menuId":"7006",'menuLog':'1',"startDate":startDate,"endDate":endDate,"csrfToken":csrfToken},
			successCallback:function(response){
				loan.poundagesettle.loadToken();
				loan.poundagesettle.loadAgain();
			},
			bizErrCallback:function(response){
				var msg = "交易失败";
				if(response.errMsg) {
					msg = response.errMsg;
				}
				loan.tooltip(msg,"error");
				loan.poundagesettle.loadToken();
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	loadToken:function() {
		//提交请求
		loan.ajaxDo({
			url:loan.basePath+"/poundage/loadToken",
			params:{"menuId":"7006",},
			successCallback:function(result){
				var value = result.tokenValue;
				if(value) {
					$("#csrfToken").val(value);
				}
			},
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 求和
	 */
	sumCol:function() {
		var pundageTotal = parseFloat($("#poundagesGridId").jqGrid("getCol","platformPoundage",false,"sum")).toFixed(2);
		$("#totalPoundage").html(pundageTotal);
	},
	
	/**
	 * 
	 */
	queryLastDate:function() {
		//提交请求
		loan.ajaxDo({
			url:loan.basePath+"/poundage/queryLastSettleDate",
			params:{"menuId":"7006"},
			successCallback:function(result){
				var start = result.lastSettleDate;//结算开始日期
				var last = start.substr(0,4)+"-"+start.substr(4,2)+"-"+start.substr(6,2);
				var buziStr = parent.$(".head-small-nav .date").text();//batchdate
				var buzi = buziStr.split("/");
				var buziDate = new Date(buzi[0],buzi[1]-1,buzi[2]);
				var maxDate = new Date();
				var time = buziDate.getTime() - 24*60*60*1000;
				maxDate.setTime(time);
				$("#startDate").val(last);
				$('#endDate').datepicker({
					showOn: "button", 
					buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
					buttonImageOnly: true,
					changeMonth:true,
					changeYear:true,
					minDate:new Date(start.substr(0,4),start.substr(4,2)-1,start.substr(6,2)),
					maxDate:maxDate
				});
			},
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 页面加载
	 */
	initGrid:function() {
		var startDate = $("#startDate").val().replace(/\-/g,"");
		var endDate = $("#endDate").val().replace(/\-/g,"");
		jQuery("#poundagesGridId").jqGrid({
			url:loan.basePath+'/poundage/queryRepayNeedSettle',
			mtype:'POST',
			datatype: "json",
			postData:{format:'json','menuId':'7006','startDate':startDate,'endDate':endDate},
			//onSelectRow:onSelectRowFn,
			colNames: ['还款日期','还款金额(元)','归属平台手续费(元)','客户名称','证件类型','证件号','贷款产品种类','贷款金额(元)','贷款日期','还款id','借据id'], 
			colModel: [
			   {name:'repaymentDate',index:'repaymentDate', align:'center',sortable:false},
	           {name:'repaymentAmount',index:'repaymentAmount', align:'center',sortable:false,formatter:"formatMoneys"},
	           {name:'totalPfPoundage',index:'totalPfPoundage', align:'center',sortable:false,formatter:"formatMoneys"},
	           {name:'borrowerName',index:'borrowerName',align:'center',sortable:false}, 
	           {name:'idKindCn',index:'idKindCn',align:'center',sortable:false},
	           {name:'idNo',index:'idNo',align:'center',sortable:false},
	           {name:'productTypeCn',index:'productTypeCn',align:'center',sortable:false},
	           {name:'loanAmount',index:'loanAmount',align:'center',sortable:false},
	           {name:'loanDate',index:'loanDate',align:'center',sortable:false},
	           {name:'repaymentId',index:'repaymentId', align:'center',hidden:true},
	           {name:'receiptId',index:'receiptId', align:'center',hidden:true},
	        ], 
	        jsonReader:{ 
				root: "response.list",//数据项
				records: "response.totalResult",//总记录数
				repeatitems : false
			},
			rowNum:-1,//全部显示
			pager:jQuery('#poundagesPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			height: 'auto',
			autowidth: true,	
			forceFit:true,//调整列宽不会改变表格宽度
			loadComplete : function(data) {
				var result = data.response;
				if(result.success){
					$("#totalPoundage").html(result.totalFee);
				} else {
					loan.tooltip(result.errMsg,"error");
				}
			}
		});
	},
	
	/**
	 * 重新加载
	 */
	loadAgain:function() {
		$("#totalPoundage").html("");//清空总额
		$('#endDate').val("");//清空日期
		loan.poundagesettle.queryLastDate();
		//清空数据
		jQuery("#poundagesGridId").jqGrid("clearGridData");
		//结算按钮不可用
		$("#readyFlag").attr("value","2");
		$("#submit_button").removeClass("u-btn-bg-blue").addClass("u-btn-bg-blue-disabled");
		$("#submit_button").attr("href","#");
	}
	
}

$(function(){
	//金额格式化，两位小数
	jQuery.extend($.fn.fmatter,{
		formatMoneys:function(cellvalue,option,rowdata){
			cellvalue = formatMoney(cellvalue,".",2);
			return cellvalue;
		}
	});
	loan.poundagesettle.queryLastDate();
})
