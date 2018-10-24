loan.customer = loan.customer || {
			toAddMnager : function(url) {
				//parent.loan.s_addPop("添加管理员", url, "", 280, 300);
				loan.s_addPop("分配客户经理",url,"",500,300,{isRefresh:true,isChangeClose:true});	
			},
			add : function(menuId, rowid) {
				$("#rowid").val(rowid);
				
				var rowData = $("#userGridId").getRowData(rowid);
				var url = loan.basePath + "/borrowermanager/toAddRequestManager?opType=add&customerId="
						+ rowData.customerId;
				this.toAddMnager(url);
				/*$("#sPopClose").click(function() {
					$("#userGridId").trigger("reloadGrid");
				});*/
			},
			addBatch : function(menuId) {
				//选择的客户
				var ids = $("#userGridId").jqGrid('getGridParam','selarrrow');
				if(!ids || ids.length == 0) {
					loan.tooltip("请选择要分配的客户","error");
					return;
				}
				var url = loan.basePath+"/borrowermanager/toAddRequestManager?opType=batch";
				this.toAddMnager(url);
			},
			remove : function(menuId, rowid) {
				var rowData = $("#userGridId").jqGrid("getRowData", rowid);
				var userId = rowData.customerId;
				var mamagerId = rowData.mamagerId;
				if(!mamagerId) {
					loan.tooltip("客户没有分配客户经理","error");
					return;
				}	
				//确认是否要删除
				$.artDialog({
					title:"提示",
					content:"确定要移除["+rowData.customerName+"]的客户经理吗",
					ok:function(){
						//var rowid = $("#rowid").val();
						loan.ajaxDo({
							url:loan.basePath+"/borrowermanager/removeUserManager",
							params:{'format':'json','menuId':menuId,'menuLog':'1','userId':userId,'managerId':mamagerId},
							successCallback:function(){
								$("#rowid").val('');
								$("#userGridId").trigger("reloadGrid");//刷新页面
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

			showBorrowerInfoBtn : function(menuId, rowid) {

				var rowData = $("#userGridId").jqGrid("getRowData", rowid);
				var userId = rowData.customerId;
				var userKind = rowData.userKind;
				parent.loan.tabcut.childAddIframe("查看详情", loan.basePath
						+ "/borrower/toBorrowerInfo?menuId=" + menuId
						+ "&userKind=" + userKind + "&userId=" + userId,
						"toBorrowerInfo", true);
			},
			
			clearCondition:function() {
				$("#userType").val("");
				$("#customerName").val("");
				$("#customerManager").val("");
				$("#certificateType").val("");
				$("#certificateNO").val("");
				$("#hasManager").removeAttr("checked");
			}

		}