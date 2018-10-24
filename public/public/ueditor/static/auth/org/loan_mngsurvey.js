loan.mngsurvey = loan.mngsurvey || {
	/**提交*/
	submitData : function() {
		$("#mngsurveyGridId").jqGrid("saveCell", $("#iRow").val(), $("#iCol").val());
		var rowObj = $("#mngsurveyGridId").jqGrid('getRowData');
		var nodesArray = new Array();
		for(var i=0;i<rowObj.length;i++){
			var obj = new Object();
			obj.preloanConfigId = rowObj[i].preloanConfigId;
			obj.alterConfigId = rowObj[i].alterConfigId;
			obj.alterConfigName = rowObj[i].alterConfigName;
			obj.configScore = rowObj[i].configScore;
			obj.orderId = rowObj[i].orderId;
			var alterConfigName = rowObj[i].alterConfigName;
			for(var j = i+1; j < rowObj.length; j++) {
				var _alterConfigName = rowObj[j].alterConfigName;
				if(alterConfigName == _alterConfigName) {
					loan.tooltip((i+1)+"和"+(j+1)+"行备选项名称相同","error"); 
					return;
				}
			}
			if(rowObj[i].cancleType == '是') {
				obj.cancleType = 1;
			}else{
				obj.cancleType = 0;
			}
			obj.remark = rowObj[i].remark;
			if(rowObj[i].remark.length > 255) {
				loan.tooltip((i+1)+"行中说明字符太长,长度225","error"); 
				return;
			}
			if(rowObj[i].alterConfigName.length > 64) {
				loan.tooltip((i+1)+"行备选项字符太长,长度64","error"); 
				return;
			}
			if(rowObj[i].alterConfigName == null || rowObj[i].alterConfigName == '') {
				loan.tooltip("请在"+(i+1)+"行填写备选项名称","error"); 
				return;
			}
			if(rowObj[i].configScore == null || rowObj[i].configScore == '') {
				loan.tooltip("请在"+(i+1)+"行填写备分数","error"); 
				return;
			}
			if(rowObj[i].orderId == null || rowObj[i].orderId == '') {
				loan.tooltip("请在"+(i+1)+"行填写排序号","error"); 
				return;
			}
			nodesArray.push(obj);
		}
		mngSurveyList = JSON.stringify(nodesArray);
		loan.ajaxDo({
	  		url:loan.basePath+"/org/addBatchMngSurvey",
	  		params : {"mngSurveyList":mngSurveyList,'menuLog':'1','menuId':'400506'},
	  		chainPar:this,
	  		successTip:true,
	  		successCallback:loan.mngsurvey.commSuccFun
	  	})
	},
	/**
	 * 删除
	 */
	del : function(rowid) {
		var title = "提示";
		var alterConfigName = $("#mngsurveyGridId").jqGrid('getCell',rowid,'alterConfigName');
		var alterConfigId = $("#mngsurveyGridId").jqGrid('getCell',rowid,'alterConfigId');
		var content = "确定要删除【"+alterConfigName+"】这一备选项吗？";
		$.artDialog({
			title:title,
			content:content,
			ok:function() {
				loan.ajaxDo({
					url:loan.basePath+"/org/delAlterLoan",
					params:{"alterConfigId":alterConfigId,'menuLog':'1','menuId':'400506'},
					successCallback:loan.mngsurvey.freshGrid,
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
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		loan.s_Pop_closedParent(true,false);
	},
	
	/**刷新当前页面*/
	commSuccFun : function(){
		loan.s_Pop_closedChild();
	}
	
};

$(function(){
	var rowid = parent.$("#rowid").val();
	var rowObj = parent.$("#surveyItemGridId").jqGrid('getRowData',rowid);
	jQuery("#mngsurveyGridId").jqGrid({
		url: "qryMngSurveyItem",
		mtype:'POST',
		datatype: "json",
		postData:{format:'json',menuId:'400506','preloanConfigId':rowObj.preloanConfigId},
//		onSelectRow:loan.mngsurvey.selectFn,
		colNames: ['调查项id','备选项id','备选项','分值','排序','一票否决','说明','操作'], 
		colModel: [
		   {name:'preloanConfigId',index:'preloanConfigId',sortable: false, align:'center',hidden:true},
		   {name:'alterConfigId',index:'alterConfigId',sortable: false, align:'center',hidden:true},
           {name:'alterConfigName',index:'alterConfigName',sortable: false, align:'center',width: 200 ,editable:true,editrules: {edithidden:true,required:true,custom:true,custom_func:validateAlterConfigName}},
           {name:'configScore',index:'configScore', sortable: false,align:'center',editable:true,formatter:'integer',formatoptions:{defaultValue:'0'},
        	   editrules: {edithidden:true,required:true,number:true,integer:true,minValue:0,maxValue:9999999999}},
           {name:'orderId',index:'orderId', sortable: false,align:'center',editable:true,formatter:'integer',formatoptions:{defaultValue:''},
        		   editrules: {edithidden:true,required:true,number:true,integer:true,minValue:0,maxValue:9999999999}},
		   {name:'cancleType',index:'cancleType',sortable: false, align:'center',width: 200,editable:true,edittype : "select",editoptions : {value:{0:'否',1:'是'}},
        	   formatter:function(cellvalue, options, rowObject){
        		   if(cellvalue == 0) {
        			   return '否';
        		   }else{
        			   return '是';
        		   }
        	   	}},
		   {name:'remark',index:'remark',sortable: false, align:'center',width: 250,editable:true,editrules: {edithidden:true,required:true,custom:true,custom_func:validateVal}},
           {name:'act',index:'explain',sortable: false,align:'center'}
        ],
        jsonReader:{ 
			root: "response.alterConfigDomainList",//数据项
			repeatitems : false
		},
		rowNum : 9999,
		rowList : [9999, 9999, 9999],
		toolbarfilter : false,
		viewrecords : true,
		autowidth : true,
		rownumbers: true,
		multiselect : false,
		pagerpos:'center',
	    sortorder: 'desc',
		pgbuttons:true,
		pginput: true,	
		height: 'auto',	
		'cellsubmit': 'clientArray',  //不进行ajax提交
		forceFit:true,//调整列宽不会改变表格宽度
		cellEdit : true,  //设置可编辑单元格
		loadComplete:function(){},
		afterEditCell:function(rowid,name,val,iRow,iCol){
			$("#iRow").attr("value",iRow);
			$("#iCol").attr("value",iCol);
			$("#rowid").attr("value",rowid);
			$("#cellName").attr("value",name);
		},
		gridComplete : function() {
			var rowIds = jQuery("#mngsurveyGridId").jqGrid('getDataIDs');
			if(rowIds.length == 0) {
				var mydata = [
				  			{preloanConfigId:rowObj.preloanConfigId,configScore:"",orderId:""}
				  		];
			  	for(var i=0;i<=mydata.length;i++){
			  		jQuery("#mngsurveyGridId").jqGrid('addRowData',i+1,mydata[i]);
			  	}
			}else{
				for (var i = 0; i < rowIds.length; i++) {
	            	var addBtn = "<div class='operating'>";
					addBtn += "<a class='operating-plus icon-radius' title='新增' onclick=\"add('"+rowIds[i]+"','"+rowObj.preloanConfigId+"')\"><i class='icon-add'></i></a>";
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"loan.mngsurvey.del('"+rowIds[i]+"')\"><i class='icon-trash'></i></a></div>";
					jQuery("#mngsurveyGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					});
				}
			}
		}
	})
	
	if(rowObj.status == '0' || rowObj.publishStatus == '1') {
		$("#submit_button").hide();
		jQuery("#mngsurveyGridId").setGridParam().hideCol("act").trigger("reloadGrid");
	}
	
});

function add(id,preloanConfigId){
	var defaultData = [{preloanConfigId:preloanConfigId,configScore:"",orderId:""}];
	jQuery("#mngsurveyGridId").jqGrid('addRowData','',defaultData);	
}

//删除事件
function del(rowId) {	
	var ids = jQuery("#mngsurveyGridId").jqGrid('getDataIDs');
	var size = ids.length;
	if(size>1) {
		jQuery("#mngsurveyGridId").delRowData(rowId);
	}else{
		jQuery("#mngsurveyGridId").delRowData(rowId);
		add(rowId - 1);
	}
}

/**验证说明字符长度*/
 function validateVal(value, colname) {
	 if(value.length > 250) {
		 return [false,"：备选项说明过长"];
	 }else{
		 return [true,""];
	 }
 }
 
/**验证备选项名称的长度*/
function validateAlterConfigName(value, colname) {
	if(value == null || value == undefined || value == ''){
		return [false,"：备选项名称不能为空"];
	}else if(value.length > 64) {
		 return [false,"：备选项名称过长"];
	 }else{
		 return [true,""];
	 }
}

$(window).resize(function(){
	loan.grid.mdetailconWidth("mngsurveyGridId");
});