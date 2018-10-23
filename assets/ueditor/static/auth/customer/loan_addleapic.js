loan.addleapic = loan.addleapic  || {
	
	/**
	 * 关闭窗口
	 */
	closePage:function(){
		if(parent.$("#focus").length == 1) {
			parent.$("#focus").focus();
		}else if(parent.$("#agentPhone").length == 1){
			parent.$("#agentPhone").focus();
		}
		parent.$("#rowid").val("");
		loan.s_Pop_closedChild(false,false);
	},
	
	/**
	 * 是否存在未上传的图片文件
	 */
	hasFile : function(){
		var b = false;
		var ids = $("#userGridId").jqGrid('getDataIDs');
		if(ids) {
			$(ids).each(function(i,rowid) {
				var fileValue = $("#loanUpload_"+rowid).val();
				if(fileValue) {
					b = true;
				}
			});
		}
		return b;
	},
	
	validParams:function(){
		
	},
	
	/**上传图片方法*/
	upload : function(menuId) {
		
		//校验图片是否已选
		var picConfigId = $("#picConfigId").val();
		if(!picConfigId) {
			loan.tooltip("请先选择上传的图片类型","error"); 
			$("#picConfigId").focus();
			return;
		}
		if(!$("#loanUpload").val()) {
			loan.tooltip("请先选择你要上传的图片","error"); 
			$("#loanUpload").focus();
			return;
		}
		var configName = $("#picConfigId").find("option:selected").text();
		//灰掉上传按钮
		$("#submit_upload").attr("disabled","disabled");
		var logContent = "新增加盟商图片";
		$("#loanUpload").upload({
			url:  loan.basePath+"/common/uploadPic?logContent="+logContent,
			type: 'POST',
			// 其他表单数据
			params: {'format':'json','menuId':menuId},
			dataType: 'text',
			onSend: function (obj, str) {  return true; },
			// 上传之后回调
			onComplate: function (data) {
				//数据返回为空
	        	if(!data) {
	        		loan.tooltip("上传失败，请稍后再试",'error');
		        	return;
	        	}
				var obj = eval("("+data+")");
				if(obj == null || obj.success == false){
					loan.tooltip(obj.errMsg,"error");
				}else{
					loan.tooltip("上传成功","succeed");
					$("#loanUpload").val("");
					var configName = $("#picConfigId").find("option:selected").text();
					var picConfigId = $("#picConfigId").val();
					var rowdata = {
			        		  url : obj.depositPath,
			        		  configName : configName,
			        		  picConfigId : picConfigId,
			        		  filebackinfo : JSON.stringify(obj)
						};
					loan.addleapic.addPicInParent(rowdata);
				}
				var file = $("#loanUpload");
				file.after(file.clone().val(""));
				file.remove();
				//恢复上传与提交按钮
				$("#loanUpload").removeAttr("disabled");
				$("#submit_upload").removeAttr("disabled");
			}
		});
		$("#loanUpload").upload("ajaxSubmit");
	},
	
	
	/**
	 * 查询图片配置
	 */
	queryItems:function(){
		var menuId = parent.$("#menuId").val();
		var length = menuId.length;
		if(length > 2) {
			length = length -2;
		}
		var functionId = menuId.substr(0,length);
		loan.ajaxDo({
			url: loan.basePath+ "/sysparam/queryPicConfigList",
			params:{format:'json','menuId':menuId,'status':'0','functionId':functionId},
            successCallback:loan.addleapic.initConfigItem,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 初始化图片条目
	 */
	initConfigItem:function(result){
		var list = result.picConfigs;
    	if(list && list.length > 0) {
    		var html = "<option value=''>请选择</option>"
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			html = html + "<option id='"+item.picConfigId
    						+"' value='"+item.picConfigId
			    			+"' cmax = '" +item.maxValue
							+"' cmin = '" +item.minValue
							+"' confirm = '" +item.confirmNeededCn
    			            + "'>"
    						+ item.configName +"</option>";
    		}
    		$("#picConfigId").html(html);
    	}
	},
	
	/**
	 * 确定
	 */
	addPicInParent:function(target){
		//插入数据或修改数据
		var parentIds = parent.$("#userGridId").jqGrid('getDataIDs');
		var newid = 1;
		if(parentIds){
			newid = parentIds.length + 1;
		}
		parent.$("#userGridId").jqGrid('addRowData',newid,target);
		
		//关闭选择窗口
		loan.addleapic.closePage();
	},
	
}

$(function(){
	//重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",loan.addleapic.closePage);
	loan.addleapic.queryItems();
	
	$("#picConfigId").change(function(){
		var id = $(this).val();
		var max = $("#"+id).attr("cmax");
		var confirm = $("#"+id).attr("confirm");
		var datas = parent.$("#userGridId").jqGrid('getRowData');
		var ready = 0;
		if(datas && datas.length > 0) {
			for(var i = 0;i < datas.length; i++) {
				var data = datas[i];
				if(id == data.picConfigId) {
					ready = ready+1;
				}
			}
		}
		$("#ready").html(ready);
		if(max){
			$("#max").html(max);
			max = new Number(max);
			if(max <= ready) {
				$("#prompt").html("提示：上传后，审核通过生效的图片最多为 "+max+" 张,以最后审核通过时间为准");
			} else {
				$("#prompt").html("");
			}
		} else {
			$("#max").html("");
			$("#prompt").html("");
		}
		if(confirm){
			$("#confirm").html(confirm);
		} else {
			$("#confirm").html("");
		}
	});
});

