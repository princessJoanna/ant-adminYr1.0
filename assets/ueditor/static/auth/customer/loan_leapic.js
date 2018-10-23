loan.leapic = loan.leapic || {
	/**搜索*/
	search : function() {
		var picType = $("#picType").val();
		var userName = $("#userName").val();
		var confirmStatus = $("#confirmStatus").val();
		$("#picGridId").jqGrid("setGridParam", {   
			postData:{"format":"json",'picType':picType,'userName':userName,
				'confirmStatus':confirmStatus},
			page:1
	    }).trigger('reloadGrid');
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
	 * 删除按钮
	 */
	del : function(menuId,rowid) {
		$("#rowid").val(rowid);
		var pic = $("#picGridId").jqGrid('getRowData',rowid);
		var content = "确定要删除加盟商【"+pic.userName+"】的"+pic.picTypeCn+"吗?"
		if(pic.confirmStatus == '2' && pic.status == '1') {
			content = "该图片是加盟商【"+pic.userName+"】正在使用的"+pic.picTypeCn+"，确定要删除吗?"
		} else if(pic.confirmStatus == '0' && pic.status == '1') {
			content = "该图片是加盟商【"+pic.userName+"】新提交审核的"+pic.picTypeCn+"，确定要删除吗?"
		}
		//确认是否要删除
		$.artDialog({
			title:"提示",
			content:content,
			ok:function(){
				//var rowid = $("#rowid").val();
				loan.leapic.delFunc(menuId,rowid);
			},
			cancel:function(){
				return false;
			}
	    });
	},
	/**
	 * 执行删除
	 */
	delFunc:function(menuId,rowid){
		//获取要删除的id
		var id = $("#picGridId").jqGrid('getCell',rowid,'pictId');
		loan.ajaxDo({
			url:loan.basePath+"/league/delLeaguePic",
			params:{'menuId':menuId,'menuLog':'1','pictId':id},
			successCallback:function(){
				$("#rowid").val('');
				loan.leapic.freshGrid();//刷新页面
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	
	/**
	 * 审核信息按钮
	 */
	auditBtnFunc:function(menuId,rowid){	
		$("#rowid").val(rowid);
		var pic = $("#picGridId").jqGrid('getRowData',rowid);
		if(pic.confirmStatus != '0') {
			loan.tooltip("该数据审核状态为"+pic.confirmStatusCn+"，不可以再审核","error");
			return;
		}
		loan.s_addPop("加盟商审核",loan.basePath+"/league/toExamLeaPic?opType=one&menuId="+menuId,"",430,320,{isChangeClose:true});
	},
	
	/**
	 * 批量审核信息按钮
	 */
	auditBatchFunc:function(menuId){	
		var ids = $("#picGridId").jqGrid('getGridParam','selarrrow');
		var checkCount = ids.length;
		if(checkCount==0){
			loan.tooltip("请选择要批量审批的图片","error");
			return;
		}
		for(var i = 0; i < ids.length; i++){
			var rowid = ids[i];
			var pic = $("#picGridId").jqGrid('getRowData',rowid);
			if(pic.confirmStatus != '0') {
				loan.tooltip("第"+rowid+"条数据审核状态为"
						        +pic.confirmStatusCn+"，不可以再审核，请取消","error");
				return;
			}
		}
		
		loan.s_addPop("加盟商审核",loan.basePath+"/league/toExamLeaPic?opType=two&menuId="+menuId,"",430,320,{isChangeClose:true});
	},
	
	/**
	 * 提交审核
	 */
	submitAudit:function(menuId) {
		var rowid = parent.$("#rowid").val();
		var pictId = parent.$("#picGridId").jqGrid("getCell", rowid, "pictId");
		var confirmContent = $("#confirmContent").val();
		var confirmStatus = $("input[name='confirmStatus']:checked").val();
		if(!confirmStatus) {
			loan.tooltip("请选择表决意见","error");
			return;
		}
		
		loan.ajaxDo({
			url:loan.basePath+"/league/confirmPic",
			params:{'menuId':menuId,'menuLog':'1','format':'json',
				'pictId':pictId,
				'confirmContent':confirmContent,'confirmStatus':confirmStatus},
			successCallback:function(result) {
				parent.$("#focus").focus();
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 批量提交审核
	 */
	submitBatchAudit:function(menuId) {
		var ids = parent.$("#picGridId").jqGrid('getGridParam','selarrrow');
		var pictIdsArray = new Array();
		for(var i = 0; i < ids.length; i++){
			var rowid = ids[i];
			var pictId = parent.$("#picGridId").jqGrid("getCell", rowid, "pictId");
			pictIdsArray.push(pictId);
		}
		var pictIdsStr = JSON.stringify(pictIdsArray);
		
		var confirmContent = $("#confirmContent").val();
		var confirmStatus = $("input[name='confirmStatus']:checked").val();
		if(!confirmStatus) {
			loan.tooltip("请选择表决意见","error");
			return;
		}
		
		loan.ajaxDo({
			url:loan.basePath+"/league/confirmPics",
			params:{'menuId':menuId,'menuLog':'1','format':'json',
				'pictIdsStr':pictIdsStr,
				'confirmContent':confirmContent,'confirmStatus':confirmStatus},
			successCallback:function(result) {
				parent.$("#focus").focus();
				loan.s_Pop_closedChild(true,false);
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	alertPic : function(url) {
		new addApplyOutContent(
			{
				src:url
			}
		);
	}
};
$(function(){
	jQuery.extend($.fn.fmatter,{
		linkUrl  : function(cellvalue, options, rowObject){
			return "<a onclick=\"loan.leapic.alertPic('"+cellvalue+"')\" style='color:blue;cursor:pointer;text-decoration:none;'>查看图片</a>";
		}
	});
	jQuery.extend($.fn.fmatter,{
		linkUrlHiden  : function(cellvalue, options, rowObject){
			return rowObject.linkUrl;
		}
	});
	
	$(".ui-pg-input").attr("id","focus");
	
});

$(window).resize(function(){
	loan.grid.mdetailconWidth("picGridId");
	
})