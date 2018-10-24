loan.selectloanInfo = loan.selectloanInfo ||{
	selectRowFn : function(rowid,status){
		$("#rowid").attr("value",rowid);
	},
	submit : function(){
		var rowid = $("#rowid").val();
		var rowObj = $("#selectloanInfojqGridId").jqGrid('getRowData',rowid);
		parent.$("#receiptId").attr("value",rowObj.receiptId);//借据号
		parent.$("#receiptNo").attr("value",rowObj.receiptNo);//借据号
		parent.$("#userName").html(rowObj.userName);//客户名称
		parent.$("#userId").attr("value",rowObj.userId);
		parent.$("#loanApplyId").attr("value",rowObj.loadApplyId);//借据申请id
		loan.selectloanInfo.qryInterestRate(rowObj.loadApplyId , rowObj.userId,rowObj.receiptId);//设置执行利率
		parent.$("#idKind").html(rowObj.idKindCn);//证件类型
		parent.$("#idNo").html(rowObj.idNo);//证件号
		if(rowObj.loanAmount){
			parent.$("#loanAmount").html(rowObj.loanAmount+"元");//贷款金额
		}//贷款金额
		parent.$("#loanDate").html(rowObj.loanDate);//贷款开始日期
		parent.$("#limitDate").html(rowObj.limitDate);//贷款结束日期
		parent.$("#loanBalance").html(rowObj.loanBalance+"元");//贷款余额
		// parent.$("input[name='interestAmount']").focus();//解决IE11确定后不能编辑input文本框的问题
		if (parent.$("#focus").length > 0) {
			parent.$("#focus").focus();
		}
		if (parent.$("#interestRatio").length > 0) {
			parent.$("#interestRatio").focus();
		}
		if (parent.$("#interestAmount").length > 0) {
			parent.$("#interestAmount").focus();
		}
		
		loan.s_Pop_closedChild(false,false);
	},
	searchloanApply:function(){
		var userName=$("#userName").val();
		searchOrgId = $("#parentOrgId").val();
		$("#selectloanInfojqGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'7004','userRealName':userName,
				'searchOrgId':searchOrgId,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 查询借据原执行率，用于展示上次原执行月利率
	 * */
	qryInterestRate : function(loanApplyId , userId,receiptId){
		if(loanApplyId){// 借据申请有效才查询
			loan.ajaxDo({
				url:loan.basePath+"/feesAdjust/queryInterestRate",
				params:{ loanApplyId : loanApplyId,userId:userId,receiptId:receiptId, menuId : $('#menuId').val(),format : 'json' },
				successCallback:function(result){
					if(result.domain && (result.domain.interestRate || result.domain.interestRate == '0')){
						var interestRate=result.domain.interestRate*1000;
						var dinterestRate=result.domain.dinterestRate*1000;
						interestRate = $.fmatter.util.NumberFormat(interestRate,{decimalPlaces:3});
						dinterestRate= $.fmatter.util.NumberFormat(dinterestRate,{decimalPlaces:3});
						parent.$("#interestRate").html(interestRate+"‰");//原执行月利率
						parent.$("#dinterestRate").html(dinterestRate+"‰");//原执行罚息利率
					} else {
						parent.$('#interestRate').html('无');
						parent.$('#dinterestRate').html('无');
					}
					if($('#interestAmount').val()){
						$('#interestAmount').focus();
					}
					if(result.overdueStatus && result.overdueStatus == 'false'){
						parent.$('#defaultInterestAmount').val('0').attr('disabled','disabled');
						parent.$('#lateFeesAmount').val('0').attr('disabled','disabled');
					}else{
						parent.$('#defaultInterestAmount').val('').removeAttr('disabled');
						parent.$('#lateFeesAmount').val('').removeAttr('disabled');
					}
				},
				successTip:false, //提示
				bizErrTip:false,  //提示
				chainPar:this
			});
		}
	},
}