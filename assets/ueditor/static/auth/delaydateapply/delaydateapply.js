	function searchDelayDateApply(){
		
		var userType=$("#khfl").val();
		var userName=$("#khmc").val();
		var idKind=$("#zjlx").val();
		var idNo=$("#zjh").val();
		searchOrgId = $("#parentOrgId").val();
		
		if(userType == "-1" || userType == null || userType ==""){
			userType = null;
		}
		
		if(idKind == "-1" || idKind == null || idKind ==""){
			idKind = null;
		}
		
		if(userName == "-1" || userName == null || userName ==""){
			userName =null;
		}
		
		
		if(idNo == "-1" || idNo == null || idNo ==""){
			idNo =null;
		}

		$("#delayDateApplyList").jqGrid("setGridParam", {   
			postData:{'userType':userType,'userName':userName,'idKind':idKind,
				'idNo':idNo,'searchOrgId':searchOrgId,'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	}
	
	function clearSearchDelayDateApply(){
		
		var userType=$("#khfl").val("");
		var userName=$("#khmc").val("");
		var idKind=$("#zjlx").val("");
		var idNo=$("#zjh").val("");
	}
	
	
	loan.delaydateapply = loan.delaydateapply || {
		toAddDeferApply:function(menuId,rowid) {
			parent.loan.tabcut.childAddIframe("新增展期",loan.basePath+"/delay/toAddDefer?menuId="+menuId,"AddDefer",true,true);
		},
		del:function(menuid,rowid){			
			//确认作废
			$.artDialog({
				title:"提示",
				content:"确定要删除该展期申请吗？",
				ok:function(){
					  var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
						loan.ajaxDo({
							url:loan.basePath+"/delay/deleteDelayDateApply",
							params:{'applyId':applyId},
							successCallback:function(){
								loan.delaydateapply.freshGrid();//刷新页面
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
		
		/**
		 * 执行删除
		 */
		freshGrid:function() {
			$("#delayDateApplyList").jqGrid("setGridParam", {   
				postData:{'format':'json','menuId':'1102'}
		    }).trigger('reloadGrid'); 
		},
		
		
		
		
		
		/** 选中行的触发事件*/
		selectRowFunc:function(menuid,rowid){
			$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
		},
		
		lookInfo:function(menuid,rowid){
			 var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
			 parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/delay/queryDelayDateApplyInfo?applyId="+applyId+"","deferinfo",true,true);
		},
		
		edit:function(menuid,rowid){
			var confirmStatus = $("#delayDateApplyList").jqGrid('getCell',rowid,'confirmStatus');	
			if(confirmStatus!=0){
				loan.tooltip("只有未审核状态才能进行修改","error");
				return;
			}else{
				var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
				parent.loan.tabcut.childAddIframe("修改",loan.basePath+"/delay/beforeUpdateDelayDateApplyInfo?applyId="+applyId+"","updatedefer",true,true);
			}
		},
		
		confirm:function(menuid,rowid){			 
				$.artDialog({
					title:"提示",
					content:"该展期申请确定要发起审批吗？",
					ok:function(){
						  var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
							loan.ajaxDo({
								url:loan.basePath+"/delay/startApprovalDelayDateApply",
								params:{'applyId':applyId},
								successCallback:function(){
									loan.delaydateapply.freshGrid();//刷新页面
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
			 
			}
		}
	
	
	