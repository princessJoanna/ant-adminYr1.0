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
loan.addcredit = loan.addcredit|| {
	
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
	 * 获取系统时间
	 */
	getBusiDate:function(menuId) {
		var buziStr = parent.$(".head-small-nav .date").text();
		busiDate = new Number(buziStr.replace(/\//g,""));
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
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
	},
	preLoanRisk:function(){
		var userId = $("#userId").val();
		if(userId == "") {
			loan.tooltip("请选择授信客户","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/org/tongdunapply",
			params:{"menuId":"600201",'menuLog':'1',"userId":userId},
			successCallback:loan.addcredit.setReportId,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	setReportId:function(result){
		var reportId=result.reportId;
		if(reportId!=""||reportId!=undefined){
			$("#reportId").val(reportId);
			//$("#riskAssessment").hide();
			//$("#lookReport").show();
			loan.addcredit.jump(4);
		}
	},
	jump:function(count){ 
        window.setTimeout(function(){ 
            count--; 
            if(count > 0) { 
            	$('#riskAssessment').attr('href','#');
                $('#riskAssessment').html('正在生成报告...'+count+'S');
                loan.addcredit.jump(count); 
            } else { 
                $('#riskAssessment').html('查看风险报告');
                $('#riskAssessment').attr('href','javascript:loan.addcredit.toLookReport()');
            } 
        }, 1000); 
    },
    setRisk:function(){
    	$('#riskAssessment').html('风险分析');
        $('#riskAssessment').attr('href','javascript:loan.addcredit.preLoanRisk()');
    },
	toLookReport:function(){
		
		var reportId = $("#reportId").val();
		if(reportId == "") {
			loan.tooltip("请先风险分析","error");
			return;
		}
		var userId = $("#userId").val();
		loan.s_addPop("风险报告",loan.basePath+"/org/lookreport?menuId=600201&reportId="+reportId+"&userId="+userId,"",650,500,{isRefresh:false,isChangeClose:false});	
	},
	/**
	 * 新增
	 */
	addCredit:function() {
		var userId = $("#userId").val();
		if(userId == "") {
			loan.tooltip("请选择授信客户","error");
			return;
		}
		loan.addcredit.getBusiDate("600201");
		if(!loan.addcredit.compareDates(busiDate,$("#beginDate").val(),$("#endDate").val())) {
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
		if(!sum || sum <= 0) {
			loan.tooltip("授信总金额应大于0元","error");
			return;
		}
		var creditDetails = JSON.stringify(list);

		var beginDate = $("#beginDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		var remark = $("#remark").val();
		loan.ajaxDo({
			url:loan.basePath+"/credit/addCredit",
			params:{"menuId":"600201",'menuLog':'1',"userId":userId,"beginDate":beginDate,"endDate":endDate,
				"creditDetails":creditDetails,"remark":remark},
			successCallback:loan.addcredit.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 查询数据字典
	 */
    queryDictItems:function(dictid,callbackFunc) {
    	loan.ajaxDo({
			url:loan.basePath+"/dict/dictItems",
			params:{"dictId":dictid,"menuId":"600201"},
			successCallback:callbackFunc,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 设置授信种类表
	 */
	setCreditTypeInAdd:function(result) {
		var dictItems = result.dictItems;
		for(var i = 0; i < dictItems.length; i++) {
			var obj = new Object();
			obj.creditTypeCn = dictItems[i].dictPrompt;
			obj.creditType = dictItems[i].dictValue;
			var flag = jQuery(loan.addcredit.gridId).jqGrid('addRowData',i+1,obj);
		}
	},
	
	/**
	 * 
	 */
	afterEditCellFunc:function(rowid,name,val,iRow,iCol){
		$("#rowid").attr("value",iRow);
		$("#iCol").attr("value",iCol);
		$("#cellName").attr("value",name);
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
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	           },
	           {name:'保证',index:'guaranteeAmount', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	           },
		       {name:'抵押',index:'pledageAmount', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	           },
		       {name:'质押',index:'mortgageAmount', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	           },
		       {name:'sum',index:'sum', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
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
		loan.addcredit.gridId = '#usedCreditGridId';
		loan.addcredit.queryDictItems('4002',loan.addcredit.setCreditTypeInAdd);
		
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
	
	/**
	 * 本次授信grid初始化
	 */
	initAddCredit:function() {
		jQuery("#creditDetailGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['授信种类','信用（元）','保证（元）','抵押（元）','质押（元）','小计（元）','授信类型'], 
			colModel: [
	           {name:'creditTypeCn',index:'creditTypeCn', align:'center',sortable: false},
	           {name:'信用',index:'0', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:check},
	        	   editoptions:loan.addcredit.gridholder ,
	        	},
	           {name:'保证',index:'3', align:'center', editable:true,
		        	   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
		        	   editrules: {custom:true, custom_func:check},
		        	   editoptions:loan.addcredit.gridholder ,
		        },
		       {name:'抵押',index:'1', align:'center', editable:true,
		        	   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
		        	   editrules: {custom:true, custom_func:check},
		        	   editoptions:loan.addcredit.gridholder ,
		        },
		       {name:'质押',index:'2', align:'center', editable:true,
		        	   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
		        	   editrules: {custom:true, custom_func:check},
		        	   editoptions:loan.addcredit.gridholder ,
		        },
		       {name:'sum',index:'sum', align:'center',sortable: false,
		        	formatter: 'number',
		        	formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
		       {name:'creditType',index:'creditType',hidden:true,sortable: false}
	        ], 
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
			afterEditCell:loan.addcredit.afterEditCellFunc,
			gridComplete : function() {
			}
		})
		
		$("#creditDetailGridId").setGridWidth(700);
		loan.addcredit.gridId = '#creditDetailGridId';
		loan.addcredit.queryDictItems('4002',loan.addcredit.setCreditTypeInAdd);
	},
	
	/**
	 * 查询最大授信金额
	 */
	queryMaxCreditAmount:function() {
		loan.ajaxDo({
			url:loan.basePath+"/busiparam/queryBusiParamPaged",
			params:{'format':'json','menuId':'600201','page':'1','rows':'1',
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
	 * 查询已用授信
	 */
	queryUsedCredit:function(userId) {
		
		loan.ajaxDo({
			url:loan.basePath+"/credit/queryUsedCredit",
			params:{'format':'json','menuId':'600201','page':'1','rows':'1',
				'userId':userId},
			successCallback:function(result) {
				var list = result.domainList;
				if(list && list.length > 0) {
					loan.addcredit.setUsedGridData(list);
				}
				
			},
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
};

/**单元格校验*/
function check(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		//return [false," ["+colname+"]不能为空！",''];
		cellvalue = 0;
	}
	if(isNaN(cellvalue)){
		return [false," 是您输入的金额，它不是有效金额！",''];
	}
	if(Number(cellvalue) < 0){
		return [false," 是您输入的金额，它不能小于0！",''];
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
			return [false,"是您的输入值，但授信总额不能大于"+maxValue+"元！",''];
		}
		//设置行和
		$("#creditDetailGridId").jqGrid('setCell',rowid,'sum',amount);
		var sumStr = $.fmatter.util.NumberFormat(sum,{decimalPlaces:2,thousandsSeparator:','});
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


