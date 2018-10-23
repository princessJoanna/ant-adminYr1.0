loan.riskModel = loan.riskModel || {
	riskModelNoMap : new Map(),
	detailOper: "",
	/**
	 * 新增模型页面
	 */
	toAddRiskModel : function(menuId){
		parent.loan.tabcut.childAddIframe("新增风控模型",loan.basePath+"/risk/model/toRiskModelDetail?oper=add&menuId="+menuId,"addRiskModel",true,true);
	},
	/**
	 * 编辑风控模型
	 */
	toEdit: function(menuId, rowId) {
		var modelNo = $("#modelGridId").jqGrid('getRowData',rowId).riskModelNo;
		parent.loan.tabcut.childAddIframe("编辑风控模型",loan.basePath+"/risk/model/toRiskModelDetail?oper=edit&menuId="+menuId+"&modelNo="+modelNo,"editRiskModel",true,true);
	},
	toViewDetail: function(menuId, rowId) {
		var modelNo = $("#modelGridId").jqGrid('getRowData',rowId).riskModelNo;
		parent.loan.tabcut.childAddIframe("查看风控模型",loan.basePath+"/risk/model/toRiskModelDetail?oper=view&menuId="+menuId+"&modelNo="+modelNo,"viewRiskModel",true,true);
	},
	/**
	 * 删除风控等级
	 * @param menuId
	 * @param rowId
	 */
	toDelete: function(menuId, rowId) {
		var modelId = $("#modelGridId").jqGrid('getRowData',rowId).modelId;
		loan.ajaxDo({
			url: loan.basePath + "/risk/model/operRiskModelDetail",
			params: {
				"menuId": menuId, 
				"format":"json",
				"modelId": modelId,
				"detailOper": "del"
			},
			successTip: false,
			successCallback: function(res) {
				if(res.success) {
					loan.tooltip("风控模型信息，删除成功","succeed");
					$("#modelGridId").trigger('reloadGrid');
				}else {
					loan.tooltip("风控模型信息，删除失败","error");
				}
			}
		});
	},
	/**
	 * 新增提交模型功能
	 */
	submitModel : function(){
		var riskModelNo = $("#riskModelNo").val();
		if(riskModelNo == "-1") {
			loan.tooltip("请选择风控模型","error");
			return;
		}
		var degreeId = $("#degreeId").val();
		if(degreeId == "-1") {
			loan.tooltip("请选择风控等级","error");
			return;
		}
		var dimension = $("#dimension").val();
		if(dimension == "-1") {
			loan.tooltip("请选择模型维度","error");
			return;
		}
		
		var degreeName = $("#degreeName").val();
		var riskModelName = $("#riskModelNo").find("option:selected").text();
		var typeCn = $("#typeCn").text();
		var type = $("#type").val();
		var menuId = $("#menuId").val();
		var visible = $("#visible").val();
		var modelId = $("#modelId").val();
		loan.ajaxDo({
			url: loan.basePath + "/risk/model/operRiskModelDetail",
			params: {
				"menuId": menuId, 
				"format":"json",
				"riskModelNo": riskModelNo,
				"riskModelName": riskModelName,
				"degreeId": degreeId,
				"degreeName": degreeName,
				"type": type,
				"typeCn": typeCn,
				"dimension": dimension,
				"visible": visible,
				"modelId": modelId,
				"detailOper": loan.riskModel.detailOper
			},
			successTip: false,
			successCallback: function(res) {
				if(res.success) {
					loan.tooltip("风控模型信息，保存成功","succeed");
					loan.tabcut.childClosedIframe(true);
				}else {
					loan.tooltip("风控模型信息，保存失败","error");
				}
			}
		});
		
		
	},
	queryriskmodel : function(){
		var riskModelName = $("#riskModelName").val();
		var menuId = $("#menuId").val();
		$("#modelGridId").jqGrid("setGridParam", {   
			postData:{'menuId':menuId, 'riskModelName':riskModelName, 'format':'json'},
			page:1
	    }).trigger('reloadGrid');
	},
	initRiskPlatModelList: function() {
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath + "/risk/model/initRiskPlatModelList",
			params: {"menuId": menuId, "format":"json"},
			successTip: false,
			successCallback: function(res) {
				var item = res.models;
				for(var i=0; i<item.length; i++) {
					var op = $("<option></option>");
					op.val(item[i].modelNo);
					op.text(item[i].name);
					$("#riskModelNo").append(op);
					loan.riskModel.riskModelNoMap.set(item[i].modelNo, item[i]);
				}
				loan.riskModel.riskModelNoMap.set("-1", {type: -1, typeCn: -1, name: "", modelNo: ""});
			}
		});
	},
	initRiskDegreeList: function() {
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath + "/risk/model/initRiskDegreeList",
			params: {"menuId": menuId, "format":"json"},
			successTip: false,
			successCallback: function(res) {
				var item = res.riskDegreeList;
				for(var i=0; i<item.length; i++) {
					var op = $("<option></option>");
					op.val(item[i].degreeId);
					op.text(item[i].degreeName);
					$("#degreeId").append(op);
				}
			}
		});
	},
	changeRiskModelInfo: function() {
		var riskModelNo = $("#riskModelNo").val();
		var infoObj = loan.riskModel.riskModelNoMap.get(riskModelNo);
		$("#riskModelNo2").text(infoObj.modelNo);
		$("#type").val(infoObj.type);
		$("#typeCn").text(infoObj.typeCn);
	},
	changeDegree: function() {
		var degreeName = $("#degreeId").find("option:selected").text();
		$("#degreeName").val(degreeName);
	},
	initData: function(obj) {
		$("#riskModelNo").val(obj.riskModelNo);
		$("#riskModelNo2").text(obj.riskModelNo);
		$("#typeCn").text(obj.typeCn);
		$("#type").val(obj.type);
		$("#degreeName").val(obj.degreeName);
		$("#degreeId").val(obj.degreeId);
		$("#dimension").val(obj.dimension);
		$("#modelId").val(obj.modelId);
		loan.riskModel.detailOper = obj.detailOper;
		if(obj.detailOper == "view") {
			$("#submit_button").css("display", "none");
			$("#back").removeClass("f-ml20");
			loan.riskModel.replaceEdit2None("riskModelNo", obj.riskModelName);
			loan.riskModel.replaceEdit2None("degreeId", obj.degreeName);
			var dimensionName = $("#dimension").find("option:selected").text();
			loan.riskModel.replaceEdit2None("dimension", dimensionName);
		}
		$("#content").css("display", "inline");
	},
	replaceEdit2None: function (sId, tValue) {
		var obj = $("#" + sId);
		obj.after($("<label class='right' >" + tValue  + "</label>"));
		obj.css("display", "none");
	}
	
} 