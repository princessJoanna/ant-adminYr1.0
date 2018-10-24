/**
 * 
 */
loan.dictlist=loan.dictlist||{
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#dictListGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':$('#menuId').val()}
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		var menuId=$("#menuId").val();
		var dictId=$("#dictId").val();
		var dictName=$("#dictName").val();
		if(dictId!=""){
			if(!v_Regular.number.test(dictId)){
				loan.tooltip("查询条件字典ID应输入数字","error");		
				return;	
			}	
			if(dictId.length>10){
				loan.tooltip("字典ID长度应小于等于10位!","error");		
				return;	
			}
		}
		$("#dictListGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId,'dictId':dictId,'dictName':dictName,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
    /**
     * 删除数据字典
     * @param menuId
     * @param rowid
     */
    deleteDict:function(menuId,rowid){
    	var dictId=$("#dictListGridId").jqGrid("getCell",rowid,"dictId");
    	//确认是否要删除
		$.artDialog({
			title:"提示",
			content:"确定要删除该数据字典吗？",
			ok:function(){
				loan.dictlist.delFunc(menuId,dictId);
			},
			cancel:function(){
				return false;
			}
	    });
    },
    delFunc:function(menuId,dictId){
    	loan.ajaxDo({
	        url:loan.basePath+"/dict/deleteDict",
	        params:{'dictId':dictId},
	        successCallback:function(result){
				loan.dictlist.freshGrid();
	        },
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
    },
    /**
     * 修改数据字典
     * @param menuId
     * @param rowid
     */
    updateDict:function(menuId,rowid){
    	var data=$("#dictListGridId").jqGrid("getRowData",rowid);
    	parent.loan.tabcut.childAddIframe("修改数据字典",loan.basePath+"/dict/toUpdateDict?menuId="+menuId
				+"&dictId=" + data.dictId+"&dictName=" + data.dictName+"&pfOrgId=" + data.pfOrgId+"&remark=" + data.remark ,"updateDict",true,true);
    },
    /**
     * 新增数据字典
     */
    addDict:function(menuId){
    	parent.loan.tabcut.childAddIframe("新增字典项",loan.basePath+"/dict/toAddDict?menuId="+menuId,"addDict",true,true);
    }
	
}
