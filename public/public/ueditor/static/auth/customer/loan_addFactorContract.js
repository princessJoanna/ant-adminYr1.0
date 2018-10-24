loan.addFactorContract = loan.addFactorContract  || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#factorContract").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'850104'}
	    }).trigger('reloadGrid'); 
	},
	initPage:function(){
		var ids=$("#factorContract").jqGrid('getDataIDs');
		var fundBalance=new Number;
		for(var i=0;i<ids.length;i++){
		  fundBalance+=$('#collectingOpList').jqGrid('getCell',ids[i],'fundBalance');
		}
		$("#fundBalances").val(fundBalance);
	},
	submit:function(){
		var obj = $("#prepayProportion").attr("verifyData");
		if(obj){
			obj = eval('(' + obj + ')');
			if(obj.type=="num2point" && !loan.addFactorContract.validateFloat("#prepayProportion")){
				return;
			}
		}	
		var obj1 = $("#chargeProportion").attr("verifyData");
		if(obj1){
			obj1= eval('(' + obj1 + ')');
			if(obj1.type=="num2point" && !loan.addFactorContract.validateFloat2("#chargeProportion")){
				return;
			}
		}
		var charge=$("#chargeProportion").val();
		var prepay=$("#prepayProportion").val();
		var interestVal;
		var interestType=document.getElementsByName("successed") ;
		for(var n=0;n<interestType.length;n++){
			if(interestType[n].checked){
				interestVal=$(interestType[n]).val();
			}
		}
		if(interestVal=="1"){
			var i=(charge-(100-prepay)).toFixed(2);
			if(i>=0){
				loan.tooltip("请输入合适的手续费比例","error");		
				return;
			}
		}
		if(interestVal=="0"){
			var i=(prepay-charge).toFixed(2);
			if(i<=0){
				loan.tooltip("手续费比例应小于预付比例","error");			
				return;
			}
		}
		
		loan.s_addPop("确认保理参数",loan.basePath+"/league/submitMessage?menuId=850104","",440,310,{isRefresh:false});
	},
	validateFloat:function(container) {
		var value = $(container).val();
		$(container).siblings('div').remove();//清除提示
		var left = $(container).width();
		if(loan.verify.verifyFloat($(container),value)){
			if(value < 100 && value>0) {
				loan.verify.formValidatorShowMsgTrue($(container),left);
				return true;
			} else {
				var Tip = '应小于100且大于0';
				loan.verify.formValidatorShowMsg($(container),Tip,left);
				return false;
			}
		}
	},
	validateFloat2:function(container) {
		var value = $(container).val();
		$(container).siblings('div').remove();//清除提示
		var left = $(container).width();
		if(loan.verify.verifyFloat($(container),value)){
			if(value < 100) {
				loan.verify.formValidatorShowMsgTrue($(container),left);
				return true;
			} else {
				var Tip = '应小于100';
				loan.verify.formValidatorShowMsg($(container),Tip,left);
				return false;
			}
		}
	},
	/**
	 * 删除
	 */
	del : function(menuId,rowId){
		var obj = $("#factorContract").jqGrid("getRowData");
		if(obj.length == 1){
			loan.tooltip("不能全部删除，最少保留一笔应收账单！","error"); 
			return;
		}
		$("#factorContract").jqGrid("delRowData", rowId);
		var ids=$("#factorContract").jqGrid('getDataIDs');
		var fundBalance=new Number;
		for(var i=0;i<ids.length;i++){
		  var f=new Number($('#factorContract').jqGrid('getCell',ids[i],'fundBalance'));
		  fundBalance+=f;
		}
		$("#fundBalances").html(fundBalance.toFixed(2));
	}
	
} 
