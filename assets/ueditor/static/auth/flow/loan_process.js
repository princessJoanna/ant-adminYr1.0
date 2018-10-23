// 流程
loan.process = loan.process || {
	/** 流程编辑按钮 */
	editBtnFunc : function(processId){
		parent.loan.tabcut.childAddIframe("编辑流程",loan.basePath+"/process/edit?menuId=610201&id=" + processId,"edit",true,true);
	},
	/** 流程设计 */
	designBtnFunc : function(processId){
		parent.loan.tabcut.childAddIframe("流程设计",loan.basePath+"/process/design?menuId=6101&processId=" + processId,"design",true,true);
	},
	/** 启动流程实例 */
	startBtnFunc : function(startUrl){
		parent.loan.tabcut.childAddIframe("启动流程",loan.basePath + startUrl + "&menuId=310407","start",true,true);
	},
	/** 查看流程图 */
	pictBtnFunc : function(processId , orderId){
		parent.loan.tabcut.childAddIframe("查看流程图",loan.basePath + "/process/display?processId=" + processId + "&orderId=" + orderId + "&menuId=310408","start",true,true);
	},
	/** 流程列表 */
	flowBtnFunc : function(){
		parent.loan.tabcut.childAddIframe("流程列表",loan.basePath + "process/list?menuId=3101","list",true,true);
	},
	/** 任务处理 */
	executeBtnFunc : function(url,processId,taskId,orderId){
		parent.loan.tabcut.childAddIframe("任务处理",loan.basePath + url + "?menuId=3104090&processId=" + processId + "&taskId=" + taskId + "&orderId=" +orderId ,"execute",true,true);
	},
	/** 删除流程 */
	delBtnFunc : function(processId){
		loan.ajaxDo({
			url:loan.basePath+"/process/delete",
			params : {"processId":processId ,"menuId":"610202"},
			chainPar:this,
			successTip:true,
			successCallback:function(data){
				window.location.reload();
			}
		});
	},
	/** 重新部署 */
	redeploy : function(processId){
		parent.loan.tabcut.childAddIframe("重新部署",loan.basePath + "/process/deploy?menuId=6103&processId=" + processId  ,"redeploy",true,true);
	}
	
}
