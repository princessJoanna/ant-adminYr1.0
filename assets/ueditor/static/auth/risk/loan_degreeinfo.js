loan.degreeinfo = loan.degreeinfo || {
	menuId:'-1',//菜单号
	
	/**
	 * 查询关系详情
	 */
	queryDegreeInfo:function(degreeId){
		loan.ajaxDo({
            url:loan.basePath+"/riskDegree/queryRiskDegree",
            params:{ 'menuId':loan.degreeinfo.menuId,'format':'json','degreeId':degreeId},
            successCallback:function(result){
        		var degree = result.degree;
        		var details = result.details;
        		//设置页面信息
        		if(degree) {
        			$("#degreeName").html(degree.degreeName);
        			$("#remark").html(degree.remark);
        		}
        		//设置等级项
        		if(details && details.length > 0) {
        			jQuery("#detailGridId").jqGrid("clearGridData");
        			for(var i = 0; i < details.length; i++) {
        				details[i].suggestRatio = details[i].suggestRatio*1000;
            			jQuery("#detailGridId").jqGrid('addRowData',i+1,details[i]);
            		}
        		}
        		
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 初始化等级项 
	 */
	initDetailGrid:function() {
		jQuery("#detailGridId").jqGrid({
			datatype: "local",
			colNames: ['风险等级项名称','分值下限(含)','分值上限','建议授信额度(元)','建议利率(‰)','是否触发',
			           '是否触发码','备注'], 
			colModel: [
	           {name:'degreeDetailName',index:'degreeDetailName',sortable: false, align:'center'},
	           {name:'minScore',index:'minScore', sortable: false,align:'center',width:'110px'},
	           {name:'maxScore',index:'maxScore', sortable: false,align:'center',width:'100px'},
	           {name:'suggestBalance',index:'suggestBalance',sortable: false, align:'center'},
			   {name:'suggestRatio',index:'suggestRatio',sortable: false, align:'center', formatter:loan.degreeinfo.suggestRatioFmatter},
			   {name:'triggerStatusCn',index:'triggerStatusCn',sortable: false, align:'center'},
			   
			   {name:'triggerStatus',index:'triggerStatus', sortable: false,align:'center',hidden:true},
	           {name:'remark',index:'remark', sortable: false,align:'center',hidden:true},
	        ],
	        jsonReader:{ 
				root: "response.details",//数据项
				//records: "response.totalResult",//总记录数
				repeatitems : false
			},
	        rowNum : -1,
	        pager:jQuery('#detailPanelId'),
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
	  	jQuery("#detailGridId").setGridWidth(600);
	},
	suggestRatioFmatter: function(cellvalue, options, rowObject) {
		return parseFloat(cellvalue + "").toFixed(3);
	}
	
};

$(function(){
	var menuId = $("#menuId").val();
	if(menuId) {
		loan.degreeinfo.menuId = menuId;
	}
	loan.degreeinfo.initDetailGrid();
	var degreeId = $("#degreeId").val();
	if(degreeId) {
		loan.degreeinfo.queryDegreeInfo(degreeId);
	}
});

