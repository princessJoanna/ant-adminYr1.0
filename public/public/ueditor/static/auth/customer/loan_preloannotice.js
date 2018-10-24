loan.preloannotice = loan.preloannotice || {
	
	/**
	 * 出资机构id 后台在session中接收
	 */
	//orgId : 1001,
	
	datepicker: function(){
		$('#createTime').datepicker({
			showOn: "button", 
			buttonImage: loan.basePath + "/static/auth/common/element/jqueryui/css/images/calendar.gif",
			buttonImageOnly: true
		});
	},
	
	timepicker: function(){
		$("#sendTime").datepicker({
			showOn: "button", 
			buttonImage: loan.basePath + "/static/auth/common/element/jqueryui/css/images/calendar.gif",
			buttonImageOnly: true ,
			minDate :new Date(),
			//maxDate :new Date(new Date().getFullYear(),new Date().getMonth()-3,new Date().getDate()),
			detailTime:true,
			showMaxTime:true,
			onClose:function(){
				//getReadyverify($("#createEndTime"));
			}
		});
	},
	
	clear:function() {
		$("#createTime").val("");
		$("#workUnit").val("");
		$("#userName").val("");
		$("#hasSend").attr("checked","checked");
	},
	clears:function() {
		$("#sendTime").val("");
	},
	
	search : function(){
		var workUnit = null; //工作单位
		var createTime = null; //导入日期
		var hasSend = null; //是否设定发送
		var userName = null;
		
		if($.trim($("#createTime").val())!="") {
			createTime = $("#createTime").val();
		}
		if($.trim($("#workUnit").val())!="" && $("#workUnit").val()!=null) {
			workUnit = $("#workUnit").val();
		}
		if($.trim($("#userName").val())!="" && $("#userName").val()) {
			userName = $("#userName").val();
		}
		if($("#hasSend").prop("checked")) {
			hasSend = $("#hasSend").val();
		}
		
		$("#preloanGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'800106','workUnit':workUnit,
				'userName':userName,'createTime':createTime,'hasSend':hasSend},
			page:1
	    }).trigger('reloadGrid'); 
	},
	
	msToDate : function(){
		var cellArray = $("#gbox_preloanGridId").find("td[aria-describedby=preloanGridId_sendTime]");
		//console.log(cellArray);
		$(cellArray).each(function (i, cell){
			//alert(loan.preloannotice.formatTime(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'));
			var ms = $(cell).html();
			if(ms!='&nbsp;'){
				//console.log(ms);
				var time = loan.preloannotice.formatTime(parseInt(ms));
				$(cell).html(time);
				$(cell).attr("title",time);
			}
		});
	},

	formatTime : function (timestamp) {
		var time = new Date(timestamp);
		var year = time.getFullYear();
		var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1));
		var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate());
		var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours());
		var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes());
		var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds());
		var YmdHis = year + '-' + month + '-' + date
			+ ' ' + hour + ':' + minute + ':' + second;
		return YmdHis;
	},
	
	/**
     * 增加预授信通知
     */
    addNoticeOrUpdateSendTime:function() {
    	var addNoticeList = new Array();
    	var sendTime = $("#sendTime").val();
    	var checkboxArray = $("#preloanGridId").find("input[type=checkbox]");
		$(checkboxArray).each(function (i, item){
			var val = $(item).val();
			
			if($(item).prop("checked")){
				var userId = $(item).parent().parent().find("td[aria-describedby=preloanGridId_userId]").attr("title");
				var noticeId = $(item).parent().parent().find("td[aria-describedby=preloanGridId_noticeId]").attr("title");
				var noticeStatus = $(item).parent().parent().find("td[aria-describedby=preloanGridId_noticeStatus]").attr("title");
				addNoticeList.push({'userId': userId, 'noticeId': noticeId, 'noticeStatus':noticeStatus, 'sendTime':sendTime});
			}
		});
		//判断是否为空
		if(sendTime=='' || sendTime==undefined || sendTime==null){
			loan.tooltip("请设定发送时间","error");
			return;
		}
		
		if(addNoticeList.length==0){
			loan.tooltip("请至少选择一位客户","error");
			return;
		};
		
		var addList = JSON.stringify(addNoticeList);
        loan.ajaxDo({
            url:loan.basePath+"/borrower/addPreLoanNotice",
            params:{'addList':addList,menuId:'800106','menuLog':'1',format:'json'},
            successCallback:loan.preloannotice.freshGrid,
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
    },
    
    /**
	 * 刷新 jqgrid
	 */
    freshGrid:function() {
		$("#preloanGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'800106'}
	    }).trigger('reloadGrid'); 
	},

};