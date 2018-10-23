/**
 * 
 */
loan.adddict = loan.adddict
		|| {
			initAddTerm : function() {
				jQuery("#loanDictId").jqGrid(
						{
							datatype : "local",
							height : 'auto',
							autowidth : true,
							forceFit : true,
							colNames : [ '*平台ID', '*配置值', '*配置名称', '*操作权限',
									'*排序', '操作' ],
							colModel : [ {
								name : 'pfOrgId',
								index : 'pfOrgId',
								align : 'center',
								width : '25%',
								editable : false,
								sortable : false,
								editrules : {
									value : "${pfOrgId}"
								}
							}, {
								name : 'dictValue',
								index : 'dictValue',
								align : 'center',
								width : '25%',
								editable : false,
								sortable : false,
								editrules : {
									value : "0"
								}
							}, {
								name : 'dictPrompt',
								index : 'dictPrompt',
								align : 'center',
								width : '25%',
								editable : true,
								editrules : {
									custom : true,
									custom_func : checkTerm,
									maxlength : 32
								}
							}, {
								name : 'accessLevel',
								index : 'accessLevel',
								align : 'center',
								width : '25%',
								editable : true,
								edittype : 'select',
								editoptions : {
									value : loan.adddict.getDictItem("1","0")
								}
							}, {
								name : 'orderId',
								index : 'orderId',
								align : 'center',
								width : '25%',
								editable : true,
								sortable : false,
								formatter:'integer',
								editrules : {
									integer:true,
									required:true,
									custom : true,
									custom_func : checkInteger,
									maxlength : 2
								}
							}, {
								name : 'act',
								index : 'act',
								align : 'center',
								width : '25%',
								editable : false,
								formatter : 'delFmt'
							} ],
							rowNum : 999999,
							toolbarfilter : true,
							viewrecords : true,
							autowidth : true,
							rownumbers : true,
							'cellsubmit' : 'clientArray', // 不进行ajax提交
							cellEdit : true, // 设置可编辑单元格
							sortname : '',
							sortorder : '',
							loadComplete : function() {

							},
							afterEditCell : null,
							gridComplete : function() {
							}
						})
				$("#loanDictId").setGridWidth(900);
			},
			getDictItem : function(flag,value) {
				var str = "";
				loan.ajaxDo({
							url : loan.basePath + "/dict/dictItems",
							params : {
								dictId : 1002
							},
							successCallback : function(result) {
							  var dictItems = result.dictItems;
							  if(flag=='1'){
								for (var i = 0; i < dictItems.length; i++) {
									if(dictItems[i].dictPrompt=='隐藏'){
										continue;
									}
									str+= dictItems[i].dictValue+':'+ dictItems[i].dictPrompt+';'
								}
								str=str.substring(0,str.length-1);
							  }else{
								  for (var i = 0; i < dictItems.length; i++) {
									  if(value==dictItems[i].dictPrompt){
										  str=dictItems[i].dictValue
										  return;
									  }
									}
							  }
							  
							}
						});
				return str;
			},
			/**
			 * 增加
			 */
			addDictItem : function() {
				var pfOrgId = $("#pfOrgId").val();
				var id = $("#loanDictId").jqGrid("getDataIDs");
				var len=id.length;
				jQuery("#loanDictId").addRowData(len+1, {
					"pfOrgId" : pfOrgId,
					"dictValue" :len,
					"accessLevel" :"",
					"orderId" : "",
					"act" : ""
				});
			},
			/**
			 * 初始化数据字典项列表
			 */
			initDictItem:function(){
				var pfOrgId = $("#pfOrgId").val();
				jQuery("#loanDictId").addRowData(1, {
					"pfOrgId" : pfOrgId,
					"dictValue" :0,
					"accessLevel" : "",
					"orderId" : "",
					"act" : ""
				});
			},
			/**
			 * 
			 * 提交
			 */
			submit : function() {
				var objArr = jQuery("#loanDictId").jqGrid("getRowData");
				var value=objArr[0].dictValue;
				for(var j=0;j<objArr.length;j++){
					 if(objArr[j].dictPrompt==''||objArr[j].accessLevel==''){
					 	loan.tooltip("请完整的输入相关信息","error"); 
						return;
					 }
				}
				var dictName = $("#dictName").val();
				var menuId=$("#menuId").val();
				var objArr = jQuery("#loanDictId").jqGrid("getRowData");
				var loanArray = new Array();
				for (var i = 0; i < objArr.length; i++) {
					var obj = new Object();
					obj.pfOrgId = objArr[i].pfOrgId;
					obj.dictValue = objArr[i].dictValue;
					obj.dictPrompt =objArr[i].dictPrompt ;
					obj.accessLevel =loan.adddict.getDictItem("0", objArr[i].accessLevel);
					obj.orderId = objArr[i].orderId;
					loanArray.push(obj);
				}
				var dictItermList = JSON.stringify(loanArray);
				var remark = $("#remark").val();
				loan.ajaxDo({
			        url:loan.basePath+"/dict/addDict",
			        params:{'format':'json','menuId':menuId,'menuLog':'1','dictName':dictName,'dictItermList':dictItermList,'remark':remark},
			        successCallback:function(){
			        	loan.tabcut.childClosedIframe(true);
			        },
			        successTip:true, //提示
			        bizErrTip:true,  //提示
			        chainPar:this
			    });
			},
			/**
			 * 删除数据字典项
			 * 
			 * @param menuId
			 * @param rowid
			 */
			deleteDictItem : function(menuId, rowId) {
				var obj = $("#loanDictId").jqGrid("getRowData");
				if(rowId!=obj.length){
					loan.tooltip("只能删除最后一条数据字典项！","error"); 
					return;
				}
				if(obj.length == 1){
					loan.tooltip("不能全部删除，最少保留一条数据字典项！","error"); 
					return;
				}
				$("#loanDictId").jqGrid("delRowData", rowId);
			},

		}
function checkTerm(cellvalue, colname) {
	if ($.trim(cellvalue) == '') {
		return [ false, " [" + colname + "]不能为空！", '' ];
	}
	if(cellvalue.length>32){
		return [ false, " [" + colname + "]不能超过32位！", '' ];
	}
	return [ true, '', '' ];
}
function checkInteger(cellvalue, colname){
	if(cellvalue.length>2){
		return [ false, " [" + colname + "]不能超过两位！", '' ];
	}
	return [ true, '', '' ];
}