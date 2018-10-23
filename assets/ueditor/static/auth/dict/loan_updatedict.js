/**
 * 
 */
loan.updatedict = loan.updatedict
		|| {
	/**
	 * 刷新 jqgrid
	 */ 
	freshGrid:function() {
		$("#dictListGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':$('#menuId').val()}
	    }).trigger('reloadGrid'); 
	},
			initAddDict : function() {
				jQuery("#loanDictId").jqGrid(
						{
							datatype : "local",
							height : 'auto',
							autowidth : false,
							forceFit : true,
							 cellEdit: true,
					         beforeEditCell: function (rowid, cellname, value, iRow, iCol) {
					             var rec = jQuery("#loanDictId").jqGrid('getRowData', rowid);
					             if (rec.accessLevel=='只读'&&rec.flag=='0') {
					                 setTimeout(function () {
					                     jQuery("#loanDictId").jqGrid('restoreCell', iRow, iCol);
					                     //===>或者设置为只读
					                     //$('#' + rowid + '_amount').attr('readonly', true);
					                 }, 1);
					             }
					         },
							colNames : [ '*平台ID',"*字典ID" ,'*配置值', '*配置名称', '*操作权限',
									'*排序', '标志','操作' ],
							colModel : [ {
								name : 'pfOrgId',
								index : 'pfOrgId',
								align : 'center',
								width : '25%',
								editable : false,
								sortable : false,
							}, {
								name : 'dictId',
								index : 'dictId',
								align : 'center',
								width : '25%',
								editable : false,
								sortable : false,
							}, {
								name : 'dictValue',
								index : 'dictValue',
								align : 'center',
								width : '25%',
								editable : true,
								sortable : false,
								formatter:'integer',
								editrules : {
									integer:true,
									required:true,
									custom : true,
									custom_func : checkInteger2,
									maxlength : 6
								}
							}, {
								name : 'dictPrompt',
								index : 'dictPrompt',
								align : 'center',
								width : '25%',
								editable : true,
								edittype:'text',
								editrules : {
									custom : true,
									custom_func : checkTerm,
									maxlength : 32,
									required:true
								}
							}, {
								name : 'accessLevel',
								index : 'accessLevel',
								align : 'center',
								width : '25%',
								editable : true,
								edittype : 'select',
								editoptions : {
									value : loan.updatedict.getDictItem("1","0"),
									required:true
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
							},{
								name : 'flag',
								index : 'flag',
								align : 'center',
								width : '25%',
								hidden : true,
								sortable : false,
								edittype:'text',
								formatter:'integer',
							}, {
								name : 'act',
								index : 'act',
								align : 'center',
								width : '25%',
								editable : false,
								formatter:'delFmt'
							} ],
							rowNum : 999999,
							toolbarfilter : true,
							viewrecords : true,
							autowidth : false,
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
				$("#loanDictId").setGridWidth(800);
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
							  }else {
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
				var dictId=$("#dictId").val();
				var len=id.length;
				jQuery("#loanDictId").addRowData(len+1, {
					"pfOrgId" : pfOrgId,
					"dictId":dictId,
					"dictValue" :'',
					"accessLevel" :"",
					"orderId" : "",
					"flag":'1',
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
				for(var j=1;j<objArr.length;j++){
					if(objArr[j].dictValue==value){
						loan.tooltip("配置值不能重复","error"); 
						return;
					}
				}
				for(var j=0;j<objArr.length;j++){
					 if(objArr[j].dictPrompt==''||objArr[j].accessLevel==''){
					 	loan.tooltip("请完整的输入相关信息","error"); 
						return;
					 }
				}
				var loanArray = new Array();
				for (var i = 0; i < objArr.length; i++) {
					var obj = new Object();
					obj.pfOrgId = objArr[i].pfOrgId;
					obj.dictId = objArr[i].dictId;
					obj.dictValue = objArr[i].dictValue;
					obj.dictPrompt =objArr[i].dictPrompt ;
					obj.accessLevel =loan.updatedict.getDictItem("2", objArr[i].accessLevel);
					obj.orderId = objArr[i].orderId;
					loanArray.push(obj);
				}
				var dictItermList = JSON.stringify(loanArray);
				var remark = $("#remark").val();
				var dictName=$("#dictName").val();
				var dictId=$("#dictId").val();
				var menuId=$("#menuId").val();
				loan.ajaxDo({
			        url:loan.basePath+"/dict/submitDict",
			        params:{'format':'json','menuId':menuId,'menuLog':'1','dictName':dictName,'dictItermList':dictItermList,'remark':remark,'dictId':dictId},
			        successCallback:function(){
			        	loan.tabcut.childClosedIframe(true);
			        },
			        successTip:true, //提示
			        bizErrTip:true,  //提示
			        chainPar:this
			    });
			},
			
			/**
			 * 
			 */
			initDictItem:function(result){
				var dictItemList=result.list;			
				var remark=$("#remark1").val();
				$("#remark").val(remark);
				var pfOrgId=$('#pfOrgId').val();
				for(var i=0;i<dictItemList.length;i++){
					var id=$("#loanDictId").jqGrid("getDataIDs");
					var dictItem=dictItemList[i];
				  if(dictItem.accessLevelCn!='隐藏'&&dictItem.accessLevelCn=='只读'){
					jQuery("#loanDictId").jqGrid("addRowData",id.length+1, {"pfOrgId":pfOrgId,"dictId":dictItem.dictId,"dictValue":dictItem.dictValue,
					"dictPrompt":dictItem.dictPrompt,"accessLevel":dictItem.accessLevelCn,"orderId":dictItem.orderId,'flag':'0','act':''});
				  }else if(dictItem.accessLevelCn!='隐藏'){
					  jQuery("#loanDictId").jqGrid("addRowData",id.length+1, {"pfOrgId":pfOrgId,"dictId":dictItem.dictId,"dictValue":dictItem.dictValue,
							"dictPrompt":dictItem.dictPrompt,"accessLevel":dictItem.accessLevelCn,"orderId":dictItem.orderId,'flag':'1','act':''});
				  }
				}
				
			},
			/**
			 * 查询数据字典项
			 * 
			 */
			queryDictItem:function (){
				var dictId=$("#dictId").val();
				loan.ajaxDo({
					url:loan.basePath+ "/dict/queryDictItem",
					params:{'format':'json','menuLog':'1','dictId':dictId},
					successCallback:loan.updatedict.initDictItem,
					successTip:false, //提示
					bizErrTip:false,  //提示
					chainPar:this
				});
			},
			/**
			 * 删除数据字典项
			 */
			deleteDictItem:function(menuId,rowId){
				//确认是否要删除
				$.artDialog({
					title:"提示",
					content:"确定要删除该数据字典吗？",
					ok:function(){
						var obj = $("#loanDictId").jqGrid("getRowData");
						if(obj.length == 1){
							loan.tooltip("不能全部删除，最少保留一条数据字典项！","error"); 
							return;
						}
						$("#loanDictId").jqGrid("delRowData", rowId);
					 },
					cancel:function(){
						return false;
					}
			    });
				
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
function checkInteger2(cellvalue, colname){
	if(cellvalue.length>6){
		return [ false, " [" + colname + "]不能超过6位！", '' ];
	}
	return [ true, '', '' ];
}
