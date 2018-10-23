$(function(){
	loan.tabLiclick("m-tab-detail");
	var orgId = $("#orgId").val();
	var checkId = $("#checkId").val();
	jQuery("#preloanCheckGridId").jqGrid({
		url: loan.basePath+ "/org/queryAttachFiles",
		mtype:'POST',
		datatype: "json",
		postData:{format:'json',"orgId":orgId,"menuId":'600104','functionId':'6001',"checkId":checkId,'menuLog':'1'},//'menuId':'7004'这个后面加上
//		onSelectRow:loan.survey.selectFn,
		colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
		colModel: [
		   {name:'depositPath',index:'depositPath',sortable: false, align:'center',hidden:true},
           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
		   {name:'annexName',index:'annexName', sortable: false,align:'center'},
		   {name:'originalFilename',index:'originalFilename', sortable: false,align:'center',
			   formatter:function(cellvalue, options, rowObject){
					return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename  +"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
		   }
        ],
        jsonReader:{ 
			root: "response.list",//数据项
			repeatitems : false
		},
		toolbarfilter : true,
		viewrecords : true,
		autowidth : true,
		rownumbers: true,
		multiselect : false,
		pagerpos:'center',
	    sortorder: 'desc',
		pgbuttons:true,
		pginput: true,	
		height: 'auto',	
		loadComplete:function(){},
		gridComplete : function() {
		}
	})
	jQuery("#preloanCheckGridId").setGridWidth($(window).width()-60);
});

function viewInfo(url) {
	location.href = url;
}