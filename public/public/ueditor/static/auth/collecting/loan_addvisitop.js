loan.addvisitop=loan.addvisitop||{
	/**
	 * 查询
	 */
	searchFunc:function(){
		var opName=$("#opName").val();
		$("#collectingOpList").jqGrid("setGridParam", {   
			postData:{'opName':opName,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
   clearCondition:function(){
	   $("#opName").val('');
   },
   /**
    * 提交
    */
	submit:function(){
		var ids = $("#collectingOpList").jqGrid("getGridParam", "selarrrow");
	    if(ids.length<1){
	    	loan.tooltip("请选择外访员","error"); 
			return;
	    }
	    var parOpIdS=parent.$("#visitOpList").jqGrid('getDataIDs');
	    for(var i=0;i<ids.length;i++){
	    	for(var j=0;j<parOpIdS.length;j++){
	    		var opId=$('#collectingOpList').jqGrid('getCell',ids[i],'opId');
	    		var parOpId=parent.$("#visitOpList").jqGrid('getCell',parOpIdS[j],'opId');
	    		if(opId==parOpId){
	    			loan.tooltip("该外访员已存在，请重新选择","error");
	    			return;
	    		}
	    		
	    	}
	    	
	    }   
		for(var i=0;i<ids.length;i++){
			var data = $("#collectingOpList").jqGrid('getRowData',ids[i])
			var parId=parent.$("#visitOpList").jqGrid('getDataIDs');
			var len=parId.length;
			parent.$("#visitOpList").jqGrid('addRowData',len+i+1,data);
			parent.$("#visitOpList").jqGrid('setCell',len+i+1,'supervistorCn','否');
			parent.$("#visitOpList").jqGrid('setCell',len+i+1,'supervistor','1');
		}
		loan.s_Pop_closedChild();
		
	}
   
	
}