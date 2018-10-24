/**
 * 
 */
loan.selhandcus=loan.selhandcus||{
	/**
	 * 搜索
	 */
	searchFunc:function(){
		var nameOrNo=$("#nameOrNo").val();
		var menuId=$("#menuId").val();
		var param={'menuId':menuId,'nameOrNo':nameOrNo,
				'format':'json'};
		$("#userListId").jqGrid("setGridParam", {   
			postData:param,
				page:1
	    }).trigger('reloadGrid'); 		
	},
 /**
 * 提交
 */
  submit:function(){
	  var id = $("#userListId").jqGrid("getGridParam", "selrow");
	    if(id==null){
	    	loan.tooltip("请选择需要添加的客户","error"); 
			return;
	    }
	var userNo=$('#userListId').jqGrid('getCell',id,'userNo')+'';
	 var fiveKind=$('#userListId').jqGrid('getCell',id,'fiveKind');
		loan.ajaxDo({
			url:loan.basePath+ "/nonperformasset/addTurnOverUser",
			params:{'format':'json','menuLog':'1','userNo':userNo,'fiveKind':fiveKind},
			successCallback:function() {
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			falseTip:true,
			bizErrTip:true,  //提示
			chainPar:this
		});
				
  }
	
}