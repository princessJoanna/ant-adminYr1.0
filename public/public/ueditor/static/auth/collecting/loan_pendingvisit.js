loan.pendingvisit=loan.pendingvisit||{		
	/**
	 * 清空条件
	 */
	clearCondition : function() {
		$("#provinceCode").val('-1');
		$("#cityCode").val('-1');
		$("#districtCode").val('-1');
		$("#caseNo").val('');
		$("#orderNo").val('');
	},
	/**
	 * 拒绝
	 */
	refuse : function() {
		var ids = $("#visitCase").jqGrid("getGridParam", "selrow");
		if (ids == null) {
			loan.tooltip("请选择需要处理的案件", "error");
			return;
		}
		var menuId = $("#menuId").val();
		var orderId = $("#visitCase").jqGrid('getCell', ids, 'orderId');
		loan.ajaxDo({
			url : loan.basePath + "/collecting/refuseVisit",
			params : {
				'format' : 'json',
				'menuId' : menuId,
				'menuLog' : '1',
				'orderId' : orderId
			},
			successCallback : function() {
				$("#visitCase").trigger('reloadGrid');
			},
			successTip : true, // 提示
			bizErrTip : true, // 提示
			chainPar : this
		});
	},

		/**
		 * 
		 * 审批受理
		 */
		approval : function() {
			var ids = $("#visitCase").jqGrid("getGridParam", "selrow");
			if (ids == null) {
				loan.tooltip("请选择需要处理的案件", "error");
				return;
			}
			var menuId = $("#menuId").val();
			var applyDateS = $("#visitCase").jqGrid('getCell', ids, 'applyDateS');
			var orderId = $("#visitCase").jqGrid('getCell', ids, 'orderId');
			var relationTypeCn = $("#visitCase").jqGrid('getCell', ids, 'relationTypeCn');
			var relationName = $("#visitCase").jqGrid('getCell', ids,
					'relationName');
			var relationPhone = $("#visitCase").jqGrid('getCell', ids,
					'relationPhone');
			var visitLevelCn = $("#visitCase").jqGrid('getCell', ids,
					'visitLevelCn');
			var areaCn = $("#visitCase").jqGrid('getCell', ids, 'areaCn');
			parent.loan.tabcut.childAddIframe("受理审批", loan.basePath
					+ "/collecting/toAgreeVisit?orderId=" + orderId
					+ "&applyDateS=" + applyDateS+ "&relationTypeCn=" + relationTypeCn
					+ "&relationName="+ relationName+ "&relationPhone=" + relationPhone
					+ "&visitLevelCn=" + visitLevelCn+ "&areaCn=" + areaCn+ "&menuId=" + menuId, "toAgreeVisit", true,true);
		},
		/**
		 * 查看案件详情
		 */
		detail : function(menuId,rowid) {
			var caseId = $("#visitCase").jqGrid('getCell', rowid, 'caseId');
			parent.loan.tabcut.childAddIframe("查看详情", loan.basePath
					+ "/case/toCaseInfo?caseId=" + caseId
					+ "&menuId=" + menuId, "toCaseInfo", true);
		},
		/**
		 * 普通搜索按钮
		 */
		searchFunc : function() {
			var menuId = $("#menuId").val();
			var caseNo = $("#caseNo").val();// 事件ID
			var orderNo = $("#orderNo").val();// 工单ID
			// 区域查询
			var provinceCode = $("#provinceCode").find("option:selected")
					.val();
			var cityCode = $("#cityCode").find("option:selected").val();
			var districtCode = $("#districtCode").find("option:selected")
					.val();
	
			if (provinceCode == -1) {
				provinceCode = null;
			}
			if (cityCode == -1) {
				cityCode = null;
			}
			if (districtCode == -1) {
				districtCode = null;
			}
			$("#visitCase").jqGrid("setGridParam", {
				postData : {
					'menuId' : menuId,
					'caseNo' : caseNo,
					'orderNo' : orderNo,
					'provinceCode' : provinceCode,
					'cityCode' : cityCode,
					'districtCode' : districtCode,
					'format' : 'json'
				},
				page : 1
			}).trigger('reloadGrid');
		},
		setAddress : function(rowId) {
			/** **行政区域特殊处理**** */
			var provinceCode = $("#visitCase").jqGrid("getCell", rowId,
					"provinceCode");
			var cityCode = $("#visitCase").jqGrid("getCell", rowId,
					"cityCode");
			var districtCode = $("#visitCase").jqGrid("getCell", rowId,
					"districtCode");
			var address = $("#visitCase").jqGrid("getCell", rowId,
					"address");
			$("#area").attr("provinceid", provinceCode);
			$("#area").attr("cityid", cityCode);
			$("#area").attr("areaid", districtCode);
			var address = loan.getArea(provinceCode)
					+ loan.getArea(cityCode) + loan.getArea(districtCode)
					+ address;
			$("#visitCase").jqGrid("setCell", rowId, "areaCn", address);
		},
		loadAddress : function() {
			var ids = $("#visitCase").getDataIDs();
			var len = ids.length;
			for (var i = 0; i < len; i++) {
				loan.pendingvisit.setAddress(ids[i]);
			}
		}
	}