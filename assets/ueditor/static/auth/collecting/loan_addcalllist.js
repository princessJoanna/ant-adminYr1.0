loan.addCalllist=loan.addCalllist||{
	/**上传文件*/
	upload:function(rowid) {
		if($("#loanUpload_"+rowid).val() == '' || $("#loanUpload_"+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			return;
		}
		var rowObj = $("#attachGridId").jqGrid('getRowData',rowid);
		var setId = rowObj.setId;
		var orgId = rowObj.orgId;
		var extenString = rowObj.extenString;
		var mustStatus = rowObj.mustStatus;
		var checkId = rowObj.checkId;
		var filelistId = rowObj.filelistId;
		var menuId=$("#menuId").val();
		$("#loanUpload_"+rowid).upload({
			url: loan.basePath+'/org/upload?extenString='+extenString+"&orgId="+orgId+"&checkId="+checkId+"&filelistId="+filelistId+"&setId="+setId,
			// 其他表单数据
			params: menuId,
			dataType: 'text',
			onSend: function (obj, str) {  
				return true; 
			},
			// 上传之后回调
			onComplate: function (data) {
				//数据返回为空
				if(!data) {
	        		loan.tooltip("上传失败，请稍后再试",'error');
		        	return;
	        	}
				var obj = eval("("+data+")");
				if(obj.success){
					loan.tooltip("上传成功","succeed");
					$("#loanUpload_"+rowid).val("");
					var url = "<a href='"+obj.domain.depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>";
					jQuery("#attachGridId").jqGrid('setRowData',rowid, {
		        		  filelistId : obj.domain.filelistId,
		        		  uploadFileName : url,
		        		  filebackinfo : JSON.stringify(obj.domain)
					}); 
				}else{
					loan.tooltip(obj.errMsg,"error");
					$("#loanUpload_"+rowid).removeAttr("disabled");
				}
				var file = $("#loanUpload_"+rowid);
				file.after(file.clone().val(""));
				file.remove();
			}
		});
		$("#loanUpload_"+rowid).upload("ajaxSubmit");
	},
	/**
	 * 初始化上传附件页面
	 */
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId',sortable: false, align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus',sortable: false, align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select',sortable: false, align:'center',width:200,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' style='width: 200px;' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addCalllist.upload("+options.rowId+")' value='上传' />"+
						"<label id='labelId'></label>"+
						"</form>";
					}},
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
		jQuery("#attachGridId").setGridWidth(900);
	  	//设置附件条目
		loan.addCalllist.queryAttachItem();
		loan.addCalllist.queryAttachInfo();
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){
		var menuId = $('#menuId').val();
		var length = menuId.length;
		var functionId = menuId.substr(0,length);
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':menuId,'functionId':functionId,'status':'0','page':'1','rows':'9999'},
            successCallback:loan.addCalllist.attachItemCallBack,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	/**
	 * 查询已上传文件的回调
	 */
	attachItemCallBack:function(result){
		var list = result.pager.items;
    	if(list && list.length > 0) {
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			var rowid = i+1;
    			$("#attachGridId").jqGrid("addRowData",rowid,item);
    		}
    	}
	},
	
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(){
		var caseId = $('#caseId').val();
		var menuId = $('#menuId').val()
		if(!caseId){
			return;
		}
		loan.ajaxDo({
			url: loan.basePath + "/org/queryAttachFiles",
			params:{format:'json','menuId':menuId,"checkId":caseId},
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length >0) {
	     			var ids = $("#attachGridId").jqGrid("getDataIDs");
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
	     					if(item.setId == rowdata.setId) {
	     						$("#attachGridId").jqGrid("setRowData",ids[j],{
	     			        		  filelistId : item.filelistId,
	     			        		  uploadFileName : "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + item.originalFilename  +"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>",
	     			        		  filebackinfo : JSON.stringify(item),
	     						});
	     						break;
	     					}
	     				}
	     			});
	     		}
	     	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 校验文件
	 */
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		loan.addCalllist.fileUpdate = false;
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var rowid = i+1;
			//判断必传文件是否已上传
			var content = rowObj.uploadFileName;
			
			if(rowObj && rowObj.mustStatus == '1') {
				if(!content) {
					loan.tooltip("请上传的第"+rowid+"个文件","error"); 
					return false;
				}
			}
			//校验是否重新上传的文件未提交
			var fileValue = $("#loanUpload_"+rowid).val();
			if(fileValue) {
				loan.addCalllist.fileUpdate = true;
			}
		}
		return true;
	},
	/**解析文件为json字符串*/
	parseFileJson : function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		var filelist = new Array();
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var content = rowObj.uploadFileName;
			if(content) {
				var fileObj = $.parseJSON(rowObj.filebackinfo);
				fileObj.setId = rowObj.setId;
				fileObj.orgId = rowObj.orgId;
				fileObj.filelistId = rowObj.filelistId;
				filelist.push(fileObj);
			}
		}
		return JSON.stringify(filelist);
	}
}
/**
 * 提交
 */
function submit() {
	var caseId = $("#caseId").val();
	var acceptTimeS = $('#acceptTime').val();
	var relationPhone = $('#relationPhone').val();
	var relationType = $('#relationType').val();
	var relationName = $('#relationName').val();
	var callResult = $('#callResult').val();
	var negoResult = $('#negoResult').val();
	var repayWay = $('#repayWay').val();
	var repayAmount = new Number($('#repayAmount').val());
	var collectingDetail = $('#collectingDetail').val();
	if(relationType==""){
		loan.tooltip("请选择联系人关系","error"); 
		return;
	}
	if(callResult==""){
		loan.tooltip("请选择拨打结果","error"); 
		return;
	}
	//校验必传文件
	var fileList;
	if(!loan.addCalllist.validateFiles()){
		return;
	} else {
		fileList = loan.addCalllist.parseFileJson();
	}
	var params = {
			'menuLog' : '1',
			"caseId" : caseId,
			"acceptTimeS" : acceptTimeS,
			"relationPhone" : relationPhone,
			"relationType" : relationType,
			"relationName" : relationName,
			"callResult" : callResult,
			"negoResult" : negoResult,
			"repayWay" : repayWay,
			"repayAmount" : repayAmount,
			"collectingDetail" : collectingDetail,
			"attachFileInfo":fileList,
		};
	loan.ajaxDo({
		url : loan.basePath + "/collecting/addCallOrder",
		params : params,
		chainPar : this,
		successTip : true,
		successCallback : function() {
			loan.tabcut.childClosedIframe(true);
		}
	});
}
$(function() {
	loan.selFun('selAll');
	loan.selFun('adv');
	$('#acceptTime')
			.datepicker(
					{
						showOn : "button",
						buttonImage : loan.basePath
								+ "/static/auth/common/element/jqueryui/css/images/calendar.gif",
						buttonImageOnly : true
					});
	loan.verify.verifyCheck("iform", "submit_button");
	loan.addCalllist.initAttachPage();
})