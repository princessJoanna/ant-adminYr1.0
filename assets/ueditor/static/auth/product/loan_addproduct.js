loan.addproduct=loan.addproduct||{
	product:new Object(),
	
	getProduct : function(){
		this.product.format='json';
		this.product.menuLog='0';
		
		//tab1
		this.product.productName=$('#productName').val();
		this.product.productNo=$('#productNo').val();
		this.product.productType=$('#productType').val();
		this.product.warrantType=$('#warrantType').val();
       
		var userType='';
        $('input:checkbox[name="userType"]:checked').each(function(){
            	userType +=$(this).val()+',';
        	});
		this.product.userType=userType;
        
		//tab2
		this.product.creditType=$('#creditType').val();
		
		var isAutoCredit=$("input[name='isAutoCredit']:checked").val();
		this.product.isAutoCredit=isAutoCredit;

		this.product.autoAmount=$('#autoAmount').val();
		this.product.autoTime=$('#autoTime').val();

		var useCredit=$("input[name='useCredit']:checked").val();
		this.product.useCredit=useCredit;
		
		var autoStatus=$("input[name='autoStatus']:checked").val();
		this.product.autoStatus=autoStatus;
		
		var creditelementStatus=$("input[name='creditelementStatus']:checked").val();
		this.product.creditelementStatus=creditelementStatus;
		
		//tab3
		this.product.preloanConfirmAmount=$('#preloanConfirmAmount').val();
		this.product.confirmAmount=$('#confirmAmount').val();
		
		var downPayments=(parseFloat($('#downPaymentsMin').val())/100).toFixed(4)+','+(parseFloat($('#downPaymentsMax').val())/100).toFixed(4);
		this.product.downPayments=downPayments;
		
//		this.product.repayDayInterval=$('#repayDayInterval').val();
		
		//tab4
		this.product.letoffLateDay=$('#letoffLateDay').val();
		this.product.letoffFineDay=$('#letoffFineDay').val();
		this.product.letoffInterestDay=$('#letoffInterestDay').val();
		this.product.letoffInterestUnit=$('#letoffInterestUnit').val();
		
//		var termdayCountType=$("input[name='termdayCountType']:checked").val();
//		this.product.termdayCountType=termdayCountType;
		if($('#productType').val()=='1'){
			this.product.interestAdvancePeriods=$('#interestAdvancePeriods').val();
		}
		this.product.interestType=$('#interestType').val();
		if($('#interestRate').val()!=''){
			this.product.interestRate=(parseFloat($('#interestRate').val())/1000).toFixed(6);
		}
		this.product.defaultInterestType=$('#defaultInterestType').val();
		if($('#defaultInterestType').val()=='0'){
			this.product.defaultInterestTimes=$('#interestOrTimes').val();
		}else if($('#defaultInterestType').val()=='2'){
			this.product.dinterestRate=(parseFloat($('#interestOrTimes').val())/1000).toFixed(6);
			this.product.defaultInterestTimes=0;
		}else if($('#defaultInterestType').val()=='3'){//选择去合同罚息月利率，不用输
			this.product.defaultInterestTimes=0;
		}else{
			this.product.defaultInterestTimes=(parseFloat($('#interestOrTimes').val())/1000).toFixed(6);
		}
		this.product.coInterestType=$('#coInterestType').val();
		this.product.diCountType=$('#diCountType').val();
		
		var dayCountType=$("input[name='dayCountType']:checked").val();
		this.product.dayCountType=dayCountType;
		if(dayCountType=='0'){
			this.product.dayCountValue=$('#dayCountValue').val();
		}else{
			this.product.dayCountValue=0;
		}
		
		//tab5
//		this.product.repayDayType=$('#repayDayType').val();
//		this.product.repayDayValue=$('#repayDayValue').val();
//		this.product.poundageReduceType=$('#poundageReduceType').val();
//		this.product.penaltyReduceType=$('#penaltyReduceType').val();
		
		var repaymentAttri=[];		
		var repaymentType='';
        $('input[name="repaymentType"]:checked').each(function(){
            	repaymentType += $(this).val()+',';
            	var id = $(this).attr('id');
            	var rvalue =$(this).val();
            	var robj = {};
            	robj.repaymentType=$(this).val();
            	robj.repayDayType=$('#repayDayType'+rvalue).val();
            	robj.repayDayValue=$('#repayDayValue'+rvalue).val();
            	robj.poundageReduceType=$('#poundageReduceType'+rvalue).val();
            	robj.penaltyReduceType=$('#penaltyReduceType'+rvalue).val();
        		if($('#productType').val()=='1'){
        			robj.interestAdvancePeriods=$('#interestAdvancePeriods'+rvalue).val();
        		}
        		robj.termdayCountType=$("input[name='termdayCountType"+rvalue+"']:checked").val();
            	robj.repayDayInterval=$('#repayDayInterval'+rvalue).val();
            	robj.earlySettleType=$("input[name='earlySettleType"+rvalue+"']:checked").val();
            	repaymentAttri.push(robj);
        });
		this.product.repaymentType=repaymentType;
		this.product.repaymentAttri=JSON.stringify(repaymentAttri);
		
//		var earlySettleType=$("input[name='earlySettleType']:checked").val();
//		this.product.earlySettleType=earlySettleType;

		//tab6
		if($('#productType').val()=='0'){
			this.product.paymentType=$('#paymentType').val();
		}
		this.product.productGroup=$('#productGroup').val();
		this.product.orderNum=$('#orderNum').val();
		
		var isDelay=$("input[name='isDelay']:checked").val();
		this.product.isDelay=isDelay;
		
		this.product.delayTime=$('#delayTime').val();
		
		var autoApproveContract=$("input[name='autoApproveContract']:checked").val();
		this.product.autoApproveContract=autoApproveContract;
		
		var isAppContract=$("input[name='isAppContract']:checked").val();
		this.product.isAppContract=isAppContract;

		var paymentWay=$("input[name='paymentWay']:checked").val();
		this.product.paymentWay=paymentWay;
		
		var warrantNeed=$("input[name='warrantNeed']:checked").val();
		this.product.warrantNeed=warrantNeed;
		
		var loanelementStatus=$("input[name='loanelementStatus']:checked").val();
		this.product.loanelementStatus=loanelementStatus;
		
		var termArr=jQuery("#loanTermId").jqGrid("getRowData");
		this.product.loanTermStr=JSON.stringify(termArr);
		
		this.product.remark=$('#remark').val();
		
		var feeConfig='';
        $('input:checkbox[name="feeConfig"]:checked').each(function(){
        	feeConfig +=$(this).val()+',';
        	});
		this.product.feeConfig=feeConfig;
		
		var fineConfig='';
        $('input:checkbox[name="fineConfig"]:checked').each(function(){
        	fineConfig +=$(this).val()+',';
        	});
        this.product.fineConfig=fineConfig;
        
        var priceDim='';
        $('input:checkbox[name="priceDim"]:checked').each(function(){
        	priceDim +=$(this).val()+',';
        	});
		this.product.priceDim=priceDim;
		
		var weithtArr=jQuery("#feeWeightGridId").jqGrid("getRowData");
		this.product.weight=JSON.stringify(weithtArr);
		
		this.product.productPic=$("#showImg").attr("src");
		
	},
	
	saveProduct : function(){
		loan.verify.verifyCheck("iform5","button5");
		testForm("iform0");
		testForm("iform1");
		testForm("iform2");
		testForm("iform3");
		testForm("iform4");
		if($('#iform0 .m-tipShow-error').length>0){
			loan.tooltip('"基本信息栏"存在输入错误',"error");
			return;
		}
		if($('#iform1 .m-tipShow-error').length>0){
			loan.tooltip('"授信相关栏"存在输入错误',"error");
			return;
		}
		if($('#downPaymentsMin').val()==''||$('#downPaymentsMax').val()==''){
			loan.tooltip('"借款相关栏"必填字段不能为空',"error");
			return;
		}
		if($('#iform2 .m-tipShow-error').length>0){
			loan.tooltip('"借款相关栏"存在输入错误',"error");
			return;
		}
		if($('#productType').val()=='1'&&$('#interestAdvancePeriods').val()==''){
			loan.tooltip('"费息相关栏"必填字段不能为空',"error");
			return;
		}
		if($('#iform3 .m-tipShow-error').length>0){
			loan.tooltip('"费息相关栏"存在输入错误',"error");
			return;
		}
		if($('#iform4 .m-tipShow-error').length>0){
			loan.tooltip('"还款相关栏"存在输入错误',"error");
			return;
		}
		
		for(var i=5;i>=0;i--){
			if(i=='4'){
				if(checkEmptyrP(i)){//校验至少选择一种还款方式
					return;
					}
			    $('input[name="repaymentType"]:checked').each(function(){
			    	var id = $(this).attr('id');
			    	    succ = checkEmptyrepay(id);
					if(succ){
						return;
						}
			    	});
			}else{
			if(checkEmpty(i)){
				return;
				}
			}
		}
		
		if(!checkLoanTerm()){
			return;
		}
		
		loan.addproduct.getProduct();
		
		var action="";
		if($('#method').val()=='add'){
			this.product.menuId='401101';
			action="/product/addProduct"
		}
		if($('#method').val()=='update'){
			this.product.menuId='401102';
			this.product.productId=$('#productId').val();
			action="/product/updateProduct"
		}
		loan.ajaxDo({
			url:loan.basePath+action,
			params:this.product,
			successCallback:function(){
				loan.tabcut.childClosedIframe(true);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
		
	},
	
	/**上传图片方法*/
	upload : function() {
		
		//校验图片是否已选
		if(!$("#uploadImage").val()) {
			loan.tooltip("请先选择你要上传的图片","error"); 
			$("#uploadImage").focus();
			return;
		}
		//灰掉上传按钮
		$("#upload").attr("disabled","disabled");
		
		var logContent = "上传贷款产品图片";
		$("#uploadImage").upload({
			url:  loan.basePath+"/common/uploadPic?logContent="+logContent,
			type: 'POST',
			// 其他表单数据
			params: {'format':'json','menuId':'401101'},
			dataType: 'text',
			onSend: function (obj, str) {  return true; },
			// 上传之后回调
			onComplate: function (data) {
				//数据返回为空
	        	if(!data) {
	        		loan.tooltip("上传失败，请稍后再试",'error');
		        	return;
	        	}
				var obj = eval("("+data+")");
				if(obj == null || obj.success == false){
					loan.tooltip(obj.errMsg,"error");
				}else{
					loan.tooltip("上传成功","succeed");
					$("#uploadImage").val("");
					
					$("#showImg").attr("src",obj.depositPath);
				}
				var file = $("#uploadImage");
				file.after(file.clone().val(""));
				file.remove();
				//恢复上传与提交按钮
				$("#uploadImage").removeAttr("disabled");
				$("#upload").removeAttr("disabled");
				
			}
		});
		$("#uploadImage").upload("ajaxSubmit");
	},
	
	initAddTerm:function(){
		jQuery("#loanTermId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['*金额下限(元)','*金额上限(元)','*可选期限(月)','操作'], 
			colModel: [
	           {name:'minAmount',index:'minAmount', align:'center',editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:999999999}
	           },
	           {name:'maxAmount',index:'maxAmount', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:999999999}
	        	},
	        	{name:'chooseTerm',index:'chooseTerm', align:'center', editable:true,
	        		editrules: {custom:true, custom_func:checkTerm,maxlength:30}
	        	 
		        },
		        {name:'act',index:'act', align:'center',editable:false,formatter:'selFmt'}
	        ], 
			rowNum : 99,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			'cellsubmit': 'clientArray',  //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
			sortname: '',  
		    sortorder: 'desc',
			loadComplete:function(){
				
			},
			afterEditCell:null,
			gridComplete : function() {
			}
		})
		$("#loanTermId").setGridWidth(700);
	},
	
	initUpdateTerm : function(){
		var productId=$('#productId').val();
		loan.ajaxDo({
			url:loan.basePath+"/product/queryItermList",
			params:{'format':'json','menuLog':'1','productId':productId,'menuId':'401102'},
			successCallback:function(result){
				var loanTermDtoList=result.pager.items;
				if(loanTermDtoList==null){
					return;
				}
				for(var i=0;i<loanTermDtoList.length;i++){
					var loanTermDto=loanTermDtoList[i];
					jQuery("#loanTermId").addRowData(i+1, {"minAmount":loanTermDto.minAmount,"maxAmount":loanTermDto.maxAmount,"chooseTerm":loanTermDto.chooseTerm});
				}
			},
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	first:true,
	addLoanTerm : function(){
		var maxId;
		if(this.first){
			maxId=jQuery("#loanTermId").getRowData().length;
		}
		jQuery("#loanTermId").addRowData(++maxId, {"minAmount":"","maxAmount":"","chooseTerm":"1,3,6,9"}); 
		first=false;
	},
	
	deleteLoanTerm : function(rowid){
		if(jQuery("#loanTermId").getRowData().length<2){
			loan.tooltip("至少存在一种分期属性","error");
			return;
		}
		jQuery("#loanTermId").delRowData(rowid);
	},
	
	initFeeWeight:function(){
		jQuery("#feeWeightGridId").jqGrid({
			datatype: "local",
			height: '320',
			autowidth: true,	
			forceFit:true,
			colNames: ['字典id','维度','字典子项','维度子项','基础月利率权重','平台手续费率权重','平台定额费用权重','小贷公司月手续费率权重','小贷公司定额月费权重','意外保险金率权重'], 
			colModel: [
			   {name:'dictId',hidden:true},
			   {name:'dictName'},
			   {name:'dictValue',hidden:true},
			   {name:'dictPrompt'},
	           {name:'interestWeight', align:'center',editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'1.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:100}
	           },
	           {name:'platformPoundageWeight', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'1.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:100}
	        	},
        	 {name:'platformQuotaWeight', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'1.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:100}
	        	},
        	 {name:'loadPoundageWeight', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'1.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:100}
	        	},
        	 {name:'loadQuotaWeight', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'1.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:100}
	        	},
        	 {name:'insuranceWeight', align:'center', editable:true,
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'1.00'},
	        	   editrules: {custom:true, custom_func:checkMoney,maxValue:100}
	        	},
	        ], 
			rowNum : 999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			'cellsubmit': 'clientArray',  //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
			sortname: '',  
		    sortorder: 'desc',
		    scrollrows: false, 
			loadComplete:function(){
				
			},
			afterEditCell:null,
			gridComplete : function() {
			}
		})
		$("#feeWeightGridId").setGridWidth(1000);
	},
	

};

/**单元格校验*/
function checkMoney(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		return [false," ["+colname+"]不能为空！",''];
	}
	if(isNaN(cellvalue)){
		return [false," ["+colname+"]格式不正确！",''];
	}
	if(Number(cellvalue) < 0){
		return [false," ["+colname+"]不能小于0 ！",''];
	}
	
	return [true,'',''];
}

function checkTerm(cellvalue, colname){
	if($.trim(cellvalue) == ''){
		return [false," ["+colname+"]不能为空！",''];
	}
	return [true,'',''];
}

/**
 * tab页切换功能
 */
function initTabChange() {
	//tab页切换
	loan.tabLiclick("m-tab-detail");
	
}

//上一页
function backPage(i){
	$(".m-tab-con li:eq("+i+")").click();
}

//下一页
function nextPage(i){
	var order=i-1;
	if(order=='0'){
		if(!checkLoanTerm()){
			return;
		}
	}
	loan.verify.verifyCheck("iform"+order,"button"+order);

	if(order=='4'){
		//还款方式校验
		 succ = checkEmptyrP(order);
			if(succ){
				return;
			} 
	    $('input[name="repaymentType"]:checked').each(function(){
	    	var id = $(this).attr('id');
	    	    succ = checkEmptyrepay(id);
			if(succ){
				return;
				}
	    	});
	}else{
		//非空判断
		 succ = checkEmpty(order);
			if(succ){
				return;
			}
		}

	
	$(".m-tab-con li:eq("+i+")").click();
	$("body").scrollTop(0);
	
}

function checkLoanTerm(){
	var flag=true;
	var termArr=jQuery("#loanTermId").jqGrid("getRowData");
	for(var i=0;i<termArr.length;i++){
		if(parseInt(termArr[i].minAmount)==0||parseInt(termArr[i].maxAmount)==0){
			loan.tooltip('"贷款分期属性"第'+(i+1)+'行"金额"不能为0',"error");
			flag=false
			break;
		}
	}
	return flag;
}

//判断各表单字段是否为空
function checkEmpty(order){
	var flag = false;
	var formName="#iform"+order;
	var radioArr = $(formName).find("input[type='radio']").parent();
	if(radioArr.length > 0){
		for(var i=0;i<radioArr.length;i++){
			var tmp = radioArr[i].id;
			var val = $('input[name="'+tmp+'"]' + ":checked").val();
			if(val==null){
				loan.tooltip("必填字段不能为空","error");
				flag=true ;
				break;
			}
			//console.log(val);
		}
		if(flag){
			return flag;
		}
	}
	var selectArr = $(formName).find("select");
	if(selectArr.length>0){
		for(var i=0;i<selectArr.length;i++){
			var tmp=selectArr[i];
			var val=$(tmp).val();
			if(val=='-1'){
				loan.tooltip("必填字段不能为空","error");
				flag=true ;
				break;
			}
		//	console.log(selectArr);
		}
		if(flag){
			return flag;
		}
	}
    var checkboxArr=$(formName).find("input[type='checkbox']").parent();
	if(checkboxArr.length>0){
		for(var i=0;i<checkboxArr.length;i++){
			var tmp=checkboxArr[i].id;
			var val= $("input[name='" + tmp+ "']:checked").length;
			if(val==0){
				loan.tooltip("必填字段不能为空","error");
				flag=true ;
				break;
			}
			//console.log(val);
		}
		if(flag){
			return flag
		}
	}
	return flag;
}



//还款方式是否选择校验
function checkEmptyrP(order){
	var flag = false;
	var formName="#iform"+order;
    var checkboxArr=$(formName).find("input[type='checkbox']").parent();
	if(checkboxArr.length>0){
		for(var i=0;i<checkboxArr.length;i++){
			var tmp=checkboxArr[i].id;
			var val= $("input[name='" + tmp+ "']:checked").length;
			if(val==0){
				loan.tooltip("请至少选择一种还款方式","error");
				flag=true ;
				break;
			}
			//console.log(val);
		}
		if(flag){
			return flag
		}
	}
	return flag;
}

//判断各表单字段是否为空(特殊处理还款方式属性)
function checkEmptyrepay(id){
	var flag = false;
	var radioArr = $('#' + id + "_div").find("input[type='radio']").parent();
	if(radioArr.length > 0){
		for(var i=0;i<radioArr.length;i++){
			var tmp = radioArr[i].id;
			var val = $('input[name="'+tmp+'"]' + ":checked").val();
			if(val==null){
				loan.tooltip("必填字段不能为空","error");
				flag=true ;
				break;
			}
			//console.log(val);
		}
		if(flag){
			return flag;
		}
	}
	var selectArr = $('#' + id + "_div").find("select");
	if(selectArr.length>0){
		for(var i=0;i<selectArr.length;i++){
			var tmp=selectArr[i];
			var val=$(tmp).val();
			if(val=='-1'){
				loan.tooltip("必填字段不能为空","error");
				flag=true ;
				break;
			}
		//	console.log(selectArr);
		}
		if(flag){
			return flag;
		}
	}
    var checkboxArr=$('#' + id + "_div").find("input[type='checkbox']").parent();
	if(checkboxArr.length>0){
		for(var i=0;i<checkboxArr.length;i++){
			var tmp=checkboxArr[i].id;
			var val= $("input[name='" + tmp+ "']:checked").length;
			if(val==0){
				loan.tooltip("必填字段不能为空","error");
				flag=true ;
				break;
			}
			//console.log(val);
		}
		if(flag){
			return flag
		}
	}
	return flag;
	
}
//对表单内的输入框进行数据校验
function testForm(formId){
	var getInputs = $('#'+formId).find('input[type=text],input[type=password]').filter('.verify');	 //得到表单中所有的input
	for(var i = 0; i < getInputs.length; i++){
		var $this = getInputs.eq(i);
		loan.verify.getReadyverify($this);
		if($this.hasClass("v_Error")){
			//alert("验证不成功，请返回！");
			$this.focus();
			return false;
		}
	}	
}
	
