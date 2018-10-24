loan.addcustom = loan.addcustom  || {
	/**
	 * 关闭子框架
	 */
	closeChildFrame : function() {
		loan.tabcut.childClosedIframe(true);
	},
	
	/**
	 * 下拉选项初始化
	 */
	setSelect:function(id,value,temp) {
		$("#"+id).prepend("<option value='"+value+"'>"+temp+"</option>");
		$("#"+id).val(value);
	},

	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'8001','format':'json'},
		page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 刷新 jqgrid
	 */
	returnerror:function() {
		var errLen = $('#iform .m-tipShow-error').length;
		if(errLen > 0){
			$(".m-tab-con li:eq(0)").click();
		}
	},
	
	SaveInfo:function (){
		
		var errLen = $('#iform .m-tipShow-error').length;
		if(errLen > 0){
			$(".m-tab-con li:eq(0)").click();
			return;
		}
		
		var left = $("#area").width();
		var cityCode = $("#area").attr("cityid");
		if(cityCode == "" || cityCode == undefined){
			var Tip ="请选择城市！"
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			loan.addcustom.returnerror();
			return;
		}
		var districtCode = $("#area").attr("areaid");
		if(districtCode == "" || districtCode == undefined){
			var Tip ="请选择区县！"
			loan.verify.formValidatorShowMsg($("#area"),Tip,left);
			loan.addcustom.returnerror();
			return;
		}
		if(!loan.addcustom.validateSelect('marriageStatus','请选择婚姻状况')) {
			loan.addcustom.returnerror();
			return;
		};
		if(!loan.addcustom.validateSelect('userType','请选择客户身份')) {
			loan.addcustom.returnerror();
			return;
		};
	
		// 2016-11-24 新增验证判断
		var marriageStatus = $('#marriageStatus').val();
		if(marriageStatus == '1' ){
			var relationIdNo = $('#relationIdNo').val().replace(/(^\s*)|(\s*$)/g, "");
			var idNo = $('#idNo').val();
			if(relationIdNo && (relationIdNo == idNo)){
				loan.tooltip("配偶身份证号不能与客户证件号相同！","error");
				loan.addcustom.returnerror();
				return;
			}
		}
		
		if($("#method").val()=="edit"){
			//执行修改操作
			loan.addcustom.executeEditBorrower();
		}else{
			//执行新增操作
			loan.addcustom.executeAddBorrower();
		}		

	},
	
	/**
	 * 借款人（信息修改）
	 * date 2015-9-12 11:08:22
	 */
	executeEditBorrower:function (userId){
	
		var  sexType;
		var  sexTypes =	 $("input[name='sexType']");
		$(sexTypes).each(function (i, item){
			var val = $(item).val();
			if($(item).prop("checked")){
				sexType = val;
			}
		});
		//校验必传文件
		var fileList;
		if(!loan.addcustom.validateFiles()){
			return;
		} else {
			fileList = loan.addcustom.parseFileJson();
		}
		var datas = $("#relationGridId").jqGrid('getRowData');
		if(datas.length<2){
			loan.tooltip("至少存在2条关联人信息","error"); 
			return false;
		}
		var relationList = loan.addcustom.getRelations();
		
		var busiParams = {
				menuId : '800102',
				menuLog:'1',
				format:'json',
				userId : $("#userId").val(),
				userName : $("#userName").val(),
				userType : $("#userType").val(),
				idNo : $("#idNo").val(),
				kindIdType : '0',//默认身份证
			//	userKind : $("#userKind").val(),
				sexType : sexType,// 获取性别
				workUnit : $("#workUnit").val(),
				mobile : $("#mobile").val(),
				provinceCode : $("#area").attr("provinceid"),
				cityCode : $("#area").attr("cityid"),
				districtCode : $("#area").attr("areaid"),
				userKind : $("#userKind").val(),
				marriageStatus : $("#marriageStatus").val(),
				recentlyAddress : $("#recentlyAddress").val(),
				workAddress:$("#workAddress").val(),
				workPhone : $("#workPhone").val(),
				houseInfo : $("#houseInfo").val(),
				annualIncome : $("#annualIncome").val(),
				eduBackgroud : $("#eduBackgroud").val(),
				duties : $("#duties").val(),
				workAge : $("#workAge").val(),
				relationName : $("#relationName").val(),
				relationPhone : $("#relationPhone").val(),
			//	relationType : $("#relationType").val(),
				relationType : '9',//关系-配偶
				relationIdNo : $("#relationIdNo").val(),
				relationDegree : $("#relationDegree").val(),
				relationWorkUnit : $("#relationWorkUnit").val(),
				fileList : fileList, // 客户的附件
				relationList : relationList
			}
		
		loan.ajaxDo({
			url:loan.basePath+"/borrower/toEditBorrower",
			params:busiParams,
			successCallback:loan.addcustom.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
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
	 * 新增执行
	 */
	executeAddBorrower:function(result) {
		/*var black = result.pager.items;
		if(black) {
			loan.tooltip("客户信息已存在","error");
			return;
		}
		*/
		var  sexType;
		var  sexTypes =	 $("input[name='sexType']");
		$(sexTypes).each(function (i, item){
			var val = $(item).val();
			if($(item).prop("checked")){
				sexType = val;
			}
		});
		
		//校验必传文件
		var fileList;
		if(!loan.addcustom.validateFiles()){
			return;
		} else {
			fileList = loan.addcustom.parseFileJson();
		}
		var datas = $("#relationGridId").jqGrid('getRowData');
		if(datas.length<2){
			loan.tooltip("至少存在2条关联人信息","error"); 
			return false;
		}
		var relationList = loan.addcustom.getRelations();
		var busiParams = {
			menuId : '800101',
			menuLog:'1',
			format:'json',
			userName : $("#userName").val(),
			userType : $("#userType").val(),
			idNo : $("#idNo").val(),
			kindIdType : '0',//默认身份证
		//	userKind : $("#userKind").val(),
			sexType : sexType,// 获取性别
			workUnit : $("#workUnit").val(),
			mobile : $("#mobile").val(),
			provinceCode : $("#area").attr("provinceid"),
			cityCode : $("#area").attr("cityid"),
			districtCode : $("#area").attr("areaid"),
			userKind : $("#userKind").val(),
			marriageStatus : $("#marriageStatus").val(),
			recentlyAddress : $("#recentlyAddress").val(),
			workAddress:$("#workAddress").val(),
			workPhone : $("#workPhone").val(),
			houseInfo : $("#houseInfo").val(),
			annualIncome : $("#annualIncome").val(),
			eduBackgroud : $("#eduBackgroud").val(),
			duties : $("#duties").val(),
			workAge : $("#workAge").val(),
			/*relationName1 : $("#relationName1").val(),
			relationPhone1 : $("#relationPhone1").val(),
			relationType1 : $("#relationType1").val(),
			relationName2 : $("#relationName2").val(),
			relationPhone2 : $("#relationPhone2").val(),
			relationType2 : $("#relationType2").val(),*/
			relationName : $("#relationName").val(),
			relationPhone : $("#relationPhone").val(),
		//	relationType : $("#relationType").val(),
			relationType : '9',//关系-配偶
			relationIdNo : $("#relationIdNo").val(),
			relationDegree : $("#relationDegree").val(),
			relationWorkUnit : $("#relationWorkUnit").val(),
			fileList : fileList, // 客户的附件
			relationList : relationList
		}
		
		loan.ajaxDo({
			url:loan.basePath+"/borrower/addBorrower",
			params:busiParams,
			successCallback:loan.addcustom.closeChildFrame,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
/*	BackInfo:function(result) {
		if(result['success']==true){
			loan.tabcut.childClosedIframe();
		}
	},
	*/
	validateFiles:function() {
		var datas = $("#attachGridId").jqGrid('getRowData');
		loan.addcustom.fileUpdate = false;
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
				loan.addcustom.fileUpdate = true;
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
	/*
	 * 关联人信息的字符串
	 */
	getRelations : function(){
		var datas = $("#relationGridId").jqGrid('getRowData');
		var raltions = [];
		for(var i = 0; i < datas.length; i++) {
			raltions.push(datas[i]);
		}
		return JSON.stringify(raltions);
	},
	
	/**
	 * 查询客户信息（借款人及相关联系人）
	 * date 2015-9-12 11:08:22
	 */
	queryUserInfo:function (userId){
		loan.ajaxDo({
			url:loan.basePath+"/borrower/queryBorrowerInfo?menuId=800102",
			params:{'format':'json','userId':userId},
			successCallback:loan.addcustom.initUserInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化用户信息
	 */
	initUserInfo:function(result) {
		var UserDetail = result.domain;
		var RelationArry = UserDetail.list;
		for ( var property in UserDetail) {
			$("#"+property).val(UserDetail[property]);
		}
		/****单选框赋值*****/
		var  sexTypes =	 $("input[name='sexType']");
		$(sexTypes).each(function (i, item){
			var val = $(item).val();
			if($(item).val()==UserDetail['sexType']){
				sexType = val;
				$(item).attr('checked',true);
			}
		});
		
		/****行政区域特殊处理*****/
		$("#area").attr("provinceid",UserDetail['provinceCode']),
		$("#area").attr("cityid",UserDetail['cityCode']),
		$("#area").attr("areaid",UserDetail['districtCode'])
		
		$("#area").val(loan.getArea(UserDetail['provinceCode'])+loan.getArea(UserDetail['cityCode'])+loan.getArea(UserDetail['districtCode']));
		var flag =-1;
		for (var i = 0; i < RelationArry.length; i++) {
			for ( var property in RelationArry[i]) {
			//	console.log(property+"====="+RelationArry[i][property]);
				if(RelationArry[i][property]=='9'){//联系人为配偶
					flag = i;
					$("#"+property).val(RelationArry[i][property]);
				}
			
			}
			/***婚姻状态***/
			if(UserDetail['marriageStatus'] == '1') {//已婚
				for ( var property in RelationArry[flag]) {
					$("#"+property).val(RelationArry[flag][property]);
				}
				//设置配偶信息可编辑
				$(".peiou input").each(function(){
					$(this).removeAttr("disabled");
				});
				$("#relationDegree").removeAttr("disabled");
			}
			else{
				$(".peiou input").each(function(){
					$(this).attr("disabled","disabled");
				});
				$("#relationDegree").attr("disabled","disabled");
			}
		}
		
		//移除配偶信息
		if(flag!=-1){
			var Arrytmp=[];
			for (var j = 0; j < RelationArry.length; j++) {
				if(flag!=j){
					Arrytmp.push(RelationArry[j])
				}
			}
			RelationArry = Arrytmp;
		}
		//联系人1
		
		if(RelationArry.length>=1){
			for ( var property in RelationArry[0]) {
				$("#"+property+"1").val(RelationArry[0][property]);
			}
		}
		
		//联系人2
		if(RelationArry.length>=2){
			for ( var property in RelationArry[1]) {
				$("#"+property+"2").val(RelationArry[1][property]);
			}
		}
		
	},
	initAttachPage:function() {
		jQuery("#attachGridId").jqGrid({
			datatype: "local",
			colNames: ['机构id','配置编号id','上传文件id','关系属性id','附件名称','附件的上传格式','文件信息','是否必须状态','是否必须','选择文件','文件名'], 
			colModel: [
	           {name:'orgId',index:'orgId', align:'center',sortable: false,hidden:true},
	           {name:'setId',index:'setId', align:'center',sortable: false,hidden:true},
	           {name:'filelistId',index:'filelistId', align:'center',sortable: false,hidden:true},
	           {name:'checkId',index:'checkId', align:'center',sortable: false,hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'extenString',index:'extenString', align:'center',sortable: false,hidden:true},
	           {name:'filebackinfo',index:'filebackinfo', align:'center',sortable: false,hidden:true},
	           {name:'mustStatus',index:'mustStatus', align:'center',sortable: false,hidden:true},
	           {name:'mustStatusCn',index:'mustStatusCn', sortable: false,align:'center'},
	           {name:'select',index:'select', align:'center',sortable: false,width:350,title:false,
					formatter:function(cellvalue, options, rowObject){
						return "<form id='loanFormId_"+options.rowId+"' action='' method='post' enctype ='multipart/form-data'>" +
						"<input type='file' name='upload_file' id='loanUpload_"+options.rowId+"' accept='"+	loan.fileExtName+"' />&nbsp&nbsp&nbsp&nbsp&nbsp"+
						"<input type='button' class='uploadclass' onclick='loan.addcustom.upload("+options.rowId+")' value='上传' />"+
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
	  	loan.addcustom.queryAttachItem();
	  	loan.addcustom.queryAttachInfo();
	},
	/**
	 * 查询配置的菜单项
	 */
	queryAttachItem : function(){//functionId后续需要修改
		loan.ajaxDo({
			url: loan.basePath+ "/attach/queryAttach",
			params:{format:'json','menuId': $('#menuId').val() ,'status':'0','functionId':'8001','page':'1','rows':'9999'},
            successCallback:loan.addcustom.attachItemCallBack,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(){
		var applyId = $('#userId').val();
		if(!applyId){
			return;
		}
		loan.ajaxDo({
			url: loan.basePath+ "/org/queryAttachFiles",
			params:{format:'json','menuId':'8001',"checkId":applyId},
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length >0) {
	     			var ids = $("#attachGridId").jqGrid("getDataIDs");
	     			$(list).each(function(i,item) {
	     				for( var j = 0; j < ids.length; j++){
	     					var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
	     					if(item.setId == rowdata.setId) {
	     						$("#attachGridId").jqGrid("setRowData",ids[j],{
	     			        		  filelistId : item.filelistId,
	     			        		  uploadFileName : "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + item.originalFilename  +"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+item.originalFilename+"</a>",
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
		//var checkId = $('#userId').val();
		var filelistId = rowObj.filelistId;
		
		$("#loanUpload_"+rowid).upload({
			url: loan.basePath+'/org/upload?extenString='+extenString+"&orgId="+orgId+"&checkId=" + "&filelistId="+filelistId+"&setId="+setId,
			// 其他表单数据
			params: {"menuId" : $('#menuId').val() },
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
		        		  uploadFileName : "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + obj.domain.depositFilename + "&fileName=" + obj.domain.originalFilename  +"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+obj.domain.originalFilename+"</a>",
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
	/**
	 * 弹出新增关联人页面
	 */
	toAddRe : function(){
		var userId = $('#userId').val();
		loan.s_addPop("新增关联人",loan.basePath+"/borrower/toAddCustRelation?menuId=800101&type=add&userId="+userId,"",480,320,{isChangeClose:false,isRefresh:false,isChild:true});
	},
	/**
	 * 更新关联人
	 */
	updateRelation : function(menuId,rowid){
		var userId = $('#userId').val();
		loan.s_addPop("新增关联人",loan.basePath+"/borrower/toAddCustRelation?menuId=800101&type=up&userId="+userId + "&rowid=" + rowid,"",580,420,{isChangeClose:false,isRefresh:false,isChild:true});
	},
	/**
	 * 删除关联人
	 */
	delRelation : function(menuId , rowid){
		
		jQuery("#relationGridId").jqGrid('delRowData',rowid);
	}
	
	
}
