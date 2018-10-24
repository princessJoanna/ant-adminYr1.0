loan.grtrelinfo = loan.grtrelinfo || {
	menuId:'701005',//菜单号
	/**
	 * 查询关系详情
	 */
	queryWarrantRelInfo:function(warrantRelId){
		loan.ajaxDo({
            url:loan.basePath+"/guarantee/queryWarrantRel",
            params:{ 'menuId':loan.grtrelinfo.menuId,'format':'json','warrantRelId':warrantRelId},
            successCallback:function(result){
        		var domain = result.domain;
        		if(domain) {
        			$("#userName").html(domain.userName);
        			$("#idNo").html(domain.idNo);
        			$("#idKindCn").html(domain.idKindCn);
        			$("#contractId").html(domain.contractId);
        			$("#contractNo").html(domain.contractNo);
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 初始化担保物 
	 */
	initWarrantGrid:function(warrantRelId) {
		jQuery("#warrantGridId").jqGrid({
			url: loan.basePath+ "/guarantee/queryWarrantList",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json','menuId':loan.grtrelinfo.menuId,'warrantRelId':warrantRelId},//这个后面加上
			colNames: ['担保物(人)名称','担保关系','担保证件类型','担保证件编号','担保额度(元)',
			           '担保关系码','担保证件类型码','关系id'], 
			colModel: [
	           {name:'warrantName',index:'warrantName',sortable: false, align:'center'},
	           {name:'warrantTypeCn',index:'warrantTypeCn', sortable: false,align:'center'},
	           {name:'warrantIdKindCn',index:'warrantIdKindCn',sortable: false, align:'center'},
	           {name:'warrantIdNo',index:'warrantIdNo',sortable: false, align:'center'},
			   {name:'amount',index:'amount', sortable: false,align:'center'},
			   
			   {name:'warrantType',index:'warrantType',sortable: false, align:'center',hidden:true},
	           {name:'warrantIdKind',index:'warrantIdKind',sortable: false, align:'center',hidden:true},
	           {name:'warrantId',index:'warrantId',sortable: false, align:'center',hidden:true},
	        ],
	        jsonReader:{ 
				root: "response.warrantlist",//数据项
				//records: "response.totalResult",//总记录数
				repeatitems : false
			},
	        rowNum : -1,
	        pager:jQuery('#warrantPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			height: 'auto',
			autowidth: true,	
			forceFit:true,//调整列宽不会改变表格宽度
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
	  	jQuery("#warrantGridId").setGridWidth($(window).width()-30);
	},
	
	
};

$(function(){
	var warrantRelId = $("#warrantRelId").val();
	loan.grtrelinfo.menuId = $("#menuId").val();
	loan.grtrelinfo.initWarrantGrid(warrantRelId);
	loan.grtrelinfo.queryWarrantRelInfo(warrantRelId);
});

