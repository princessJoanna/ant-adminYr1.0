loan.batchImport = loan.batchImport || {
	
	/**
	 * 出资机构id 后台在session中接收
	 */
	//orgId : 1001,
	/**
	 * 用户id
	 */
	userId : -1,
	
	/**
	 * 查询产品列表结果
	 */
	showQueryResult:function(response){
		//判断产品列表是否为空
		if(response.list!=null){
			//根据查询结果给label添加li
			$(response.list).each(function (index, item) {
				var html = "<input id='loanproductcheckbox"
							+ index
							+ "' type='checkbox' class='f-ml10' value='"
							+ item.productId
							+ "'/>"+item.productName;
				$("#loanproductcheckboxlist").append(html);
			});
			
		}else{
			var html = "<li class='f-fl f-pt10 f-ml40 f-w100pre'>产品列表为空</li>";
			$("#loanproductcheckboxlist").append(html);
		}
	},
	
	/**
	 * 查询产品列表
	 */
	queryProduct:function() {
    	loan.ajaxDo({
            url:loan.basePath+"/signProduct/queryProduct?menuId=800105",
            //params:{ 'orgId' : loan.signproduct.orgId},
            successCallback:loan.batchImport.showQueryResult,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
    },
    
    
    importSubmit:function(){
    	
    	if($("#upload_file").val()==""){
    		loan.tooltip("请选择上传文件","error");
			return;
    	};
    	
     	var signProductArray = new Array();
    	var checkboxArray = $("#loanproductcheckboxlist").find("input[type=checkbox]");
		$(checkboxArray).each(function (i, item){
			var val = $(item).val();
			if($(item).prop("checked")){
				signProductArray.push(val);
			}
		});
		
		//判断要签约的产品是否为空
		if(signProductArray.length==0){
			loan.tooltip("请至少选择一项产品","error");
			return;
		}
		
	
		var productIds ="";
		var len  = signProductArray.length;
		for (var i = 0; i < len; i++) {
			productIds = productIds+signProductArray[i];
			 if(i<len-1){
				 productIds = productIds+","
			 }
		}
    	
		 $("#iform").ajaxSubmit({
			   url:loan.basePath+'/borrower/toImportUpload?productIds='+productIds+'&&menuLog=1',  
			   type:"POST",  
			   success:function(result){
				   var obj = $.parseJSON(result);
				   $("#textarea").val(obj.errMsg); 
			   },
			   error:function(msg){
			   }
		  });
    }
    
   
};