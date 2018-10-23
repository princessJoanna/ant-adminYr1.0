loan.addadjustfee = loan.addadjustfee
		|| {
			menuId : '110401',// 菜单号
			url : loan.basePath + "/feesAdjust/addFeesAdjustApply",// 提交的url

			/**
			 * 查询用户详情
			 */
			userDetail : function(userId) {
				var _userId = $("#userId").val();
				// 判断是否已选择
				if (_userId) {
					userId = _userId;
					parent.loan.tabcut.childAddIframe("客户详情", loan.basePath
							+ "/customer/toCusDetail?menuId="
							+ loan.addadjustfee.menuId + "&userId=" + userId,
							"customerDetail", true);
				} else {
					loan.tooltip("请选择", "error");
				}
			},

			/**
			 * 查询借据原执行率，用于展示上次原执行月利率
			 */
			qryInterestRate : function() {
				var loanApplyId = $('#loanApplyId').val();
				var userId = $('#userId').val();
				var receiptId = $('#receiptId').val();
				loan.ajaxDo({
							url : loan.basePath
									+ "/feesAdjust/queryInterestRate",
							params : {
								loanApplyId : loanApplyId,
								menuId : $('#menuId').val(),
								userId : userId,
								receiptId : receiptId,
								format : 'json'
							},
							successCallback : function(result) {
								if (result.domain && result.domain.interestRate) {
									$('#interestRate').html(
											formatMoney(result.domain.interestRate*1000,".",3)+"‰");
								} else {
									$('#interestRate').html('无');
								}
								if (result && result.overdueStatus) {
									if (result.overdueStatus == 'false') {
										$('#defaultInterestAmount,#lateFeesAmount').val('0.00').attr('readonly','readonly');
									}
								}
							},
							successTip : false, // 提示
							bizErrTip : true, // 提示
							chainPar : this
						});
			},
			/**
			 * 修改前，显示初始化费率数据
			 */
			initUpdateData : function() {
				var opType = $("#opType").val();
				var applyId = $("#applyId").val();
				if (opType == 'up') {
					loan.addadjustfee.url = loan.basePath
							+ "/feesAdjust/updateFeesAdjustApply";
					loan.addadjustfee.queryFeesAdjustFeeInfo(applyId);// 初始化页面数据
					loan.addadjustfee.queryAttachInfo(applyId);// 查询已上传的文件
					loan.addadjustfee.qryInterestRate();
				}
			},

			/**
			 * 查询费率详情
			 */
			queryFeesAdjustFeeInfo : function(applyId) {
				loan.ajaxDo({
					url : loan.basePath + "/feesAdjust/queryFeesAdjustInfo",
					params : {
						'format' : 'json',
						'applyId' : applyId
					},
					successCallback : function(result) {// 初始化页面信息
						var domain = result.domain;
						if (domain) {
							var idKindCn = $("#idKindCn").val();
							$("#receiptId").val(domain.receiptId);
							$("#receiptNo").val(domain.receiptNo);
							$('#receiptNo').attr("disabled", "disabled");
							$("#userName").html(domain.userName);// 客户名称
							$("#idKind").html(idKindCn);// 证件类型
							$("#idNo").html(domain.idNo);// 证件号码
							$("#applyId").val(domain.applyId);
							var amt = $.fmatter.util.NumberFormat(
									domain.loanAmount, {
										decimalPlaces : 2
									});
							$("#loanAmount").html(amt + "元");// 贷款金额
							$("#loanDate").html(domain.loanDate);// 贷款开始日期
							$("#limitDate").html(domain.limitDate);// 贷款到期日期
							var interestRate = domain.interestRate * 1000;
							interestRate = $.fmatter.util.NumberFormat(
									interestRate, {
										decimalPlaces : 3
									});
							$("#interestRate").html(interestRate + "‰");// 原执行月利率
							var interestAmount = $.fmatter.util.NumberFormat(
									domain.interestAmount, {
										decimalPlaces : 2
									});
							$("#interestAmount").val(interestAmount);// 调整利息
							var defaultInterestAmount = $.fmatter.util
									.NumberFormat(domain.defaultInterestAmount,
											{
												decimalPlaces : 2
											});
							$("#defaultInterestAmount").val(
									defaultInterestAmount);// 调整罚息
							var poundageAmount = $.fmatter.util.NumberFormat(
									domain.poundageAmount, {
										decimalPlaces : 2
									});
							$("#poundageAmount").val(poundageAmount);// 调整手续费
							var lateFeesAmount = $.fmatter.util.NumberFormat(
									domain.lateFeesAmount, {
										decimalPlaces : 2
									});
							$("#lateFeesAmount").val(lateFeesAmount);// 调整滞纳金
							$("#remark").val(domain.remark);
						}
					},
					successTip : false, // 提示
					bizErrTip : true, // 提示
					chainPar : this
				});
			},

			/**
			 * 查询已上传文件
			 */
			queryAttachInfo : function(applyId) {
				loan.ajaxDo({
				url : loan.basePath + "/org/queryAttachFiles",
				params : {
					format : 'json',
					'menuId' : '110401',
					"checkId" : applyId
				},// 'menuId':'7009'这个后面加上
				successCallback : function(result) {
					var list = result.list;
					// 初始化已上传过的文件
					if (list && list.length > 0) {
						var ids = $("#attachGridId").jqGrid(
								"getDataIDs");
						$(list).each(function(i, item) {
							for ( var j = 0; j < ids.length; j++) {
								var rowdata = $("#attachGridId").jqGrid("getRowData",ids[j]);
								if (item.setId == rowdata.setId) {
									$("#attachGridId").jqGrid("setRowData",ids[j],
									{
										filelistId : item.filelistId,
										uploadFileName : "<a href='"
												+ loan.basePath + "/loan/downFile?ossName=" + item.depositFilename + "&fileName=" + encodeURIComponent(item.originalFilename)
												+ "' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"
												+ item.originalFilename
												+ "</a>",
										filebackinfo : JSON
												.stringify(item),
									});
									break;
								}
							}
						});
					}
				},
				successTip : false, // 提示
				bizErrTip : false, // 提示
				chainPar : this
			});

			},
			submit : function(type) {
				var applyId = $("#applyId").val();
				var userId = $("#userId").val();
				var receiptId = $("#receiptId").val();
				var receiptNo = $("#receiptNo").val();
				if (!receiptNo) {
					loan.tooltip("请选择要调整的贷款", "error");
					return;
				}
				var interestAmount = $("#interestAmount").val();
				if (!interestAmount) {
					loan.tooltip("请输入要调整的利息", "error");
					return;
				}
				var defaultInterestAmount = $("#defaultInterestAmount").val();
				if (!defaultInterestAmount) {
					loan.tooltip("请输入要调整的罚息", "error");
					return;
				}
				var poundageAmount = $("#poundageAmount").val();
				if (!poundageAmount) {
					loan.tooltip("请输入要调整的手续费", "error");
					return;
				}
				var lateFeesAmount = $("#lateFeesAmount").val();
				if (!lateFeesAmount) {
					loan.tooltip("请输入要调整的滞纳金", "error");
					return;
				}
				if($('#iform .v_Error') && $('#iform .v_Error').length > 0 ){
					return;
				}
				var remark = $("#remark").val();
				// 校验必传文件
				var fileList;
				if (!loan.addadjustfee.validateFiles()) {
					return;
				} else {
					fileList = loan.addadjustfee.parseFileJson();
				}
				var flag=$("#flag").val();
				var params = {
					'menuId' : loan.addadjustfee.menuId,
					'menuLog' : '1',
					'userId' : userId,
					'receiptId' : receiptId,
					'interestAmount' : interestAmount,
					'defaultInterestAmount' : defaultInterestAmount,
					'poundageAmount' : poundageAmount,
					'lateFeesAmount' : lateFeesAmount,

					'remark' : remark,
					'applyId' : applyId,
					'fileList' : fileList,
					'flag':flag
				}
				if (loan.addadjustfee.fileUpdate) {
					$.artDialog({
						title : "提示",
						content : "您有已选择但未上传的文件，现在保存将不会上传这些文件，按确定继续保存，按取消终止保存？",
						ok : function() {
							loan.addadjustfee.doSubmit(params,type);
						},
						cancel : function() {
							return false;
						}
					});
				} else {
					loan.addadjustfee.doSubmit(params,type);
				}
			},

			/**
			 * 执行提交
			 */
			doSubmit : function(params,type) {
				loan.ajaxDo({
					url : loan.addadjustfee.url,
					params : params,
					successCallback : function() {
						// 关闭子框架
						if(type && type =='flowUpdate'){
							loan.tabcut.childClosedIframe(false);
						}else{
							loan.tabcut.childClosedIframe(true);
						}
					},
					successTip : true, // 提示
					bizErrTip : true, // 提示
					chainPar : this
				});
			},
			/**
			 * 查询产品列表
			 */
			/*
			 * queryProduct:function() { loan.ajaxDo({
			 * url:loan.basePath+"/signProduct/queryProduct", params:{
			 * 'menuId':loan.addadjustfee.menuId,'format':'json'},
			 * successCallback:loan.addadjustfee.showProductResult,
			 * successTip:false, //提示 bizErrTip:false, //提示 chainPar:this }); },
			 */
			/**
			 * 校验文件
			 */
			validateFiles : function() {
				var datas = $("#attachGridId").jqGrid('getRowData');
				loan.addadjustfee.fileUpdate = false;
				for ( var i = 0; i < datas.length; i++) {
					var rowObj = datas[i];
					var rowid = i + 1;
					// 判断必传文件是否已上传
					var content = rowObj.uploadFileName;
					if (rowObj && rowObj.mustStatus == '1') {
						if (!content) {
							loan.tooltip("请上传第" + rowid + "个文件", "error");
							return false;
						}
					}
					// 校验是否重新上传的文件未提交
					var fileValue = $("#loanUpload_" + rowid).val();
					if (fileValue) {
						loan.addadjustfee.fileUpdate = true;
					}
				}
				return true;
			},

			/** 解析文件为json字符串 */
			parseFileJson : function() {
				var datas = $("#attachGridId").jqGrid('getRowData');
				var filelist = new Array();
				for ( var i = 0; i < datas.length; i++) {
					var rowObj = datas[i];
					var content = rowObj.uploadFileName;
					if (content) {
						var fileObj = $.parseJSON(rowObj.filebackinfo);
						fileObj.setId = rowObj.setId;
						fileObj.orgId = rowObj.orgId;
						fileObj.filelistId = rowObj.filelistId;
						filelist.push(fileObj);
					}
				}
				return JSON.stringify(filelist);
			},

			/**
			 * 初始化上传附件页面
			 */
			/**
			 * 初始化上传附件页面
			 */
			initAttachPage : function() {
				jQuery("#attachGridId").jqGrid(
					{
						datatype : "local",
						colNames : [ '机构id', '配置编号id', '上传文件id',
								'关系属性id', '附件名称', '附件的上传格式',
								'文件信息', '是否必须状态', '是否必须', '选择文件',
								'文件名' ],
						colModel : [
								{ name : 'orgId', index : 'orgId', align : 'center', sortable : false, hidden : true },
								{ name : 'setId', index : 'setId', align : 'center', sortable : false, hidden : true },
								{ name : 'filelistId', index : 'filelistId', align : 'center', sortable : false, hidden : true },
								{ name : 'checkId', index : 'checkId', align : 'center', sortable : false, hidden : true },
								{ name : 'annexName', index : 'annexName', sortable : false, align : 'center' },
								{ name : 'extenString', index : 'extenString', align : 'center', sortable : false, hidden : true },
								{ name : 'filebackinfo', index : 'filebackinfo', align : 'center', sortable : false, hidden : true
								},
								{ name : 'mustStatus', index : 'mustStatus', align : 'center', sortable : false, hidden : true },
								{ name : 'mustStatusCn', index : 'mustStatusCn', sortable : false, align : 'center' },
								{ name : 'select', index : 'select', align : 'center', sortable : false, width : 350, title : false,
									formatter : function(cellvalue,
											options, rowObject) {
										return "<form id='loanFormId_"
												+ options.rowId
												+ "' action='' method='post' enctype ='multipart/form-data'>"
												+ "<input type='file' name='upload_file' id='loanUpload_"
												+ options.rowId
												+ "' accept='"
												+ loan.fileExtName
												+ "' />&nbsp&nbsp&nbsp&nbsp&nbsp"
												+ "<input type='button' class='uploadclass' onclick='loan.addadjustfee.upload("
												+ options.rowId
												+ ")' value='上传' />"
												+ "<label id='labelId'></label>"
												+ "</form>";
									}
								}, { name : 'uploadFileName', index : 'uploadFileName', sortable : false, align : 'center' } ],
						jsonReader : {
							root : "response.pager.items",// 数据项
							records : "response.pager.totalResult",// 总记录数
							repeatitems : false
						},
						rowNum : 9999,
						pager : jQuery('#attachPanelId'),
						pagerpos : 'center', // 指定分页栏的位置
						pgbuttons : false,// 是否显示翻页按钮
						pginput : false, // 是否显示跳转页面的输入框
						toolbarfilter : true,
						viewrecords : true,// 是否要显示总记录数
						autowidth : true, // 自动宽度
						rownumbers : true,
						multiselect : false,
						height : 'auto',
						autowidth : true,
						forceFit : true,// 调整列宽不会改变表格宽度
						loadComplete : function() {
						},
						gridComplete : function() {
						}
					});
				jQuery("#attachGridId").setGridWidth(950);
				// 设置附件条目
				loan.addadjustfee.queryAttachItem();
				loan.addadjustfee.initUpdateData();
			},
			/*******************************************************************
			 * 查询附件条目
			 */
			queryAttachItem : function() {// functionId后续需要修改
				loan.ajaxDo({
					url : loan.basePath + "/attach/queryAttach",
					params : {
						format : 'json',
						'menuId' : '110401',
						'status' : '0',
						'functionId' : '1104',
						'page' : '1',
						'rows' : '9999'
					},
					successCallback : loan.addadjustfee.attachItemCallBack,
					successTip : false, // 提示
					bizErrTip : false, // 提示
					chainPar : this
				});
			},

			/**
			 * 查询已上传文件的回调
			 */
			attachItemCallBack : function(result) {
				var list = result.pager.items;
				if (list && list.length > 0) {
					for ( var i = 0; i < list.length; i++) {
						var item = list[i];
						var rowid = i + 1;
						$("#attachGridId").jqGrid("addRowData", rowid, item);
					}
				}
			},

			/** 上传文件 */
			upload : function(rowid) {
				if ($("#loanUpload_" + rowid).val() == ''
						|| $("#loanUpload_" + rowid).val() == null) {
					loan.tooltip("请先选择你要上传的文件", "error");
					return;
				}
				var rowObj = $("#attachGridId").jqGrid('getRowData', rowid);
				var setId = rowObj.setId;
				var orgId = rowObj.orgId;
				var extenString = rowObj.extenString;
				var mustStatus = rowObj.mustStatus;
				var checkId = $('#applyId').val();
				var filelistId = rowObj.filelistId;

				$("#loanUpload_" + rowid)
						.upload(
								{
									url : loan.basePath
											+ '/org/upload?extenString='
											+ extenString + "&orgId=" + orgId
											+ "&checkId=" + checkId
											+ "&filelistId=" + filelistId
											+ "&setId=" + setId,
									// 其他表单数据
									params : {
										"menuId" : loan.addadjustfee.menuId
									},
									dataType : 'text',
									onSend : function(obj, str) {
										return true;
									},
									// 上传之后回调
									onComplate : function(data) {
										// 数据返回为空
										if (!data) {
											loan.tooltip("上传失败，请稍后再试", 'error');
											return;
										}
										var obj = eval("(" + data + ")");
										if (obj.success) {
											loan.tooltip("上传成功", "succeed");
											$("#loanUpload_" + rowid).val("");
											jQuery("#attachGridId")
													.jqGrid(
															'setRowData',
															rowid,
															{
																filelistId : obj.domain.filelistId,
																uploadFileName : "<a href='"
																		+ loan.basePath + "/loan/downFile?ossName=" + obj.domain.depositFilename + "&fileName=" + encodeURIComponent(obj.domain.originalFilename)
																		+ "' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"
																		+ obj.domain.originalFilename
																		+ "</a>",
																filebackinfo : JSON
																		.stringify(obj.domain)
															});
										} else {
											loan.tooltip(obj.errMsg, "error");
										}
										$("#loanUpload_" + rowid).removeAttr(
												"disabled");
										var file = $("#loanUpload_" + rowid);
										file.after(file.clone().val(""));
										file.remove();
									}
								});
				$("#loanUpload_" + rowid).upload("ajaxSubmit");
			}

		};
		/**
		 * 金额格式化
		 * @param nData
		 * @param decimalSeparator
		 * @param decimalPlaces
		 * @returns
		 */
		function formatMoney(nData,decimalSeparator,decimalPlaces) {
			var floatRegex = /^[0-9]+(\.[0-9]+)?$/ ;
			if(floatRegex.test(nData)) {
				var bNegative = (nData < 0);
				var sOutput = String(nData);
				var sDecimalSeparator = decimalSeparator || ".";
				var nDotIndex;
				var nDecimalPlaces = decimalPlaces || 2;
				var nDecimal = Math.pow(10, nDecimalPlaces);
				sOutput = String(Math.round(nData*nDecimal)/nDecimal);
				nDotIndex = sOutput.lastIndexOf(".");
				if(nDecimalPlaces > 0) {
					// Add the decimal separator
					if(nDotIndex < 0) {
						sOutput += sDecimalSeparator;
						nDotIndex = sOutput.length-1;
					}
					// Replace the "."
					else if(sDecimalSeparator !== "."){
						sOutput = sOutput.replace(".",sDecimalSeparator);
					}
					// Add missing zeros
					while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
						sOutput += "0";
					}
				}
				return sOutput;
			}
			return '';
		}
