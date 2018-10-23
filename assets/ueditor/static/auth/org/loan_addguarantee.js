loan.addguarantee = loan.addguarantee || {
	menuId:'-1',//菜单号
	url:loan.basePath+"/guarantee/addGuarantee",//提交的url
	fileUpdate:false,//判断是否多次上传
	/**
	 * 查询用户详情
	 */
	userDetail : function(userId) {
		var _userId = $("#userId").val();
		//判断是否已选择用户
		if(_userId) {
			userId = _userId;
			parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId="+loan.addguarantee.menuId+"&userId="+userId,"customerDetail",true);
		} else {
			loan.tooltip("请选择用户","error");
		}
	},
	
	/**
	 * 执行提交
	 */
	doSubmit:function(params){
		loan.ajaxDo({
			url:loan.addguarantee.url,
			params:params,
			successCallback:function(){
				//关闭子框架
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 提交按钮函数参数校验
	 */
	submitAdd:function() {
		loan.addguarantee.url = loan.basePath+"/guarantee/addGuarantee";
		var userId = $("#userId").val();
		if(!userId) {
			loan.tooltip("请选择用户","error");
			return;
		}
		
		var warrantId = $("#warrantId").val();
		var warrantName = $("#warrantName").val();
		var guaranteeType = $("#guaranteeType").val();
		var warrantIdKind = $("#warrantIdKind").val();
		var warrantIdNo = $("#warrantIdNo").val();
		var amount = $("#amount").val();
		var remark = $("#remark").val();
		if(!warrantIdKind) {
			loan.tooltip("请选择保证人证件类型","error");
			return;
		}
		
		if(!guaranteeType) {
			loan.tooltip("请选择保证类型","error");
			return;
		}

		if(remark && !v_Regular.canSpecial.test(remark)){
			loan.tooltip("说明不可以包含特殊字符","error");
			return;
		}
		var userIdNo = $("#idNo").html();
		if(userIdNo && warrantIdNo == userIdNo) {
			loan.tooltip("保证人与客户不能为同一人","error");
			$("#warrantIdNo").focus();
			return;
		}
		//校验必传文件
		var fileList;
		if(!loan.addguarantee.validateFiles()){
			return;
		} else {
			fileList = loan.addguarantee.parseFileJson();
		}
		
		var params = {
				'menuId':loan.addguarantee.menuId,
				'menuLog':'1',
				'userId':userId,
				'warrantName':warrantName,
				'guaranteeType':guaranteeType,
				'warrantIdKind':warrantIdKind,
				'warrantIdNo':warrantIdNo,
				'amount':amount,
				'remark':remark,
				'warrantId':warrantId,
				'fileList':fileList,
		}
		
		if(loan.addguarantee.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.addguarantee.doSubmit(params);
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.addguarantee.doSubmit(params);
		}
	},
	
	/**
	 * 提交按钮函数参数校验
	 */
	submitEdit:function() {
		loan.addguarantee.url = loan.basePath+"/guarantee/updateGuarantee";
		var userId = $("#userId").val();
		if(!userId) {
			loan.tooltip("请选择用户","error");
			return;
		}
		
		var warrantId = $("#warrantId").val();
		var warrantName = $("#warrantName").val();
		var guaranteeType = $("#guaranteeType").val();
		var warrantIdKind = $("#warrantIdKind").val();
		var warrantIdNo = $("#warrantIdNo").val();
		var amount = $("#amount").val();
		var remark = $("#remark").val();
		if(!warrantIdKind) {
			loan.tooltip("请选择保证人证件类型","error");
			return;
		}
		
		if(!guaranteeType) {
			loan.tooltip("请选择保证类型","error");
			return;
		}

		if(remark && !v_Regular.canSpecial.test(remark)){
			loan.tooltip("说明不可以包含特殊字符","error");
			return;
		}
		var userIdNo = $("#idNo").html();
		if(userIdNo && warrantIdNo == userIdNo) {
			loan.tooltip("保证人与客户不能为同一人","error");
			$("#warrantIdNo").focus();
			return;
		}
		//校验必传文件
		var fileList;
		if(!loan.addguarantee.validateFiles()){
			return;
		} else {
			fileList = loan.addguarantee.parseFileJson();
		}
		
		var params = {
				'menuId':loan.addguarantee.menuId,
				'menuLog':'1',
				'userId':userId,
				'warrantName':warrantName,
				'guaranteeType':guaranteeType,
				'warrantIdKind':warrantIdKind,
				'warrantIdNo':warrantIdNo,
				'amount':amount,
				'remark':remark,
				'warrantId':warrantId,
				'fileList':fileList,
		}
		
		if(loan.addguarantee.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.addguarantee.doSubmit(params);
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.addguarantee.doSubmit(params);
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
			params: {"menuId":loan.addguarantee.menuId},
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
					var url = "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + obj.domain.depositFilename + "&fileName=" + obj.domain.originalFilename+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>";
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
	 * 校验文件
	 */
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		loan.addguarantee.fileUpdate = false;
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
				loan.addguarantee.fileUpdate = true;
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
	},
	/**
	 * 查询详情
	 */
	queryWarrantInfo:function(warrantId){
		loan.ajaxDo({
            url:loan.basePath+"/guarantee/queryWarrant",
            params:{ 'menuId':loan.addguarantee.menuId,'format':'json','warrantId':warrantId},
            successCallback:function(result){
        		var domain = result.domain;
        		if(domain) {
        			$("#userId").val(domain.userId);
        			$("#userName").val(domain.userName);
        			$("#idKindCn").html(domain.idKindCn);
        			$("#idNo").html(domain.idNo);
        			$("#guaranteeType").val(domain.guaranteeType);
        			$("#warrantName").val(domain.warrantName);
        			$("#warrantIdKind").val(domain.warrantIdKind);
        			$("#warrantIdNo").val(domain.warrantIdNo);
        			$("#amount").val(domain.amount);
        			$("#remark").val(domain.remark);
        			$("#ownerIdKind").trigger("change");
        			
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	
	
	/**
	 * 初始化上传附件页面
	 */
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId',sortable: false, align:'center',hidden:true},
	           {name:'setId',index:'setId', sortable: false,align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select',sortable: false, align:'center',width:270,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addguarantee.upload("+options.rowId+")' value='上传' />"+
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
			cellsubmit: 'clientArray',  //不进行ajax提交
			autowidth: true,	
			forceFit:true,//调整列宽不会改变表格宽度
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
	  	jQuery("#attachGridId").setGridWidth($(window).width()-160);
	  	//设置附件条目
		loan.addguarantee.queryAttachItem();
		//更新页面设置
		loan.addguarantee.initUpdateData();
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){
		var length = loan.addguarantee.menuId.length;
		if(length > 2) {
			length = length -2;
		}
		var functionId = loan.addguarantee.menuId.substr(0,length);
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':loan.addguarantee.menuId,'status':'0','functionId':functionId,'page':'1','rows':'9999'},
            successCallback:loan.addguarantee.attachItemCallBack,
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
	queryAttachInfo:function(WarrantId){
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':loan.addguarantee.menuId,"checkId":WarrantId},
            successCallback:loan.addguarantee.attachCallBack,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
		
	},
	
	/**
	 * 查询已上传文件的回调
	 */
	attachCallBack:function(result){
 		var list = result.list;
		//初始化已上传过的文件
		if(list && list.length>0) {
			var ids = $("#attachGridId").jqGrid("getDataIDs");
			$(list).each(function(i,item) {
				for( var j = 0; j < ids.length; j++){
					var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
					if(item.setId == rowdata.setId) {
						var url = "<a href='"+ loan.basePath+ "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + item.originalFilename+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>";
						$("#attachGridId").jqGrid("setRowData",ids[j],{
			        		  filelistId : item.filelistId,
			        		  uploadFileName : url,
			        		  filebackinfo : JSON.stringify(item),
						});
						break;
					}
				}
			});
		}
	},
	
	/**
	 * 初始化页面性质修改，新增
	 */
	initPageType:function() {
		//根据操作类型设置页面参数
		var menuId = $("#menuId").val();
		loan.verify.verifyCheck("iform","submit_button");
		if(menuId){
			loan.addguarantee.menuId = menuId;
		}
		
	},

	initUpdateData:function(){
		var id = $("#warrantId").val();
		if(id) {
			loan.addguarantee.queryWarrantInfo(id);
			loan.addguarantee.queryAttachInfo(id);
			$("#userName").unbind("click");
		}
	},
};

$(function(){
	$('#evalDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath + "/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true,
		changeMonth:true,
		changeYear:true
	});
	$("ui-datepicker-calendar").live("click",function(){
		$(this).blur();
	});
	//最大size
	maxSize=$("#maxSize").val();
	if(!maxSize) {
		maxSize = 10*1024*1024;
	}
	//文件格式
	if($("#fileExtName").val()) {
		loan.fileExtName = $("#fileExtName").val().replace(/\*/g,'');
	} else {
		loan.fileExtName = '.*';
	}
	//选择用户
	$(".openw").click(function(){
		loan.s_addPop("选择用户",loan.basePath+"/common/selectloan?status=userName&menuId=600901&submitFunc=submit2warrant&closeFunc=close2warrant","",680,380,{isChangeClose:true});
	});
});
