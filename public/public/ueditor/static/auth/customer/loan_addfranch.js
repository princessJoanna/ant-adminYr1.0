loan.addfranch = loan.addfranch  || {
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
		loan.addblack.freshGrid();
	},
	
	/**
	 * 下拉选项初始化
	 */
	setSelect:function(id,value,temp) {
		$("#"+id).prepend("<option value='"+value+"'>"+temp+"</option>");
		$("#"+id).val(value);
	},
	
	saveInfo:function (menuId){
		var provinceCode = $("#area").attr("provinceid");
		var left = $("#area").width();
		if(!provinceCode || provinceCode == 0) {
			var Tip ="请选择行政区域";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			return;
		}
		var cityCode = $("#area").attr("cityid");
		if(!cityCode || cityCode == 0) {
			var Tip ="请选择行政区域城市";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			return;
		}
		var districtCode = $("#area").attr("areaid");
		if(!districtCode || districtCode==0) {
			var Tip ="请选择行政区域区县";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			$("#area").focus();
			return;
		}
		var leagueType = $("#leagueType").val();
		left = $("#leagueType").width();
		if(!leagueType) {
			var Tip ="请选择加盟商分类";
			loan.verify.formValidatorShowMsg($("#leagueType"),Tip,left);
			$("#leagueType").focus();
			return;
		}
		var userKind = $("#userKind").val();
		left = $("#userKind").width();
		if(!userKind) {
			var Tip ="请选择加盟商属性";
			loan.verify.formValidatorShowMsg($("#userKind"),Tip,left);
			$("#userKind").focus();
			return;
		}
		 if(!loan.addfranch.verStrLength()){
			 return false;
		 }
		 
		if($("#method").val()=="edit"){
			//执行修改操作
			loan.addfranch.editBorrower(menuId);
		}else{
			//执行新增操作
			loan.addfranch.addBorrower(menuId);
		}		

	},
	
	/**
	 * 是否存在未上传的图片文件
	 * （过时）
	 */
	/*hasFile : function(){
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
	},*/
	
	
	getPicListStr:function(){
		var piclist = new Array();
		var rowdata = $("#userGridId").jqGrid("getRowData");
		if(rowdata && rowdata.length > 0) {
			for(var i = 0; i < rowdata.length; i++) {
				var item = rowdata[i];
				var content = item.filebackinfo;
				if(content) {
					var obj = new Object();
					obj.picConfigId = item.picConfigId;
					obj.picType = item.picConfigId.substr(item.picConfigId.length-1,item.picConfigId.length);
					obj.attachInfoStr = content;
					piclist.push(obj);
				}
			}
		}
		return JSON.stringify(piclist);
	},
	
	/**
	 * 加盟商（信息修改）
	 * date 2015-9-12 11:08:22
	 */
	editBorrower:function (menuId){
		//加盟商图片信息
		var picsStr = loan.addfranch.getPicListStr();
		var busiParams = {
				menuId : menuId,
				format:'json',
				menuLog:'1',
				userId : $("#userId").val(),
				leagueId : $("#leagueId").val(),
				userAccount : $("#userAccount").val(),
				userName : $("#userName").val(),
				shortName : $("#shortName").val(),
				mainBusiness : $("#mainBusiness").val(),
				leagueType : $("#leagueType").val(),
				userKind : $("#userKind").val(),
				businessLicence : $("#businessLicence").val(),
				businessAddress : $("#businessAddress").val(),
				legalPerson : $("#legalPerson").val(),
				provinceCode : $("#area").attr("provinceid"),
				cityCode : $("#area").attr("cityid"),
				districtCode : $("#area").attr("areaid"),
				legalIdNo : $("#legalIdNo").val(),
				agentPerson : $("#agentPerson").val(),
				agentPhone : $("#agentPhone").val(),
				phone:$("#phone").val(),
				yearIncome : $("#yearIncome").val(),
				piclistStr : picsStr,
			}
		loan.addfranch.doEditBorrower(busiParams);
		//判断是否有未上传的图片
		/*if(loan.addfranch.hasFile()){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的图片，现在保存将不会上传图片，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.addfranch.doEditBorrower(busiParams);
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.addfranch.doEditBorrower(busiParams);
		}*/
	},
	
	/**
	 * 执行加盟商修改提交
	 */
	doEditBorrower : function (busiParams) {
		loan.ajaxDo({
			url:loan.basePath+"/league/toEditLeague",
			params:busiParams,
			successCallback:loan.addfranch.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 新增
	 */
	addBorrower:function(menuId) {
		/*var black = result.pager.items;
		if(black) {
			loan.tooltip("客户信息已存在","error");
			return;
		}
		*/
			
		var provinceCode = $("#area").attr("provinceid");
		var left = $("#area").width();
		if(!provinceCode) {
			var Tip ="请选择行政区域";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			return false;
		}
		var cityCode = $("#area").attr("cityid");
		if(!cityCode) {
			var Tip ="请选择行政区域城市";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			return false;
		}
		var districtCode = $("#area").attr("areaid");
		if(!districtCode) {
			var Tip ="请选择行政区域区县";
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			return false;
		}
		var leagueType = $("#leagueType").val();
		left = $("#leagueType").width();
		if(!leagueType) {
			var Tip ="请选择加盟商分类";
			loan.verify.formValidatorShowMsg($("#leagueType"),Tip,left);
			return false;
		}
		
		//加盟商图片信息
		var picsStr = loan.addfranch.getPicListStr();
		var busiParams = {
			menuId : menuId,
			menuLog:'1',
			format:'json',
			userName : $("#userName").val(),
			shortName : $("#shortName").val(),			
			userAccount : $("#userAccount").val(),
			mainBusiness : $("#mainBusiness").val(),
			leagueType : $("#leagueType").val(),
			userKind : $("#userKind").val(),
			businessLicence : $("#businessLicence").val(),
			businessAddress : $("#businessAddress").val(),
			legalPerson : $("#legalPerson").val(),
			provinceCode : $("#area").attr("provinceid"),
			cityCode : $("#area").attr("cityid"),
			districtCode : $("#area").attr("areaid"),
			legalIdNo : $("#legalIdNo").val(),
			agentPerson : $("#agentPerson").val(),
			agentPhone : $("#agentPhone").val(),
			phone:$("#phone").val(),
			yearIncome : $("#yearIncome").val(),
			piclistStr : picsStr,
		}
		
		loan.addfranch.doAddBorrower(busiParams);
		/*if(loan.addfranch.hasFile()){
			$.artDialog({
				title:"提示",
				content:"您有已选择但未上传的图片，现在保存将不会上传图片，按确定继续保存，按取消终止保存？",
				ok:function(){
					loan.addfranch.doAddBorrower(busiParams);
				},
				cancel:function(){
					return false;
				}
		    });
		} else {
			loan.addfranch.doAddBorrower(busiParams);
		}*/
		
	},
	/**
	 * 执行新增加盟商
	 */
	doAddBorrower : function(busiParams) {
		loan.ajaxDo({
			url:loan.basePath+"/league/addLeague",
			params:busiParams,
			successCallback:loan.addfranch.closeChildFrame,
			successTip:true, //提示
			bizErrTip:false,  //提示
			chainPar:this,
			bizErrCallback:function(response, status, xhr){
				if(response.errCode=="0LE329501044"){
					$.artDialog({
						title:"提示",
						isCloseBtn:true,  
						content:response.errMsg,
						isCloseBtn:true,
						cancel:true,
						ok:function(){
							loan.addfranch.updatefranch(busiParams);
						},
						isCloseicon:true
					});
				}else{
					loan.tooltip(response.errMsg,"error");
				}
			}
		});
	},
	
	
	BackInfo:function(result) {
	//	loan.tooltip(result.errMsg);
	},
	
	updatefranch:function(busiParams){
		loan.ajaxDo({
			url:loan.basePath+"/league/updateLeagueConfirm",
			params:busiParams,
			successCallback:loan.addfranch.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**上传图片方法*/
	upload : function(rowid) {
		var menuId = $("#menuId").val();
		//校验图片是否已选
		if($("#loanUpload_"+rowid).val() == '' || $("#loanUpload_"+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			return;
		}
		//灰掉上传按钮
		$("#submit_"+rowid).attr("disabled","disabled");
		var logContent = "新增加盟商图片";
		$("#loanUpload_"+rowid).upload({
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
					$("#loanUpload_"+rowid).val("");
					var rowData = $("#userGridId").jqGrid("getRowData",rowid);
					jQuery("#userGridId").jqGrid('setRowData',rowid, {
		        		  filelistId : obj.filelistId,
		        		  url : obj.depositPath,
		        		  uri : obj.depositPath,
		        		  configName : rowData.configName,
		        		  filebackinfo : JSON.stringify(obj)
					}); 
				}
				var file = $("#loanUpload_"+rowid);
				file.after(file.clone().val(""));
				file.remove();
				//恢复上传与提交按钮
				$("#loanUpload_"+rowid).removeAttr("disabled");
				$("#submit_"+rowid).removeAttr("disabled");
			}
		});
		$("#loanUpload_"+rowid).upload("ajaxSubmit");
	},
	
	
 	/**
 	 * 查询生效图片
 	 */
 	queryValidPics:function(userId,leagueId,menuId){
		jQuery("#validGridId").jqGrid({
			url: loan.basePath+ "/league/queryLeaguePics",
			mtype:'POST',
			datatype: "json",
			postData:{'format':'json','menuId':menuId,"leagueId":leagueId,
				'userId':userId,'status':'1','confirmStatus':'2'},//
			colNames: ['图片类型','审核状态','记录状态','图片资源'], 
			colModel: [
			   {name:'picTypeCn',index:'picTypeCn',sortable: false, align:'center'},
			   {name:'confirmStatusCn',index:'confirmStatusCn',sortable: false, align:'center'},
			   {name:'statusCn',index:'statusCn',sortable: false, align:'center'},
			   {name:'url',index:'url', sortable: false,align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   if(cellvalue) {
							return "<a data-src='"
									+ cellvalue + "' data-text='"
									+ rowObject.picTypeCn + "' href='javascript:;' onclick='ApplyOutContent(this)' style='color:#0082c8;text-decoration: underline;'>"
									+ rowObject.picTypeCn + "</a>";
						} else {
							return "加盟商未上传";
						}
				   }
			   },
	        ],
	        jsonReader:{ 
				root: "response.piclist",//数据项
				repeatitems : false
			},
			pager:jQuery('#validPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
			}
		})
		jQuery("#validGridId").setGridWidth(950);
	},
	
	/**
	 * 查询加盟商信息
	 * date 2015-9-23 17:08:28
	 */
	queryUserInfo:function (userId, menuId,leagueId){
		loan.ajaxDo({
			url:loan.basePath+"/league/queryUserLeagueInfo",
			params:{'format':'json','userId':userId,'leagueId':leagueId,'menuId':menuId},
			successCallback:loan.addfranch.initUserInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
		loan.addfranch.queryPics(userId,leagueId,menuId);
		loan.addfranch.queryValidPics(userId,leagueId,menuId);
	},
	
	/**
	 * 初始化用户信息
	 */
	initUserInfo:function(result) {

		var UserDetail = result.userDomain;

		
		for ( var property in UserDetail) {
			$("#"+property).val(UserDetail[property]);
			//console.log("property  "+property+" = "+UserDetail[property]);
		}
		
		/****行政区域特殊处理*****/
		if(UserDetail['provinceCode'] && UserDetail['provinceCode'] != '0') {
			$("#area").attr("provinceid",UserDetail['provinceCode']);
			$("#area").attr("cityid",UserDetail['cityCode']);
			$("#area").attr("areaid",UserDetail['districtCode']);
			$("#area").val(loan.getArea(UserDetail['provinceCode'])+loan.getArea(UserDetail['cityCode'])+loan.getArea(UserDetail['districtCode']));
		}
		
		
		/************v1.1.1 调整 *********************/
		//初始化图片信息
		/*var mydata = [
						{pic:'门面照',url:UserDetail.faceImage,uri:UserDetail.faceImage},
						{pic:'宣传照',url:UserDetail.mainLargeImage,uri:UserDetail.mainLargeImage},
						{pic:'app列表展现图',url:UserDetail.mainSmallImage,uri:UserDetail.mainSmallImage}
					];
		for(var i=0;i<=mydata.length;i++){
			jQuery("#userGridId").jqGrid('addRowData',i+1,mydata[i]);
		}*/
		/**************v1.1.1 调整 ******************/
	},
	
	
	
	/**
	 * 查询图片配置 
	 * （过时）
	 */
	/*queryItems:function(){
		var menuId = $("#menuId").val();
		var length = menuId.length;
		if(length > 2) {
			length = length -2;
		}
		var functionId = menuId.substr(0,length);
		loan.ajaxDo({
			url: loan.basePath+ "/sysparam/queryPicConfigList",
			params:{format:'json','menuId':menuId,'status':'0','functionId':functionId},
            successCallback:loan.addfranch.initItemInGrid,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},*/
	
	/**
	 * 初始化图片条目  
	 * （过时）
	 *//*
	initItemInGrid:function(result){
		var list = result.picConfigs;
    	if(list && list.length > 0) {
    		for(var i = 0; i < list.length; i++) {
    			var item = list[i];
    			var obj = new Object();
    			obj.picConfigId = item.picConfigId.toString();
    			obj.configName = item.configName;
    			var rowid = i+1;
    			$("#userGridId").jqGrid("addRowData",rowid,item);
    		}
    	}
	},*/
	
	/**
	 * 查询未审核的加盟商已上传图片
	 */
	queryPics:function(userId,leagueId,menuId){
		loan.ajaxDo({
			url:loan.basePath+"/league/queryLeaguePics",
			params:{'format':'json','menuId':menuId,"leagueId":leagueId,'userId':userId,
				'status':'1','confirmStatus':'0'},
			successCallback:loan.addfranch.queryPicsCallBack,
			successTip:false, 
			bizErrTip:false, 
			chainPar:this
		});
		
		
	},
	
	queryPicsCallBack:function(result){
   		var list = result.piclist;
 		//初始化已上传过的文件
 		if(list && list.length>0) {
 			var ids = $("#userGridId").jqGrid("getDataIDs");
 			for(var i = 0; i < list.length; i++){
 				var item = list[i],rowid = i+1;
 				var rowdata = {
	        		  picConfigId : item.picConfigId.toString(),
	        		  configName : item.picTypeCn,
	        		  url : item.url,
	        		  filebackinfo : item.attachInfoStr,
				};
 				$("#userGridId").jqGrid('addRowData',rowid,rowdata);
 			}
 		}
 	},
	
	/**
	 * 初始化图片上传的grid
	 */
	initImgPage:function() {
		jQuery("#userGridId").jqGrid({
			datatype: "local",
			postData:{'format':'json','menuId':menuId,"leagueId":leagueId,
				'userId':userId,'status':'1','confirmStatus':'0'},//
			forceFit:true,
			colNames: ['配置id','图片类型','图片资源','json','操作'], 
			colModel: [
			   {name:'picConfigId',index:'picConfigId', align:'center',hidden:true},
			   {name:'configName',index:'configName', align:'center'},
	           {name:'url',index:'url', align:'center',
					formatter:function(cellvalue, options, rowObject){
						if(cellvalue) {
							return "<a data-src='"
									+ cellvalue + "' data-text='查看' href='javascript:;' onclick='ApplyOutContent(this)' style='color:#0082c8;text-decoration: underline;'>"
									+ rowObject.configName + "</a>";
						}
						
					}
			   },
			   {name:'filebackinfo',index:'filebackinfo', align:'center',hidden:true},
			   {name:'act',index:'act', align:'center'},
	        ], 
	        rowNum : -1,
	        pager:jQuery('#picPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			height: 'auto',
			autowidth: true,	
			forceFit:true,//调整列宽不会改变表格宽度
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#userGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
	            	var addBtn = "<div class='operating'>";
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"loan.addfranch.delPic('"+rowIds[i]+"')\"><i class='icon-trash'></i></a></div>";
					jQuery("#userGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		})
		jQuery("#userGridId").setGridWidth(950);
	
	},
	
	/**
	 * 删除图片
	 */
	delPic:function(rowid){
		$("#userGridId").jqGrid('delRowData',rowid);
	},
	
	/**
	 * 添加图片
	 */
	addPic:function(menuId){
		loan.s_addPop("添加图片",loan.basePath+"/league/toAddLeaguePic?menuId="+menuId,"",450,360,{isRefresh:false,isChangeClose:true});	
	},
	
	/**判断字符实际长度*/
	verStrLength:function(){
/*		 var shorName = $("#shortName").val();
		 var Mlen = 0; //中文字符长度
		 var mlen = 0  //英文字符长度
			   for (var i=0; i<shorName.length; i++) {    
			        if (shorName.charCodeAt(i)>255) {    
			        	Mlen ++;    
			         } else {    
			        	 mlen ++;    
			         }    
			     }  
			   var left = '12';
			   //总字符不能超过12
			   	if(Mlen+mlen){
			   		if(Mlen>6){
			   			//中文字符不能超过6个
			   			var Tip ="中文字符不能超过6个";
			   			loan.verify.formValidatorShowMsg($("#shorName"),Tip,left);
			   			return false;
			   		}else{
			   			return true;	
			   		}			   		
			   	}else{
			   		//总字符不能超过12
			   		var Tip ="总字符不能超过12个";
			   		//loan.verify.formValidatorShowMsg($("#shorName"),Tip,left);
			   		return false;
			   	}		   */
			   	return true;
	}
}

function readonly(id) {
	$("#"+id).attr("disabled","true");
	// 置灰
	var div1 = document.getElementById(id);  
	div1.style.backgroundColor="gainsboro";  
	$("#"+id).removeClass("verify");
}

function ApplyOutContent(obj){
	var $this=$(obj),
		txt=$this.attr("data-text"),
		imgSrc=$this.attr("data-src");
	new addApplyOutContent({
		title:txt,
		src:imgSrc
	})
} 
