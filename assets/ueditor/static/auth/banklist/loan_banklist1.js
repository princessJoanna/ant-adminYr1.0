loan.banklist1 = loan.banklist1 || {

		/**
		 * 刷新 jqgrid
		 */
		freshGrid : function () {
			$ ( "#banklistGridId" ).jqGrid ( "setGridParam", {
				postData : { 'menuId' : '3003', 'format' : 'json' }
			} ).trigger ( 'reloadGrid' );
		},

		/**
		 * 关闭子框架
		 */
		closeChildFrame : function () {
			loan.tabcut.childClosedIframe ( true );
		},

		/** 选中行的触发事件*/
		selectRowFunc : function ( rowid ) {
			$ ( "#rowid" ).attr ( "value", rowid );//记录当前选中的行的rowid
		},

		/**
		 * 确认提示框
		 */
		confirmDialog : function ( dtitle, dcontent, callBackFunc ) {
			$.artDialog ( {
				title : dtitle,
				content : dcontent,
				ok : callBackFunc,
				cancel : function () {
					return false;
				}
			} );
		},

		/**
		 * 清空查询条件
		 */
		clearCondition : function () {
			$ ( "#bankNo" ).val ( "" );
		}, //todo
		/**
		 * 搜索按钮
		 */
		searchFunc : function () {
			var bankNo = $ ( "#bankNo" ).val () || "";
			$ ( "#banklistGridId" ).jqGrid ( "setGridParam", {
				postData : { 'menuId' : '3003', 'format' : 'json', 'bankNo' : bankNo },
				page : 1
			} ).trigger ( 'reloadGrid' );
		},
		/**
		 * 新增按钮
		 */
		addBtnFunc : function ( menuId, rowid ) {
			parent.loan.tabcut.childAddIframe ( "新增支持银行", loan.basePath + "/banksupport/toAddBanklist?menuId=300301",
				"addSupportBankInfo", true, true );
		},
		/**
		 * 新增提交按钮
		 */
		submitAddFunc : function () {
			var params = {};
			params.bankNo = $ ( "#bankNo" ).val ();
			params.bankName = $ ( "#bankName" ).val ();
			params.ebankKey = $ ( "#ebankKey" ).val ();
			params.status = $ ( "input[name='topStatus']:checked" ).val ();
			if ( ! params.status ) {
				loan.tooltip ( "请选择是否启用", "error" );
				return;
			}
			var _$upload_Comp = $ ("#ossFilesUpload");
			if(!_$upload_Comp.val()) {
				loan.banklist1.submitAdd ( params );
			}else{
				loan.banklist1.submitAddWithLogo ( params );
			}
		},

		submitAddWithLogo : function ( params ) {
			var _$upload_Comp = $ ("#ossFilesUpload"), _$button = $("#submit_button");
			_$button.attr("disabled","disabled");
			_$upload_Comp.upload({
				url:  loan.basePath + "/OSSFileUpload/image",
				type: 'POST',
				// 其他表单数据
				params: { 'format' : 'json' },
				dataType: 'text',
				onSend: function (obj, str) {  return true; },
				// 上传之后回调
				onComplate: function (data) {
					if(!data) {
						loan.tooltip("上传失败，通讯异常",'error');
						return;
					}
					var result = $.parseJSON(data);
					if(!result['success']){
						loan.tooltip( result['errMsg'] || "未知异常" ,'error');
						return;
					}

					params.bankLogo =  result['imageOSSUrl'];
					$ ( '#bankLogoImg' ).attr ( "src", params.bankLogo );
					loan.banklist1.submitAdd (params);
					_$button.removeAttr("disabled");
				}
			});
			_$upload_Comp.upload("ajaxSubmit");
		},

		submitAdd : function ( params ) {
			loan.ajaxDo ( {
				url : loan.basePath + "/banksupport/addBanklist",
				params : {
					'menuId' : '300301', 'menuLog' : '1', 'format' : 'json', 'bankNo' : params.bankNo,
					'bankName' : params.bankName, 'bankLogo' : params.bankLogo || "", 'ebankKey' : params.ebankKey,
					'status' : params.status
				},
				successCallback : loan.banklist1.closeChildFrame,
				successTip : true, //提示
				bizErrTip : true,  //提示
				chainPar : this
			} );
		},
		/**
		 * 修改按钮
		 */
		editBtnFunc : function ( menuId, rowid ) {
			$ ( "#rowid" ).val ( rowid );
			var banklist = $ ( "#banklistGridId" ).jqGrid ( 'getRowData', rowid );
			var banklistId = banklist.banklistId;
			parent.loan.tabcut.childAddIframe ( "修改银行信息", loan.basePath +"/banksupport/toEditBanklist?menuId=300302&&banklistId=" + banklistId,
				"editSupportBankInfo", true, true );
		},
		/**
		 * 修改提交按钮
		 */
		submitEdit : function (params) {
			loan.ajaxDo ( {
				url : loan.basePath + "/banksupport/updateBanklist",
				params : {
					'menuId' : '300302', 'menuLog' : '1', 'format' : 'json', 'bankNo' : params.bankNo,
					'bankName' : params.bankName, 'bankLogo' : params.bankLogo || "", 'ebankKey' : params.ebankKey,
					'status' : params.status, 'banklistId' : params.banklistId
				},
				successCallback : loan.banklist1.closeChildFrame,
				successTip : true, //提示
				bizErrTip : true,  //提示
				chainPar : this
			} );
		},
		submitEditFunc : function (params) {
			var params = {};
			params.banklistId = $ ( "#banklistId" ).val ();
			params.bankNo = $ ( "#bankNo" ).val ();
			params.bankName = $ ( "#bankName" ).val ();
			if( !$("#isDeleteBankLogo").is(':checked') ){
				params.bankLogo = $ ( "#bankLogoImg" ).attr ("src");
			}
			params.ebankKey = $ ( "#ebankKey" ).val ();
			params.status = $ ( "input[name='topStatus']:checked" ).val ();
			if ( ! params.status ) {
				loan.tooltip ( "请选择是否启用", "error" );
				return;
			}
			var _$upload_Comp = $ ("#ossFilesUpload");
			if(!_$upload_Comp.val()) {
				loan.banklist1.submitEdit ( params );
			}else{
				loan.banklist1.submitEditWithLogo ( params );
			}
		},
		submitEditWithLogo : function (params) {
			var _$upload_Comp = $ ("#ossFilesUpload"), _$button = $("#submit_button");
			_$button.attr("disabled","disabled");
			_$upload_Comp.upload({
				url:  loan.basePath + "/OSSFileUpload/image",
				type: 'POST',
				// 其他表单数据
				params: { 'format' : 'json' },
				dataType: 'text',
				onSend: function (obj, str) {  return true; },
				// 上传之后回调
				onComplate: function (data) {
					if(!data) {
						loan.tooltip("上传失败，通讯异常",'error');
						return;
					}
					var result = $.parseJSON(data);
					if(!result['success']){
						loan.tooltip( result['errMsg'] || "未知异常" ,'error');
						return;
					}

					params.bankLogo =  result['imageOSSUrl'];
					loan.banklist1.submitEdit (params);
					_$button.removeAttr("disabled");
				}
			});
			_$upload_Comp.upload("ajaxSubmit");
		},
		/**
		 * 删除按钮
		 */
		delBtnFunc : function ( menuId, rowid ) {
			var banklist = $ ( "#banklistGridId" ).jqGrid ( 'getRowData', rowid );
			var tips = "确定要删除【" + banklist.bankName + "】的支持吗？";
			loan.banklist1.confirmDialog("提示",tips, function() {
				if(banklist.banklistId) {
					loan.ajaxDo({
						url:loan.basePath+"/banksupport/deleteBanklist",
						params:{'menuId': menuId ,'menuLog':'1','format':'json','banklistId':banklist.banklistId},
						successCallback:loan.banklist1.freshGrid,
						successTip:true, //提示
						bizErrTip:true,  //提示
						chainPar:this
					});
				}else{
					loan.tooltip("删除失败，找不到'banklistId'！" ,'error');
				}
			});
		},

		queryBanklistById : function( banklistId ) {
			var menuId = $("#menuId").val();
			loan.ajaxDo({
				url:loan.basePath+"/banksupport/queryBanklist",
				params:{'menuId':menuId,'format':'json','banklistId':banklistId,'page':'1','rows':'1'},
				successCallback:loan.banklist1.initEditPage,
				successTip:false, //不提示
				bizErrTip:false,  //不提示
				chainPar:this
			});
		},

		/**
		 * 初始化修改页面
		 */
		initEditPage : function ( result ) {
			console.log ( result );
			if ( result.success ) {
				var banklist = result.bankListDomain;
				if ( banklist ) {
					var top = $ ( "input[name='topStatus']" );
					for ( var i = 0; i < top.length; i ++ ) {
						if ( $ ( top[ i ] ).val () == banklist.status ) {
							$ ( top[ i ] ).attr ( "checked", "true" );
							break;
						}
					}
					for ( var property in banklist ) {
						$ ( "#" + property ).val ( banklist[ property ] );
					}
					$ ( '#bankLogoImg' ).attr ( "src", banklist.bankLogo );
				} else {
					loan.tooltip ( "没有查询到数据！", "error" );
				}
			} else {
				loan.tooltip ( result.errMsg || "通讯异常", "error" );
			}

		},

		/**
		 * 启用/停用按钮
		 */
		disableBtnFunc : function ( menuId, rowid ) {
			loan.banklist1.toggleStatus ( menuId, '停用', '1', rowid );
		},
		enableBtnFunc : function ( menuId, rowid ) {
			loan.banklist1.toggleStatus ( menuId, '启用', '0', rowid );
		},
		toggleStatus : function ( menuId, statusCn, status, rowid ) {
			var banklist = $ ( "#banklistGridId" ).jqGrid ( 'getRowData', rowid );
			if ( banklist.status == status ) {
				var tips = "刷新【" + banklist.bankName + "】为" + statusCn + "状态吗？";
			} else {
				var tips = "确定要" + statusCn + "【" + banklist.bankName + "】支持吗？";
			}
			$.artDialog({
				title:"提示",
				content: tips ,
				ok:function(){
					var banklistId = banklist.banklistId;
					loan.ajaxDo({
						url:loan.basePath+"/banksupport/toggleStatus",
						params:{'menuId': menuId,'menuLog':'1','format':'json','banklistId':banklistId,'status':status},
						successCallback:loan.banklist1.freshGrid,
						successTip:true, //提示
						bizErrTip:true,  //提示
						chainPar:this
					});
					return true;
				},
				cancel:function(){
					return false;
				}
			});
		}

	};
function judgeEmp( str ){
	if ( str == "" ) return true;
	if ( !str ) return true;
	return jQuery.trim(str) =='' && str.length > 0;
}