/**
 * 工作流的具体节点的执行业务
 */
loan.flownode = loan.flownode || {
	submitFunc : function() {
		var chk = $('input[name="flowApprove"]:checked').val();
		if(!chk){
			loan.tooltip("请选择意见","error");
			return;
		}
		var processId = $("#processId").val();
		var orderId = $("#orderId").val();
		var taskId = $("#taskId").val();
		var nodeName = $("#taskNodeName").val();
		var taskName = $("#taskName").val();
		var flowApprove = $("input[name='flowApprove']:checked").val();
		var description = $("#description").val();
		if(description && description.length > 200){
			loan.tooltip("[审批意见]不能超过200个字符！","error");
			return;
		}
		$(this).attr("disabled","disabled");
		var params = {
				"menuId" : '0',
				"processId" : processId,
				"orderId" : orderId,
				"taskId" : taskId,
				"nodeName" : nodeName,
				"taskName" : taskName,
				"flowApprove" : flowApprove,
				"description" : description,
				"format" : 'json'
		};
		var url = $("#action").val();
		loan.ajaxDo({
	        url:loan.basePath + url,
	        params : params ,
			successCallback:function(data){
				// 主要修改待办任务页面点击业务处理后待办任务列表没有刷新的问题 -- 2016-06-07
				loan.tabcut.childClosedIframe(true);
				//var menuId = $('#menuId').val();
				//$('#6201list',parent.parent.document).remove();
				//$('#6201Con',parent.parent.document).remove();
				//parent.parent.loan.tabcut.childAddIframe("待办任务",loan.basePath + "/flow/toTaskList?menuId=6201&type=" + menuId + "&t=" + Math.random());
			},
			errorCallback : function(){
				$('#flow_submit').removeAttr("disabled");
			},
			bizErrCallback : function(){
				$('#flow_submit').removeAttr("disabled");
			},
			successTip:true,
			bizErrTip:true,
			chainPar:this
		});
	},
	/**
	 * 重写关闭子tab页的方法
	 */
	changCloseIframe:function(){
		$.extend(loan.tabcut,{
			childClosedIframe:function(isRefresh){
				var isRefresh = isRefresh || false;
				var getLi = $('#tabList',parent.parent.document).find('li').filter('.on');
				var getListId = getLi.attr('id');
				var i = getListId.indexOf('list');
				var getIframeId = getListId.substring(0,i);
				
				var getUrl = $('#'+ getIframeId + 'Con',parent.parent.document).find(".m-frameCon")[0].src;
				var showListId = loan.tabcut.parseQueryString(getUrl)['isReturn'];
				var j = jQuery.inArray(getIframeId, parent.parent.idArray);
				parent.parent.idArray.splice(j,1);
				if(showListId){		
					var i = showListId.indexOf('list');
					var getId = showListId.substring(0,i);
					$('#'+ showListId,parent.parent.document).addClass('on');
					if(isRefresh){
						$('#'+ getId + 'Con',parent.parent.document).find(".m-frameCon")[0].contentWindow.location.reload();
					}
					$('#'+ getId +'Con',parent.parent.document).show();
					if($('#'+ getId +'list',parent.parent.document).prev("li").attr("id")=="0list"){
						$("#0list em",parent.parent.document).hide();
						$("#0list",parent.parent.document).css("padding-right","15px");
					}
					else {
						$("#0list em",parent.parent.document).show();
						$("#0list",parent.parent.document).css("padding-right","0px");
					}
				}else{	
					$('#'+ getIframeId +'list',parent.parent.document).prev().addClass('on');
					$('#'+ getIframeId +'Con',parent.parent.document).prev().show();
				}
				$('#'+ getIframeId +'list',parent.parent.document).remove();
				$('#'+ getIframeId +'Con',parent.parent.document).remove();
			}
		});
	}
}

$(document).ready(function(){
	loan.flownode.changCloseIframe();
	var flag = $("#readflag").val();
	if(flag == '1') {
		$(".readonly").hide();
	} else {
		$(".readonly").show();
	}
	$("#flow_submit").on("click" , loan.flownode.submitFunc);
	
});
