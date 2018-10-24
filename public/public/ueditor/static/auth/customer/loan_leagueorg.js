loan.leagueorg= loan.leagueorg || {
	
/*******************************首页**********************************************/
	/**
	 * 签约产品按钮
	 */
	productBtn:function(menuId,rowId){	
		$("#rowId").val(rowId);
		loan.s_addPop("设置产品签约",loan.basePath+"/league/toLeaproduct?menuId="+menuId,"",580,300,{isChangeClose:true});
	},
	
	/**
	 * 下拉选项初始化
	 */
	setSelect:function(id,value,temp) {
		$("#"+id).prepend("<option value='"+value+"'>"+temp+"</option>");
		$("#"+id).val(value);
	},
	
	/**
	 * 普通搜索按钮
	 */
	searchFunc:function(){	
		
		var leagueType = "";//客户分类
		var userName = "" ;//客户名称
		if($("#leagueType").val()!="-1"){
			leagueType = $("#leagueType").val();
		}
		userName = $("#userName").val();
		$("#leagueGridId").jqGrid("setGridParam", {   
			postData:{'menuId':'8004','leagueType':leagueType,'userName':userName,
				'leagueType':leagueType,
				'format':'json'},
				page:1
	    }).trigger('reloadGrid'); 
	},
	
/*******************************签约页面******************************************/
	/**
	 * 页面点击事件
	 */
	clickPage : function(evt) {
		var e = evt || window.event;
		var obj = e.srcElement ? e.srcElement : e.target;
		var target = $(obj.parentElement.offsetParent).attr("id");
		var rowid = $("#rowid").val();
		var colid = $("#iCol").val();
		var cellName = $("#cellName").val();
		if(target != "productGridId" && rowid && colid) {
			var ev = jQuery.Event("keydown");
			ev.keyCode = 13 //enter key
			jQuery("#"+rowid+"_"+cellName).trigger(ev);
		}
	},
	
	/**
	 * 
	 */
	afterEditCellFunc:function(rowid,name,val,iRow,iCol){
		$("#rowid").attr("value",iRow);
		$("#iCol").attr("value",iCol);
		$("#cellName").attr("value",name);
	},
	
	/**
	 * 关闭子窗口
	 */
	closeChildWindow : function() {
		parent.$("#focus").focus();
		loan.s_Pop_closedChild(true,false);
	},
	
	/**
	 * 初始化签约产品表头
	 */
	initProductGrid:function () {
		jQuery("#productGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['贷款产品','签约','合作费用比例（%）','产品id',], 
			colModel: [
			   {name:'productName',index:'productName', align:'center',sortable:false,width:'40%',},
	           {name:'signFlag',index:'signFlag', align:'center',sortable:false,width:'30%',
				   formatter: "checkbox",
				   formatoptions:{disabled:false}},
	           {name:'divideRatio',index:'divideRatio',align:'center', editable:true,width:'30%',sortable: false,
        		   formatter:'number',
        		   formatoptions:{decimalSeparator:".", thousandsSeparator: "", decimalPlaces:4,defaultValue:''},
        		   editrules: {edithidden:true,required:true,number:true,minValue:0,maxValue:100}},
	           {name:'productId',index:'productId', align:'center',hidden:true},
	        ], 
			rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			cellEdit : true,  //设置可编辑单元格
			sortname: 'productId',  
		    sortorder: 'desc',
		    afterEditCell:loan.leagueorg.afterEditCellFunc,
			loadComplete:function(){},
			gridComplete : function() {
				var ids = $("#productGridId").jqGrid('getDataIDs');
			}
		})
		
		$("#productGridId").setGridWidth(400);
	},
  	
	
	/**
	 * 查询产品列表
	 */
	queryProduct:function() {
    	loan.ajaxDo({
            url:loan.basePath+"/signProduct/queryProduct?menuId=800401",
            params:{'productType':'0'},
            successCallback:loan.leagueorg.showProductInGrid,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
    },
    
    /**
	 * 显示数据到表
	 */
    showProductInGrid:function(result) {
    	var products = result.list;
    	if(!products || products.length < 1) return;
    	for(var i = 0; i < products.length; i++) {
			var obj = new Object();
			obj.productName = products[i].productName;
			obj.productId = products[i].productId;
			var flag = jQuery("#productGridId").jqGrid('addRowData',i+1,obj);
		}
    },
    
    /**
     * 查询加盟商签约产品
     */
    queryLeagueSignProduct:function() {
    	var rowid = parent.$("#rowId").val();
    	var userId = parent.$("#leagueGridId").jqGrid("getCell",rowid,"userId");
    	loan.ajaxDo({
            url:loan.basePath+"/signProduct/queryLeagueSignProduct",
            params:{'userId' : userId, 'menuId' : '800401', 'format' : 'json'},
            successCallback:loan.leagueorg.initCheckedProduct,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
    },
    
    /**
	 * 初始化加盟商选中签约产品  
	 */
    initCheckedProduct:function(result){
		var list = result.list;
		if(list){
			$(list).each(function (i, product) {
				var datas = $("#productGridId").jqGrid('getRowData');
				$(datas).each(function (i, item){
					//如果产品已经签约
					if(product.productId == item.productId){
						//修改checkbox的状态为checked
						$("#productGridId").jqGrid("setCell",i+1,'signFlag','Yes');
						$("#productGridId").jqGrid("setCell",i+1,'divideRatio',(product.divideRatio*100));
					}
				});
			});
		}
	},
    
	/**
     * 产品签约提交
     */
    submitSignProduct:function() {
    	var rowid = parent.$("#rowId").val();
    	var userId = parent.$("#leagueGridId").jqGrid("getCell",rowid,"userId");
    	var details = jQuery("#productGridId").jqGrid("getRowData");
    	//不存在产品
    	if(!details) return;
		var list = new Array();
		var signCount = 0;//签约产品的数量
		for(var i = 0; i < details.length; i++) {
			var product = details[i];
			if(product.signFlag === 'Yes') {
				if(!product.divideRatio) {
					loan.tooltip("请填写【"+product.productName+"】产品的合作费用比例","error");
					return;
				}
				var obj = new Object();
				obj.productId = product.productId;
				obj.userId = userId;
				obj.divideRatio = product.divideRatio/100;
				list.push(obj);
				signCount++;
			}
		}
		if(signCount < 1) {
			loan.tooltip("请选择至少一种产品签约","error");
			return;
		}
		var productList = JSON.stringify(list);
		
		//提交
        loan.ajaxDo({
            url:loan.basePath+"/signProduct/setLeagueSignProduct",
            params:{'productsStr':productList,'menuId':'800401','menuLog':'1','format':'json'},
            successCallback:function(){
				parent.$('#focus').focus();
				loan.s_Pop_closedChild(true,false);
			},
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
    },
    
    initDialog:function() {
    	var oldInfoDialog = $.jgrid.info_dialog;
    	$.extend($.jgrid,{
    	    info_dialog: function (caption, content, c_b, modalopt) {
    	    	var mopt = {
    	    			width:290,
    	    			height:'auto',
    	    			dataheight: 'auto',
    	    			drag: true,
    	    			resize: false,
    	    			left:150,
    	    			top:50,
    	    			zIndex : 1000,
    	    			jqModal : true,
    	    			modal : false,
    	    			closeOnEscape : true,
    	    			align: 'center',
    	    			buttonalign : 'center',
    	    			buttons : []
    	    		};
    	        return oldInfoDialog.call (this, caption, content, c_b, mopt);
    	    }
    	});
    }
	
	
};

	