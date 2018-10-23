loan.acceptvisit=loan.acceptvisit||{
	/**
	 * 新增外访员
	 */
	addVisitOp:function(){
		var menuId=$("#menuId").val();
		var orderId=$("#orderId").val();
		loan.s_addPop("新增外访员",loan.basePath+"/collecting/toAddVisitOp?menuId="+menuId+"&orderId="+orderId,"",1000,400);
	},
	/**
	 * 页面初始化
	 */
	initial:function(){
		var ids=$("#visitOpList").jqGrid('getDataIDs');
      for(var i=0;i<ids.length;i++){
    	  var data=$("#visitOpList").jqgrid("getCell",ids[i],"supervistorCn");  
    	  if(data=null){
    		  $("#visitOpList").jqgrid("setCell",ids[i],"supervistorCn",'否'); 
    		  $("#visitOpList").jqgrid("setCell",ids[i],"supervistor",'1');
    	  }  
      }	
	},
	/**
	 * 删除外访员
	 */
	deleteOp:function(){
		var ids = $("#visitOpList").jqGrid("getGridParam", "selrow");
		if(ids.length!=1){
			loan.tooltip("请选择需要删除的外访员","error"); 
			return;	
		}
		  $("#visitOpList").jqGrid('delRowData',ids);
	},
	/**
	 * 设置主责
	 */
	setOpSur:function(){
		var id = $("#visitOpList").jqGrid("getGridParam", "selrow");
		if(id==null){
			loan.tooltip("请选择需要设置主责的外访员","error"); 
			return;	
		}
		var ids=$("#visitOpList").jqGrid('getDataIDs');
		var num=0;
	      for(var i=0;i<ids.length;i++){
	    	  var data=$("#visitOpList").jqGrid("getCell",ids[i],"supervistor"); 
	    	  if(data=='0'){
	    		  num++;
	    	  }
	      }
	      if(num>=1){
	    	  loan.tooltip("主责外访员只能有一人","error"); 
				return;	
	      }	
		  $("#visitOpList").jqGrid("setCell",id,"supervistorCn",'是');
		  $("#visitOpList").jqGrid("setCell",id,"supervistor",'0');
	      
	},
	/**
	 * 提交按钮
	 */
	submit:function(){
		var ids=$("#visitOpList").jqGrid('getDataIDs');
		var num=0;
	      for(var i=0;i<ids.length;i++){
	    	  var data=$("#visitOpList").jqGrid("getCell",ids[i],"supervistor"); 
	    	  if(data=='0'){
	    		  num++;
	    	  }
	      }
	      if(num==0){
	    	  loan.tooltip("请设置主责人","error"); 
				return;	
	      }	
		var menuId=$('#menuId').val();
		var orderId=$('#orderId').val();
		var ids=$("#visitOpList").jqGrid('getDataIDs');
		var loanArray=new Array();
		for(var i=0;i<ids.length;i++){
			var obj=new Object();
	      var opId=$("#visitOpList").jqGrid("getCell",ids[i],"opId"); 
	      var supervistor=$("#visitOpList").jqGrid("getCell",ids[i],"supervistor"); 
	      obj.opId=opId;
	      obj.supervistor=supervistor;
	      loanArray.push(obj);
		}
		preLoanList=JSON.stringify(loanArray);
		loan.ajaxDo({
	        url:loan.basePath+"/collecting/acceptVisit",
	        params:{'format':'json','menuId':menuId,'menuLog':'1','preLoanList':preLoanList,'orderId':orderId},
	        successCallback:function(){
	        	loan.tabcut.childClosedIframe(true);
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
		
	}
}

$(function(){
	loan.acceptvisit.initial();
})