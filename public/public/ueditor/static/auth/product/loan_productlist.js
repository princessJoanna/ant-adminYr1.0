loan.productlist=loan.productlist||{
	/**
	 * 普通搜索按钮
	 */
	searchFunc : function() {
		var menuId = $("#menuId").val();
		var productName=$('#productName').val();
		$("#productGridId").jqGrid("setGridParam", {
			postData : {
				'menuId' : menuId,
				'productName' : productName,
				'format' : 'json'
			},
			page : 1
		}).trigger('reloadGrid');
	},
	/**
	 * 清空按钮
	 */
    clearCondition:function(){
    	$('#productName').val('');
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#productGridId").jqGrid("setGridParam", {   
			postData:{'format':'json'}
	    }).trigger('reloadGrid'); 
	},
	/**
	 * 删除按钮
	 */
	deleteProduct : function() {
		var ids = $("#productGridId").jqGrid("getGridParam", "selrow");
		if (ids == null) {
			loan.tooltip("请选择需要删除的产品", "error");
			return;
		}
		var menuId = $("#menuId").val();
		var productId = $("#productGridId").jqGrid('getCell', ids, 'productId');
		$.artDialog({
			title:"提示",
			content:"确定要删除吗？",
			ok:function(){
				loan.ajaxDo({
					url : loan.basePath + "/product/deleteProductById",
					params : { "menuId" : menuId ,"productId" : productId },
					successCallback:function(result){
						loan.productlist.freshGrid();
					},
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
	 * 启用停用按钮
	 */
	validProduct : function() {
		var ids = $("#productGridId").jqGrid("getGridParam", "selrow");
		if (ids == null) {
			loan.tooltip("请选择需要启用/停用的产品", "error");
			return;
		}
		var menuId = $("#menuId").val();
		var productId = $("#productGridId").jqGrid('getCell', ids, 'productId');
		var status = $("#productGridId").jqGrid('getCell', ids, 'status');
		var content="";
		if(status=='0'){
			content="确认要停用产品吗？";
		}
		if(status=='1'){
			content="确认要启用产品吗？";
		}
		$.artDialog({
			title:"提示",
			content:content,
			ok:function(){
				loan.ajaxDo({
					url : loan.basePath + "/product/validProduct",
					params : { "menuId" : menuId ,"productId" : productId,"status" : status },
					successCallback:function(result){
						loan.productlist.freshGrid();
					},
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
	 * 发布产品按钮
	 */
	publishProduct : function() {
		var ids = $("#productGridId").jqGrid("getGridParam", "selrow");
		if (ids == null) {
			loan.tooltip("请选择需要发布的产品", "error");
			return;
		}
		var menuId = $("#menuId").val();
		var productId = $("#productGridId").jqGrid('getCell', ids, 'productId');
		$.artDialog({
			title:"提示",
			content:"确定要发布吗？",
			ok:function(){
				loan.ajaxDo({
					url : loan.basePath + "/product/publishProduct",
					params : { "menuId" : menuId ,"productId" : productId },
					successCallback:function(result){
						loan.productlist.freshGrid();
					},
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
	 * 查看详情按钮
	 */
	productDetail:function(menuId,rowid){
		$("#rowid").val(rowid);
		var menuId=$("#menuId").val();
		var productId = $("#productGridId").jqGrid('getCell',rowid,'productId');
		parent.loan.tabcut.childAddIframe("查看详情",loan.basePath+"/product/queryProductDetail?menuId="+menuId+"&productId="+productId,"queryProductDetail",true,true);
	},
	
	/**
	 * 新增页面
	 */
	toAddProduct : function(menuId){
		var method="add";
		parent.loan.tabcut.childAddIframe("新增产品",loan.basePath+"/product/toAddProduct?menuId="+menuId+"&method="+method,"toAddProduct",true,true);
	},
	/**
	 * 修改页面
	 */
	queryProductInfo : function(menuId){
		var method="update";
		var id = $("#productGridId").jqGrid("getGridParam", "selrow");
		if (id==null) {
			loan.tooltip("请选择一个要修改的产品", "error");
			return;
		}
		var publishStatus=$("#productGridId").jqGrid("getCell",id, "publishStatus");
		if(publishStatus=='1'){
			loan.tooltip("已发布的产品不能修改", "error");
			return;
		}
		var productId = $("#productGridId").jqGrid('getCell', id, 'productId');
		parent.loan.tabcut.childAddIframe("修改产品",loan.basePath+"/product/queryProductInfo?menuId="+menuId+"&productId="+productId+"&method="+method,"queryProductInfo",true,true);
	},
	
}


