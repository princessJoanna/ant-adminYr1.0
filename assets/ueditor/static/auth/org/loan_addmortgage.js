loan.addmortgage = loan.addmortgage || {
	menuId:'-1',//菜单号
	url:loan.basePath+"/guarantee/addMortgage",//提交的url
	fileUpdate:false,//判断是否多次上传
	buzidate:new Date(),
	/**
	 * 设置证件号的校验
	 */
	personIdCheck:function(idkindContainer,idContainer) {
		var idKind = $("#"+idkindContainer).val();
		switch(idKind) {//0身份证，1护照  2港澳通行整个
			case "0":$("#"+idContainer).attr("verifyData","{type:'myCard',length:'1,18' ,required:'yes'}");
				     break;
			case "1":
				$("#"+idContainer).attr("verifyData","{type:'passport',length:'1,18' ,required:'yes'}");
				break;
			case "2":$("#"+idContainer).attr("verifyData","{type:'hkongMacao',length:'1,18' ,required:'yes'}");
			         break;
			default:$("#"+idContainer).attr("verifyData","{type:'notSpecial',length:'1,30' ,required:'yes'}");
	         		break;
		}
	},
	/**
	 * 查询用户详情
	 */
	userDetail : function(userId) {
		var _userId = $("#userId").val();
		//判断是否已选择用户
		if(_userId) {
			userId = _userId;
			parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId="+loan.addmortgage.menuId+"&userId="+userId,"customerDetail",true);
		} else {
			loan.tooltip("请选择用户","error");
		}
	},
	
	/**
	 * 执行提交
	 */
	doSubmit:function(params){
		loan.ajaxDo({
			url:loan.addmortgage.url,
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
		loan.addmortgage.url = loan.basePath+"/guarantee/addMortgage";
		var userId = $("#userId").val();
		if(!userId) {
			loan.tooltip("请选择用户","error");
			return;
		}
		var warrantId = $("#warrantId").val();
		var ownerName = $("#ownerName").val();
		var ownerIdKind = $("#ownerIdKind").val();
		var ownerIdNo = $("#ownerIdNo").val();
		var warrantName = $("#warrantName").val();
		var warrantIdKind = $("#warrantIdKind").val();
		var warrantIdNo = $("#warrantIdNo").val();
		var originValue = $("#originValue").val();
		var evalValue = $("#evalValue").val();
		var evalDate = $("#evalDate").val();
		var evalOrg = $("#evalOrg").val();
		var amount = $("#amount").val();
		var warrantNo = $("#warrantNo").val();
		var remark = $("#remark").val();
		if(!loan.addmortgage.validateSelect('ownerIdKind','请选择所有权人证件类型')) {
			return;
		};
		if(!loan.addmortgage.validateSelect('warrantIdKind','请选择质押物证件类型')) {
			return;
		};
		var namount = new Number(amount);
		var eamount = new Number(evalValue);
		//校验担保金额
		if(namount > new Number(eamount)) {
			loan.tooltip("质押金额不可以超过评估金额","error");
			return;
		}
		
		/*if(!evalDate) {
			loan.tooltip("请选择评估日期","error");
			return;
		}*/
		evalDate = evalDate.replace(/-/g,"");
		
		if(remark && !v_Regular.canSpecial.test(remark)){
			loan.tooltip("说明不可以包含特殊字符","error");
			return;
		}

		//校验必传文件
		var fileList;
		if(!loan.addmortgage.validateFiles()){
			return;
		} else {
			fileList = loan.addmortgage.parseFileJson();
		}
		
		
		var params = {
				'menuId':loan.addmortgage.menuId,
				'menuLog':'1',
				'userId':userId,
				'ownerName':ownerName,
				'ownerIdKind':ownerIdKind,
				'ownerIdNo':ownerIdNo,
				'warrantName':warrantName,
				'warrantIdKind':warrantIdKind,
				'warrantIdNo':warrantIdNo,
				'originValue':originValue,
				'evalValue':evalValue,
				'evalDate':evalDate,
				'evalOrg':evalOrg,
				'amount':amount,
				'warrantNo':warrantNo,
				'remark':remark,
				'warrantId':warrantId,
				'fileList':fileList,
		}
		
		if(loan.addmortgage.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.addmortgage.doSubmit(params);
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.addmortgage.doSubmit(params);
		}
		
	},
	
	/**
	 * 提交按钮函数参数校验
	 */
	submitEdit:function() {
		loan.addmortgage.url = loan.basePath+"/guarantee/updateMortgage";
		var userId = $("#userId").val();
		if(!userId) {
			loan.tooltip("请选择用户","error");
			return;
		}
		var warrantId = $("#warrantId").val();
		var ownerName = $("#ownerName").val();
		var ownerIdKind = $("#ownerIdKind").val();
		var ownerIdNo = $("#ownerIdNo").val();
		var warrantName = $("#warrantName").val();
		var warrantIdKind = $("#warrantIdKind").val();
		var warrantIdNo = $("#warrantIdNo").val();
		var originValue = $("#originValue").val();
		var evalValue = $("#evalValue").val();
		var evalDate = $("#evalDate").val();
		var evalOrg = $("#evalOrg").val();
		var amount = $("#amount").val();
		var warrantNo = $("#warrantNo").val();
		var remark = $("#remark").val();
		if(!loan.addmortgage.validateSelect('ownerIdKind','请选择所有权人证件类型')) {
			return;
		};
		if(!loan.addmortgage.validateSelect('warrantIdKind','请选择质押物证件类型')) {
			return;
		};
		
		var namount = new Number(amount);
		var eamount = new Number(evalValue);
		//校验担保金额
		if(namount > new Number(eamount)) {
			loan.tooltip("质押金额不可以超过评估金额","error");
			return;
		}
		
		if(remark && !v_Regular.canSpecial.test(remark)){
			loan.tooltip("说明不可以包含特殊字符","error");
			return;
		}
		/*if(!evalDate) {
			loan.tooltip("请选择评估日期","error");
			return;
		}*/
		evalDate = evalDate.replace(/-/g,"");

		//校验必传文件
		var fileList;
		if(!loan.addmortgage.validateFiles()){
			return;
		} else {
			fileList = loan.addmortgage.parseFileJson();
		}
		
		
		var params = {
				'menuId':loan.addmortgage.menuId,
				'menuLog':'1',
				'userId':userId,
				'ownerName':ownerName,
				'ownerIdKind':ownerIdKind,
				'ownerIdNo':ownerIdNo,
				'warrantName':warrantName,
				'warrantIdKind':warrantIdKind,
				'warrantIdNo':warrantIdNo,
				'originValue':originValue,
				'evalValue':evalValue,
				'evalDate':evalDate,
				'evalOrg':evalOrg,
				'amount':amount,
				'warrantNo':warrantNo,
				'remark':remark,
				'warrantId':warrantId,
				'fileList':fileList,
		}
		
		if(loan.addmortgage.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.addmortgage.doSubmit(params);
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.addmortgage.doSubmit(params);
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
			params: {"menuId":loan.addmortgage.menuId},
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
		loan.addmortgage.fileUpdate = false;
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
				loan.addmortgage.fileUpdate = true;
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
            params:{ 'menuId':loan.addmortgage.menuId,'format':'json','warrantId':warrantId},
            successCallback:function(result){
        		var domain = result.domain;
        		if(domain) {
        			$("#userId").val(domain.userId);
        			$("#userName").val(domain.userName);
        			$("#idKindCn").html(domain.idKindCn);
        			$("#idNo").html(domain.idNo);
        			$("#ownerName").val(domain.ownerName);
        			$("#ownerIdKind").val(domain.ownerIdKind);
        			$("#ownerIdNo").val(domain.ownerIdNo);
        			$("#warrantName").val(domain.warrantName);
        			$("#warrantIdKind").val(domain.warrantIdKind);
        			$("#warrantIdNo").val(domain.warrantIdNo);
        			$("#originValue").val(domain.originValue);
        			$("#evalValue").val(domain.evalValue);
        			if(domain.evalDate){
        				var date = domain.evalDate.toString();
        				var evalDate = date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
            			$("#evalDate").val(evalDate);
        			}
        			$("#evalDate").val(evalDate);
        			$("#evalOrg").val(domain.evalOrg);
        			$("#amount").val(domain.amount);
        			$("#warrantNo").val(domain.warrantNo);
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
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId',sortable: false, align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus',sortable: false, align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select',sortable: false, align:'center',width:280,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addmortgage.upload("+options.rowId+")' value='上传' />"+
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
	  	jQuery("#attachGridId").setGridWidth($(window).width()-160);
	  	//设置附件条目
		loan.addmortgage.queryAttachItem();
	  	//更新页面设置
		loan.addmortgage.initUpdateData();
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){
		var length = loan.addmortgage.menuId.length;
		if(length > 2) {
			length = length -2;
		}
		var functionId = loan.addmortgage.menuId.substr(0,length);
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':loan.addmortgage.menuId,'status':'0','functionId':functionId,'page':'1','rows':'9999'},
            successCallback:loan.addmortgage.attachItemCallBack,
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
			params:{format:'json','menuId':loan.addmortgage.menuId,"checkId":WarrantId},//'menuId':'7004'这个后面加上
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			var ids = $("#attachGridId").jqGrid("getDataIDs");
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
	     					var url = "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + item.originalFilename+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>";
	     					if(item.setId == rowdata.setId) {
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
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
		
	},
	validateSelect:function(id,Tip) {
		var left = $("#"+id).width();
		var targer = $("#"+id).val()
		if(!targer) {
			loan.verify.formValidatorShowMsg( $("#"+id),Tip,left);
			return false;
		}
		return true;
	},
	
	
	/**
	 * 初始化页面性质修改，新增
	 */
	initPageType:function() {
		//根据操作类型设置页面参数
		var menuId = $("#menuId").val();
		loan.verify.verifyCheck("iform","submit_button");
		if(menuId){
			loan.addmortgage.menuId = menuId;
		}
		$("#ownerIdKind").unbind("change").bind("change",function(){
			loan.addmortgage.personIdCheck("ownerIdKind", "ownerIdNo");
		});
	},

	initUpdateData:function(){
		var id = $("#warrantId").val();
		if(id) {
			loan.addmortgage.queryWarrantInfo(id);
			loan.addmortgage.queryAttachInfo(id);
			$("#userName").unbind("click");
		}
	},
	/**
	 * 获取系统时间
	 */
	getBusiDate:function(menuId) {
		// loan.ajaxDo({
		// 	url:loan.basePath+"/common/queryBatchDate",
		// 	params:{'menuId':loan.addmortgage.menuId},
		// 	successCallback:function(result){
		// 		var date = result.busiDate.toString();
		// 		loan.addmortgage.busiDate = new Date(date.substr(0,4),date.substr(4,2)-1,date.substr(6,2));
		// 	},
		// 	successTip:false, //提示
		// 	bizErrTip:false,  //提示
		// 	chainPar:this
		// });
	},
};


$(function(){
	var menuId = $("#menuId").val();
	loan.addmortgage.getBusiDate(menuId);
	$('#evalDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath + "/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true,
		maxDate : loan.addmortgage.busiDate,
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
		loan.s_addPop("选择用户",loan.basePath+"/common/selectloan?status=userName&menuId=600701&submitFunc=submit2warrant&closeFunc=close2warrant","",680,380,{isChangeClose:true});
	});
});
