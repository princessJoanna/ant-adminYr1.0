loan.aftcheck = loan.aftcheck || {
	menuId:'1109',//菜单号
	/**
	 * 查询用户详情
	 */
	userDetail : function(userId) {
		var _userId = $("#userId").val();
		//判断是否已选择
		if(_userId) {
			userId = _userId;
			parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId="+loan.aftcheck.menuId+"&userId="+userId,"customerDetail",true);
		} else {
			loan.tooltip("请选择","error");
		}
	},
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(applyId){
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':'110901',"checkId":applyId},//'menuId':'7009'这个后面加上
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
	     			        		  uploadFileName :  "<a href='"+item.depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>",
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
	getExcelData:function(){
		var ifrmatDocument =$('#template')[0].contentWindow;// $("#forTest")[0];//.contentDocument;
		var result = ifrmatDocument.getJsonData();
		result = encodeURIComponent(result);
		return result;
	},
	/**
	 * 提交,参数校验，提交方法
	 */
	submit:function() {
		var receiptId = $("#receiptId").val();
		var checkType = $("#checkType").val();
		if(!checkType||checkType==""){
			loan.tooltip("请选择检查类型","error");
			return;
		}
		if(!receiptId||receiptId==""){
			loan.tooltip("请选择一笔借款","error");
			return;
		}
		var remark = $("#remark").val();
		var histTemplateId = $("#userCheck").val();
		if(!histTemplateId||histTemplateId==""){
			loan.tooltip("请选择模板","error");
			return;
		}
		var content = this.getExcelData();
		if(!content||content==""){
			loan.tooltip("未知模板","error");
			return;
		}
		//校验必传文件
		var fileList;
		if(!loan.aftcheck.validateFiles()){
			return;
		} else {
			fileList = loan.aftcheck.parseFileJson();
		}
		
		var params = {
				'menuId':'110906',
				'menuLog':'1',
				'content':content,
				'receiptId':receiptId,
				'fileList':fileList,
				'checkTyep':checkType
		}
		if(loan.aftcheck.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.aftcheck.doSubmit(params);
				},
				cancel:function(){
					return false;
				}
		    });
		}else{
			loan.aftcheck.doSubmit(params);
		}
	},
	/**
	 * 提交,参数校验，提交方法
	 */
	updateCheck:function() {
		var receiptId = $("#receiptId").val();
		var checkId = $("#checkId").val();
		var checkType = $("#checkType").val();
		if(!checkType||checkType==""){
			loan.tooltip("请选择检查类型","error");
			return;
		}
		if(!receiptId||receiptId==""){
			loan.tooltip("请选择一笔借款","error");
			return;
		}
		var remark = $("#remark").val();
		var histTemplateId = $("#userCheck").val();
		if(!histTemplateId||histTemplateId==""){
			loan.tooltip("请选择模板","error");
			return;
		}
		var content = this.getExcelData();
		if(!content||content==""){
			loan.tooltip("未知模板","error");
			return;
		}
		//校验必传文件
		var fileList;
		if(!loan.aftcheck.validateFiles()){
			
		} else {
			fileList = loan.aftcheck.parseFileJson();
		}
		
		var params = {
				'menuId':'11090604',
				'menuLog':'1',
				'checkId':''+checkId,
				'content':content,
				'receiptId':receiptId,
				'fileList':fileList,
				'checkTyep':checkType
		}
		if(loan.aftcheck.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.aftcheck.doUpdate(params);
				},
				cancel:function(){
					return false;
				}
		    });
		}else{
			loan.aftcheck.doUpdate(params);
		}
	},
	/**
	 * 更新日期
	 */
	doUpdate:function(params){
		loan.ajaxDo({
			url:loan.basePath+ "/aftcheck/updateCheck",
			params:params,
			successCallback:function(){
				//关闭子框架
				window.location.href = loan.basePath+"/aftcheck/tocheckpage?menuId=110906";
//				loan.tabcut.childClosedIframe(true);
//				parent.loan.tabcut.childAddIframe("用户检查列表",loan.basePath+"/aftcheck/tocheckpage?menuId="+loan.aftcheck.menuId,"checkList",true);
//				loan.tabcut.childClosedIframe(true)
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 执行提交
	 */
	doSubmit:function(params){
		loan.ajaxDo({
			url:loan.basePath+ "/aftcheck/add",
			params:params,
			successCallback:function(){
				//关闭子框架
				window.location.href = loan.basePath+"/aftcheck/tocheckpage?menuId=110906";
//				loan.tabcut.childClosedIframe(true);
//				parent.loan.tabcut.childAddIframe("用户检查列表",loan.basePath+"/aftcheck/tocheckpage?menuId="+loan.aftcheck.menuId,"checkList",true);
//				loan.tabcut.childClosedIframe(true)
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	/**
	 * 校验文件
	 */
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		loan.aftcheck.fileUpdate = false;
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
				loan.aftcheck.fileUpdate = true;
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
				filelist.push(fileObj);
			}
		}
		return JSON.stringify(filelist);
	},
	
	
	/**
	 * 初始化上传附件页面
	 */
	/**
	 * 初始化上传附件页面
	 */
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId',sortable: false, align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo', sortable: false,align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select', align:'center',sortable: false,width:350,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.aftcheck.upload("+options.rowId+")' value='上传' />"+
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
	  	jQuery("#attachGridId").setGridWidth(950);
	  	//设置附件条目
		loan.aftcheck.queryAttachItem();
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){//functionId后续需要修改
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':'1109','status':'0','functionId':'1109','page':'1','rows':'9999'},
            successCallback:loan.aftcheck.attachItemCallBack,
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
			url: loan.basePath+'/org/upload?extenString='+extenString+"&orgId="+orgId+"&checkId="+checkId+"&filelistId="+filelistId+"&setId="+setId,
			// 其他表单数据
			params: {"menuId":loan.aftcheck.menuId},
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
		        		  uploadFileName : "<a href='"+obj.domain.depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>",
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
	
	initAttachGrid:function(applyId) {
		jQuery("#attachGridId").jqGrid({
			url: loan.basePath+ "/org/queryAttachFiles",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json',"functionId":'1109',"checkId":applyId,'menuLog':'1'},//'menuId':'7004'这个后面加上
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath',sortable: false, align:'center',hidden:true},
	           {name:'orgId',index:'orgId',sortable: false, align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'originalFilename',sortable: false,index:'originalFilename', align:'center',
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
			loadComplete:function(xhr){
				console.log(xhr);
				console.log(xhr.response.list);
				if(xhr.response.list.length == 0){
					$('#agId').hide();
				}
			},
			gridComplete : function() {
//				var detail = jQuery("#attachGridId").jqGrid("getRowData",1);
//				if(detail.orgId == undefined){
//					$('#agId').hide();
//				}
			}
		});
		jQuery("#attachGridId").setGridWidth(850);
	},
	doUpdateSubmit:function(params){
		loan.ajaxDo({
			url:loan.basePath+ "/delay/updateDelayDateApply",
			params:params,
			successCallback:function(){
				//关闭子框架
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	}
};
