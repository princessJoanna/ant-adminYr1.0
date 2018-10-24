loan.addcusmgr = loan.addcusmgr || {
	/**
	 * 新增提交
	 */
	submitAdd:function(){

        var saleManagerName = $("#saleManagerName").val();
		if(!saleManagerName){
			loan.tooltip("请输入姓名","error");
			return;
		}
		if (saleManagerName) {
            if (saleManagerName.length >= 12) {
                loan.tooltip("姓名格式有误","error");
                return;
            }
		}

        var mobile = $("#mobile").val();
        if(!mobile){
            loan.tooltip("请输入手机号","error");
            return;
        }
        if (mobile) {
            if (mobile.length > 11) {
                loan.tooltip("手机号格式有误","error");
                return;
            }
            if(!(/^1[34578]\d{9}$/.test(mobile))){
                loan.tooltip("手机号格式有误","error");
                return;
            }
        }

		loan.ajaxDo({
	        url:loan.basePath+"/borrowermanager/addSaleManager",
	        params:{'saleManagerName':saleManagerName,'mobile':mobile},
            successCallback:function(){
				parent.$('#focus').focus();
				loan.s_Pop_closedChild(true,false);
			},
	        successTip:true, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
		
	},
}

$(function(){
	 //重新绑定子窗口右上角点击关闭事件
	 parent.$('#sPopClose').bind("click",function(){
	     parent.$('#focus').focus();
	     loan.s_Pop_closedChild(false,false);
	 });
	 if($('#opType').val() == "add") {
		 var rowid = parent.$("#rowid").val();
		 var managerId = parent.$("#userGridId").jqGrid('getCell',rowid,'mamagerId');
		 if(managerId) {
			 var  mamagerIds =	 $("input[name='mamagerId']");
			 $(mamagerIds).each(function (i, item){
				var val = $(item).val();
				if(val == managerId){
					$(item).attr('checked','checked');
				}
			 });
		 }
		 
	 }
});