loan.attachlist = loan.attachlist || {
	/**
	 * 初始化上传附件页面
	 */
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件类型','是否必须','附件的上传格式','是否必须状态','附件名称','上传时间'], 
			colModel: [
	           {name:'orgId',index:'orgId',sortable: false, align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center',hidden:true},
			   {name:'filebackinfo',index:'filebackinfo', sortable: false,align:'center'},
			   {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
			   {name:'uploadFileName',index:'uploadFileName',sortable: false, align:'center'},
			   {name:'uploadTime',index:'uploadTime',sortable: false, align:'center'},
			   
	        ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
	        rowNum : 9999,
	        pager:jQuery('#attachPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
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
	  	jQuery("#attachGridId").setGridWidth(950);
	},
	// 格式化时间
	fmtDate : function(time){
		var date = new Date(time);
		var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
		var day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
		var hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
		var min =  date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
		var sec = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
		return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + min + ":" + sec;
	},
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(applyId){
		if(!applyId) return;
		loan.ajaxDo({
			url: loan.basePath+ "/league/queryUserAttach",
			params:{format:'json','menuId':'850104',"acctId":applyId , "functionId" : 999001 },//'menuId':'7009'这个后面加上
            successCallback:function(result){
	       		var list = result.pager.items;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			$(list).each(function(i,item) {
 						$("#attachGridId").jqGrid("addRowData",i+1,{
 			        		  filelistId : item.filelistId,
 			        		  annexName : item.annexName,
 			        		  filebackinfo : item.opId == '0' ? '协议' : '贵重物品',
 			        		  mustStatusCn : item.mustStatusCn,
 			        		  uploadFileName :  "<a href='" +loan.basePath + "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + encodeURIComponent(item.originalFilename) + "' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>",
 			        		  uploadTime : loan.attachlist.fmtDate(item.uploadTime)
  						});
	     			});
	     		}
	     	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	}
}
