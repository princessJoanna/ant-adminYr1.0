loan.riskScene = loan.riskScene || {
	riskModelNoMap : new Map(),
	modelMap: new Map(),
	attrValueMap: new Map(),
	changeDegree: function() {
		var degreeName = $("#degreeId").find("option:selected").text();
		$("#degreeName").val(degreeName);
	},
	changeRiskModelInfo: function() {
		var riskModelNo = $("#riskModelNo").val();
		var infoObj = loan.riskScene.riskModelNoMap.get(riskModelNo);
		$("#riskModelNo2").text(infoObj.modelNo);
		$("#type").val(infoObj.type);
		$("#typeCn").text(infoObj.typeCn);
		if(infoObj.type == "1") {
			$("#degree").css("display", "none");
		}else {
			$("#degree").css("display", "inline");
		}
	},
	replaceEdit2None: function (sId, tValue) {
		var obj = $("#" + sId);
		obj.after($("<label class='right' >" + tValue  + "</label>"));
		obj.css("display", "none");
	},
	
	showrule:function(menuId, rowid,obj){
		var sceneId = obj.sceneId;
		var modelId = $("#sceneGrid_" + sceneId).jqGrid('getRowData',rowid).modelId;
		//获取修改的id
		var modelcode =  $("#sceneGrid_" + sceneId).jqGrid('getCell',rowid,'riskModelNo');
		var type =   $("#sceneGrid_" + sceneId).jqGrid('getCell',rowid,'type');
		
		if(type == 0) {//0是评分模型
			parent.loan.tabcut.childAddIframe("查看评分模型",loan.basePath+"/ruleconfig/toShowGradeModel?menuId="+menuId+"&modelCode="+modelcode,"editGradeModel",true,true);
		}else if(type == 2){
			parent.loan.tabcut.childAddIframe("查看征信报告模型",loan.basePath+"/ruleconfig/toShowCreditReportModel?menuId="+menuId+"&modelCode="+modelcode,"editCreditReport",true,true);
		}else {
			parent.loan.tabcut.childAddIframe("查看规则模型",loan.basePath+"/ruleconfig/toShowAdmittanceModel?menuId="+menuId+"&modelCode="+modelcode,"editAdmitModel",true,true);
		}
	},
	/**
	 * 新增风控场景
	 */
	toAddScene2 : function(menuId, obj){
		//var obj = JSON.parse(jsonStr);
		var o = loan.riskScene.getSearchSceneObj(obj);
		var sceneId = o.sceneId;
		var sceneName = o.sceneName;
		var sceneNo = o.sceneNo;
		parent.loan.tabcut.childAddIframe(
				"新增场景",
				loan.basePath+"/risk/scene/toRiskSceneDetail?oper=add&&menuId="+menuId + "&sceneId=" + sceneId + 
				"&sceneName=" + sceneName + "&sceneNo=" + sceneNo,
				"AddScene" + sceneNo,true,true);
		
	},
	toEdit2:function (menuId, rowId, obj) {
		// debugger;
		//var obj = JSON.parse(jsonStr);
		var o = loan.riskScene.getSearchSceneObj(obj);
		var sceneId = o.sceneId;
		var sceneName = o.sceneName;
		var sceneNo = o.sceneNo;
		var modelId = $("#sceneGrid_" + obj.sceneId).jqGrid('getRowData',rowId).modelId;
		parent.loan.tabcut.childAddIframe(
				"编辑场景",
				loan.basePath+"/risk/scene/toRiskSceneDetail?oper=edit&menuId="+menuId + "&sceneId=" + sceneId + 
				"&sceneName=" + sceneName + "&sceneNo=" + sceneNo + "&modelId=" + modelId,
				"EditScene" + sceneNo,true,true);
	},
	toDel2: function (menuId, rowId, obj) {
		$.artDialog({
			title:"提示",
			isCloseBtn:true,  
			content:"确定要删除该风控场景模型吗？",
			isCloseBtn:true,
			cancel:true,
			ok:function(){
				loan.riskScene.doDel(menuId, rowId, obj);
			},
			isCloseicon:true
		});
	},
	doDel: function (menuId, rowId, obj) {
		//var obj = JSON.parse(jsonStr);
		var o = loan.riskScene.getSearchSceneObj(obj);
		var sceneId = o.sceneId;
		var sceneName = o.sceneName;
		var sceneNo = o.sceneNo;
		var modelId = $("#sceneGrid_" + obj.sceneId).jqGrid('getRowData',rowId).modelId;
		loan.ajaxDo({
			url: loan.basePath + "/risk/scene/delRiskScene",
			params: {
				"menuId": menuId, 
				"format":"json",
				"modelId": modelId,
				"sceneId": sceneId
			},
			successTip: false,
			successCallback: function(res) {
				if(res.success) {
					loan.tooltip("风控场景模型信息，删除成功","succeed");
					// debugger;
					$("#sceneGrid_" + obj.sceneId).trigger('reloadGrid');
				}else {
					loan.tooltip("风控场景模型信息，删除失败","error");
				}
			}
		});
	},
	toView2: function (menuId, rowId, obj) {
		//var obj = JSON.parse(jsonStr);
		var o = loan.riskScene.getSearchSceneObj(obj);
		var sceneId = o.sceneId;
		var sceneName = o.sceneName;
		var sceneNo = o.sceneNo;
		var modelId = $("#sceneGrid_" + obj.sceneId).jqGrid('getRowData',rowId).modelId;
		parent.loan.tabcut.childAddIframe(
				"查看场景",
				loan.basePath+"/risk/scene/toRiskSceneDetail?oper=view&menuId="+menuId + "&sceneId=" + sceneId + 
				"&sceneName=" + sceneName + "&sceneNo=" + sceneNo + "&modelId=" + modelId,
				"ViewScene" + sceneNo,true,true);
	},
	toModelInfo2: function (menuId, rowId, obj) {
		//var obj = JSON.parse(jsonStr);
		var o = loan.riskScene.getSearchSceneObj(obj);
		var sceneId = o.sceneId;
		var sceneName = o.sceneName;
		var sceneNo = o.sceneNo;
		var modelId = $("#sceneGrid_" + obj.sceneId).jqGrid('getRowData',rowId).modelId;
		var modelNo = $("#sceneGrid_" + obj.sceneId).jqGrid('getRowData',rowId).riskModelNo;
		parent.loan.tabcut.childAddIframe(
				"查看模型信息",
				loan.basePath+"/risk/scene/riskSceneModelAttri/queryRiskSceneModelAttriList?menuId="+menuId + "&sceneId=" + sceneId + 
				"&sceneNo=" + sceneNo + "&modelId=" + modelId + "&modelNo=" + modelNo,
				"ModelInfo" + sceneNo,true,true);
	},
	/**
	 * 提交风控场景
	 */
	submitScene : function(menuId, sceneId, sceneName, sceneNo){
		var riskModelNo = $("#riskModelNo").val();
		var typeCn = $("#typeCn").text();
		var type = $("#type").val();
		if(riskModelNo == "-1") {
			loan.tooltip("请选择风控模型","error");
			return;
		}
		var degreeId = -1;
		var degreeName = "";
		if(type != "1") {
			degreeId = $("#degreeId").val();
			if(degreeId == "-1") {
				loan.tooltip("请选择风控等级","error");
				return;
			}
			degreeName = $("#degreeName").val();
		}
		var dimension = $("#dimension").val();
		if(dimension == "-1") {
			loan.tooltip("请选择模型维度","error");
			return;
		}
		
		var riskModelName = $("#riskModelNo").find("option:selected").text();
		var visible = $("#visible").val();
		var modelId = $("#modelId").val();
		
		var obj = new Object();
		obj.sceneId = $("#sceneId").val();
		obj.sceneName = $("#sceneName").val();
		obj.sceneNo = $("#sceneNo").val();
		obj.modelList = new Array();
		var o = new Object();
		o.riskModel = new Object(); //risk model info
		o.riskModel.riskModelNo = riskModelNo;
		o.riskModel.riskModelName = riskModelName;
		o.riskModel.degreeId = degreeId;
		o.riskModel.degreeName = degreeName;
		o.riskModel.type = type;
		o.riskModel.typeCn = typeCn;
		o.riskModel.dimension = dimension;
		o.riskModel.visible = visible;
		o.riskModel.modelId = modelId;
		//....
		o.sceneId = $("#sceneId").val();
		o.attriList = new Array();
		var items = $("li[id^='attr']");
		for(var i = 0; i < items.length; i ++) {
			var cked = $(items[i]).find("input[type='checkbox']:checked");
			if(cked.length == 0) {
				loan.tooltip($(items[i]).attr("attriNameCn") + " 未勾选任何属性值","error");
				return;
			}
			for(var j = 0; j < cked.length; j ++) {
				var temp = new Object();
				temp.attriName = $(cked[j]).attr("name");
				temp.attriValue = $(cked[j]).val();
				o.attriList.push(temp);
			}
		}
//		debugger;
//		if(o.attriList.length == 0 && items.length > 0)  {
//			loan.tooltip("未勾选任何属性值","error");
//			return;
//		}
		obj.modelList.push(o);

		loan.ajaxDo({
			url: loan.basePath + "/risk/scene/saveRiskScene",
			params: {
				"menuId": $("#menuId").val(),
				"format": "json",
				"jsonstr": JSON.stringify(obj),
				"oper": $("#oper").val()
			},
			successTip: false,
			successCallback: function(res) {
				// debugger;
				if(res.success) {
					var conflictList = res.respDto.list;
					if(conflictList.length == 0) {
						loan.tooltip("风控场景信息，保存成功","succeed");
						// debugger;
						loan.riskScene.closeTab();
					}else {
						var items = $("li[id^='attr']");
						var attrMap = new Map();
						for(var i = 0; i < items.length; i++) {
							attrMap.set($(items[i]).attr("attriName"), $(items[i]).attr("attriNameCn"));
						}
						parent.loan.riskSceneObj = new Object();
						parent.loan.riskSceneObj.conflictList = conflictList;
						parent.loan.riskSceneObj.attrMap = attrMap;
						parent.loan.riskSceneObj.attrValueMap = loan.riskScene.attrValueMap;
						//当前页面下方展示
						//loan.riskScene.initConflict();
						//$("#conflict_con").show();
						//弹窗展示
						parent.loan.tabcut.childAddIframe(
								"冲突信息",
								loan.basePath+"/risk/scene/toRiskSceneModelConflict?menuId="+$("#menuId").val() + 
								"&sceneName=" + $("#sceneName").val(),
								"sceneConflict",true,true);
					}
				}else {
					loan.tooltip("风控场景信息，保存失败","error");
				}
			}
		});
		
	},
	closeTab: function () {
		parent.loan.riskSceneGridMap.get($("#sceneId").val()).trigger("reloadGrid");
		loan.tabcut.childClosedIframe(false);
	},
 	initDetail: function() {

		var sceneId = $("#sceneId").val();
		var sceneName = $("#sceneName").val();
		var sceneNo = $("#sceneNo").val();
		var menuId = $("#menuId").val();
		var modelId = $("#modelId").val();
		var oper = $("#oper").val();
		if(oper == "view") {
			$("#submit_button").css("display", "none");
		}

		/**
		 * int dict value
		 */
		var items = $("li[id^='attr']");
		for(var i = 0; i < items.length; i ++) {
				var dictId = parseInt($(items[i]).attr("dictId"));
				var attriName = $(items[i]).attr("attriName");
				var sources = $(items[i]).attr("sources");
				loan.ajaxDo({
					url: loan.basePath + "/risk/scene/queryRiskAttriList",
					params: {
						"format":"json",
						"menuId": menuId,
						"dictId": dictId,
						"sources": sources
					},
					successTip: false,
					successCallback: function(res) {
						// debugger;
						if(res.success) {
							var arr = res.riskAttriEntryList;
							for(var j = 0; j < arr.length; j ++) {
								var op = $("<input type='checkbox' style='vertical-align: middle;'  />");
								op.val(arr[j].value);
								op.attr("name", attriName);
								if(oper == "view") {
									op.attr("disabled", true);
								}
								var la =  $("<span></span>");
								la.text(arr[j].name);
								var sp =  $("<span style='display:block;float:left'></span>");
								sp.append(op);
								sp.append("&nbsp;&nbsp;");
								sp.append(la);
								sp.append("&nbsp;&nbsp;");
								var obj = $("#attr_td_"  + dictId);
								obj.append(sp);
								loan.riskScene.attrValueMap.set(attriName + "_" + arr[j].value, arr[j].name);
							}
						}
					}
				});
		}
		/**
		 * init detail
		 */
		// debugger;
		if(modelId != "" && modelId != null) {
			
			/**
			 * init risk model
			 */
			loan.ajaxDo({
				url: loan.basePath + "/risk/scene/querRiskModel",
				params: {
					"menuId": menuId, 
					"format":"json",
					"oper": oper,
					"modelId": modelId
				},
				successTip: false,
				successCallback: function(res) {
					// debugger;
					if(res.success) {
						var obj = res.riskModelDto;
						$("#riskModelNo").val(obj.riskModelNo);
						$("#riskModelNo2").text(obj.riskModelNo);
						$("#typeCn").text(obj.typeCn);
						$("#type").val(obj.type);
						$("#degreeName").val(obj.degreeName);
						$("#degreeId").val(obj.degreeId);
						$("#dimension").val(obj.dimension);
						$("#modelId").val(obj.modelId);
						if(oper == "view") {
							loan.riskScene.replaceEdit2None("riskModelNo", obj.riskModelName);
							loan.riskScene.replaceEdit2None("degreeId", obj.degreeName);
							var dimensionName = $("#dimension").find("option:selected").text();
							loan.riskScene.replaceEdit2None("dimension", dimensionName);
						}
						if(obj.type == "1") {
							$("#degree").css("display", "none");
						}
					}
				}
			});
			
			loan.ajaxDo({
				url: loan.basePath + "/risk/scene/querySceneModelDetail",
				params: {
					"format":"json",
					"menuId": menuId,
					"sceneNo": sceneNo,
					"modelId": modelId
				},
				successTip: false,
				successCallback: function(res) {
					// debugger;
					if(res.success) {
						var obj = res.riskSceneModelDto;
						$("#riskModel").val(obj.modelId);
						var arr = obj.attriList;
						for(var i = 0; i < arr.length; i ++) {
							$("input[type='checkbox'][name='" + arr[i].attriName +"'][value='" + arr[i].attriValue +"']").attr("checked", true);
						}
					}
				}
			});
		}
	},
	
	querySceneModelList:function(menuId, sceneId, sceneNo, sceneName){
		/**
		jQuery("#sceneGrid_" + sceneId).jqGrid({
			url: loan.basePath+ "/risk/scene/querySceneModelList",
			mtype:'POST',
			datatype: "json",
			postData:{'format':'json','menuId':menuId,"sceneId":sceneId, "sceneNo":sceneNo},
			colNames: ['模型名称','模型编号','风控等级','操作', 'ID', ], 
			colModel: [
			   {name:'riskModelName',index:'riskModelName',sortable: false, align:'center'},
			   {name:'riskModelNo',index:'riskModelNo',sortable: false, align:'center'},
			   {name:'degreeName',index:'degreeName',sortable: false, align:'center'},
			   {name:'act',index:'act', sortable: false,align:'center'},
			   
			   {name:'modelId',index:'modelId', sortable: false,align:'center',hidden:true}
	        ],
	        jsonReader:{ 
				root: "response.riskModelList",//数据项
				repeatitems : false
			},
			pager:jQuery('#panel_' + sceneId),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			toolbarfilter : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#sceneGrid_" + sceneId).jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
	            	var addBtn = "<div class='operating'>";onclick="loan.riskModel.toEdit(520202,1);"
	            	addBtn += "<a class='operating-pencil icon-radius' title='修改' onclick=\"loan.riskScene.toEdit('"+menuId+"','" + rowIds[i] + "','" + sceneId +  "','" + sceneNo +  "','" + sceneName + "')\"><i class='icon-pencil'></i></a>";	
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"loan.riskScene.toDel('"+menuId+"','" + rowIds[i] + "','" + sceneId +  "','" + sceneNo + "','" + sceneName + "')\"><i class='icon-trash'></i></a>";
					addBtn += "<a class='operating-preview icon-radius' title='查看模型详情' onclick=\"loan.riskScene.toModelInfo('"+menuId+"','" + rowIds[i] + "','" + sceneId +  "','" + sceneNo + "','" + sceneName + "')\"><i class='icon-comment'></i></a>";
					addBtn += "<a class='operating-comment icon-radius' title='查看风控场景详情' onclick=\"loan.riskScene.toView('"+menuId+"','" + rowIds[i] + "','" + sceneId +  "','" + sceneNo + "','" + sceneName + "')\"><i class='icon-comment'></i></div></a>";
					jQuery("#sceneGrid_" + sceneId).jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
		**/
		jQuery("#sceneGrid_" + sceneId).setGridWidth($(window).width()-80);
		//将sceneId-jqGrid对象放入map以便后期获取刷新
		parent.loan.riskSceneGridMap.set(sceneId, jQuery("#sceneGrid_" + sceneId));
	},
	initConflict: function() {
		var content = $("#conflictContent");
		content.empty();
		var list = parent.loan.riskSceneObj.conflictList;
		var attrMap = parent.loan.riskSceneObj.attrMap;
		var attrValueMap = parent.loan.riskSceneObj.attrValueMap;
		var laTag2 = $("<label class='right'></label>");
		for(var i = 0; i < list.length; i ++) {
			var arr = list[i];
			var temp = "";
			for(var j = 0; j < arr.length; j ++) {
				var key = arr[j].key;
				var value = arr[j].value;
				var keyCn = attrMap.get(key);
				var valueCn = attrValueMap.get(key + "_" + value);
				if(j != 0) {
					temp += "，";
				}
				temp += ("<b>" + keyCn + "</b>：" + valueCn)
			}
			var laTag1 = $("<label></label>").html((i+1) + "、");
			var laTag2 = $("<label class='right'></label>").html(temp);
			var liTag = $("<li class='f-w100pre f-mt10'></li>");
			liTag.append(laTag1);
			liTag.append(laTag2);
			liTag.append($("<br />"));
			content.append(liTag);
		}
	},
	getSearchSceneObj: function(mainSceneObj) {
		var selectTag = $("#subRiskScene_" + mainSceneObj.sceneId);
		if(selectTag.length == 0) {
			return mainSceneObj;
		}
		var obj = new Object();
		var opTag = selectTag.find("option:selected");
		obj.sceneId = opTag.attr("sceneId");
		obj.sceneNo = opTag.val();
		obj.sceneName = opTag.text();
		return obj;
		
	},
	changeSubRiskScene: function(parentSceneId) {
		var opTag = $("#subRiskScene_" + parentSceneId).find("option:selected");
		var sceneNo = opTag.val();
		var sceneId = opTag.attr("sceneId");
		var menuId = $("#menuId").val();
		// debugger;
		$("#sceneGrid_" + parentSceneId).jqGrid("setGridParam", {   
			postData:{'menuId':menuId, 'sceneNo':sceneNo, 'sceneId': sceneId, 'format':'json'},
			page:1
	    }).trigger('reloadGrid');
	},
	initRiskPlatModelList: function() {
		var menuId = $("#menuId").val();
		var sceneNo = $("#sceneNo").val();
		loan.ajaxDo({
			url: loan.basePath + "/risk/scene/initRiskPlatModelList",
			params: {"menuId": menuId, "sceneNo": sceneNo, "format":"json"},
			successTip: false,
			successCallback: function(res) {
				var item = res.models;
				for(var i=0; i<item.length; i++) {
					var op = $("<option></option>");
					op.val(item[i].modelNo);
					op.text(item[i].name);
					$("#riskModelNo").append(op);
					loan.riskScene.riskModelNoMap.set(item[i].modelNo, item[i]);
				}
				loan.riskScene.riskModelNoMap.set("-1", {type: -1, typeCn: -1, name: "", modelNo: ""});
			}
		});
	},
	initRiskDegreeList: function() {
		var menuId = $("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath + "/risk/scene/initRiskDegreeList",
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
	}
	
}