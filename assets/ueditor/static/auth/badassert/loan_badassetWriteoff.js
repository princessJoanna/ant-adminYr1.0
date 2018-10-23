loan.badassetWriteoff = loan.badassetWriteoff || {
	
	freshGrid : function(res){
		if(res.success){
			$("#badassetWriteoffGridId").jqGrid("setGridParam", {   
				postData:{'format':'json'}
		    }).trigger('reloadGrid');
		}
	},

	insert : function(menuId){
		var overdue="yes";
		loan.s_addPop("选择核销客户",loan.basePath+"/writeoff/toChooseUser?menuId="+menuId+"&overdue="+overdue,"",900,400,{isRefresh:true,isChangeClose:true});
	},
	
	addInfo : function(rowid){
		var menuId="130202";
		var applyId=$("#badassetWriteoffGridId").jqGrid("getCell",rowid, "applyId");
		var userId=$("#badassetWriteoffGridId").jqGrid("getCell",rowid, "customerUserId");
		var customerName=$("#badassetWriteoffGridId").jqGrid("getCell",rowid, "customerName");
		parent.loan.tabcut.childAddIframe("补充材料",loan.basePath+"/writeoff/toAddData?menuId="+menuId+"&applyId="+applyId+"&userId="+userId+"&customerName="+customerName,"toAddData",true);
	},
	
	remove : function(rowid){
		var menuId="130202";
		var applyId=$("#badassetWriteoffGridId").jqGrid("getCell",rowid, "applyId");
		   $.artDialog({
				title:"提示",
				content:"确定删除吗？",
				ok:function(){
					loan.ajaxDo({
						url:loan.basePath+"/writeoff/delWriteoffApply",
						params:{'format':'json','menuLog':'1','applyId':applyId,'menuId':menuId},
						successCallback:loan.badassetWriteoff.freshGrid,
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
	
	searchFunc : function(){
		// debugger;
		var applyState=$(".m-tab-con li[class='on']").attr('id');
		var beginDate='';
		var endDate='';
		var nameOrNo='';
		if($("#beginDate").val()!=''){
			beginDate=$("#beginDate").val();
		}
		if($("#endDate").val()!=''){
			endDate=$("#endDate").val();
		}
		if($("#nameOrNo").val()!=''){
			nameOrNo=$("#nameOrNo").val();
		}
		
		$("#badassetWriteoffGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'1302','applyState':applyState,'beginDate':beginDate,
				'endDate':endDate,'nameOrNo':nameOrNo,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	clearCondition : function(){
		$("#beginDate").val('');
		$("#endDate").val('');
		$("#nameOrNo").val('');
	},



};




