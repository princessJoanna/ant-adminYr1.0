/**
 * 风控等级
 */
loan.riskDegree = loan.riskDegeree || {
	
	/**
	 * 新增风控等级
	 */
	toAddRiskDegree : function(menuId){
		parent.loan.tabcut.childAddIframe("新增风控等级",loan.basePath+"/risk/toAddRiskDegree?menuId="+menuId,"addRiskDegree",true,true);
	},
	/**
	 * 查询风控等级
	 */
	queryRiskDegree : function(){
		
		
	},
	
	/**
	 * 
	 */
	saveDegree : function(){
		
		
	},
	/**
	 * 增加一行
	 */
	addRow : function(){
	    var ids = jQuery("#riskDegreeGrid").jqGrid('getDataIDs');
	    var rowid = Math.max.apply(Math,ids) + 1;
	    var row = {opsname:"",comname:"",disab:"0",para:"0",explain:"0"};
	  //将新添加的行插入到第一列  
	    $("#riskDegreeGrid").jqGrid("addRowData", rowid, row, "last"); 
	},
	/**
	 * 删除一行
	 */
	delRow : function(){
		var ids = jQuery("#riskDegreeGrid").jqGrid('getDataIDs');
		if(ids.length == 0){
			loan.tooltip("已经删除所有数据，没有数据可以删除！","error");
			return;
		}
		if(ids.length == 1){
			$("#riskDegreeGrid").jqGrid("delRowData", ids[0]);  
		}else{
			$("#riskDegreeGrid").jqGrid("delRowData", ids[ids.length - 1]);  
		}
		
	},
	/**
	 * 修改
	 */
	toEdit : function(){
		
	},
	/**
	 * 删除
	 */
	toDelete : function(){
		
	},
	/**
	 * 查看
	 */
	toViewDetail : function(){
		
		
	},
	/**
	 * 失效
	 */
	toInvalid : function(){
		
		
	}
	
	
	
	
	
}