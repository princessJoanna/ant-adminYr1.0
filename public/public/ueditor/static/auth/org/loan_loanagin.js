var operatStatus;
var menuId;
var logContent;
var maxSize;
var ieFlag = false;
loan.loanagin = loan.loanagin || {
	fileExtName : '*.*',
	//保存按钮
	saveBtnFunc:function(unNeedDateFiles) {
		loan.loanagin.saveLoanagin(unNeedDateFiles);
	},
	/**保存再次调查信息*/
	saveLoanagin : function(unNeedDateFiles) {
		var orgId = $("#orgId").val();
		var userId = $("#userId").val();
		var alterConfigList = $("#alterConfigList").val();
		var refuseReason = $("#refuseReason").val();
		var sucesseds = document.getElementsByName("sucessed");
		if(userId == '' || userId == null) {
			loan.tooltip("请选择用户","error"); 
			return;
		}
		var sucessedVal = null;
		/**判断已经checked的拒绝原因和验证未选的拒绝原因*/
		for(var n = 0; n < sucesseds.length; n++) {
			var sucessed = sucesseds[n];
			if(sucessed.checked) {
				sucessedVal = $(sucessed).val();
			}
		}
		var refuseReason = $("#refuseReason").val();
		var remark = $("#remark").val();
		/**判断贷前调查记录是否有未被选中的*/
		var uls = $(" .loanUl");
		var loanArray = new Array();
		var checkedRadioNum = 0;
		if(uls.length != 0) {
			var titleNum = uls.length;
			for(var i = 0; i < uls.length;i++) {
				var obj = new Object();
				var ulVal = uls[i];
				var radioVal = $(ulVal).find('li');
				var radioStatus = $(radioVal).find('input');
				for(var j = 0; j < radioStatus.length; j++) {
					var radio = radioStatus[j];
					if(radio.checked) {
						checkedRadioNum++;
						var radival = $(radio).val();
						var val = radival.split("_");
						obj.score = val[0];
						obj.alterConfigId = val[1];
						obj.preloanConfigId = val[2];
						loanArray.push(obj);
					}
				}
			}
			
			if(titleNum != checkedRadioNum) {
				loan.tooltip("贷前调查记录中有选项没有选中","error"); 
				return;
			}
		}
		
		if(sucessedVal == null) {
			loan.tooltip("您的调查结论没有选择","error"); 
			return;
		}
		if(sucessedVal == '0' && (refuseReason == ''|| refuseReason == null)) {
			loan.tooltip("请选择拒绝原因","error"); 
			return;
		}
		if(remark.length > 255) {
			loan.tooltip("说明超过最大长度","error"); 
			return;
		}
		//校验必传文件
		var fileList;
		//修改 20160714 zhangyf 如果unNeedDateFiles为true则不需要校验上传的文件
		if(!unNeedDateFiles&&!loan.loanagin.validateFiles()) {
			return;
		} else {
			fileList = loan.loanagin.parseFileJson();
		}
		preLoanList = JSON.stringify(loanArray);
		loan.ajaxDo({
	  		url:loan.basePath+"/org/saveLoanagin",
	  		params : {"userId":userId,"orgId":orgId,'menuLog':'1',"sucessed":sucessedVal,'refuseReason':refuseReason,
	  			'status':status,'remark':remark,'preLoanList':preLoanList,'attachFileInfo':fileList,
	  			'menuLog':'1','menuId':menuId},
	  		chainPar:this,
	  		successTip:true,
	  		successCallback:function(data){
	  			loan.tabcut.childClosedIframe(true);
	  		}
	  	})
	},
	
	/**解析文件为json字符串*/
	parseFileJson : function() {
		var datas = $("#loanaginGridId").jqGrid('getRowData');
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

	/**清空客户的信息*/
	clearVal : function() {
		$("#userRealName").val("");
		$("#userIdNum").val("");
		$("#idType").val("");
		$("#userId").val("");
		$('#prompt').html('');
	},
	
	/**上传文件*/
	upload:function(rowid) {
		if($("#loanUpload_"+rowid).val() == '' || $("#loanUpload_"+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			return;
		}
		var rowObj = $("#loanaginGridId").jqGrid('getRowData',rowid);
		var setId = rowObj.setId;
		var orgId = rowObj.orgId;
		var extenString = rowObj.extenString;
		var mustStatus = rowObj.mustStatus;
		var checkId = rowObj.checkId;
		var filelistId = rowObj.filelistId;
		//判断文件大小
		/*if(!ieFlag) {
			var dom = document.getElementById("loanUpload_"+rowid); 
			var fileSize = dom.files[0].size;
			if(fileSize > maxSize) {
				loan.tooltip("文件过大","error"); 
				return;
			}
		} else {
			
		}*/
		
		$("#loanUpload_"+rowid).upload({
			url: loan.basePath+'/org/upload?extenString='+extenString+"&orgId="+orgId+"&checkId="+checkId+"&filelistId="+filelistId+"&setId="+setId+"&logContent="+logContent,
			// 其他表单数据
			params: {'format':'json',"menuId":menuId},
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
					jQuery("#loanaginGridId").jqGrid('setRowData',rowid, {
		        		  filelistId : obj.domain.filelistId,
		        		  uploadFileName : "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + obj.domain.depositFilename + "&fileName=" + obj.domain.originalFilename  +"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>",
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
	preLoanRisk:function(){
		var userId = $("#userId").val();
		if(userId == "") {
			loan.tooltip("请选择客户","error");
			return;
		}
		loan.ajaxDo({
			url:loan.basePath+"/org/tongdunapply",
			params:{"menuId":"600201",'menuLog':'1',"userId":userId},
			successCallback:loan.loanagin.setReportId,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	setReportId:function(result){
		var reportId=result.reportId;
		if(reportId!=""||reportId!=undefined){
			$("#reportId").val(reportId);
			//$("#riskAssessment").hide();
			//$("#lookReport").show();
			loan.loanagin.jump(4);
		}
	},
	jump:function(count){ 
        window.setTimeout(function(){ 
            count--; 
            if(count > 0) { 
            	$('#riskAssessment').attr('href','#');
                $('#riskAssessment').html('正在生成报告...'+count+'S');
                loan.loanagin.jump(count); 
            } else { 
                $('#riskAssessment').html('查看风险报告');
                $('#riskAssessment').attr('href','javascript:loan.loanagin.toLookReport()');
            } 
        }, 1000); 
    },
    setRisk:function(){
    	$('#riskAssessment').html('风险分析');
        $('#riskAssessment').attr('href','javascript:loan.loanagin.preLoanRisk()');
    },
	toLookReport:function(){
		var reportId = $("#reportId").val();
		if(reportId == "") {
			loan.tooltip("请先风险分析","error");
			return;
		}
		var userId = $("#userId").val();
		loan.s_addPop("风险报告",loan.basePath+"/org/lookreport?menuId=600201&reportId="+reportId+"&userId="+userId,"",650,500,{isRefresh:false,isChangeClose:false});	
	},
	validateFiles:function() {
		var datas = $("#loanaginGridId").jqGrid('getRowData');
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
		}
		return true;
	},
};

$(function(){
	//验证是否是ie
	var ua = window.navigator.userAgent;
	if (ua.indexOf("MSIE")>=1){  
		ieFlag = true;  
	}
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

	//初始化页面性质,调查 在调查
	initPageType();
	//一票否决选项的初始化
	initDecideRadio();
	//tab页切换功能
	initTabChange();
	//初始化上传附件页面
	initAnnexPage();
	
	//客户选择弹框
	$("#userRealName").click(function(){
		loan.loanagin.setRisk();
		loan.s_addPop("选择客户",loan.basePath+"/common/selectloan?status=userName&&menuId=600101&flag=unPreCheckFlag&submitFunc=submit2preloan","",650,400);
	});
	
	$("#userIdNum").click(function(){
		loan.s_addPop("选择客户",loan.basePath+"/common/selectloan?status=idNo&&menuId=600101&flag=unPreCheckFlag&submitFunc=submit2preloan","",650,400);
	});
});

/**
 * 初始化页面性质,调查 在调查
 */
function initPageType() {
	operatStatus = $("#operatstatusId").val();
	if(operatStatus == 'addbeforeloan') {
		menuId = "600101";
		logContent = "新增调查[上传文件]";
		$("#eiditValId").hide();
	}else if(operatStatus == 'addbynotice'){
		menuId = "600401";
		logContent = "新增调查[上传文件]";
		$("#addValId").hide();
	}else{
		menuId = "600102";
		logContent = "再次调查[上传文件]";
		$("#addValId").hide();
	}
}


/**
 * 一票否决选项的初始化
 */
function initDecideRadio() {
	var ulObjs = $(".loanUl");
	$(".f-pl20").click(function(){
		var isCancelRadio = false;
		var radioObjs = $(this).find("input[type='radio']");
		for(var i = 0; i < radioObjs.length; i++) {
			var radioObj = radioObjs[i];
			if(radioObj.checked) {
				var checkVal = $(radioObj).val();
				var radioVals = checkVal.split("_");
				var cancelType = radioVals[3];
				if(cancelType == '1') {
					isCancelRadio = true;
					break;
				}
			}
		}
		if(isCancelRadio) {
			$("#sucessed2").attr("checked",true);
			$("#sucessed1").attr("disabled",true);
			$("#sucessed2").attr("disabled",true);
		}else{
			$("#sucessed2").attr("checked",false);
			$("#sucessed1").attr("disabled",false);
			$("#sucessed2").attr("disabled",false);
		}
	});
}

/**
 * tab页切换功能
 */
function initTabChange() {
	//tab页切换
	loan.tabLiclick("m-tab-detail");
}

/**
 * 初始化上传附件页面
 */
function initAnnexPage() {
	var orgId = $("#orgId").val();
	jQuery("#loanaginGridId").jqGrid({
		url: loan.basePath+ "/attach/queryAttach",
		mtype:'POST',
		datatype: "json",
		postData:{format:'json',"orgId":orgId,'menuId':menuId,'functionId':'6001'},//这个后面加上
//		onSelectRow:loan.survey.selectFn,
		colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
		colModel: [
           {name:'orgId',index:'orgId', align:'center',sortable: false,hidden:true},
           {name:'setId',index:'setId', align:'center',sortable: false,hidden:true},
           {name:'filelistId',index:'filelistId', align:'center',sortable: false,hidden:true},
           {name:'checkId',index:'checkId', align:'center',sortable: false,hidden:true},
		   {name:'annexName',index:'annexName', sortable: false,align:'center'},
		   {name:'extenString',index:'extenString',sortable: false, align:'center',hidden:true},
           {name:'filebackinfo',index:'filebackinfo',sortable: false, align:'center',hidden:true},
           {name:'mustStatus',index:'mustStatus',sortable: false, align:'center',hidden:true},
           {name:'mustStatusCn',index:'mustStatusCn',sortable: false, align:'center'},
           {name:'select',index:'select', sortable: false,align:'center',width:270,title:false,
				formatter:function(cellvalue, options, rowObject){
					return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
					"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
					"<input type='button' class='uploadclass' onclick='loan.loanagin.upload("+options.rowId+")' value='上传' />"+
					"<label id='labelId'></label>"+
					"</form>";
				}},
		   {name:'uploadFileName',index:'uploadFileName', sortable: false,align:'center'}
        ],
        jsonReader:{ 
			root: "response.pager.items",//数据项
			repeatitems : false
		},
        rowNum : 9999,
		rowList : [9999, 9999, 9999],
		toolbarfilter : true,
		viewrecords : true,
		autowidth : true,
		rownumbers: true,
		multiselect : false,
		pagerpos:'center',
		pgbuttons:true,
		pginput: true,	
		height: 'auto',	
		loadComplete:function(){},
		gridComplete : function() {
		}
	});
	var mydata = [
  			{name:'征信报告',must:"是"}
  		];
  	for(var i=0;i<=mydata.length;i++){
  		jQuery("#loanaginGridId").jqGrid('addRowData',i+1,mydata[i]);
  	}
  	jQuery("#loanaginGridId").setGridWidth($(window).width()-60);
}

/**
 * 查看客户详情
 */
function comment(){
	var userId = $("#userId").val();
	if($.trim(userId) == "") {
		loan.tooltip("未选择用户","error");
		return;
	}
	parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId="+menuId+"&userId="+userId,"creditcusdetail",true);	
}

//下一页
function nextPage(i){
	$(".m-tab-con li:eq("+i+")").click();
}
$(window).resize(function(){
	jQuery("#loanaginGridId").setGridWidth($(window).width()-60);
})