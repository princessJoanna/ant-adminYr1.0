loan.feeRateInfo = loan.feeRateInfo || {
	
	initAttachInfo:function(applyId,menuId){
		jQuery("#attach").jqGrid({
			url: loan.basePath+ "/org/queryAttachFiles",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json',"menuId":menuId,"checkId":applyId},
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath',sortable: false, align:'center',hidden:true},
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'originalFilename',index:'originalFilename', sortable: false,align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename  +"'  target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
			   }
	        ],
	        jsonReader:{ 
				root: "response.list",//数据项
				repeatitems : false
			},
			rowNum : -1,
			pager:jQuery('#attachPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
		jQuery("#attach").setGridWidth($(window).width()*0.75);
	}
	
}