loan.custommanager = loan.custommanager || {
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#userGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId':'8001'}
	    }).trigger('reloadGrid'); 
	},
	
	/** 选中行的触发事件*/
	selectRowFunc:function(rowid){
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},

	/**清空查询条件*/
	clearlendVal : function() {
		$("#condition").val("");
	},
	
    /**
     * 新增按钮
     */
    addBtnFunc:function(){
        // parent.loan.tabcut.childAddIframe("新增个人客户",loan.basePath+"/borrowermanager/toAddSaleManager?menuId="+menuId,"addcustom",true,true);
        loan.s_addPop("新增账号",loan.basePath+"/borrowermanager/toAddSaleManager?menuId=800201","",530,360,{isRefresh:true,isChangeClose:true});
    },

	/**
	 * 初始化选项
	 */
	setSelect:function(id) {
		$("#"+id).prepend("<option value='-1'>所有</option>");
		$("#"+id).val("-1");
	},
	
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 确认提示框
	 */
	confirmDialog:function(dtitle,dcontent,callBackFunc) {
		$.artDialog({
			title:dtitle,
			content:dcontent,
			ok:callBackFunc,
			cancel:function(){
				return false;
			}
	    });
	},

	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){

        var condition = $("#condition").val();
		$("#userGridId").jqGrid("setGridParam", {
			postData:{'menuId':'8002','condition':condition,
				'format':'json'},
			page:1
		}).trigger('reloadGrid');

	}
};