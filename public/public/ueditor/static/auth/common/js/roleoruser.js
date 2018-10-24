loan.roleoruser = loan.roleoruser || {
	
	submit : function(rectId){
		var ids = "",names = "";
		var dataAry = [];
		var userIds = $("#userGridId").jqGrid('getGridParam','selarrrow');
		
		if(userIds){
			dataAry.length = userIds.length;
			for(var i = 0;i < userIds.length;i++){
				dataAry[i] = $("#userGridId").jqGrid('getRowData', userIds[i]);
			}
			for(var data in dataAry){
				ids += dataAry[data].opId + ",";
				names += dataAry[data].opName + ",";
			}
		}
		dataAry = [];
		// 角色的tab选择操作
		var roleIds = $("#roleGridId").jqGrid('getGridParam','selarrrow');
		if(roleIds){
			dataAry.length = roleIds.length;
			for(var i = 0;i < roleIds.length;i++){
				dataAry[i] = $("#roleGridId").jqGrid('getRowData', roleIds[i]);
			}
			for(var data in dataAry){
				ids += dataAry[data].roleId + ",";
				names += dataAry[data].roleName + ",";
			}
		}
		if(ids == "" || names == "" ){
			loan.tooltip("请选择具体用户或角色！","error");
			return;
		}
		// 拼接结果，返回到父页面
		window.parent.bringback(ids,names,rectId);
		
		loan.s_Pop_closedChild();
	}
}
