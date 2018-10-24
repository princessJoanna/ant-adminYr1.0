loan.adddegreedetail = loan.adddegreedetail || {
	
	/**
	 * 校验:是否存在同名等级项 区间是否重叠
	 */
	validateData:function(){
		//必输下拉框校验
		var triggerStatus = $("#triggerStatus").val();
		if(!triggerStatus){
			$("#triggerStatus").focus();
			loan.tooltip("请选择是否触发","error");
			return false;
		}
		var details = parent.$("#detailGridId").jqGrid('getRowData');
		var minScoreNew = new Number($("#minScore").val());
		var maxScoreNew = new Number($("#maxScore").val());
		//上限下限的比较
		if(minScoreNew > maxScoreNew) {
			$("#minScore").siblings('div').remove();
			$("#maxScore").siblings('div').remove();
			$("#maxScore").focus();
			loan.tooltip("分值下限不能大于分值上限","error");
			return false;
		}
		//利率的校验
		var suggestRatio = $("#suggestRatio").val();
		suggestRatio = new Number(suggestRatio);
		if(suggestRatio > 1000) {
			$("#suggestRatio").siblings('div').remove();
			$("#suggestRatio").focus();
			loan.tooltip("建议利率不得超过1000","error");
			return false;
		}
		if(details && details.length > 0) {
			var targetName = $("#detailName").val();
			var rowid = parent.$("#rowid").val();
			for(var i = 0; i < details.length; i++) {
				//不判断自身
				if((i+1) == rowid) {
					continue;
				}
				var oldname = details[i].degreeDetailName;
				//判读重名
				if(oldname == targetName) {
					loan.tooltip("等级项名称已存在，请修改等级项名称","error");
					return false;
				}
				//判读区间重叠
				var minScoreOld = new Number(details[i].minScore);
				var maxScoreOld = new Number(details[i].maxScore);
				if((maxScoreNew > minScoreOld && maxScoreNew <= maxScoreOld)
						||(minScoreNew <= minScoreOld && maxScoreNew >= maxScoreOld)
						||(minScoreNew >= minScoreOld && minScoreNew < maxScoreOld)) {
					loan.tooltip("存在与等级项["+minScoreOld+","+maxScoreOld+")分值区间重叠,请重新设置分值","error");
					$("#minScore").siblings('div').remove();
					$("#maxScore").siblings('div').remove();
					$("#maxScore").focus();
					return false;
				}
			}
		}
		return true;
	},
	
	initData:function(){
		var type = $("#opType").val();
		if(type == 'up') {
			var rowid = parent.$("#rowid").val();
			var target = parent.$("#detailGridId").jqGrid('getRowData',rowid);
			$("#detailName").val(target.degreeDetailName);
			$("#maxScore").val(target.maxScore);
			$("#minScore").val(target.minScore);
			$("#suggestBalance").val(target.suggestBalance);
			$("#suggestRatio").val(target.suggestRatio);
			$("#triggerStatus").val(target.triggerStatus);
			$("#remark").val(target.remark);
		}
		
	},
	
	/**
	 * 组装数据
	 */
	getData : function(){
		var target = new Object();
		target.degreeDetailName = $("#detailName").val();
		target.maxScore = $("#maxScore").val();
		target.minScore = $("#minScore").val();
		target.suggestBalance = $("#suggestBalance").val();
		target.suggestRatio = $("#suggestRatio").val();
		target.triggerStatus = $("#triggerStatus").val();
		target.triggerStatusCn = $("#triggerStatus").find("option:selected").text();
		target.remark = $("#remark").val();
		return target;
	},
	
	/**
	 * 确定
	 */
	submitAdd:function(){
		if(!loan.adddegreedetail.validateData()){
			return;
		}
		
		var target = loan.adddegreedetail.getData();
		//插入数据或修改数据
		var parentIds = parent.$("#detailGridId").jqGrid('getDataIDs');
		var newid = 1;
		if(parentIds){
			newid = parentIds.length + 1;
		}
		parent.$("#detailGridId").jqGrid('addRowData',newid,target);
		
		//关闭选择窗口
		loan.adddegreedetail.closePage();
	},
	
	submitEdit:function(){
		if(!loan.adddegreedetail.validateData()){
			return;
		}
		//组装数据
		var target = loan.adddegreedetail.getData();
		
		//修改数据
		var rowid = parent.$("#rowid").val();
		parent.$("#detailGridId").jqGrid('setRowData',rowid,target);
		
		//关闭选择窗口
		loan.adddegreedetail.closePage();
	},
	
	/**
	 * 关闭窗口
	 */
	closePage:function(){
		if(parent.$("#focus").length == 1) {
			parent.$("#focus").focus();
		}else if(parent.$("#degreeName").length == 1){
			parent.$("#degreeName").focus();
		}
		parent.$("#rowid").val("");
		loan.s_Pop_closedChild(false,false);
	},
	
	/**
	 * 重新编写校验利率的规则
	 */
	changFloatVerify:function(){
		$.extend(loan.verify,{
			verifyFloat:function($this,value){
				var left = $this.width();
				if(value == ""){
					var Tip = '不能为空';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				if(!v_Regular.float.test(value)){
					var Tip = '类型错误';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				if(value >= 1000){
					var Tip = '最多只能输入3位整数';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				var values=new Array();
				values=value.split(".");
				if(values.length>1 && values[1].length>3){
					var Tip = '最多只能输入3位小数';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				loan.verify.formValidatorShowMsgTrue($this,left);
				return true;
			}
		});
	},
	
}

$(function(){
	//重新绑定子窗口右上角点击关闭事件
	parent.$('#sPopClose').bind("click",loan.adddegreedetail.closePage);
	loan.adddegreedetail.changFloatVerify();
});


