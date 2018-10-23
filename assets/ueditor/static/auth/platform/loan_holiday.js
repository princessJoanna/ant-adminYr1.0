loan.holiday = loan.holiday || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#holidayGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1007','format':'json'}
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 搜索
	 */
	searchFunc : function() {
		var beginDate = $("#beginDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		if(beginDate && endDate && (beginDate > endDate)) {
			loan.tooltip("开始日期应该小于结束日期","error");
			return;
		}
		$("#holidayGridId").jqGrid("setGridParam",{
			postData:{'menuId':'1007','format':'json','beginDate':beginDate,
				'endDate':endDate},
			page:1
		}).trigger('reloadGrid');
	},
	
	/**
	 * 清空查询条件
	 */
	clearCondition : function() {
		$("#beginDate").val("");
		$("#endDate").val("");
	},
	
	/**
	 * 清空新增条件
	 */
	clearAddFunc:function() {
		$("#addBeginDate").val("");
		$("#addEndDate").val("");
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
	 * 新增
	 */
	addHoliday:function() {
		var beginDate = $("#addBeginDate").val().replace(/-/g,"");
		var endDate = $("#addEndDate").val().replace(/-/g,"");
		if(!beginDate) {
			loan.tooltip("请选择新增假日的开始日期","error");
			return;
		}
		if(!endDate) {
			loan.tooltip("请选择新增假日的结束日期","error");
			return;
		}
		if(beginDate > endDate) {
			loan.tooltip("新增假日的开始日期应该小于结束日期","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/holiday/addHoliday",
			params:{'menuId':'100701','menuLog':'1','format':'json','beginDate':beginDate,
				'endDate':endDate},
			successCallback:function(){
				loan.holiday.freshGrid();
				$("#addBeginDate").val("");
				$("#addEndDate").val("");
			},
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
		var holidayDate = $("#holidayGridId").jqGrid("getCell", rowid, "holidayDate");
		var title = "提示";
		var content = "确定要删除【"+holidayDate+"】假日吗？";
		loan.holiday.confirmDialog(title,content,loan.holiday.delHoliday);
	},
	
	/**
	 * 删除
	 */
	delHoliday:function() {
		var rowid = $("#rowid").val();
		var holidayId = $("#holidayGridId").jqGrid("getCell", rowid, "holidayId");
		loan.ajaxDo({
			url:loan.basePath+"/holiday/delHoliday",
			params:{'menuId':'100702','menuLog':'1','format':'json','holidayId':holidayId},
			successCallback:loan.holiday.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化页面
	 */
	initPage:function(){
		if($("#100701").length == 1) {
			$("#hldc").html("<ul class='search-con f-fl'><li><label class='f-w-auto'>开始日期：</label>" +
					"<div class='date' id='hldc'>" +
					"<input type='text' readonly class='u-ipt u-ipt-sm' id='addBeginDate' />" +
					"</div></li>"+
					"<li><label class='f-w-auto'>结束日期：</label>" +
					"<div class='date' id='hldc'>" +
					"<input type='text' readonly class='u-ipt u-ipt-sm' id='addEndDate' />" +
					"</div></li>"+
					"<li><a onclick='loan.holiday.clearAddFunc()' class='u-btn u-btn-auto u-btn-bg-blue u-bd-color-blue '>清空</a>" +
					"</li></ul>");
		}
		$('#beginDate').datepicker({
			showOn: "button", 
			buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
			buttonImageOnly: true
		});
		$('#endDate').datepicker({
			showOn: "button", 
			buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
			buttonImageOnly: true
		});
		if($("#100701").length == 1) {
			$('#addBeginDate').datepicker({
				showOn: "button", 
				buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
				buttonImageOnly: true
			});
			$('#addEndDate').datepicker({
				showOn: "button", 
				buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
				buttonImageOnly: true
			});
		}
	}
	
}