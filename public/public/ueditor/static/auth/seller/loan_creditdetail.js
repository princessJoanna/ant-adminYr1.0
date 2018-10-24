loan.creditdetail = loan.creditdetail || {
	/**
	 * 查询信息
	 */
	queryCreditDetail: function(creditId) {
		loan.ajaxDo({
			url:loan.basePath+"/credit/queryCreditDetail",
			params:{'menuId':'600204','menuLog':'1','format':'json','creditId':creditId},
			successCallback:loan.creditdetail.initPage,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 查询数据字典
	 */
    queryDictItems:function(dictid,callbackFunc) {
    	loan.ajaxDo({
			url:loan.basePath+"/dict/dictItems",
			params:{"dictId":dictid,"menuId":"600204"},
			successCallback:callbackFunc,
			successTip:false, //不提示
			bizErrTip:false,  //不提示
			chainPar:this
		});
	},
	
	/**
	 * 设置授信种类表
	 */
	setCreditTypeInDetail:function(result) {
		var dictItems = result.dictItems;
		for(var i = 0; i < dictItems.length; i++) {
			var obj = new Object();
			obj.creditTypeCn = dictItems[i].dictPrompt;
			obj.creditType = dictItems[i].dictValue;
			var flag = jQuery("#creditDetailGridId").jqGrid('addRowData',i+1,obj);
		}
	},
	
	initPage:function(result,gridId) {
		
		var userCredit = result.userCreditDomain;
		var detailList = result.userCreditDetailDomainList;
		var confirmInfo = result.confirmInfoDomain;
		loan.creditdetail.initGrid();
		
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
		
		$("#oldCreditId").html(userCredit.oldCreditId);
		$("#userName").html(userCredit.userName);
		$("#idKindCn").html(userCredit.idKindCn);
		$("#idNo").html(userCredit.idNo);
		$("#beginDate").html(userCredit.beginDate);
		$("#endDate").html(userCredit.endDate);
		var sumStr = $.fmatter.util.NumberFormat(amounts,{decimalPlaces:2,thousandsSeparator:','});
		$("#amounts").html(sumStr);
		$("#remark").html(userCredit.remark);
		$('#userId').val(userCredit.userId);
		/*$("#confirmRemark").html(userCredit.confirmRemark);
		if(confirmInfo) {
			$("#confirmRemark").html(confirmInfo.confirmContent);
		}*/
		
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
	           {name:'信用',index:'creditAmount', align:'center', 
	        	   formatter:'number',sortable: false,
        		   formatoptions:{decimalSeparator:".", thousandsSeparator: ",", decimalPlaces:2,defaultValue:''}
	           },
	           {name:'保证',index:'guaranteeAmount', align:'center',
    			   formatter:'number',sortable: false,
        		   formatoptions:{decimalSeparator:".", thousandsSeparator: ",", decimalPlaces:2,defaultValue:''}
	           },
		       {name:'抵押',index:'pledageAmount', align:'center',
    			   formatter:'number',sortable: false,
        		   formatoptions:{decimalSeparator:".", thousandsSeparator: ",", decimalPlaces:2,defaultValue:''}
	           },
		       {name:'质押',index:'mortgageAmount', align:'center',
    			   formatter:'number',sortable: false,
        		   formatoptions:{decimalSeparator:".", thousandsSeparator: ",", decimalPlaces:2,defaultValue:''}
	           },
		       {name:'sum',index:'sum', align:'center',
    			   formatter:'number',sortable: false,
        		   formatoptions:{decimalSeparator:".", thousandsSeparator: ",", decimalPlaces:2,defaultValue:''}
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
		});
		
		$("#creditDetailGridId").setGridWidth(580);
		loan.creditdetail.queryDictItems('4002',loan.creditdetail.setCreditTypeInDetail);
	},
}


