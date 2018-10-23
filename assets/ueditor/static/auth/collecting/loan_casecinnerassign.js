loan.casecinnerassign = loan.casecinnerassign || {
	
	confirmFunc:function(){
		
		var menuId = $("#menuId").val();
		var caseIds = $("#caseIds").val();
		var managerFlag = $('input[name="managerFlag"]:checked').val();
		console.log(typeof managerFlag);
		if(managerFlag==null){
			loan.tooltip("请选择一种分配方式","error");
			 return false;
		}
		
		if(managerFlag == 'true'){
			
			loan.ajaxDo({
				url:loan.basePath+"/case/innerAssignCase",
				params:{'format':'json','menuLog':'1','caseIds':caseIds,'collectingOpId':null,
					'managerFlag':managerFlag,'menuId':menuId},
				successCallback:function(){
					loan.s_Pop_closedChild(true,false);
				},
				successTip:true, //提示
				bizErrTip:true,  //提示
				chainPar:this
			});
			
		}
		if(managerFlag == 'false')
		{
			 $('#assignDiv').hide();
			 $('#collectingOpGridIdDiv').show();
			 
			
		}
		
	},

};



