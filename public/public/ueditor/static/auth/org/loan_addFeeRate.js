loan.addFeeRate = loan.addFeeRate || {
	fileUpdate : false,
	init : function(){
	},
	qryInterestRate : function(loanApplyId){
		
		if(loanApplyId){// 借据申请有效才查询
			loan.ajaxDo({
				url:loan.basePath+"/feesAdjust/queryInterestRate",
				params:{ loanApplyId : loanApplyId, menuId : $('#menuId').val(),format : 'json' },
				successCallback:function(result){
					if(result.domain && (result.domain.interestRate || result.domain.interestRate == '0')){
						var interestRate=result.domain.interestRate*1000;
						var dinterestRate=result.domain.dinterestRate*1000;
						interestRate = $.fmatter.util.NumberFormat(interestRate,{decimalPlaces:3});
						dinterestRate= $.fmatter.util.NumberFormat(dinterestRate,{decimalPlaces:3});
						$("#interestRate").html(interestRate+"‰");//原执行月利率
						$("#dinterestRate").html(dinterestRate+"‰");//原执行月利率
					} else {
						$('#interestRate').html('无');
						$('#dinterestRate').html('无');
					}
				},
				successTip:false, //提示
				bizErrTip:false,  //提示
				chainPar:this
			});
		}
	},
	/** 新增 */
	addFeeRate : function(){
		var applyId = $('#applyId').val();
		var loanApplyId = $('#loanApplyId').val();
		var receiptId = $('#receiptId').val();
		// 没有选择不允许新增
		if(loanApplyId == '' || receiptId == ''){
			loan.tooltip("请选择贷款","error");
			$('#receiptId').focus();
			return;
		}
		var userId = $('#userId').val();
		var interestRatio = $('#interestRatio').val()/1000;
		var startDate = $('#startDate').val();
		var diInterestRatio = $('#diInterestRatio').val()/1000;
		var remark = $('#remark').val();
		if(!startDate){
			loan.tooltip("请选择生效日期!","error");
			$('#startDate').focus();
			return;
		}
		var fileList;
		if(!loan.addFeeRate.validateFiles()){
			return;
		} else {
			fileList = loan.addFeeRate.parseFileJson();
		}
		
		loan.ajaxDo({
			url : loan.basePath + "/feeRateAdjust/addFeeRateAdjust",
			params:{"menuId":"0","applyId" : applyId,"userId":userId,"loanApplyId" :loanApplyId, "receiptId" : receiptId ,
			"interestRatio" : interestRatio, "startDate" : startDate , "diInterestRatio" : diInterestRatio,"remark":remark,'fileList':fileList},
			successCallback:loan.addFeeRate.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
		
	},
	validateFiles:function() {
		var datas = $("#attach").jqGrid('getRowData');
		loan.addFeeRate.fileUpdate = false;
		for(var i = 0; i < datas.length; i++) {
			var rowObj = datas[i];
			var rowid = i+1;
			//判断必传文件是否已上传
			var content = rowObj.uploadFileName;
			if(rowObj && rowObj.mustStatus == '1') {
				if(!content) {
					loan.tooltip("请上传第"+rowid+"个文件","error"); 
					return false;
				}
			}
			//校验是否重新上传的文件未提交
			var fileValue = $("#loanUpload_"+rowid).val();
			if(fileValue) {
				loan.addFeeRate.fileUpdate = true;
			}
		}
		return true;
	},
	parseFileJson : function() {
		var datas = $("#attach").jqGrid('getRowData');
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
	/** 更新 */
	updateFeeRate : function(type){
		var applyId = $('#applyId').val();
		var loanApplyId = $('#loanApplyId').val();
		var receiptId = $('#receiptId').val();
		// 没有选择不允许新增
		if(loanApplyId == '' || receiptId == ''){
			loan.tooltip("请选择贷款","error");
			$('#receiptId').focus();
			return;
		}
		var userId = $('#userId').val();
		var interestRatio = $('#interestRatio').val()/1000;
		var startDate = $('#startDate').val();
		var diInterestRatio = $('#diInterestRatio').val()/1000;
		var remark = $('#remark').val();
		if(!startDate){
			loan.tooltip("请生效日期","error");
			$('#startDate').focus();
			return;
		}
		var fileList;
		if(!loan.addFeeRate.validateFiles()){
			return;
		} else {
			fileList = loan.addFeeRate.parseFileJson();
		}
		var params = {"menuId":"0","applyId" : applyId,"userId":userId,"loanApplyId" :loanApplyId, "receiptId" : receiptId ,
				"interestRatio" : interestRatio, "startDate" : startDate , "diInterestRatio" : diInterestRatio,"remark":remark,'fileList' : fileList};
		loan.ajaxDo({
			url : loan.basePath + "/feeRateAdjust/updateFeeRateAdjust",
			params : params,
			successCallback:loan.addFeeRate.closeChildFrame(type),
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
		
	},
	cancel : function(){
		loan.tabcut.childClosedIframe();
	},
	closeChildFrame : function(type){
		if(type && type =='flowUpdate'){
			loan.tabcut.childClosedIframe(false);
		}else{
			loan.tabcut.childClosedIframe(true);
		}
	},
	/** 初始化文件上传 */
	initAttach : function(){
		jQuery("#attach").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId', sortable: false,align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
	           {name:'checkId',index:'checkId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus',sortable: false, align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select', align:'center',sortable: false,width:350,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addFeeRate.upload("+options.rowId+")' value='上传' />"+
						"<label id='labelId'></label>"+
						"</form>";
					}},
			   {name:'uploadFileName',index:'uploadFileName', sortable: false,align:'center'}
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
	  	jQuery("#attach").setGridWidth($(window).width()-160);
	  	//设置附件条目
		loan.addFeeRate.queryAttachItem();
	  	//更新页面设置
		loan.addFeeRate.initUpdateData();
	},
	
	queryAttachItem : function(){
		var menuId = $('#menuId').val();
		var length = menuId.length;
		if(length > 2) {
			length = length -2;
		}
		var functionId = menuId.substr(0,length);
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':'-1','status':'0','functionId':functionId,'page':'1','rows':'9999'},
            successCallback:loan.addFeeRate.attachItemCallBack,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
		
	},
	initUpdateData : function(){
		var id = $("#applyId").val();
		if(id) {
			loan.addFeeRate.queryAttachInfo(id);
		}
		
	},
	attachItemCallBack : function(result){
		var list = result.pager.items;
    	if(list && list.length > 0) {
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			var rowid = i+1;
    			$("#attach").jqGrid("addRowData",rowid,item);
    		}
    	}
	},
	/**上传文件*/
	upload : function(rowid) {
		if($("#loanUpload_"+rowid).val() == '' || $("#loanUpload_"+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			return;
		}
		var rowObj = $("#attach").jqGrid('getRowData',rowid);
		var setId = rowObj.setId;
		var orgId = rowObj.orgId;
		var extenString = rowObj.extenString;
		var mustStatus = rowObj.mustStatus;
		var checkId = $('#applyId').val();
		var filelistId = rowObj.filelistId;
		
		$("#loanUpload_"+rowid).upload({
			url: loan.basePath+'/org/upload?extenString='+extenString+"&orgId="+orgId+"&checkId="+checkId+"&filelistId="+filelistId+"&setId="+setId,
			// 其他表单数据
			params: {"menuId":'-1' },
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
					
					var url = "<a href='"+loan.basePath + "/loan/downFile?ossName=" + obj.domain.depositFilename + "&fileName=" + encodeURIComponent(obj.domain.originalFilename)+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>";
					jQuery("#attach").jqGrid('setRowData',rowid, {
		        		  filelistId : obj.domain.filelistId,
		        		  uploadFileName : url,
		        		  filebackinfo : JSON.stringify(obj.domain)
					}); 
				}else{
					loan.tooltip(obj.errMsg,"error");
				}
				$("#loanUpload_"+rowid).removeAttr("disabled");
				var file = $("#loanUpload_"+rowid);
				file.after(file.clone().val(""));
				file.remove();
			}
		});
		$("#loanUpload_"+rowid).upload("ajaxSubmit");
	},
	queryAttachInfo:function(applyId){
		var menuId = $('#menuId').val();
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':menuId,"checkId":applyId},//'menuId':'7004'这个后面加上
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			var ids = $("#attach").jqGrid("getDataIDs");
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#attach").jqGrid("getRowData",ids[j]);
	     					
	     					var url = "<a href='"+loan.basePath + "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + encodeURIComponent(item.originalFilename)+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>";
	     					if(item.setId == rowdata.setId) {
	     						$("#attach").jqGrid("setRowData",ids[j],{
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
	
	
	rateVerify:function(){
		//重新编写校验利率的规则
		$.extend(loan.verify,{
			verifyFloat:function($this,value){
				var left = $this.width();
				if(value == ""){
					var Tip = '不能为空';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				if(!v_Regular.float.test(value)){
					var Tip = '类型错误';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				if(value >= 1000){
					var Tip = '最多只能输入3位整数';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				var values=new Array();
				values=value.split(".");
				if(values.length>1 && values[1].length>3){
					var Tip = '最多只能输入3位小数';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				loan.verify.formValidatorShowMsgTrue($this,left);
				return true;
			},
			
		});
		
	},
}

$(function(){
	loan.addFeeRate.rateVerify();
});