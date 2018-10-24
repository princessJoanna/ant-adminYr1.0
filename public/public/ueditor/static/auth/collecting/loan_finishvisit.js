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
loan.finishvisit=loan.finishvisit||{
	
	initVisitInfo:function(result){
		var visitOrder=result.visitOrderDto;
		
		$("#orderId").val(visitOrder.orderId);
		var acceptTime=visitOrder.acceptTime;
		$("#acceptTime").val(convertTime(acceptTime));
		$("#relationPhone").val(visitOrder.relationPhone);
		$("#relationTypeCn").val(visitOrder.relationTypeCn);
		$("#relationName").val(visitOrder.relationName);
		$("#visitLevelCn").val(visitOrder.visitLevelCn);
		$("#statusCn").val(visitOrder.statusCn);
		/****行政区域特殊处理*****/
		$("#area").attr("provinceid",visitOrder['provinceCode']),
		$("#area").attr("cityid",visitOrder['cityCode']),
		$("#area").attr("areaid",visitOrder['districtCode'])
		
		$("#areaCn").val(loan.getArea(visitOrder['provinceCode'])+loan.getArea(visitOrder['cityCode'])+loan.getArea(visitOrder['districtCode'])+visitOrder.address);
		
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
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.finishvisit.upload("+options.rowId+")' value='上传' />"+
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
		loan.finishvisit.queryAttachItem();
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
            successCallback:loan.finishvisit.attachItemCallBack,
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
	 * 校验文件
	 */
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		loan.finishvisit.fileUpdate = false;
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
				loan.finishvisit.fileUpdate = true;
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
	 * 提交按钮 
	 */
	submit:function(){
		//校验必传文件
		var fileList;
		if(!loan.finishvisit.validateFiles()){
			return;
		} else {
			fileList = loan.finishvisit.parseFileJson();
		}
		var orderId=$("#orderId").val();
		var endDate=$("#endTime").val();
		var negoResult=$("#negoResult").val();
		var repayWay=$("#repayWay").val();
		var repayYes=$("#repayYes").val();
		var repayAmount=new Number($("#repayAmount").val());
		var remark=$("#remark").val();
		if(negoResult==''){
			loan.tooltip("请选择谈判结果","error"); 
			return;
		}
		//校验必传文件
		var fileList;
		if(!loan.finishvisit.validateFiles()){
			return;
		} else {
			fileList = loan.finishvisit.parseFileJson();
		}
		var params = {
				'menuLog' : '1',
				"orderId" : orderId,
				"endDate" : endDate,
				"negoResult" : negoResult,
				"repayWay" : repayWay,
				"repayYes" : repayYes,
				"repayAmount" : repayAmount,
				"negoResult" : negoResult,
				"remark" : remark,
				"attachFileInfo":fileList,
			};
		loan.ajaxDo({
			url : loan.basePath + "/collecting/finishVisit",
			params : params,
			chainPar : this,
			successTip : true,
			successCallback : function() {
				loan.tabcut.childClosedIframe(true);
			}
		});
     }
}

function convertTime(cellvalue) {
	var reg = new RegExp("^[0-9]*$");
	if(reg.test(cellvalue)) {
		var date = new Date(Number(cellvalue));
		return date.Format("yyyyMMdd");
	}
	return "";
}
/**
 * 查询外访催收详情
 * 
 */
function queryVisitInfo(){
	var orderId=$("#orderId").val();
	var flag="1";
	loan.ajaxDo({
		url:loan.basePath+ "/collecting/queryVisitInfo",
		params:{'format':'json','menuLog':'1','orderId':orderId,'flag':flag},
		successCallback:loan.finishvisit.initVisitInfo,
		successTip:false, //提示
		bizErrTip:false,  //提示
		chainPar:this
	});
}
