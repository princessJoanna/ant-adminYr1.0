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
var maxValue = 0;
var busiDate = -1;
loan.adjustcredit = loan.adjustcredit || {
	gridholder:{ 
		readonly: false, 
		dataEvents: [
		             { type: 'focus', 
		            	 fn: function (e) { 
		            		 if($(this).val() == '0' || $(this).val() == '0.00') {
		            			 $(this).val('');
		            			 } 
		            		 } 
		             },
		             ]
	},
	gridId : 'creditDetailGridId',
	/**
	 * 查询数据字典
	 */
    queryDictItems:function(dictid,callbackFunc) {
    	loan.ajaxDo({
			url:loan.basePath+"/dict/dictItems",
			params:{"dictId":dictid,"menuId":"600206"},
			successCallback:callbackFunc,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	/**
	 * 查询信息
	 */
	queryCreditDetail: function(creditId) {
		loan.ajaxDo({
			url:loan.basePath+"/credit/queryCreditDetail",
			params:{'menuId':'600206','format':'json','creditId':creditId},
			successCallback:loan.adjustcredit.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 比较日期
	 */
	compareDates : function(now,beginDate, endDate) {
		if($.trim(beginDate) == "") {
			loan.tooltip("请选择开始日期","error");
	        return false;  
		}
		if($.trim(endDate) == "") {
			loan.tooltip("请选择结束日期","error");
	        return false;  
		}
		var start=new Number(beginDate.replace(/-/g,"")); 
	    var end=new Number(endDate.replace(/-/g,""));
	    if(now!=-1 && end<now) {
	    	loan.tooltip("结束日期不应小于当前日期","error");
	        return false;  
	    } 
	    if(end<start){  
	    	loan.tooltip("开始日期不应大于结束日期","error");
	        return false;  
	    }  
	    return true;  
	},
	
	/**
	 * 获取系统时间
	 */
	getBusiDate:function(menuId) {
		var buziStr = parent.$(".head-small-nav .date").text();
		busiDate = new Number(buziStr.replace(/\//g,""));
	},
	
	/**
	 * 调整授信
	 */
	adjustCredit:function() {
		var userId = $("#userId").val();
		loan.adjustcredit.getBusiDate("600206");
		if(!loan.adjustcredit.compareDates(busiDate,$("#beginDate").val(),$("#endDate").val())) {
			return;
		}
		$("#creditDetailGridId").jqGrid("saveCell", $("#rowid").val(), $("#iCol").val());
		var details = jQuery("#creditDetailGridId").jqGrid("getRowData");
		var list = new Array();
		for(var i = 0; i < details.length; i++) {
			
			if($.trim(details[i].信用) == "" || $.trim(details[i].保证) == ""
				|| $.trim(details[i].抵押) == ""|| $.trim(details[i].质押) == "") {
				loan.tooltip("请填写第"+(i+1)+"条授信种类信息","error");
				return;
			}
			//信用
			var creditobj = new Object();
			creditobj.creditType = details[i].creditType;
			creditobj.creditAmount = details[i].信用;
			creditobj.warrantType = '0';
			list.push(creditobj);
			//担保
			var guarobj = new Object();
			guarobj.creditType = details[i].creditType;
			guarobj.creditAmount = details[i].保证;
			guarobj.warrantType = '3';
			list.push(guarobj);
			//抵押
			var pleobj = new Object();
			pleobj.creditType = details[i].creditType;
			pleobj.creditAmount = details[i].抵押;
			pleobj.warrantType = '1';
			list.push(pleobj);
			//质押
			var mortobj = new Object();
			mortobj.creditType = details[i].creditType;
			mortobj.creditAmount = details[i].质押;
			mortobj.warrantType = '2';
			list.push(mortobj);
		}
		var sum = new Number($("#amounts").val());
		if(!sum || sum < 0) {
			loan.tooltip("授信总金额应大于0元","error");
			return;
		}
		var creditDetails = JSON.stringify(list);
		var beginDate = $("#beginDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		var remark = $("#remark").val();
		var oldCreditId = $("#creditId").val();
		var status = $('#status').val();
		var confirmStatus = $('#confirmStatus').val();
		loan.ajaxDo({
			url:loan.basePath+"/credit/adjustCredit",
			params:{"menuId":"600206",'menuLog':'1',"userId":userId,"beginDate":beginDate,"endDate":endDate,
				"creditDetails":creditDetails,"remark":remark,"oldCreditId":oldCreditId ,'creditId'  : oldCreditId, 'status' : status , 'confirmStatus':confirmStatus },
			successCallback:function(){
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 工作流修改授信记录
	 * */
	editCredit:function(type) {
		var userId = $("#userId").val();
		loan.adjustcredit.getBusiDate("600206");
		if(!loan.adjustcredit.compareDates(busiDate,$("#beginDate").val(),$("#endDate").val())) {
			return;
		}
		$("#creditDetailGridId").jqGrid("saveCell", $("#rowid").val(), $("#iCol").val());
		var details = jQuery("#creditDetailGridId").jqGrid("getRowData");
		var list = new Array();
		for(var i = 0; i < details.length; i++) {
			
			if($.trim(details[i].信用) == "" || $.trim(details[i].保证) == ""
				|| $.trim(details[i].抵押) == ""|| $.trim(details[i].质押) == "") {
				loan.tooltip("请填写第"+(i+1)+"条授信种类信息","error");
				return;
			}
			//信用
			var creditobj = new Object();
			creditobj.creditType = details[i].creditType;
			creditobj.creditAmount = details[i].信用;
			creditobj.warrantType = '0';
			list.push(creditobj);
			//担保
			var guarobj = new Object();
			guarobj.creditType = details[i].creditType;
			guarobj.creditAmount = details[i].保证;
			guarobj.warrantType = '3';
			list.push(guarobj);
			//抵押
			var pleobj = new Object();
			pleobj.creditType = details[i].creditType;
			pleobj.creditAmount = details[i].抵押;
			pleobj.warrantType = '1';
			list.push(pleobj);
			//质押
			var mortobj = new Object();
			mortobj.creditType = details[i].creditType;
			mortobj.creditAmount = details[i].质押;
			mortobj.warrantType = '2';
			list.push(mortobj);
		}
		var sum = new Number($("#amounts").val());
		if(!sum || sum < 0) {
			loan.tooltip("授信总金额应大于0元","error");
			return;
		}
		var creditDetails = JSON.stringify(list);

		var beginDate = $("#beginDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		var remark = $("#remark").val();
		var creditId = $("#creditId").val();
		loan.ajaxDo({
			url:loan.basePath+"/credit/editCredit",
			params:{"menuId":"600206",'menuLog':'1',"userId":userId,"beginDate":beginDate,"endDate":endDate,
				"creditDetails":creditDetails,"remark":remark,"creditId":creditId},
			successCallback:function(){
				
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	initPage:function(result) {
		var userCredit = result.userCreditDomain;
		var detailList = result.userCreditDetailDomainList;
		var confirmInfo = result.confirmInfoDomain;
		loan.adjustcredit.initGrid();
        var amounts = 0;//总和
		
		var coldatas = jQuery("#creditDetailGridId").jqGrid('getCol','creditType',true);
		for(var j = 0; j < coldatas.length; j++) {
			var coldata = coldatas[j];
			var rowsum = 0;//行和
			for(var i = detailList.length-1; i >= 0; i--) {
				var detail = detailList[i];
				if(detail.creditType == coldata.value) {
					jQuery("#creditDetailGridId").jqGrid('setCell',coldata.id,detail.warrantTypeCn,detail.creditAmount);
					rowsum = detailList[i].creditAmount + rowsum;
				}
			}
			//设置行和
			jQuery("#creditDetailGridId").jqGrid('setCell',coldata.id,'sum',rowsum);
			amounts = amounts + rowsum;
		}
		
		var start = userCredit.beginDate.toString();
		var end = userCredit.endDate.toString();
		var date1 = start.substr(0,4)+"-"+start.substr(4,2)+"-"+start.substr(6,2);
		var date2 = end.substr(0,4)+"-"+end.substr(4,2)+"-"+end.substr(6,2);
		$("#beginDate").val(date1);
		$("#endDate").val(date2);
		var sumStr = $.fmatter.util.NumberFormat(amounts,{decimalPlaces:2,thousandsSeparator:','});
		$("#amounts").val(sumStr);
		var money = loan.numberToDX(amounts);
		$("#chamount").html(money);
		$("#userId").val(userCredit.userId);
		$("#customName").val(userCredit.userName);
		$("#certTypeCn").html(userCredit.idKindCn);
		$("#certNo").html(userCredit.idNo);
		$("#remark").html(userCredit.remark);
	},
	
	initGrid:function() {
		jQuery("#creditDetailGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['授信种类','信用（元）','保证（元）','抵押（元）','质押（元）','小计（元）','授信类型'], 
			colModel: [
	           {name:'creditTypeCn',index:'creditTypeCn', align:'center',sortable: false},
	           {name:'信用',index:'creditAmount', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:check},
	        	   editoptions:loan.adjustcredit.gridholder ,
	        	},
	           {name:'保证',index:'guaranteeAmount', align:'center', editable:true,
		        	   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
		        	   editrules: {custom:true, custom_func:check},
		        	   editoptions:loan.adjustcredit.gridholder ,
		        },
		       {name:'抵押',index:'pledageAmount', align:'center', editable:true,
		        	   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
		        	   editrules: {custom:true, custom_func:check},
		        	   editoptions:loan.adjustcredit.gridholder ,
		        },
		       {name:'质押',index:'mortgageAmount', align:'center', editable:true,
		        	   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
		        	   editrules: {custom:true, custom_func:check},
		        	   editoptions:loan.adjustcredit.gridholder ,
		        },
		       {name:'sum',index:'sum', align:'center',
		        	   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
		       {name:'creditType',index:'creditType',hidden:true,sortable: false}
	        ], 
			rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			'cellsubmit': 'clientArray',  //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
			sortname: 'creditTypeCn',   
		    sortorder: 'desc',
			loadComplete:function(){},
			afterEditCell:function(rowid,name,val,iRow,iCol){
				$("#rowid").attr("value",iRow);
				$("#iCol").attr("value",iCol);
				$("#cellName").attr("value",name);
			},
			gridComplete : function() {
				
			}
		})
		
		$("#creditDetailGridId").setGridWidth(700);
		loan.adjustcredit.gridId = '#creditDetailGridId';
		loan.adjustcredit.queryDictItems('4002',loan.adjustcredit.setCreditTypeInAdjust);
	},
	
	/**
	 * 设置授信种类表
	 */
	setCreditTypeInAdjust:function(result) {
		var dictItems = result.dictItems;
		for(var i = 0; i < dictItems.length; i++) {
			var obj = new Object();
			obj.creditTypeCn = dictItems[i].dictPrompt;
			obj.creditType = dictItems[i].dictValue;
			var flag = jQuery(loan.adjustcredit.gridId).jqGrid('addRowData',i+1,obj);
		}
	},
	
	/**
	 * 查询最大授信金额
	 */
	queryMaxCreditAmount:function() {
		loan.ajaxDo({
			url:loan.basePath+"/busiparam/queryBusiParamPaged",
			params:{'format':'json','menuId':'600206','page':'1','rows':'1',
				'paraId':'2007','paraCnName':'','paraEnName':''},
			successCallback:function(result) {
				var list = result.pager.items;
				if(list && list.length > 0) {
					maxValue = list[0].paraValue;
				}
			},
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 页面点击事件
	 */
	clickPage : function(evt) {
		var e = evt || window.event;
		var obj = e.srcElement ? e.srcElement : e.target;
		var target = $(obj.parentElement.offsetParent).attr("id");
		var rowid = $("#rowid").val();
		var colid = $("#iCol").val();
		var cellName = $("#cellName").val();
		if(target != "creditDetailGridId" && rowid && colid) {
			var ev = jQuery.Event("keydown");
			ev.keyCode = 13 //enter key
			jQuery("#"+rowid+"_"+cellName).trigger(ev);
		}
	},
	
	/**
	 * 查询客户详情
	 */
	userDetail:function() {
		var userId = $("#userId").val();
		if($.trim(userId) == "") {
			loan.tooltip("未选择用户","error");
			return;
		}
		parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId=600206&&userId="+userId,"creditcusdetail",true);	
	},
	
	/**
	 * 已用授信grid初始化
	 */
	initUsedCredit:function() {
		jQuery("#usedCreditGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['授信种类','信用（元）','保证（元）','抵押（元）','质押（元）','小计（元）','授信类型'], 
			colModel: [
	           {name:'creditTypeCn',index:'creditTypeCn', align:'center',
	        	   sortable: false,
	           },
	           {name:'信用',index:'creditAmount', align:'center', 
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},
	           },
	           {name:'保证',index:'guaranteeAmount', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},
	           },
		       {name:'抵押',index:'pledageAmount', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},
	           },
		       {name:'质押',index:'mortgageAmount', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},
	           },
		       {name:'sum',index:'sum', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},
	           },
		       {name:'creditType',index:'creditType',hidden:true,sortable: false}
	        ], 
	        jsonReader:{ 
				root: "response.items",//数据项
				records: "response.totalResult",//总记录数
				repeatitems : false
			},
			rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
			sortname: 'creditTypeCn',  
		    sortorder: 'desc',
			loadComplete:function(){},
			gridComplete : function() {
			}
		})
		
		$("#usedCreditGridId").setGridWidth(700);
		loan.adjustcredit.gridId = '#usedCreditGridId';
		loan.adjustcredit.queryDictItems('4002',loan.adjustcredit.setCreditTypeInAdjust);
		var userId = $("#userId").val();
		loan.adjustcredit.queryUsedCredit(userId);
	},
	
	/**
	 * 查询已用授信
	 */
	queryUsedCredit:function(userId) {
		
		loan.ajaxDo({
			url:loan.basePath+"/credit/queryUsedCredit",
			params:{'format':'json','menuId':'600206','page':'1','rows':'1',
				'userId':userId},
			successCallback:function(result) {
				var list = result.domainList;
				if(list && list.length > 0) {
					loan.adjustcredit.setUsedGridData(list);
				}
				
			},
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 将已用额度数据添加到grid中
	 */
    setUsedGridData:function(detailList) {
    	var coldatas = jQuery("#usedCreditGridId").jqGrid('getCol','creditType',true);
		for(var j = 0; j < coldatas.length; j++) {
			var coldata = coldatas[j];
			var rowsum = 0;//行和
			for(var i = detailList.length-1; i >= 0; i--) {
				var detail = detailList[i];
				if(detail.creditType == coldata.value) {
					jQuery("#usedCreditGridId").jqGrid('setCell',coldata.id,detail.warrantTypeCn,detail.usedCreditAmount);
					rowsum = detailList[i].usedCreditAmount + rowsum;
				}
			}
			//设置行和
			jQuery("#usedCreditGridId").jqGrid('setCell',coldata.id,'sum',rowsum);
		}
	},
}

/**单元格校验*/
function check(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		//return [false," ["+colname+"]不能为空！",''];
		cellvalue = 0;
	}
	if(isNaN(cellvalue)){
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	if(Number(cellvalue) < 0){
		return [false," ["+colname+"]不能小于0 元！",''];
	}
	if(v_Regular.float.test(cellvalue)) {
		//计算行和
		cellvalue = Number(Number(cellvalue).toFixed(2));
		//var money = loan.numberToDX(cellvalue);
		var rowid = $("#rowid").val();
		var colid = $("#iCol").val();
		var rowData = $("#creditDetailGridId").jqGrid('getRowData',rowid);
		var columnArray = $("#creditDetailGridId").jqGrid('getGridParam','colModel'); 
		var editname = columnArray[colid].name;
		var amount = 0;
		for ( var property in rowData) {
			if(property == 'creditTypeCn' || property == 'creditType' || property == 'sum') {
				continue;
			}
			var m = Number(rowData[property]);
			if(property == editname) {
				m = cellvalue
			}
			amount=amount+m;
		}
		//计算总和
		var list = $("#creditDetailGridId").jqGrid('getRowData');
		var sum = 0;
		for(var i = 0; i < list.length; i++) {
			var m = Number(list[i].sum);
			if(i == (rowid-1)){
				m = amount;
			}
			sum=sum+m;
		}
		//判断最大额
		if(sum > maxValue) {
			return [false,"授信总额为"+sum+"元,不能大于"+maxValue+"元！",''];
		}
		//设置行和
		$("#creditDetailGridId").jqGrid('setCell',rowid,'sum',amount);
		var sumStr = $.fmatter.util.NumberFormat(sum,{decimalPlaces:2,thousandsSeparator:','});//总额补零
		$("#amounts").val(sumStr);
		var money = loan.numberToDX(sum);
		$("#chamount").html(money);
	} else {
		return [false," ["+colname+"]必须为有效金额！",''];
	}
	$("#rowid").val("");
	$("#iCol").val("");
	$("#cellName").val("");
	return [true,'',''];
}

function comment(){
	var userId = $("#userId").val();
	if($.trim(userId) == "") {
		loan.tooltip("未选择用户","error");
		return;
	}
	parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId=600201&&userId="+userId,"creditcusdetail",true);	
}

