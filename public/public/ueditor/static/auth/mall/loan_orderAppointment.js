loan.orderAppointment = loan.orderAppointment || {
	sell_sellorderquery : function() {
		var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
		if(compareResult) {
			loan.tooltip("起始日期大于结束日期","error"); 
			return;
		}
		var startDate = $("#startDate").val();
		if(startDate) {
			startDate = startDate + " 00:00:00";
		}
		var endDate = $("#endDate").val();
		if(endDate) {
        	endDate = endDate + ' 23:59:59';
		}
		var userIdNum = $("#userIdNum").val();
		var workUnit = $("#unitName").val();
		$("#appointmentOrderGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'600902',
				'startDate':startDate,'endDate':endDate,'format':'json'},
			page:1
	    }).trigger('reloadGrid');
	},
	
	/**选中行的触发事件*/
	selectRowFunc : function(rowid) {
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},

	/**
     * 关闭子框架
     */
    closeChildFrame : function () {
        loan.tabcut.childClosedIframe ( true );
    },

    /**
     * 关闭子框架 和 弹出的页面
     */
    closeChildFrameAndPage : function () {
        parent.document.getElementById('btn').click();   //调用父页面的 loan.tabcut.childClosedIframe ( true )
    },

	appointmentDeal:function(memuId,rowId) {
    	var rowObj = $("#appointmentOrderGridId").jqGrid('getRowData', rowId);
		var appointmentOrderId = rowObj.appointmentOrderId;
		var customerId = rowObj.customerId;
		parent.loan.tabcut.childAddIframe("预约处理",loan.basePath+"/orderappointment/appointmentDeal?appointmentOrderId="+appointmentOrderId+"&customerId="+customerId+"&memuId=60090201","appointmentDeal",true,true);
	},

    auditAppointmentDeal:function(memuId,rowId) {
        var rowObj = $("#auditAppointmentOrderGridId").jqGrid('getRowData', rowId);
        var appointmentOrderId = rowObj.appointmentOrderId;
        parent.loan.tabcut.childAddIframe("待审处理",loan.basePath+"/orderappointment/auditAppointmentDeal?appointmentOrderId="+appointmentOrderId+"&memuId=60090301","auditAppointmentDeal",true,true);
    },

	
	/**分配*/
	assign : function() {
		var appointmentOrderId = $("#appointmentOrderId").val();
		loan.s_addPop("",loan.basePath+"/orderappointment/toassaign?appointmentOrderId="+appointmentOrderId,"",400,200,{isRefresh:false});	
	},
	
	/**舍弃*/
	abandon : function() {
		var appointmentOrderId = $("#appointmentOrderId").val();
		loan.s_addPop("",loan.basePath+"/orderappointment/toabandon?appointmentOrderId="+appointmentOrderId,"",430,230,{isRefresh:false});
	},
	
	/**确认分配 */
	appointmentDistribute: function() {
		var appointmentOrderId = $("#appointmentOrderId").val();
		var salesManagerId = $("#salesManagerId").val();
		var salesManagerName = $("#salesManagerId").find("option:selected").text();
		var userName = parent.document.getElementById("userName").value;
		if(userName==null) userName="";
		loan.ajaxDo({
	  		url:loan.basePath+"/orderappointment/appointmentdistribute",
	  		params:{'appointmentOrderId':appointmentOrderId,
	  			'salesManagerId':salesManagerId,
				'salesManagerName':salesManagerName,
                'userName':userName
			},
	  		successCallback:loan.orderAppointment.closeChildFrameAndPage,
		  	successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	  	});
	},
	
	/**确认舍弃 */
	appointmentAbandon: function() {
		var appointmentOrderId = $("#appointmentOrderId").val();
		var remark = $("#remark").val();
        // loan.tooltip(appointmentOrderId,"error");
		if(remark == null || remark == ""){
			loan.tooltip("备注不能为空","error");
		}else if(remark.length>50){
			loan.tooltip("备注不能超过50字","error");
		}else{
			loan.ajaxDo({
		  		url:loan.basePath+"/orderappointment/appointmentabandon",
		  		params:{
		  			'appointmentOrderId':appointmentOrderId,
					'remark':remark
				},
		  		successCallback:loan.orderAppointment.closeChildFrameAndPage,
		  		successTip:true, //提示
	            bizErrTip:true,  //提示
	            chainPar:this
		  	});
		}
	},

	/**清空查询条件*/
	clearlendVal : function() {
		$("#startDate").val("");
		$("#endDate").val("");
	},
	
	/**刷新当前页面*/
	commSuccFun : function(){
		loan.s_Pop_closedChild();
	},
	
	/**
	 * 初始化客户经理列表
	 */
	initSalesManagerList:function(){
	     loan.ajaxDo({
			url:loan.basePath + "/orderappointment/querysalesmanager",
			params:{"format":"json"},
			successCallback:loan.orderAppointment.ajaxSalesManagerList,
            bizErrTip:true,  //提示
            chainPar:this
		});
	},

	/**
	 * 异步加载签约产品列表信息
	 */
	ajaxSalesManagerList:function(result){
		var salesManagerObj = $("#salesManagerId");
		var salesManagerList = result.list;
		for(var i = 0; i < salesManagerList.length; i++) {
			var salesManagerId = salesManagerList[i].salesManagerId;
			var salesManagerName = salesManagerList[i].salesManagerName;
			salesManagerObj.append("<option value='" + salesManagerId + "'\>" + salesManagerName + "<\li>");
		}
	},
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

$(window).resize(function(){
	loan.grid.mdetailconWidth("appointmentOrderGridId");
})
