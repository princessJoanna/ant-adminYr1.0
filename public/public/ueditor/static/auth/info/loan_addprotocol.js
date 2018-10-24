loan.addprotocol = loan.addprotocol || {
	menuId:'100801',//菜单号
	url:loan.basePath+"/protocol/addProtocol",//提交的url
	fileUpdate:false,//判断是否多次上传
	buzidate:new Date(),
	
	
	
	//提交信息
	submit:function() {
		var docId = $("#docId").val();
		var protocolCode = $("#protocolCode").val();
		if(protocolCode=='-1') {
			loan.tooltip("请先选择要上传的协议","error");
			return;
		}
		//校验必传文件
		var fileList;
		if(!loan.addprotocol.validateFiles()){//校验
			return;
		} else {
			fileList = loan.addprotocol.parseFileJson();//解析
		}
		
		var params = {
				'protocolCode':protocolCode,
				'docId':docId,
				'fileList':fileList,
		}
		
		if(loan.addprotocol.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.addprotocol.doSubmit(params);//执行提交
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.addprotocol.doSubmit(params);
		}
		
	},
	//检验文件
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		loan.addprotocol.fileUpdate = false;
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var rowid = i+1;
			//判断必传文件是否已上传
			var content = rowObj.uploadFileName;
			
			if(!content) {
					loan.tooltip("请先上传文件","error"); 
					return false;
			}
			
			//校验是否重新上传的文件未提交
			var fileValue = $("#loanUpload_"+rowid).val();
			if(fileValue) {
				loan.addprotocol.fileUpdate = true;
			}
		}
		return true;
	},
	//解析文件
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
				fileObj.extenString=rowObj.extenString;
				fileObj.annexName=rowObj.annexName;
				filelist.push(fileObj);
			}
		}
		return JSON.stringify(filelist);
	},
	//执行提交
	doSubmit:function(params){
		loan.ajaxDo({
			url:loan.addprotocol.url,
			params:params,
			successCallback:function(result){
				//关闭子框架
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
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
		
		$("#loanUpload_"+rowid).upload({
			url: loan.basePath+'/protocol/upload?extenString='+extenString+"&orgId="+orgId+"&checkId="+checkId+"&filelistId="+filelistId+"&setId="+setId,
			// 其他表单数据
			params: {"menuId":loan.addprotocol.menuId},
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
					jQuery("#attachGridId").jqGrid('setRowData',rowid, {
		        		  filelistId : obj.domain.filelistId,
		        		  uploadFileName : obj.domain.originalFilename,
		        		  filebackinfo : JSON.stringify(obj.domain)
					}); 
				}else{
					if(obj.errMsg.indexOf('org')> -1){
						loan.tooltip('协议上传异常！',"error");
					}else{
						loan.tooltip(obj.errMsg,"error");
					}
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
	//初始化页面性质
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','协议类型','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId', align:'center',sortable: false,hidden:true},
	           {name:'setId',index:'setId', align:'center',sortable: false,hidden:true},
	           {name:'filelistId',index:'filelistId', sortable: false,align:'center',hidden:true},
	           {name:'checkId',index:'checkId',sortable: false, align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center',hidden:true},
	           {name:'select',index:'select', sortable: false,align:'center',width:250,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='uploadFile' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addprotocol.upload("+options.rowId+")' value='上传' />"+
						"<label id='labelId'></label>"+
						"</form>";
					}},
			   {name:'uploadFileName',index:'uploadFileName',sortable: false, align:'center'}
	        ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				//records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
	        rowNum : 9999,
	        pager:jQuery('#attachPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			viewrecords : false,//是否要显示总记录数
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
	  	jQuery("#attachGridId").setGridWidth($(window).width()-400);
	  	//设置附件条目
		loan.addprotocol.noqueryAttachItem();
	  	//更新页面设置
		loan.addprotocol.initUpdateData();
	},
	//查询附件条目
	noqueryAttachItem:function(){//查询附件条目
		var obj = new Object();
		var protocolView=$("#protocolCode option:checked").text();
		obj.annexName = protocolView;
		
		$("#attachGridId").jqGrid("addRowData",1,obj);
	},
	//查询附件条目
	queryAttachItem:function(){//查询附件条目
		 var pfId='1008';//平台
		 var orgId=$("#orgId").val();//机构
		 /*if(orgId!=1000){
			functionId='1009';
		 }*/
		var protocolCode=$("#protocolCode").val();
		//判断协议的权限，平台查询全部
		var functionId=pfId+'0'+protocolCode;//平台
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':loan.addprotocol.menuId,'status':'0','functionId':functionId,'page':'1','rows':'9999'},
            successCallback:loan.addprotocol.attachItemCallBack,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	/**
	 * 查询已上传文件的回调
	 */
	attachItemCallBack:function(result){
		/*var list = result.pager.items;
    	if(list && list.length > 0) {
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			var rowid = i+1;
    			$("#attachGridId").jqGrid("addRowData",rowid,item);
    		}
    	}*/
	},
	
	/**
	 * 查询已上传文件
	 */
	//查询已上传的文件（要改）
	queryAttachInfo:function(docId){
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':loan.addprotocol.menuId,"checkId":docId},//'menuId':'7004'这个后面加上
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			var ids = $("#attachGridId").jqGrid("getDataIDs");
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
	     					if(item.setId == rowdata.setId) {
	     						$("#attachGridId").jqGrid("setRowData",ids[j],{
	     			        		  filelistId : item.filelistId,
	     			        		  uploadFileName : item.originalFilename,
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
	 * 初始化页面性质修改，新增
	 */
	//初始化页面性质
	initPageType:function() {
		//根据操作类型设置页面参数
		var menuId = $("#menuId").val();
		var opType = $("#opType").val();
		loan.verify.verifyCheck("iform","submit_button");
		if(menuId){
			loan.addprotocol.menuId = menuId;
		}
		if(opType == 'add') {
			loan.addprotocol.url = loan.basePath+"/protocol/addProtocol";
		}else if(opType == 'up') {
			loan.addprotocol.url = loan.basePath+"/protocol/editProtocol";
		}
	},
   //查询出已上传的文件
	initUpdateData:function(){
		var opType = $("#opType").val();
		if(opType == 'up') {
			var docId = $("#docId").val();
			var depositPath = $("#depositPath").val();
			var originalName = $("#originalName").val();
			var depositFileName = $("#depositFileName").val();
			var item = new Object();
			item.originalName=originalName;
		    item.annexName='';
			$("#attachGridId").jqGrid("setRowData",1,{
				 //uploadFileName : "<a href='"+depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+originalName+"</a>",
				   uploadFileName :originalName,
				 filebackinfo : JSON.stringify(item),
			});
			
		}
	},
	
	/**
	 * 获取系统时间
	 */
	getBusiDate:function(menuId) {
		// loan.ajaxDo({
		// 	url:loan.basePath+"/common/queryBatchDate",
		// 	params:{'menuId':loan.addprotocol.menuId},
		// 	successCallback:function(result){
		// 		var date = result.busiDate.toString();
		// 		loan.addprotocol.busiDate = new Date(date.substr(0,4),date.substr(4,2)-1,date.substr(6,2));
		// 	},
		// 	successTip:false, //提示
		// 	bizErrTip:false,  //提示
		// 	chainPar:this
		// });
	},
};

$(function(){
	var menuId = $("#menuId").val();
	loan.addprotocol.getBusiDate(menuId);
	//最大size
	maxSize=$("#maxSize").val();
	if(!maxSize) {
		maxSize = 10*1024*1024;
	}
});
