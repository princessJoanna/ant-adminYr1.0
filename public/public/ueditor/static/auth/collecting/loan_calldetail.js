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
loan.calldetail = loan.calldetail || {
	/**
	 * 初始化上传附件页面
	 */
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','附件类型','是否必须状态','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId',sortable: false, align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo', sortable: false,align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
			   {name:'uploadFileName',index:'uploadFileName',sortable: false, align:'center'}
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
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(applyId){
		var menuId = $('#menuId').val();
		var length = menuId.length;
		if(length > 2) {
			length = length -2;
		}
		var functionId = menuId.substr(0,length);
		loan.ajaxDo({
			url: loan.basePath+ "/collecting/queryUserAttach",
			params:{format:'json','menuId':menuId,"acctId":applyId , "functionId" : functionId },//'menuId':'7009'这个后面加上
            successCallback:function(result){
	       		var list = result.pager.items;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			$(list).each(function(i,item) {
 						$("#attachGridId").jqGrid("addRowData",i+1,{
 			        		  filelistId : item.filelistId,
 			        		  annexName : item.annexName,
 			        		  filebackinfo : item.opId == '0' ? '协议' : '贵重物品',
 			        		  uploadFileName :  "<a href='" +loan.basePath + "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + encodeURIComponent(item.originalFilename) + "' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>"
  						});
	     			});
	     		}
	     	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**
	 * 查询电话催收详情
	 * 
	 */
	queryNoticeInfo:function (){
		var orderId=$("#orderId").val();
		var flag=$("#flag").val();
		loan.ajaxDo({
			url:loan.basePath+ "/collecting/queryCallInfo",
			params:{'format':'json','menuLog':'1','orderId':orderId,"flag":flag},
			successCallback:loan.calldetail.initCallInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	initCallInfo:function(result){
		var callOrder=result.callOrderDto;
		$("#orderId").val(callOrder.orderId);
		$("#opId").val(callOrder.opId);
		var acceptTime=callOrder.acceptTime;
		$("#acceptTime").val(convertTime(acceptTime));
		$("#relationPhone").val(callOrder.relationPhone);
		$("#relationTypeCn").val(callOrder.relationTypeCn);
		$("#callResultCn").val(callOrder.callResultCn);
		$("#negoResultCn").val(callOrder.negoResultCn);
		$("#repayAmount").val(callOrder.repayAmount);
		$("#remark").val(callOrder.collectingDetail);
		$("#repayWayCn").val(callOrder.repayWayCn);
		$("#relationName").val(callOrder.relationName);
	}
}
function convertTime(cellvalue) {
var reg = new RegExp("^[0-9]*$");
if(reg.test(cellvalue)) {
	var date = new Date(Number(cellvalue));
	return date.Format("yyyy-MM-dd");
}
return "";
}
	 
	