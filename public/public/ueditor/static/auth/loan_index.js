Date.prototype.Format = function (fmt) {
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
loan.index = loan.index || {
	
	noticeTypeStyle1001 : "index-clock f-size24 f-mr10",
	noticeTypeStyle1002 : "index-over f-size24 f-mr10",
	noticeTypeStyle2001 : "index-survey f-size20 f-mr10",
	
	noticeTypeStyle2002 : "index-examuser f-size20 f-mr10",
	noticeTypeStyle2005 : "index-exam f-size20 f-mr10",
	
	/**
	 * 获取系统时间
	 */
	getBatchDate:function() {
		// loan.ajaxDo({
		// 	url:loan.basePath+"/common/queryBatchDate",
		// 	//params:{},
		// 	successCallback:function(result){
		// 		var date = result.busiDate.toString();
		// 		var date1 = date.substr(0,4)+"/"+date.substr(4,2)+"/"+date.substr(6,2);
		// 		$(".head-small-nav .date").text(date1);
		//
		// 		//var busiDate = new Date(date.substr(0,4),date.substr(4,2)-1,date.substr(6,2));
		// 		//$(".head-small-nav .date").text(busiDate.toLocaleDateString());
		// 	},
		// 	successTip:false, //提示
		// 	bizErrTip:false,  //提示
		// 	chainPar:this
		// });
	},
	
	queryAnnounces:function() {
        // //清空原有
        // $("#notice").children("p").remove();
        // $("#notice div a").remove();
        // var params = {
			// 	receiveType : '0',
			// 	status : '1',
			// 	page : '1',
			// 	rows : '4',
			// 	indexShow : '1',
        // };
        // loan.ajaxDo({
        //     url:loan.basePath+"/announce/queryAnnouncePaged",
        //     params:params,
        //     successCallback:loan.index.showAnnouncesResult,
        //     successTip:false, //提示
        //     bizErrTip:false,  //提示
        //     chainPar:this
        // });
	},
	
	getNoticeTypeStyle : function(noticeTypeId){
		if(noticeTypeId == 1001){
			spanStyle = loan.index.noticeTypeStyle1001;
		}else if(noticeTypeId == 1002){
			spanStyle = loan.index.noticeTypeStyle1002;
		}else if(noticeTypeId == 2001){
			spanStyle = loan.index.noticeTypeStyle2001;
		}else if(noticeTypeId == 2002 || noticeTypeId == 2003){
			spanStyle = loan.index.noticeTypeStyle2002;
		}else if(noticeTypeId == 2004 ||noticeTypeId == 2005){ //审核类
			spanStyle = loan.index.noticeTypeStyle2005;
		}
		
		return spanStyle;
	},
	
	getTabId : function(noticeTypeId){
		var tabId = '0';
		if(noticeTypeId == 2001){
			tabId = '6004';
		}else if(noticeTypeId == 2002){
			tabId = '8003';
		}else if(noticeTypeId == 2003){
			tabId = '5002';
		}else if(noticeTypeId == 2004){
			tabId = '5003';
		}else if(noticeTypeId == 2005){
			tabId = '6003';
		}else if(noticeTypeId == 1001 || noticeTypeId == 1002){
			tabId = '7004';
		}
		return tabId;
	},
	
	
	showAnnounceMore:function(){	
		parent.loan.tabcut.childAddIframe("公告",loan.basePath+"/announce/toMgrAnnounce","announceMore",true,true);
	},
	
	showAnnInfo:function(announceId){	
		parent.loan.tabcut.childAddIframe("公告",loan.basePath+"/announce/toMgrAnnInfo?announceId="+announceId,"annInfo",true,true);
	},
	
	showAnnouncesResult : function(result) {
		var list = result.pager.items;
		if(!list || list.length === 0 ) return;
		$("#notice").children("p").remove();
		$("#notice div a").remove();
		//$("#base-notice-ul").html('');
		if(list.length > 2) {
			//${pageContext.request.contextPath}/announce/toMgrAnnounce
			$("#notice div").prepend("<a href='javascript:loan.index.showAnnounceMore();'>更多</a>");
		}
		$(list).each(function(index, item) {
			/*var html = "<li><a href='' value = '"
				+ item.announceId + "'>"
				+ item.title + "</a></li>";
			$("#base-notice-ul").append(html);*/
			if(index > 2) {
				return;
			}
			var ht = "<p class='bot fot' onmouseover='showDetails(this)' onmouseout='closeDetails(this)' >● <a href=\"javascript:loan.index.showAnnInfo('"
				+ item.announceId +"');\">"
				+ item.title + "</a></p>";
			$("#notice").append(ht);
		});
	},
	
	showNoticeCountResult : function(response){
		if(response.list!=null){
			//console.log(response.list);
			
			//清空上次结果
			$(".notice-handle").remove();
			//遍历查询结果
			$(response.list).each(function (index, item) {
				var beforeString = item.typeTemplate.split(item.msgCount)[0];
				var afterString = item.typeTemplate.split(item.msgCount)[1];
				var spanStyle = null;
				
				spanStyle = loan.index.getNoticeTypeStyle(item.noticeTypeId);
				
				var html = "<p class='bot notice-handle'><span class='"
					     + spanStyle
						 + "'></span>"
						 + beforeString 
						 + "<a class='notice-link-index" + index +"' href='javascript:void(0);' onclick=''>"
						 + "<strong>" + item.msgCount + "</strong></a>"
						 + afterString
						 + "</p>";
				
				var noticeNavli = "<li class='notice-handle'><a class='notice-link-index" + index +"' href='javascript:void(0);' onclick=''>" + item.typeTemplate + "</a></li>";
				
				if(typeof(item.linkUrl) != 'undefined' && item.linkUrl!='' && typeof(item.typeName) != 'undefined' && item.typeName!=''){
					$("#base-notice-ul").append(noticeNavli);
					if(item.noticeKind == 0){
						$("#remind").after(html);
					}else{
						$("#todo").after(html);
					}
					$(".notice-link-index"+index).attr("onclick","loan.index.gotoLinkUrl('"+ item.linkUrl +"','"+ item.noticeTypeId +"','"+ item.typeName +"');");
				}
			});
		}else{
		}
		
	},
	
	gotoLinkUrl : function(linkUrl, noticeTypeId, typeName){
		loan.index.updateMaxNoticeCheck(noticeTypeId);
		var tabId = loan.index.getTabId(noticeTypeId);
		parent.loan.tabcut.childAddIframe(typeName , loan.basePath + linkUrl, tabId, true);
	},
	
	updateMaxNoticeCheck : function(noticeTypeId) {
		if(noticeTypeId === '1001' || noticeTypeId === '1002') {
			loan.ajaxDo({
				params : {'format':'json','noticeTypeId':noticeTypeId},
	            url:loan.basePath+"/noticeHandle/updateMaxNoticeCheck",
	            successTip:false, //提示
	            bizErrTip:false,  //提示
	            chainPar:this
	        });
		}
	},
	/**
	 * 查询消息提醒条目数
	 */
	queryNoticeCount : function(){
        // //var myDate = new Date();
        // //console.log("Notice Count Refresh:"+myDate.toLocaleTimeString());
        // loan.ajaxDo({
        //     url:loan.basePath+"/noticeHandle/queryNoticeTypeCount",
        //     successCallback:loan.index.showNoticeCountResult,
        //     successTip:false, //提示
        //     bizErrTip:false,  //提示
        //     chainPar:this
        // });
	},
	
	/**
	 * 自动刷新
	 */
	autoRefresh : function(){ 
		window.setInterval(loan.index.queryNoticeCount,600000); 
	},
	
	/**
	 * 查询放款、还款、逾期汇总
	 */
	queryLoanResult : function() {
		
	},
	
	/**
	 * 查询还款汇总
	 */
	queryPayResult : function(type) {
		// if(type == ""||type == undefined){
		// 	type = "0";
		// }
		// loan.ajaxDo({
		// 	url:loan.basePath+"/org/queryPayResult",
		// 	params:{format:'json',"type":type},
         //    successCallback:function(result){
         //    	var amount  = 0.00;
        	// 	if(result && result.amount){
        	// 		amount = amount+result.amount;
        	// 	}
        	// 	amount = formatMoney(amount,".",2);
        	// 	if(type == "0"){
        	// 		$("#dayPayAmount").text(amount);
        	// 		$("#dayPayCount").text(result.count);
        	// 	}
        	// 	if(type == "1"){
        	// 		$("#monthPayAmount").text(amount);
        	// 		$("#monthPayCount").text(result.count);
        	// 	}
        	// 	if(type == "2"){
        	// 		$("#allPayAmount").text(amount);
        	// 		$("#allPayCount").text(result.count);
        	// 	}
         //    },
         //    successTip:false, //提示
         //    bizErrTip:false,  //提示
         //    chainPar:this
		// });
	},
	
	/**
	 * 查询放款汇总
	 */
	queryLoanResult : function(type) {
		// if(type == ""||type == undefined){
		// 	type = "0";
		// }
		// loan.ajaxDo({
		// 	url:loan.basePath+"/org/queryLoanResult",
		// 	params:{format:'json',"type":type},
         //    successCallback:function(result){
         //    	var amount  = 0.00;
        	// 	if(result.amount){
        	// 		amount = amount+result.amount;
        	// 	}
        	// 	amount = formatMoney(amount,".",2);
        	// 	if(type == "0"){
        	// 		$("#dayLoanAmount").text(amount);
        	// 		$("#dayLoanCount").text(result.count);
        	// 	}
        	// 	if(type == "1"){
        	// 		$("#monthLoanAmount").text(amount);
        	// 		$("#monthLoanCount").text(result.count);
        	// 	}
        	// 	if(type == "2"){
        	// 		$("#allLoanAmount").text(amount);
        	// 		$("#allLoanCount").text(result.count);
        	// 	}
         //    },
         //    successTip:false, //提示
         //    bizErrTip:false,  //提示
         //    chainPar:this
		// });
	},
	
	/**
	 * 查询逾期汇总
	 */
	queryDelayResult : function(type) {
		// if(type == ""||type == undefined){
		// 	type = "0";
		// }
		// loan.ajaxDo({
		// 	url:loan.basePath+"/org/queryDelayResult",
		// 	params:{format:'json',"type":type},
         //    successCallback:function(result){
         //    	var amount  = 0.00;
        	// 	if(result.amount){
        	// 		amount = amount+result.amount;
        	// 	}
        	// 	amount = formatMoney(amount,".",2);
        	// 	if(type == "0"){
        	// 		$("#dayDelayAmount").text(amount);
        	// 		$("#dayDelayCount").text(result.count);
        	// 	}
        	// 	if(type == "1"){
        	// 		$("#monthDelayAmount").text(amount);
        	// 		$("#monthDelayCount").text(result.count);
        	// 	}
        	// 	if(type == "2"){
        	// 		$("#allDelayAmount").text(amount);
        	// 		$("#allDelayCount").text(result.count);
        	// 	}
         //    },
         //    successTip:false, //提示
         //    bizErrTip:false,  //提示
         //    chainPar:this
		// });
	},
	
	queryWorkFlowTask : function(){
        // loan.ajaxDo({
        //     url:loan.basePath+"/flowTask/queryTaskNotice",
        //     successCallback:loan.index.showFlowTaskNotice,
        //     successTip:false, //提示
        //     bizErrTip:false,  //提示
        //     chainPar:this
        // });
	},
	showFlowTaskNotice : function(result){
		if(result && result.domain){
			var html = '';
			html = '<p class="bot"><span class="index-survey f-size30 f-mr10"></span>您有<a href="javascript:void(0);" onclick="loan.index.openTaskLink(\'4102\')"><strong>' + (result.domain.applyTotal == undefined ? '0' :result.domain.applyTotal)  + '</strong></a>借款申请待办任务</p>';
			html += '<p class="bot"><span class="index-survey f-size30 f-mr10"></span>您有<a href="javascript:void(0);" onclick="loan.index.openTaskLink(\'4103\')"><strong>' + (result.domain.contractTotal == undefined ? '0' : result.domain.contractTotal) + '</strong></a>合同审批待办任务</p>';
			html += '<p class="bot"><span class="index-survey f-size30 f-mr10"></span>您有<a href="javascript:void(0);" onclick="loan.index.openTaskLink(\'4101\')"><strong>' + (result.domain.creditTotal == undefined ? '0' : result.domain.creditTotal) + '</strong></a>授信审批待办任务</p>';
			html += '<p class="bot"><span class="index-survey f-size30 f-mr10"></span>您有<a href="javascript:void(0);" onclick="loan.index.openTaskLink(\'4104\')"><strong>' + (result.domain.lendingTotal == undefined ? '0' : result.domain.lendingTotal) + '</strong></a>放款申请待办任务</p>';
			html += '<p class="bot"><span class="index-survey f-size30 f-mr10"></span>您有<a href="javascript:void(0);" onclick="loan.index.openTaskLink(\'4105\')"><strong>' + (result.domain.interestTotal == undefined ? '0' : result.domain.interestTotal) + '</strong></a>利率调整待办任务</p>';
			html += '<p class="bot"><span class="index-survey f-size30 f-mr10"></span>您有<a href="javascript:void(0);" onclick="loan.index.openTaskLink(\'4106\')"><strong>' + (result.domain.feeAdjustTotal == undefined ? '0' : result.domain.feeAdjustTotal) + '</strong></a>费息调整待办任务</p>';
			html += '<p class="bot"><span class="index-survey f-size30 f-mr10"></span>您有<a href="javascript:void(0);" onclick="loan.index.openTaskLink(\'4117\')"><strong>' + (result.domain.delayTotal == undefined ? '0' : result.domain.delayTotal) + '</strong></a>展期调整待办任务</p>';
			$("#remind").after(html);
		}
	},
	openTaskLink : function(type){
		parent.loan.tabcut.childAddIframe("待办任务" ,loan.basePath + "/flow/toTaskList?menuId=6201&type=" + type,"flowTask",true,true);
	}
};

function showDetails(o){
    o.getElementsByTagName("a").item(0).style.cssText = "position:absolute; display:block;cursor:hand; word-break: break-all;width:280px;white-space: normal";
}

function closeDetails(o){
    o.getElementsByTagName("a").item(0).style.cssText = "";
}

function formatMoney(nData,decimalSeparator,decimalPlaces) {
	var floatRegex = /^[0-9]+(\.[0-9]+)?$/ ;
	if(floatRegex.test(nData)) {
		var bNegative = (nData < 0);
		var sOutput = String(nData);
		var sDecimalSeparator = decimalSeparator || ".";
		var nDotIndex;
		var nDecimalPlaces = decimalPlaces || 2;
		var nDecimal = Math.pow(10, nDecimalPlaces);
		sOutput = String(Math.round(nData*nDecimal)/nDecimal);
		nDotIndex = sOutput.lastIndexOf(".");
		if(nDecimalPlaces > 0) {
			// Add the decimal separator
			if(nDotIndex < 0) {
				sOutput += sDecimalSeparator;
				nDotIndex = sOutput.length-1;
			}
			// Replace the "."
			else if(sDecimalSeparator !== "."){
				sOutput = sOutput.replace(".",sDecimalSeparator);
			}
			// Add missing zeros
			while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
				sOutput += "0";
			}
		}
		return sOutput;
	}
	return '';
}