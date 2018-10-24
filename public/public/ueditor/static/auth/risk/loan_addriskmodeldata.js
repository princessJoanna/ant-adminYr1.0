loan.addriskModelData = loan.addriskModelData || {
	/** 是否已经计算，默认未计算 */
	isClickCalc : false,
	domainSave:'',//菜单号
	/**
	 * 获取后台json数据
	 *
	 */
	preFactorData:function(){
		//更新所有因子的vaue值
		var value = $("#riskModel").val();
		if(value == '-1'){
			loan.tooltip("请先选择评分卡","error");
		}
		var detaillist = new Array();
		var domainSave = loan.addriskModelData.domainSave;
		if(domainSave){
    		for(var i = 0;i < domainSave.length;i++){
    			var target = new Object();
    			if(domainSave[i].calculateType == '0'){//手动计算时需要更新该因子的计算值
    				var value;
    				if(domainSave[i].factorType == '1'){//定性
                    //查找value值
	    				var ulList = $("#"+domainSave[i].factorId).next('ul').find('li').find('input');
	    				for(var i=0;i<ulList.length;i++){
		    				var tmp = ulList[i];
		    				if($(tmp).attr('checked') == 'checked'){
		    					 value = $(tmp).val();
		    			    }
    				    }
    				}else if(domainSave[i].factorType=='0'){
    					value = $("#"+domainSave[i].factorId).val();
    				}
    				var modelId = domainSave[i].modelId;
    				var factorId = domainSave[i].factorId;
    				target.modelId = modelId;
    				target.factorId = factorId;
    				target.value = value;
    				detaillist.push(target);
    			}
    		}
		}
		return JSON.stringify(detaillist);
	},
	/** 点击计算评级得分 */
	calcRiskRate : function(){
		// 将需要手动计算的风险因子对应的点击和输入的值，传到后台进行计算
		var modeldataId = $('#modelDataId').val();// 更新信息，不新增
		if(!modeldataId){
			loan.tooltip("请先选择用户进行评分","error");
			return;
		}
		var dataAry = [];
		$('#dingx').find('li').each(function(i){
			
			var val = "";
			var tmp;
			var ruleId = "";
			// 需要手动计算的
			if($(this).attr('data-need') == 'need'){
				var id = $(this).attr('id');
				var name = $(this).attr('data-name');
				if($(this).find('input').attr('type') == 'radio'){
					val = $(this).find('input:checked').val();
					ruleId = $(this).find('input:checked').attr('id');
				}else{
					val = $(this).find('input').val();
				}
				if(!val){
					loan.tooltip("[" + name + "]不能为空！","error");
					return;
				}
				tmp = new Object();
				tmp.factorDataId= $(this).attr('data-factorDataId');
				tmp.factorId = id;
				tmp.value = val;
				tmp.targetName = name;
				tmp.ruleId = ruleId;
				tmp.modelId = $('#riskModel').val();
			}
			
			if(null != tmp){
				dataAry.push(tmp);
			}
		});
		// 格式化
		var data = JSON.stringify(dataAry);
		// ajax 请求
		loan.ajaxDo({
			url : loan.basePath + "/riskModelData/updateRiskFactorData",
			params : {menuId : '600601', modelDataId : $('#modelDataId').val() , modelId : $('#riskModel').val(), 'factorData' : data , format : 'json' },
			successCallback:function(result){
				if(result && result.ratingResult){
					var riskResult = result.ratingResult;
					$('#modelScore').text(riskResult.totalScore);// 总得分
					$('#degree').text(riskResult.level);// 等级
					$('#suggestRatio').text(riskResult.suggestRate);// 建议利率
					$('#suggestBalance').text(riskResult.suggestCredit);// 建议授信
				}
				//关闭子框架
				//loan.tabcut.childClosedIframe(true);
				// 已经计算了
				loan.addriskModelData.isClickCalc = true;
				// 将按钮置为只读
				$('#calcRateBtn').attr('readonly' , 'readonly');
			},
			successTip:true, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
	},
	
	/** ----更新风险因子数据--------------------*/
	getFactorData:function() {
		//等级项列表
		var details = loan.addriskModelData.preFactorData();
		loan.ajaxDo({
			url:loan.basePath+"/riskModelData/updateRiskFactorData",
			params : {'detailListStr' : details , 'menuId' : '600601'},
			successCallback:function(){
				//关闭子框架
				loan.tabcut.childClosedIframe(true);
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
	/**
	 * 查询用户风险模型，用于展示上次风险模型数据
	 * */
	qryUserRiskModelData : function(){
		var userId = $('#userId').val();
		if(userId){// 用户编号有效才查询
			loan.ajaxDo({
				url:loan.basePath+"/riskModelData/qryUserRMData",
				params:{ userId : userId, menuId : $('#menuId').val(),format : 'json' },
				successCallback:function(result){
					if(result.domain && result.domain.degreeName){
						$('#currentCreditLevel').html(result.domain.degreeName);
					}else{
						$('#currentCreditLevel').html('无');
					}
				},
				successTip:true, //提示
				bizErrTip:true,  //提示
				chainPar:this
			});
		}
	},
	/**
	 * 初始化下拉框时应先选择客户
	 */
	selectModelList:function(){
		var menuId = $("#menuId").val();
		loan.ajaxDo({
            url : loan.basePath + "/riskModelData/queryRiskModelList",
            params:{ 'menuId' : menuId , 'format' : 'json'},
            successCallback:function(result){
        		if(result && result.modelListDomainList) {
        			var domain = result.modelListDomainList;
        			//给下拉框赋值
        			$('#riskModel option').remove();
        			var html = '';
        			for(var i=0;i<domain.length;i++){
        				html += '<option value="' + domain[i].modelId + '">' + domain[i].modelName + '</option>';
        			}
        			$("#riskModel").append("<option value='-1'>请选择</option>"); 
        			$('#riskModel').append(html);
        		}
        	},
            successTip:false, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
	},
	/** 提交表单 */
	submit : function(){
		if(loan.addriskModelData.isClickCalc == false){
			loan.tooltip("还未计算评分，请点击计算评级得分","error");
			return;
		}
		var params = {
			modelDataId : $('#modelDataId').val(),
			format : 'json',
			modelScore : $('#modelScore').text() , 
			degree : $('#degree').text(), 
			suggestRatio : $('#suggestRatio').text(),
			suggestBalance : $('#suggestBalance').text(),
			remark : $('#remark').val(),
			"menuId" : "600604"
		};
		// 表单提交方法
		loan.ajaxDo({
            url : loan.basePath + "/riskModelData/updateRiskModelData",
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
