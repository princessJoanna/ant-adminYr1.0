loan.first = loan.first || {
	
	/**
	 * 搜索
	 */
	query:function() {
		var searchOrgId = $("#parentOrgId").val();
		var userRealName = $("#userRealName").val();
		var compareResult = compareDate($("#startDate").val(), $("#endDate").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var startDate = dateStrToStr($("#startDate").val());
		var endDate = dateStrToStr($("#endDate").val());
		$("#firstCheckGridId").jqGrid("setGridParam", {   
			postData:{
				'format':'json',
				'userRealName':userRealName,
				'menuId':'7005',
				'startDate':startDate,
				'endDate':endDate,
				'searchOrgId':searchOrgId
			},
			page:1
	    }).trigger('reloadGrid');
	},
	
	/**
	 * 选中行的触发事件
	 */
	selectRowFunc : function(rowid) {
		$("#rowid").attr("value",rowid);// 记录当前选中的行的rowid
	},
	
	/**
	 * 清空查询条件
	 */
	clearlendVal : function() {
		$("#userRealName").val("");
		$("#startDate").val("");
		$("#endDate").val("");
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

$(function() {
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
});

$(window).resize(function(){
	loan.grid.mdetailconWidth("firstCheckGridId");
})
