loan.dealydateapplytodo = loan.dealydateapplytodo || {
	menuId:'1102',//菜单号
	
	/**
	 * 查询用户详情
	 */
	userDetail : function(userId) {
		var _userId = $("#userId").val();
		//判断是否已选择
		if(_userId) {
			userId = _userId;
			parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId="+loan.dealydateapplytodo.menuId+"&userId="+userId,"customerDetail",true);
		} else {
			loan.tooltip("请选择","error");
		}
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
			}
		});
	},
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(applyId){
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':'110401',"checkId":applyId},//'menuId':'7009'这个后面加上
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
	/**
	 * 提交,参数校验，提交方法
	 */
	submit:function() {
		var applyId = $("#applyId").val();
		var userId = $("#userId").val();
		var loanApplyId = $("#loanApplyId").val();
		var receiptId = $("#receiptId").val();
		var receiptNo = $("#receiptNo").val();
		var startDate = $("#startDate").val();	
		var endDate = $("#endDate").val();
		var delayDate = $("#delayDate").val();
		var oldInterestRate= $("#oldInterestRate").val();
		var delayInterestRate = $("#delayInterestRate").val()/1000;
		var delayDinterestRate = $("#delayDinterestRate").val()/1000;
		
		if(!receiptNo) {
			loan.tooltip("请选择要调整的贷款","error");
			return;
		}
		if(startDate ==""){
			loan.tooltip("贷款开始日期为空","error");
			return;
		}
			
		if(!endDate){
			loan.tooltip("贷款结束日期为空","error");
			return;
		}
		if(!delayDate){
			loan.tooltip("展期到期时间为空","error");
			return;
		}
		if(!delayInterestRate){
			loan.tooltip("展期月利率为空","error");
			return;
		}
		if(!delayDinterestRate){
			loan.tooltip("展期罚息利率为空","error");
			return;
		}
		var remark = $("#remark").val();
		//校验必传文件
		var fileList;
		if(!loan.dealydateapplytodo.validateFiles()){
			return;
		} else {
			fileList = loan.dealydateapplytodo.parseFileJson();
		}
		var params = {
				'menuId':loan.dealydateapplytodo.menuId,
				'menuLog':'1',
				'userId':userId,
				'loanApplyId':loanApplyId,
				'receiptId':receiptId,
				'startDate':startDate,
				'endDate':endDate,
				'delayDate':delayDate,
				'oldInterestRate':oldInterestRate,
				'delayInterestRate':delayInterestRate,
				'delayDinterestRate':delayDinterestRate,
				'remark':remark,
				'applyId':applyId,
				'fileList':fileList,
		}
		if(loan.dealydateapplytodo.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.dealydateapplytodo.doSubmit(params);
				},
				cancel:function(){
					return false;
				}
		    });
		}else{
			loan.dealydateapplytodo.doSubmit(params);
		}
	},
	
	/**
	 * 执行提交
	 */
	doSubmit:function(params){
		loan.ajaxDo({
			url:loan.basePath+ "/delay/addDelayDateApply",
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
	 * 查询产品列表
	 *//*
	queryProduct:function() {
    	loan.ajaxDo({
            url:loan.basePath+"/signProduct/queryProduct",
            params:{ 'menuId':loan.dealydateapplytodo.menuId,'format':'json'},
            successCallback:loan.dealydateapplytodo.showProductResult,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
    },*/
	/**
	 * 校验文件
	 */
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		loan.dealydateapplytodo.fileUpdate = false;
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
				loan.dealydateapplytodo.fileUpdate = true;
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
	           {name:'orgId',index:'orgId', align:'center',sortable: false,hidden:true},
	           {name:'setId',index:'setId', align:'center',sortable: false,hidden:true},
	           {name:'filelistId',index:'filelistId', align:'center',sortable: false,hidden:true},
	           {name:'checkId',index:'checkId', align:'center',sortable: false,hidden:true},
			   {name:'annexName',index:'annexName', sortable: false,align:'center'},
			   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
	           {name:'select',index:'select', align:'center',sortable: false,width:350,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.dealydateapplytodo.upload("+options.rowId+")' value='上传' />"+
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
		loan.dealydateapplytodo.queryAttachItem();
	},
	/***
	 * 查询附件条目
	 */
	queryAttachItem:function(){//functionId后续需要修改
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId':'1102','status':'0','functionId':'1102','page':'1','rows':'9999'},
            successCallback:loan.dealydateapplytodo.attachItemCallBack,
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
			params: {"menuId":loan.dealydateapplytodo.menuId},
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
				}
				$("#loanUpload_"+rowid).removeAttr("disabled");
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
			postData:{format:'json',"functionId":'1102',"checkId":applyId,'menuLog':'1'},//'menuId':'7004'这个后面加上
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath', sortable: false,align:'center',hidden:true},
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'originalFilename',index:'originalFilename',sortable: false, align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename  +"'  target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
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
	initUpdatePage:function(applyId){
		loan.ajaxDo({
            url:loan.basePath+"/delay/queryDelayDateApplyInfo",
            params:{'format':'json','applyId':applyId},
            successCallback:function(result){//初始化页面信息
        		var domain = result.delayDateApplyInfoDomain;
        		if(domain!=null) {
        			var idKindCn = $("#idKindCn").val();
        			$("#applyId").val(domain.applyId);
        			$("#userId").val(domain.userId);
        			$("#receiptId").val(domain.receiptId);
        		    $("#receiptNo").html(domain.receiptNo);
        		    $("#loanApplyId").val(domain.loanApplyId);
        			$("#userName").html(domain.userName);//客户名称
        			$("#idKind").html(domain.idKindCn);//证件类型
        			$("#idNo").html(domain.idNo);//证件号码
        			var amt = formatMoney(domain.loanAmount,".",2);
        			$("#loanAmount").html(amt + "元");//贷款金额
        			$("#loanDate").html(domain.loanDate);//贷款开始日期
        			$("#startDate").html(domain.endDate);//贷款到期日期
        			$("#endDate").html(domain.endDate);//贷款到期日期
        			var str = domain.delayDate;
        			var sdate = loan.dealydateapplytodo.setDateValue(str);
        			$("#delayDate").val(sdate);//
        			//$("#interestRate").html(formatMoney(domain.interestRate*1000,".",3)+"‰");//原执行月利率
        			$("#delayInterestRate").val(formatMoney(domain.delayInterestRate*1000,".",3));//调整罚息
        			$("#delayDinterestRate").val(formatMoney(domain.delayDinterestRate*1000,".",3));//调整罚息
        			$("#remark").val(domain.remark);
        			
        			$("#receiptNo").val(domain.receiptNo);//贷款到期日期
        			$("#startDate").val(domain.startDate);//贷款到期日期
        			$("#endDate").val(domain.endDate);//贷款到期日期
        		}
        	},
            successTip:false, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
		
	},
	initInfo : function(applyId){
		loan.ajaxDo({
            url:loan.basePath+"/delay/queryDelayDateApplyInfo",
            params:{'format':'json','applyId':applyId},
            successCallback:function(result){//初始化页面信息
        		var domain = result.delayDateApplyInfoDomain;
        		if(domain!=null) {
        			var idKindCn = $("#idKindCn").val();
        			$("#applyId").val(domain.applyId);
        			$("#userId").val(domain.userId);
        			$("#receiptId").val(domain.receiptId);
        		    $("#receiptNo").html(domain.receiptNo);
        		    $("#loanApplyId").val(domain.loanApplyId);
        			$("#userName").html(domain.userName);//客户名称
        			$("#idKind").html(domain.idKindCn);//证件类型
        			$("#idNo").html(domain.idNo);//证件号码
        			var amt = formatMoney(domain.loanAmount,".",2);
        			$("#loanAmount").html(amt + "元");//贷款金额
        			$("#loanDate").html(domain.loanDate);//贷款开始日期
        			$("#startDate").html(domain.startDate);//贷款到期日期
        			$("#endDate").html(domain.endDate);//贷款到期日期
        			$("#delayDate").html(domain.delayDate);//
        			$("#interestRate").html(formatMoney(domain.interestRate*1000,".",3)+"‰");//原执行月利率
        			$("#delayInterestRate").html(formatMoney(domain.delayInterestRate*1000,".",3) +"‰");//调整罚息
        			$("#delayDinterestRate").html(formatMoney(domain.delayDinterestRate*1000,".",3) +"‰");//调整罚息
        			$("#remark").val(domain.remark);
        			$("#receiptNo").val(domain.receiptNo);//贷款到期日期
        			$("#startDate").val(domain.startDate);//贷款到期日期
        			$("#endDate").val(domain.endDate);//贷款到期日期
        		}
        	},
            successTip:false, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
		
	},
	/**
	 * 查询借据原执行率，用于展示上次原执行月利率
	 * */
	qryInterestRate : function(){
		var loanApplyId = $("#loanApplyId").val();
		if(loanApplyId){// 借据申请有效才查询
			loan.ajaxDo({
				url:loan.basePath+"/feesAdjust/queryInterestRate",
				params:{ loanApplyId : loanApplyId, menuId : $('#menuId').val(),format : 'json' },
				successCallback:function(result){
					if(result.domain && result.domain.interestRate){
						var interestRate = result.domain.interestRate * 1000000 / 1000;
						interestRate = formatMoney(interestRate,".",3);
						$("#interestRate").html(interestRate+"‰");//原执行月利率
					}else{
						$('#interestRate').html("0‰");
					}
				},
				successTip:false, //提示
				bizErrTip:false,  //提示
				chainPar:this
			});
		}
	},
	

	intUpdateFilePage:function(applyId){
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名称'], 
			colModel: [
	           {name:'orgId',index:'orgId', align:'center',hidden:true},
	           {name:'setId',index:'setId', align:'center',hidden:true},
	           {name:'filelistId',index:'filelistId', align:'center',hidden:true},
	           {name:'checkId',index:'checkId', align:'center',hidden:true},
			   {name:'annexName',index:'annexName', sortable: false,align:'center'},
			   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
	           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
	           {name:'mustStatus',index:'mustStatus', sortable: false,align:'center',hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn', sortable: false,align:'center'},
	           {name:'select',index:'select', align:'center',sortable: false,width:350,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.dealydateapplytodo.upload("+options.rowId+")' value='上传' />"+
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
		loan.dealydateapplytodo.queryAttachItem();
		loan.dealydateapplytodo.queryAttachInfo(applyId);
	},


	/**
	 * 提交,参数校验，提交方法
	 */
	updateSubmit:function(type) {
		var applyId = $("#applyId").val();
		var userId = $("#userId").val();
		var loanApplyId = $("#loanApplyId").val();
		var receiptId = $("#receiptId").val();
		var receiptNo = $("#receiptNo").val();
		var startDate = $("#startDate").val();	
		var endDate = $("#endDate").val();
		var delayDate = $("#delayDate").val();		
		var delayInterestRate = $("#delayInterestRate").val()/1000;
		var delayDinterestRate = $("#delayDinterestRate").val()/1000;
		if(!receiptNo) {
			loan.tooltip("请选择要调整的贷款","error");
			return;
		}
		
		if(!startDate){
			loan.tooltip("贷款开始日期为空","error");
			return;
		}

		if(!endDate){
			loan.tooltip("贷款结束日期为空","error");
			return;
		}
		
		if(!delayDate){
			loan.tooltip("展期到期时间为空","error");
			return;
		}
		
		if(!delayInterestRate){
			loan.tooltip("展期月利率为空","error");
			return;
		}
		if(!delayDinterestRate){
			loan.tooltip("展期罚息利率为空","error");
			return;
		}
		var remark = $("#remark").val();
		//校验必传文件
		var fileList;
		if(!loan.dealydateapplytodo.validateFiles()){
			return;
		} else {
			fileList = loan.dealydateapplytodo.parseFileJson();
		}
		
		var params = {
				'menuId':loan.dealydateapplytodo.menuId,
				'menuLog':'1',
				'delayDate':delayDate,
				'delayInterestRate':delayInterestRate,
				'delayDinterestRate':delayDinterestRate,
				'remark':remark,
				'userId':userId,
				'applyId':applyId,
				'receiptId':receiptId,
				'fileList':fileList,
		}
		if(loan.dealydateapplytodo.fileUpdate){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.dealydateapplytodo.doUpdateSubmit(params , type);
				},
				cancel:function(){
					return false;
				}
		    });
		}else{
			loan.dealydateapplytodo.doUpdateSubmit(params,type);
		}
	},
	
	doUpdateSubmit:function(params,type){
		loan.ajaxDo({
			url:loan.basePath+ "/delay/updateDelayDateApply",
			params:params,
			successCallback:function(){
				//关闭子框架
				if(type && type == 'flowUpdate'){
					loan.tabcut.childClosedIframe(false);
				}else{
					loan.tabcut.childClosedIframe(true);
				}
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	setDateValue:function(str){
		if(str.length<8){
			alert("日期格式错误");
			return "";
		}else{
			var strs = str.toString();
			var year = strs.substring(0,4);
			var month = strs.substring(4,6);
			var day = strs.substring(6,8);
			return year+"-"+month+"-"+day;
		}
	}
	
   
};

/**
 * 金额格式化
 * @param nData
 * @param decimalSeparator
 * @param decimalPlaces
 * @returns
 */
 
function formatMoney(nData,decimalSeparator,decimalPlaces) {
	var floatRegex = /^[0-9]+(\.[0-9]+)?$/ ;
	if(floatRegex.test(nData)) {
		var bNegative = (nData < 0);
		var sOutput = String(nData);
		var sDecimalSeparator = decimalSeparator || ".";
		var nDotIndex;
		var nDecimalPlaces = decimalPlaces || 2;
		var nDecimal = Math.pow(10, nDecimalPlaces);
		sOutput = String(Math.round(nData*nDecimal)/nDecimal);
		nDotIndex = sOutput.lastIndexOf(".");
		if(nDecimalPlaces > 0) {
			// Add the decimal separator
			if(nDotIndex < 0) {
				sOutput += sDecimalSeparator;
				nDotIndex = sOutput.length-1;
			}
			// Replace the "."
			else if(sDecimalSeparator !== "."){
				sOutput = sOutput.replace(".",sDecimalSeparator);
			}
			// Add missing zeros
			while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
				sOutput += "0";
			}
		}
		return sOutput;
	}
	return '';
}