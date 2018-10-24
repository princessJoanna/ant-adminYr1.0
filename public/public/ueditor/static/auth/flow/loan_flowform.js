loan.flowForm = loan.flowForm || {
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#loanFlowFormGrid").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId' : $('#menuId').val() }
	    }).trigger('reloadGrid'); 
	},
	/** 新增按钮 */
	addBtn : function(menuId,rowid){
		loan.s_addPop("新增流程表单",loan.basePath+"/process/toAddForm?menuId=610401","",580,300,{isRefresh:true});
		//parent.loan.tabcut.childAddIframe("新增表单",loan.basePath + "/process/toAddForm?menuId="+menuId,"addFlowForm",true,true);
	},
	/** 更新按钮 */
	updateBtn : function(menuId,rowid){
		var rowData = $("#loanFlowFormGrid").jqGrid('getRowData');
		var tmp;
		for(var i = 0;i<rowData.length;i++ ){
			if(rowData[i].id == rowid){
				tmp = rowData[i];
				break;
			}
		}
		loan.s_addPop("新增流程表单",loan.basePath+"/process/toUpdateForm?menuId=610402&id=" + tmp.id + "&name=" + tmp.name + "&url=" + tmp.url,"",580,300,{isRefresh:true});
		
	},
	/** 删除按钮 */
	delBtn : function(menuId,rowid){
		// 
		var rowData = $("#loanFlowFormGrid").jqGrid('getRowData');
		var tmp;
		for(var i = 0;i<rowData.length;i++ ){
			if(rowData[i].id == rowid){
				tmp = rowData[i];
				break;
			}
		}
		$.artDialog({
			title:"提示",
			content:"确定要删除吗？",
			ok:function(){
				loan.ajaxDo({
					url : loan.basePath + "/process/delForm",
					params : { id : tmp.id , format : 'json' , menuId : '610403' },
					successCallback:function(result){
						loan.flowForm.freshGrid();
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
	submit : function(){
		var name = $('#name').val();
		if(!name){
			loan.tooltip("表单名称必须填写","error");
			return;
		}
		var url = $('#url').val();
		if(!url){
			loan.tooltip("表单url必须填写","error");
			return;
		}
		var id = $('#id').val();
		if(id){
			loan.ajaxDo({
		  		url:loan.basePath+"/process/updateForm",
		  		params:{ menuId : '610402' , id : id, name : name , url : url},
		  		successCallback:loan.flowForm.commSuccFun,
		  		successTip:true
		  	})
		}else{
			loan.ajaxDo({
		  		url:loan.basePath+"/process/addFlowForm",
		  		params:{ menuId : '610401' , name : name , url : url},
		  		successCallback:loan.flowForm.commSuccFun,
		  		successTip:true
		  	})
		}
	},
	commSuccFun : function(){
		parent.$("#loanFlowFormGrid").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId' : parent.$('#menuId').val() }
	    }).trigger('reloadGrid'); 
		loan.s_Pop_closedChild(true,true);
	}
	
}