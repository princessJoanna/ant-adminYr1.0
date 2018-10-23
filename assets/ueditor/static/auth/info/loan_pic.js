loan.pic = loan.pic || {
	/**搜索*/
	sell_sellorderquery : function() {
		var positionType = $("#positionType").val();
		var status = $("#status").val();
		var startDate = $("#startDate").val().replace(/-/g,"");
		var endDate = $("#endDate").val().replace(/-/g,"");
		if(startDate && endDate && (startDate > endDate)) {
			loan.tooltip("开始日期应该小于结束日期","error");
			return;
		}
		if(positionType && positionType == "-1") {
			positionType = "";
		}
		if(status && status == "-1") {
			status = "";
		}
		$("#picGridId").jqGrid("setGridParam", {   
			postData:{"format":"json","menuId":'3002','advertStatus':status,'positionType':positionType,
				'endTimeCn':endDate,'startTimeCn':startDate},
			page:1
	    }).trigger('reloadGrid');
	},
	/**
	 * 清空查询条件
	 */
	clearCondition : function() {
		$("#startDate").val("");
		$("#endDate").val("");
		$("#positionType").val("-1");
		$("#status").val("-1");
	},
	/**跳转到新增页面*/
	addPage : function() {
		loan.s_addPop("新增图片广告",loan.basePath+"/advert/toaddpic?menuId=300201","",450,400,{isRefresh:false});
	},
	
	/**跳转到修改页面*/
	modify : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		var rowObj = $("#picGridId").jqGrid('getRowData',rowid);
		if(rowObj.advertStatus == '0') {
			loan.s_addPop("修改图片广告",loan.basePath+"/advert/modifypic?menuId="+menuId,"",450,400,{isRefresh:false});
		}else if(rowObj.advertStatus == '1') {
			loan.tooltip("该广告图片已经是发布状态，不能修改","error");
			return;
		}else{
			loan.tooltip("该广告图片已经是无效状态，不能修改","error");
			return;
		}
			
	},
	
	/** 选中行的触发事件*/
	selectRowFunc : function(rowid) {
		$("#rowid").attr("value",rowid);//记录当前选中的行的rowid
	},
	
	/**删除*/
	del : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		var title = "提示";
		var picFilename = $("#picGridId").jqGrid('getCell',rowid,'picFilename');
		var advertStatus = $("#picGridId").jqGrid('getCell',rowid,'advertStatus');
		if(advertStatus == '2') {
			loan.tooltip("该项无效不能删除","error");
			return;
		}
		
		if(advertStatus == '1') {
			loan.tooltip("该项已发布不能删除","error");
			return;
		}
		var content = "确定要删除这一条记录？";
		loan.pic.confirmDialog(title,content,loan.pic.delAdvert);
	},
	
	/**删除功能*/
	delAdvert : function() {
		var rowid = $("#rowid").val();
		var advertId = $("#picGridId").jqGrid('getCell',rowid,'advertId');
		var advertStatus = $("#picGridId").jqGrid('getCell',rowid,'advertStatus');
		loan.ajaxDo({
			url:loan.basePath+"/advert/deleteAdvertInfo",
			params:{"menuId":'300203','menuLog':'1',"advertId":advertId,'advertStatus':advertStatus,'menuLog':'1'},
			successCallback:loan.pic.freshGrid,
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#picGridId").jqGrid("setGridParam", {   
			/*postData:{'format':'json'}*/
	    }).trigger('reloadGrid'); 
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
	
	/**发布*/
	publishSta : function(){
		var rowid = $("#rowid").val();
		if(rowid == ""){
			loan.tooltip("请选择一条记录！","error");
			return;
		}
		var rowObj = $("#picGridId").jqGrid('getRowData',rowid);
		if(rowObj.advertStatus == "1"){
			loan.tooltip("该广告图片已经是发布状态","error");
			return;
		}else if(rowObj.advertStatus == "2"){
			loan.tooltip("该广告图片已是无效状态","error");
			return;
		}else{
			$.artDialog({
				title:'提示',
				content:"是否确定发布【"+rowObj.picFilename+"】图片？",
				ok:function(){
					loan.pic.publishAdvertFn(rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}
	},
	
	/**发布功能*/
	publishAdvertFn : function(rowid) {
		var rowObj = $("#picGridId").jqGrid('getRowData',rowid);
		loan.ajaxDo({
	  		url:loan.basePath+"/advert/publishAdvert",
	  		params:{"menuId":'300204','menuLog':'1','advertId':rowObj.advertId,'advertStatus':'1','menuLog':'1'},
	  		successCallback:loan.pic.commSuccFun,
	  		successTip:true
	  	})
	},
	
	/**停用*/
	stopAdvert : function(menuId,rowid) {
		$("#rowid").attr("value",rowid);
		var rowObj = $("#picGridId").jqGrid('getRowData',rowid);
		if(rowObj.advertStatus == "2"){
			loan.tooltip("该广告图片已经无效状态","error");
			return;
		}else if(rowObj.advertStatus == "0"){
			loan.tooltip("该广告图片还未发布","error");
			return;
		}else{
			$.artDialog({
				title:'提示',
				content:"是否确定停用【"+rowObj.picFilename+"】图片？",
				ok:function(){
					loan.pic.stopAdvertFn(menuId,rowid);
				},
				cancel:function(){
					return false;
				}
		    })	
		}
	},
	
	/**停用的功能*/
	stopAdvertFn : function(menuId,rowid){
		var rowObj = $("#picGridId").jqGrid('getRowData',rowid);
		loan.ajaxDo({	
	  		url:loan.basePath+"/advert/stopAdvert",
	  		params:{"menuId":'300205','menuLog':'1','advertId':rowObj.advertId,'advertStatus':'2','menuLog':'1'},
	  		successCallback:loan.pic.commSuccFun,
	  		successTip:true
	  	})
	},
	/**
	 * 启用
	 */
	enableAdvert : function(menuId,rowid){
		var rowObj = $("#picGridId").jqGrid('getRowData',rowid);
		loan.ajaxDo({
	  		url:loan.basePath+"/advert/enableAdvert",
	  		params:{"menuId":'300206','menuLog':'1','advertId':rowObj.advertId},
	  		successCallback:loan.pic.commSuccFun,
	  		successTip:true
	  	})
		
	},
	/**刷新当前页面*/
	commSuccFun : function(){
		loan.s_Pop_closedParent(true,false);
	},
	
	alertPic : function(url) {
		new addApplyOutContent(
				{
					src:url
				}
			)
	}
};
$(function(){
	jQuery.extend($.fn.fmatter,{
		picUrl  : function(cellvalue, options, rowObject){
			return "<a onclick=\"loan.pic.alertPic('"+cellvalue+"')\" style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";
		}
	});
	jQuery.extend($.fn.fmatter,{
		picUrlHiden  : function(cellvalue, options, rowObject){
			return rowObject.picUrl;
		}
	});
	/*jQuery.extend($.fn.fmatter,{
		linkUrl  : function(cellvalue, options, rowObject){
			return "<a href='"+cellvalue+"' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";
			//<a href='"+depositPath+"' target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+originalName+"</a>",
		}
	});*/
});

$(window).resize(function(){
	loan.grid.mdetailconWidth("picGridId");
})