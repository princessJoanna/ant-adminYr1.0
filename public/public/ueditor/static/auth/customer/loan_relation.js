loan.relation = loan.relation || {
	
	/**
	 * 新增关联人
	 */
	addRelation : function(){
		var userId = $('#userId').val();
		var userName = encodeURI($('#userName').val());
		var idNo = $('#idNo').val();
		loan.s_addPop("新增联系人", loan.basePath + "/borrower/toAddRelation?menuId=" + $('#menuId').val() + "&userId=" + userId + "&userName=" + userName + "&idNo=" + idNo, "", 550, 400, { isChangeClose : true });
	},

	/**
	 * 新增催收关联人
	 */
	addCRelation : function(){
		var userId = $('#userId').val();
		loan.s_addPop("新增联系人", loan.basePath + "/borrower/toAddCRelation?menuId=" + $('#menuId').val() + "&userId=" + userId, "", 550, 400, { isChangeClose : true });
	},
	
	/**
	 *  查看
	 */
	view : function(menuId,rowid){
		var rowData = $("#relationGridId").jqGrid('getRowData',rowid);
		
	},
	/**
	 * 修改
	 */
	modify : function(menuId,rowid){
		//var rowData = $("#relationGridId").jqGrid('getRowData',rowid);
		$("#rowId").val(rowid);
		var userId = $('#userId').val();
		var userName = encodeURI($('#userName').val());
		var idNo = $('#idNo').val();
		loan.s_addPop("修改联系人", 
				loan.basePath + "/borrower/toAddRelation?menuId=" 
							  + $('#menuId').val() 
							  + "&userId=" + userId 
							  + "&userName=" + userName 
							  + "&idNo=" + idNo
							  + "&opType=update" , 
				"", 
				550, 
				400, 
				{ isChangeClose : true });
		
	},
	/**
	 * 删除
	 */
	del : function(menuId,rowid){
		$.artDialog({
			title:"提示",
			content:"确定要删除吗？",
			ok:function(){
				var rowData = $("#relationGridId").jqGrid('getRowData',rowid);
				var relationId = rowData.relationId;
				loan.ajaxDo({
					url : loan.basePath + "/borrower/deleteRelation",
					params : { format : 'json' , menuId : $('#menuId').val() , "relationId":relationId},
					successCallback:function(result){
						$("#relationGridId").jqGrid("setGridParam", {   
							postData:{'format':'json','menuId': $('#menuId').val() , 'userId': $('#userId').val()},
							page:1
						   }).trigger('reloadGrid'); 
					},
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
				
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 提交按钮
	 */
	submit : function(){
		var userId = $('#userId').val();
		if(!userId){
			loan.tooltip("用户编号为空！","error");
			return;
		}
		var relationId = $('#relationId').val();
		var relationType = $('#relationType :selected').val();
		if(!relationType){
			loan.tooltip("请选择【关联关系】","error");
			return;
		}
		var relationName = $('#relationName').val();
		var relationIdType = $('#relationIdType :selected').val();
		if(!relationIdType){
			loan.tooltip("请选择【关联人证件类型】","error");
			return;
		}
		var relationIdNo = $('#relationIdNo').val();
		var relationPhone = $('#relationPhone').val();
		loan.ajaxDo({
			url : loan.basePath + "/borrower/submitRelation",
			params : { format : 'json' , menuId : $('#menuId').val(),relationId : relationId , userId : userId,
					   relationType : relationType,relationName : relationName,relationIdType : relationIdType,relationIdNo:relationIdNo,
					   relationPhone : relationPhone},
			successCallback:function(result){
				parent.$("#relationGridId").jqGrid("setGridParam", {   
					postData:{'format':'json','menuId': $('#menuId').val() , 'userId': $('#userId').val()},
					page:1
				   }).trigger('reloadGrid'); 
				if( parent.$('#focus').length > 0) {
					parent.$("#focus").focus();
				}
				loan.s_Pop_closedChild(false,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
		
	},
	
	/**
	 * 设置证件号的校验
	 */
	personIdCheck:function(idkindContainer,idContainer) {
		var idKind = $("#"+idkindContainer).val();
		switch(idKind) {//0身份证，1护照  2港澳通行整个
			case "0":$("#"+idContainer).attr("verifyData","{type:'myCard',length:'1,18' ,required:'no'}");
				     break;
			case "1":
			case "2":$("#"+idContainer).attr("verifyData","{type:'passport',length:'1,18' ,required:'no'}");
			         break;
			default:$("#"+idContainer).attr("verifyData","{type:'notSpecial',length:'1,30' ,required:'no'}");
	         		break;
		}
	}
}

/**
 * 提交催收联系人
 */
function submitC() {
	var userId = $('#userId').val();
	if(!userId){
		loan.tooltip("用户编号为空！","error");
		return;
	}
	var relationId = $('#relationId').val();
	var relationType = $('#relationType :selected').val();
	if(!relationType){
		loan.tooltip("请选择【关联关系】","error");
		return;
	}
	var relationName = $('#relationName').val();
	var relationIdType = $('#relationIdType :selected').val();
//	if(!relationIdType){
//		loan.tooltip("请选择【关联人证件类型】","error");
//		return;
//	}
	var relationIdNo = $('#relationIdNo').val();
	var relationPhone = $('#relationPhone').val();
	
	var provinceCode = $("#area").attr("provinceid");
	var left = $("#area").width();
	if(!provinceCode) {
		var Tip ="请选择行政区域";
		loan.verify.formValidatorShowMsg($("#area"),Tip,left);
		return;
	}
	var cityCode = $("#area").attr("cityid");
	if(!cityCode) {
		var Tip ="请选择行政区域城市";
		loan.verify.formValidatorShowMsg($("#area"),Tip,left);
		return;
	}
	var districtCode = $("#area").attr("areaid");
	if(!districtCode) {
		var Tip ="请选择行政区域区县";
		loan.verify.formValidatorShowMsg($("#area"),Tip,left);
		$("#area").focus();
		return;
	}
	var address = $("#businessAddress").val();
	loan.ajaxDo({
		url : loan.basePath + "/borrower/submitCollectingRel",
		params : { format : 'json' , 
			       menuId : $('#menuId').val(),
			       relationId : relationId , 
			       userId : userId,
				   relationType : relationType,
				   relationName : relationName,
				   relationIdType : relationIdType,
				   relationIdNo:relationIdNo,
				   relationProvinceCode : provinceCode,
				   relationCityCode : cityCode,
				   relationDistrictCode : districtCode,
				   relationAddress : address,
				   relationPhone : relationPhone,
				 },
		successCallback:function(result){
			parent.$("#relationGridId").jqGrid("setGridParam", {   
				postData:{'format':'json','menuId': $('#menuId').val() , 'userId': $('#userId').val()},
				page:1
			   }).trigger('reloadGrid'); 
			if( parent.$('#focus').length > 0) {
				parent.$("#focus").focus();
			}
			loan.s_Pop_closedChild(false,false);
		},
		successTip:true, //提示
		bizErrTip:true,  //提示
		chainPar:this
	});
}
