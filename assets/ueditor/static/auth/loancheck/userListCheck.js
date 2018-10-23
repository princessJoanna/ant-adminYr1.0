
	loan.aftcheck = loan.aftcheck||{
		toaddCheck:function(menuId){
			parent.loan.tabcut.childAddIframe("添加检查",loan.basePath+"/aftcheck/toadd?menuId="+menuId,"useraddcheck",true, true);
		},
		enableTemplate:function(menuId,param){
			 if(param.status==1){
				 loan.tooltip("模板已启用","succeed");
				 return;
			 }
			 ///deleteTemplate
			 var url = loan.basePath+"/aftcheck/updateHisTemplate?menuId="+menuId+"&histCheckTemplateId="+param.histCheckTemplateId+"&status=1";
//			 $.post(url,{},function(data){
//				 window.location.reload();
//			 },"text");
			 
			 loan.ajaxDo({
					url:url,
					params:{},
					successCallback:function(){
						window.location.reload();
					},
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
		},
		disableemplate:function(menuId,param){
			 if(param.status==2){
				 loan.tooltip("模板已被禁用","error");
				 return;
			 }
			 var url = loan.basePath+"/aftcheck/updateHisTemplate?menuId="+menuId+"&histCheckTemplateId="+param.histCheckTemplateId+"&status=2";
//			 $.post(url,{},function(data){
//				 window.location.reload();
//			 },"text");
			 
			 loan.ajaxDo({
					url:url,
					params:{},
					successCallback:function(){
						window.location.reload();
					},
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
		},
		deleteHisTemplate:function(menuId,param){
			if(param.status==1){
				loan.tooltip("模板已经发布，不允许删除","error");
				return;
			}
			var url = loan.basePath+"/aftcheck/updateHisTemplate?menuId="+menuId+"&histCheckTemplateId="+param.histCheckTemplateId+"&status=0";
			loan.ajaxDo({
				url:url,
				params:{},
				successCallback:function(){
					window.location.reload();
				},
				successTip:true, //提示
				bizErrTip:true,  //提示
				chainPar:this
			});
		},
		toqueryHisTemplates:function(menuId,rowid){
			var checkTemplateId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkTemplateId');
//			loan.s_addPop("模板详细",loan.basePath+"/aftcheck/toqueryHisTemplates?menuId="+menuId+"&checkTemplateId="+checkTemplateId,"",850,400,{isChangeClose:false});
			loan.tabcut.childAddIframe("模板详细",loan.basePath+"/aftcheck/toqueryHisTemplates?menuId="+menuId+"&checkTemplateId="+checkTemplateId,menuId,true,true)
		},
		publicTemplate:function(menuId,rowid){
			 var checkTemplateId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkTemplateId');
			 var status = $("#checkTemplateList").jqGrid('getCell',rowid,'status');
			 if(status==1){
				 loan.tooltip("模板已发布,不允许重复发布","error");
				 return;
			 }
			 ///deleteTemplate
			 var url = loan.basePath+"/aftcheck/pubictemplate";
			 
			 loan.ajaxDo({
			        url:url,
			        params : {"menuId":menuId,"checkTemplateId":checkTemplateId} ,
					successCallback:function(data){
								loan.tooltip("发布成功","succeed");
								$("#checkTemplateList").trigger("reloadGrid")
					},
					successTip:true,
					bizErrTip:true,
					chainPar:this
				});
			 
//			 $.post(url,{"menuId":menuId,"checkTemplateId":checkTemplateId},function(data){
//				 var jsonObj = jQuery.parseJSON(data);
//					if(jsonObj["errorCode"]==1){
//						loan.tooltip("发布成功","succeed");
//						 window.location.reload();
//					}else{
//						loan.tooltip("发布失败","error");
//						 window.location.reload();
//					}
//			 },"text");
		},
		deleteTemplate:function(menuId,rowid){
			 var checkTemplateId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkTemplateId');
			 var status = $("#checkTemplateList").jqGrid('getCell',rowid,'status');
			 if(status==1){
				 loan.tooltip("模板已发布,不允许删除","error");
				 return;
			 }
			 ///deleteTemplate
			 var url = loan.basePath+"/aftcheck/deleteTemplate?menuId="+menuId+"&checkTemplateId="+checkTemplateId;
			 
			 loan.ajaxDo({
					url:loan.basePath+"/aftcheck/deleteTemplate",
					params:{"menuId":menuId,"checkTemplateId":checkTemplateId},
					successCallback:function(){
//						window.location.reload();
						$("#checkTemplateList").trigger("reloadGrid");
					},
					successTip:true, //提示
					bizErrTip:true,  //提示
					chainPar:this
				});
//			 $.post(url,{},function(data){
//				 window.location.reload();
//			 },"text");
		},
		toaddtemplate:function(menuId){
			parent.loan.tabcut.childAddIframe("添加模板",loan.basePath+"/aftcheck/toaddtemplate?menuId="+menuId,"addCustomerTemplate",true , true);
		},
		showInfo:function(menuId,rowid){
			//queryUserCheckGird
			 var checkId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkId');
			parent.loan.tabcut.childAddIframe("检查详情",loan.basePath+"/aftcheck/queryUserCheck?menuId=11090602&checkId="+checkId,"customerDetail",true, true);
		},
		updateCheck:function(menuId,rowid){
			///aftcheck/tocheckpage
			 var checkId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkId');
				parent.loan.tabcut.childAddIframe("修改检查",loan.basePath+"/aftcheck/toUpdateCheck?menuId="+menuId+"&checkId="+checkId,"updateCheck",true, true);
			
		},
		checkAgain:function(menuId,rowid){
			///aftcheck/tocheckpage
			 var checkId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkId');
				parent.loan.tabcut.childAddIframe("再次检查",loan.basePath+"/aftcheck/checkAgain?menuId=11090601&checkId="+checkId,"checkAgain",true, true);
			
		},
		selectRowFunc:function(rowid,menuid){
			$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
			 var checkTemplateId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkTemplateId');
			//$("#hisTemplate")[0].src= loan.basePath+"/aftcheck/toqueryHisTemplates?menuId=110905&checkTemplateId="+checkTemplateId;
		},
		
		toadd:function(menuId){
			window.location.href=loan.basePath+"/aftcheck/toadd?menuId="+menuId;
		},
		queryTemplates:function(menuId){
			window.location.href=loan.basePath+"/aftcheck/toqueryTemplates?menuId="+menuId;
		},
		modifyTemplate:function(menuId,rowid){
			 var checkTemplateId = $("#checkTemplateList").jqGrid('getCell',rowid,'checkTemplateId');
			 var histCheckTemplateId = $("#checkTemplateList").jqGrid('getCell',rowid,'histCheckTemplateId');
			 var status = $("#checkTemplateList").jqGrid('getCell',rowid,'status');
			parent.loan.tabcut.childAddIframe("修改模板",loan.basePath+"/aftcheck/toupdatetemplate?menuId="+menuId+"&checkTemplateId="+checkTemplateId,"modifyTemplate",true, true);
		}
		
	};
	
	loan.delaydateapply = loan.delaydateapply || {
//		toAddDeferApply:function(menuId,rowid) {
//			parent.loan.tabcut.childAddIframe("新增展期",loan.basePath+"/delay/toAddDefer?menuId="+menuId,"AddDefer",true,true);
//		},
//		del:function(menuid,rowid){			
//			//确认作废
//			$.artDialog({
//				title:"提示",
//				content:"确定要删除该展期申请吗？",
//				ok:function(){
//					  var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
//						loan.ajaxDo({
//							url:loan.basePath+"/delay/deleteDelayDateApply",
//							params:{'applyId':applyId},
//							successCallback:function(){
//								loan.delaydateapply.freshGrid();//刷新页面
//							},
//							successTip:true, //提示
//							bizErrTip:true,  //提示
//							chainPar:this
//						});
//				},
//				cancel:function(){
//					return false;
//				}
//		    });
//		}
		
//		/**
//		 * 执行删除
//		 */
//		freshGrid:function() {
//			$("#delayDateApplyList").jqGrid("setGridParam", {   
//				postData:{'format':'json','menuId':'1102'}
//		    }).trigger('reloadGrid'); 
//		},
//		
//		
//		
//		
//		
//		/** 选中行的触发事件*/
//		selectRowFunc:function(menuid,rowid){
//			$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
//		},
//		
//		lookInfo:function(menuid,rowid){
//			 var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
//			 parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/delay/queryDelayDateApplyInfo?applyId="+applyId+"","deferinfo",true,true);
//		},
//		
//		edit:function(menuid,rowid){
//			var confirmStatus = $("#delayDateApplyList").jqGrid('getCell',rowid,'confirmStatus');	
//			if(confirmStatus==1){
//				$.artDialog({
//					title:"提示",
//					content:"必须是未审核状态",
//				});
//			}else{
//				var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
//				parent.loan.tabcut.childAddIframe("修改",loan.basePath+"/delay/beforeUpdateDelayDateApplyInfo?applyId="+applyId+"","updatedefer",true,true);
//			}
//		},
//		
//		confirm:function(menuid,rowid){			 
//				$.artDialog({
//					title:"提示",
//					content:"该展期申请确定要发起审批吗？",
//					ok:function(){
//						  var applyId = $("#delayDateApplyList").jqGrid('getCell',rowid,'applyId');
//							loan.ajaxDo({
//								url:loan.basePath+"/delay/startApprovalDelayDateApply",
//								params:{'applyId':applyId},
//								successCallback:function(){
//									loan.delaydateapply.freshGrid();//刷新页面
//								},
//								successTip:true, //提示
//								bizErrTip:true,  //提示
//								chainPar:this
//							});
//					},
//					cancel:function(){
//						return false;
//					}
//			    });
//			 
//			}
 		}
	
	
	