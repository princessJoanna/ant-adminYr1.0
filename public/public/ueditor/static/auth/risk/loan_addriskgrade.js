loan.addriskGrade = loan.addriskGrade || {

	/**是否已经评分**/
	isClickCalc:false,

	/** 点击计算评级得分 */
	calcRiskRate : function(){
		var totalScore = 0;
		$('#dingx').find('ul').each(function(i){
			var ul = $(this);
			var checkedRadio = ul.find("input:radio:checked");
			if(checkedRadio.length){
				totalScore = totalScore+parseInt(checkedRadio.attr("value"));
			}else{
				loan.tooltip(ul.attr("itemName")+"没有选择选项,请选择","error");
				return;
			}
		});
		var degreeId = $("#degreeId").val();

		loan.ajaxDo({
			url : loan.basePath + "/risk/user/score/matchDegree",
			params : {format:'json',degreeId:degreeId,totalScore:totalScore },
			successCallback:function(result){
				if(result && result.riskResult){
					var riskResult = result.riskResult;
					$('#modelScore').text(riskResult.totalScore);// 总得分
					$('#degree').text(riskResult.level);// 等级
					$('#suggestRatio').text(riskResult.suggestRate);// 建议利率
					$('#suggestBalance').text(riskResult.suggestCredit);// 建议授信
					loan.addriskGrade.isClickCalc = true;
				}
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	

	/**
	 * 查询用户详情
	 */
	userDetail : function(userId) {
		var _userId = $("#userId").val();
		if(!_userId){
			_userId = $("#userId").text();
		}
		//判断是否已选择用户
		if(_userId) {
			userId = _userId;
			parent.loan.tabcut.childAddIframe("客户详情",loan.basePath+"/customer/toCusDetail?menuId=800204&userId="+userId,"customerDetail",true);
		} else {
			loan.tooltip("请选择用户","error");
		}
	},


	/** 提交表单 */
	submit : function(){
		if(!loan.addriskGrade.isClickCalc){
			loan.tooltip("还未计算评分，请点击计算评级得分","error");
			return;
		}
		var items = [];
		$('#dingx').find('ul').each(function(i){
			var ul = $(this);
			var item = {};
			var checkedRadio = ul.find("input:radio:checked");
			if(checkedRadio.length){
				item.itemName = checkedRadio.attr("name");
				item.score = checkedRadio.attr("value");
				items.push(item);
			}else{
				loan.tooltip(ul.attr("itemName")+"没有选择选项,请选择","error");
				return;
			}
		});
		var params = {
			modelName : $('#modelName').val(),
			format : 'json',
			modelNo : $('#modelCode').val() ,
			level : $('#degree').text(),
			suggestRate : $('#suggestRatio').text(),
			suggestCredit : $('#suggestBalance').text(),
			userId:$("#userId").val(),
			totalScore:$('#modelScore').text(),
			gradeItems:JSON.stringify(items)
		};
		// 表单提交方法
		loan.ajaxDo({
            url :  loan.basePath + "/risk/user/score/saveRiskGradeResult",
            params: params ,
            successCallback:function(result){
            	loan.tabcut.childClosedIframe(true);
        	},
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
	}
	
	
};
