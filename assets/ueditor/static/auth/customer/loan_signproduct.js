loan.signproduct = loan.signproduct || {
	
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
			//根据查询结果给ul添加li
			$(response.list).each(function (index, item) {
				var html = "<li class='f-fl f-pt5 f-w100pre'><input id='loanproductcheckbox"
							+ index
							+ "' type='checkbox' class='f-mr5' value='"
							+ item.productId
							+ "'/><label for='loanproductcheckbox"
							+ index
							+ "'>"
							+ item.productName 
							+ "</label></li>";
				$("#loanproductcheckboxlist").append(html);
			});
			
			//获取用户id
			loan.signproduct.userId = $("#loanproductuserId").val();
			
			//查询用户已经签约的产品
			loan.signproduct.querySignProduct();
		}else{
			var html = "<li class='f-fl f-pt10 f-ml40 f-w100pre'>产品列表为空</li>";
			$("#loanproductcheckboxlist").append(html);
		}
	},
	
	/**
	 * 查询借款人签约产品列表结果
	 */
	showQuerySignResult:function(response){
		if(response.list!=null){
			$(response.list).each(function (i, product) {
				var checkboxArray = $("#loanproductcheckboxlist").find("input[type=checkbox]");
				$(checkboxArray).each(function (i, item){
					var val = $(item).val();
					//如果产品已经签约
					if(product.productId == val){
						//修改checkbox的状态为checked
						$(item).prop("checked", true);
					}
				});
			});
			
		}
	},
	
	/**
	 * 查询产品列表
	 */
	queryProduct:function() {
    	loan.ajaxDo({
            url:loan.basePath+"/signProduct/queryProduct",
            params:{ 'menuId' : '800107','format':'json'},
            successCallback:loan.signproduct.showQueryResult,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
    },

    /**
     * 查询借款人签约产品列表
     */
    querySignProduct:function() {
    	loan.ajaxDo({
            url:loan.basePath+"/signProduct/querySignProduct",
            params:{'userId' : loan.signproduct.userId,'menuId' : '800107'},
            successCallback:loan.signproduct.showQuerySignResult,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
    },
	
    /**
     * 借款人产品签约
     */
    setSignProduct:function() {
    	var signProductList = new Array();
    	var checkboxArray = $("#loanproductcheckboxlist").find("input[type=checkbox]");
		$(checkboxArray).each(function (i, item){
			var val = $(item).val();
			
			if($(item).prop("checked")){
				signProductList.push({'userId': loan.signproduct.userId, 'productId': val});
			}
		});
		//判断要签约的产品是否为空
		if(signProductList.length==0){
			loan.tooltip("请至少选择一项产品","error");
			return;
		}
		
		var productList = JSON.stringify(signProductList);
        loan.ajaxDo({
            url:loan.basePath+"/signProduct/setSignProduct?toCusproduct",
            params:{'productList':productList,'menuLog':'1','menuId':'800107'},
            successCallback:function(){
				parent.$('#focus').focus();
				loan.s_Pop_closedChild(true,false);
			},
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
    }
};