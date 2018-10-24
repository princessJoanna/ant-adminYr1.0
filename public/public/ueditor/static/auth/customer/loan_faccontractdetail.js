loan.faccontractdetail = loan.faccontractdetail || {

	/**
	 * 查询保理合同详情
	 * @param facContractId
	 * @param menuId
	 */
	queryFacContractInfo:function (facContractId,menuId){
		loan.ajaxDo({
			url:loan.basePath+"/league/queryFacContractInfo",
			params:{'format':'json','menuLog':'1','facContractId':facContractId,'menuId':menuId},
			successCallback:loan.faccontractdetail.initFacContractInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化保理合同信息
	 * @param result
	 */
	initFacContractInfo:function(result) {
		var FacContractDetail = result.facContractDto;
		for ( var property in FacContractDetail) {
			if(property=="facContractId"){
				$("#"+property).attr("value",FacContractDetail[property]);
			}else{
				$("#"+property).text(FacContractDetail[property]);
			}
		}
	},
	
	/**
	 * 查询应收账单列表
	 * @param facContractId
	 * @param menuId
	 */
	queryReceiveAccountList:function(facContractId,menuId){
		jQuery("#accountGridId").jqGrid({
			url: loan.basePath+ "/league/queryReceiveAccountList",
			mtype:'POST',
			datatype: "json",
			postData:{'format':'json','menuId':menuId,"facContractId":facContractId,},
			colNames: ['账单编号','账单金额(元)','消费者姓名','手机号','消费日期'], 
			colModel: [
			   {name:'receiveAcctId',index:'receiveAcctId', sortable: false,align:'center'},
			   {name:'fundBalance',index:'fundBalance',sortable: false, align:'center'},
			   {name:'userName',index:'userName',sortable: false, align:'center'},
			   {name:'mobile',index:'mobile',sortable: false, align:'center'},
			   {name:'orderTimeStr',index:'orderTimeStr',sortable: false, align:'center'},
	        ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				repeatitems : false
			},
			pager:jQuery('#panelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			toolbarfilter : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
		jQuery("#accountGridId").setGridWidth(900);
	},

};