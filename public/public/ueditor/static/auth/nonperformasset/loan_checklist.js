/**
 * 
 */
loan.checklist=loan.checklist||{
	
	
	
	
	/**
	 * 查询
	 */
	initPageMess:function(){
		var menuId=$("#menuId").val();
		var taskNo=$("#taskNo").val();
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/queryTaskDetail",
			params:{format:'json','menuId':menuId,'taskNo':taskNo},
            successCallback:loan.checklist.queryDetail,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	/**
	 * 查询不良资产详情
	 * @param result
	 */
	queryDetail:function(result){
		var bad=result.badassetTransferTaskDto;
		$("#customerName").html(bad.customerName);
		$("#customerUserId1").html(bad.customerUserId);
		$("#loanAmount").html(bad.loanAmount);
		$("#fiveKindEnumS").html(bad.fiveKindEnumS);
		$("#orgFullName").html(bad.orgFullName);
		var transferDate=bad.transferDate;
		if(bad.transferDate!=null){
			transferDate=transferDate+'';
			transferDate=transferDate.substr(0,4)+ "-" + transferDate.substr(4,2) + "-" + transferDate.substr(6,2);
		}else{
			transferDate='';
		}
		$("#transferDate1").html(transferDate);
		$("#isVerifyEnum1").html(bad.isVerifyEnum=='YES'?'已核对':'未核对');
		var securityManagerName=bad.securityManagerName;
		$("#securityManagerName").html(securityManagerName);
	}
	
}


