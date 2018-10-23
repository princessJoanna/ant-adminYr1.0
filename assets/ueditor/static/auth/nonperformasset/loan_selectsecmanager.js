/**
 * 
 */
loan.selectsecmanager=loan.selectsecmanager||{
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var nameOrNo=$("#nameOrNo").val();//姓名或编号
		var menuId=$("#menuId").val();
		$("#securityManager").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'nameOrNo':nameOrNo,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	submit:function(){
		var id=$("#securityManager").jqGrid("getGridParam","selrow");
		var menuId=$("#menuId").val();
		if(id==null){
			loan.tooltip('请选择需分配的保全经理!','error')
			return;
		}
		var data=$("#securityManager").jqGrid("getRowData",id);
		var taskNo=$("#taskNo").val();
		loan.ajaxDo({
	        url:loan.basePath+"/nonperformasset/submitManager",
	        params:{'format':'json','menuId':menuId,'menuLog':'1','taskNo':taskNo,'opName':data.opName,'opId':data.opId},
	        successCallback:function(){
	        	var menuId=$("#meuId").val();
	        	parent.$("#matterGridId").jqGrid("setGridParam", {   
	    			postData:{'format':'json','menuId':menuId}
	    	    }).trigger('reloadGrid'); 
	        	parent.$("#matter2GridId").jqGrid("setGridParam", {   
	    			postData:{'format':'json','menuId':menuId}
	    	    }).trigger('reloadGrid'); 
	        	parent.$("#matter3GridId").jqGrid("setGridParam", {   
	    			postData:{'format':'json','menuId':menuId}
	    	    }).trigger('reloadGrid'); 
	        	loan.s_Pop_closedChild();
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	}
	
}