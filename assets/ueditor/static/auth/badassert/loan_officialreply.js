/**
 * 
 */
loan.officialreply=loan.officialreply||{
  isOk:'',
  /**
   * 页面初始化
   */
 initPage:function(){
	var menuId = $('#menuId').val();
	var applyId =$('#applyId').val();
	jQuery("#writeoffMoney").jqGrid({
		url: loan.basePath+ "/writeoff/queryDeclareMoneyList",
		mtype:'POST',
		datatype: "json",
		postData:{'format':'json','menuId':menuId,"applyId":applyId},
		colNames: ['合同编号','申报核销本金(元)','申报核销应收利息(元)','申报核销催收利息(元)'], 
		colModel: [
		   {name:'contractNo', sortable: false,align:'center'},
		   {name:'writeoffPrincipal',sortable: false, align:'center',
			   formatter: 'number',
        	   sortable: false,
        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2}},
		   {name:'writeoffReceivableInterest',sortable: false, align:'center',
			   formatter: 'number',
        	   sortable: false,
        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2}},
		   {name:'writeoffCollectionInterest',sortable: false, align:'center',
			   formatter: 'number',
        	   sortable: false,
        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2}},
        ],
        jsonReader:{ 
			root: "response.models",//数据项
			repeatitems : false
		},
		pager:jQuery('#panelId'),
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
	    cellEdit : true,
		height: 'auto',	
		loadComplete:function(){},
		gridComplete : function() {
			$("#writeoffMoney").parents(".ui-jqgrid-bdiv").css("overflow-x","hidden");
			var ids=$("#writeoffMoney").jqGrid("getDataIDs");
			if(ids.length>10){
				  $("#writeoffMoney").setGridHeight(250); 	
			}
		}
		
	});
	
	jQuery("#writeoffMoney").setGridWidth(900);
	jQuery("#exeInfoGridId").jqGrid({
		url: loan.basePath+ "/writeoff/queryDeclareMoneyList",
		mtype:'POST',
		datatype: "json",
		postData:{'format':'json','menuId':menuId,"applyId":applyId},
		colNames: ['申报信息Id','合同编号','批复核销本金(元)*','批复核销应收利息(元)*','批复核销催收利息(元)*'], 
		colModel: [
           {name:'declareId', sortable: false,align:'center',hidden:true},
		   {name:'contractNo', sortable: false,align:'center'},
		   {name:'replyPrincipal',sortable: false, align:'center', editable:true,
			   formatter: 'number',
        	   sortable: false,
        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
        	   editrules: {required:true,number:true, minValue:0,maxValue:999999999}},
		   {name:'replyReceivableInterest',sortable: false, align:'center',editable:true,
				   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {required:true,number:true,minValue:0,maxValue:999999999}},
		   {name:'replyCollectionInterest',sortable: false, align:'center',editable:true,
					   formatter: 'number',
		        	   sortable: false,
		        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
		        	   editrules: {required:true,number:true,minValue:0,maxValue:999999999}},
        ],
        jsonReader:{ 
			root: "response.models",//数据项
			repeatitems : false
		},
		pager:jQuery('#panel2Id'),
		rowNum : 99,
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
		cellEdit : true,
		loadComplete:function(){
	
		},
		gridComplete : function() {
			$("#exeInfoGridId").parents(".ui-jqgrid-bdiv").css("overflow-x","hidden");
			var ids=$("#exeInfoGridId").jqGrid("getDataIDs");
			if(ids.length>10){
				  $("#exeInfoGridId").setGridHeight(250); 	
			};
			 loan.officialreply.initData();
		},
		beforeEditCell: function(rowid,name,value,iRow,iCol){
			loan.officialreply.isOk = true;
		},
		beforeSaveCell:function(rowid,name,value,iRow,iCol){
			if(!isNaN(value) && value != "") {
				var num = parseFloat(value);
				var arr=jQuery("#exeInfoGridId").jqGrid("getRowData");
				var principal=parseFloat(0);
				var receivableInterest=parseFloat(0);
				var collectionInterest=parseFloat(0);
				for(var i=0;i<arr.length;i++){
					 principal=principal+parseFloat(arr[i].replyPrincipal==''? num:arr[i].replyPrincipal);
					receivableInterest=receivableInterest+parseFloat(arr[i].replyReceivableInterest==''? num: arr[i].replyReceivableInterest);
					collectionInterest=collectionInterest+parseFloat(arr[i].replyCollectionInterest==''? num: arr[i].replyCollectionInterest);
				}
				
				$('#replyPrincipal').text(principal.toFixed(2));
				$('#replyReceivableInterest').text(receivableInterest.toFixed(2));
				$('#replyCollectionInterest').text(collectionInterest.toFixed(2));
			}else {
				loan.officialreply.isOk = false;
			}
	    },
	});
	
	jQuery("#exeInfoGridId").setGridWidth(900);
},
/**
 * 初始化相关数据
 */
  initData:function(){
	  var data=jQuery("#exeInfoGridId").jqGrid("getRowData");
	  var replyPrincipal=0;
		var replyReceivableInterest=0;
		var replyCollectionInterest=0;
	  for(var i=0;i<data.length;i++){
		  if(data[i].replyPrincipal!=''){
			  replyPrincipal=replyPrincipal+ parseFloat(data[i].replyPrincipal);
		  }
		  if(data[i].replyReceivableInterest!=''){
			  replyReceivableInterest=replyReceivableInterest+ parseFloat(data[i].replyReceivableInterest);
		  }
		  if(data[i].replyCollectionInterest!=''){
			  replyCollectionInterest=replyCollectionInterest+ parseFloat(data[i].replyCollectionInterest);
		  }  
	  }
	    $('#replyPrincipal').html(replyPrincipal.toFixed(2));
		$('#replyReceivableInterest').html(replyReceivableInterest.toFixed(2));
		$('#replyCollectionInterest').html(replyCollectionInterest.toFixed(2));
  },
  /**
   * 保存
   */
   save:function(){
	   var ifHoldRecourse = $("input[name='ref']:checked").val();
	   var applyState =$("input[name='suc']:checked").val();
	   var menuId=$("#menuId").val();
	   if(ifHoldRecourse==null||applyState==null){
		   loan.tooltip("请完善页面信息","error");
		   return;
	   }
	   if(loan.officialreply.isOk=='false'){
		   loan.tooltip("相关信息输入格式错误","error");
		   return; 
	   }
	   var applyId=$("#applyId").val();
	   var replyComments=$("#replyComments").val();
	   loan.ajaxDo({
			url: loan.basePath+ "/writeoff/writeoffApplyApprove",
			params:{format:'json','menuId':menuId,'ifHoldRecourse':ifHoldRecourse,'applyState':applyState,'applyId':applyId,'replyComments':replyComments},
           successTip:true, //提示
           bizErrTip:true,  //提示
           chainPar:this
       });
	   var data=jQuery("#exeInfoGridId").jqGrid("getRowData");
	   var declareInfoList = JSON.stringify(data);
		loan.ajaxDo({
			url:loan.basePath+"/writeoff/modifyDeclareMoneyList",
			params:{'format':'json','menuLog':'1','declareInfoList':declareInfoList,'applyId':applyId,'menuId':menuId},
			successTip:false, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
   }

  
  
}	
	
