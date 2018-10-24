loan.customlist = loan.customlist || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'8001'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	

	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
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



	showBorrowerInfoBtn:function(menuId,rowid){	
		var userId = $("#userGridId").jqGrid('getCell',rowid,'userId');
		var userKind = $("#userGridId").jqGrid('getCell',rowid,'userKind');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/borrower/toBorrowerInfo?menuId="+menuId+"&userKind="+userKind+"&userId="+userId,"toBorrowerInfo",true);
	},
	

	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){

        var endTime = $("#endTime").val();
        var startTime = $("#startTime").val();
        var condition = $("#condition").val();
        var compareResult = compareDate($("#startTime").val(),$("#endTime").val());
        if(compareResult) {
            loan.tooltip("起始日期大于结束日期","error");
            return;
        }

        if(startTime && endTime) {
        	startTime = startTime + " 00:00:00";
        	endTime = endTime + " 23:59:59";
            $("#userGridId").jqGrid("setGridParam", {
                postData:{'menuId':'8009','startTime':startTime,'endTime':endTime,'condition':condition,
                    'format':'json'},
                page:1
            }).trigger('reloadGrid');
		}
		else if (startTime && !endTime)  {
            startTime = startTime + " 00:00:00";
            $("#userGridId").jqGrid("setGridParam", {
                postData:{'menuId':'8009','startTime':startTime,'condition':condition,
                    'format':'json'},
                page:1
            }).trigger('reloadGrid');
		}
        else if (!startTime && endTime)  {
            endTime = endTime + " 23:59:59";
            $("#userGridId").jqGrid("setGridParam", {
                postData:{'menuId':'8009','endTime':endTime,'condition':condition,
                    'format':'json'},
                page:1
            }).trigger('reloadGrid');
        }
        else {
            $("#userGridId").jqGrid("setGridParam", {
                postData:{'menuId':'8009','condition':condition,'startTime':"",'endTime':"",
                    'format':'json'},
                page:1
            }).trigger('reloadGrid');
		}
	},
        /**清空查询条件*/
        clearlendVal : function() {
            $("#condition").val("");
            $("#startTime").val("");
            $("#endTime").val("");
        },
};

$(function(){
     loan.selFun('selAll');
     loan.selFun('adv');
    $('#startTime').datepicker({
        showOn: "button",
        buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
        buttonImageOnly: true
    });
    $('#endTime').datepicker({
        showOn: "button",
        buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
        buttonImageOnly: true
    });
})

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
function compareDate(startTime, endTime){
    var start=new Date(startTime.replace("-", "/").replace("-", "/"));
    var end=new Date(endTime.replace("-", "/").replace("-", "/"));
    if(end<start){
        return true;
    }else{
        return false;
    }
}