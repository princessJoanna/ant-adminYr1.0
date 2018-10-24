/**
 * 功能说明: ajax请求统一默认超时时间
 * @author ljf <liangjf@hundsun.com>
 * @date 2015-2-26 下午4:14:49
 * @version V1.0
 */
loan.ajaxTimeout = 300000;
loan.grid = loan.grid || {};


$(function(){
	/**
	 * ajax请求session过期全局处理函数
	 */
	$.ajaxSetup({     
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",     
	    complete:function(XMLHttpRequest,textStatus){  
	    	var responsetText = XMLHttpRequest.responseText
	    	var data = $.parseJSON(responsetText);
	        // 通过XMLHttpRequest取得响应头，sessionstatus，  
	        var webStatus = XMLHttpRequest.getResponseHeader("webStatus");  
	       
	        if(webStatus == "timeout"){//session过期标志 
		        //跳转到登录页面  
        		top.location.href = loan.basePath + "/login";
	        }else if(webStatus == "unAuth") {//访问越权
	        	//跳转到登录越权页面  
        		location.href = loan.basePath + "/unAuth";
	        }else if(webStatus == "forceLogout"){//强制退出
	        	var errMsg = data.response.errMsg;
    			$("#errMsg").text("");
    			$.artDialog({
    				title:"提示",
    				isCloseBtn:false,  
    				content:errMsg,
    				cancel:false,
    				ok:function(){
    					window.location.replace(loan.basePath + "/logout");
    				},
    				isCloseicon:false
    			});
	        }else if(webStatus == "XSS") {//XSS攻击
	        	var href = data.response.href;
	        	location.href = loan.basePath + href;
	        }
	    }  
	}); 
});

//产生遮罩层DIV
loan.loadDiv = function(text) {
    var div = "<div id='_layer_'><div id='_MaskLayer_' style='filter: alpha(opacity=30); -moz-opacity: 0.3; opacity: 0.3;background-color: #000; width: 100%; height: 100%; z-index: 1000; position: absolute;" +
      			"left: 0; top: 0; overflow: hidden; display: none'></div><div id='_wait_' style='z-index: 1005; position: absolute; width:430px;height:218px; display: none'  ><center><h3>" +
      			"" + text + "<img src='"+loan.basePath +"/flyfish/style/images/flyfish/loading.gif' /></h3></center></div></div>"; 
    return div; 
}

//获取相对位置
loan.Position = function() {  
	$("#_MaskLayer_").width($(document).width());   
  	var deHeight = $(window).height();     
  	var deWidth = $(window).width();     
  	$("#_wait_").css({ left: (deWidth - $("#_wait_").width()) / 2 + "px", top: (deHeight - $("#_wait_").height()) / 2 + "px" }); 
}

//触发遮罩层
loan.LayerShow = function(text) {
    var addDiv= loan.loadDiv(text);  
    $(addDiv).appendTo("body");  
    $($.parseHTML(addDiv, document, true)).appendTo("body");  
    //var element = $("#" + addDiv).appendTo(document.body);     
    $(window).resize(loan.Position);  
    var deHeight = $(document).height();    
    var deWidth = $(document).width();    
    loan.Position();     
    $("#_MaskLayer_").show();   
    $("#_wait_").show();
}

//删除
loan.del = function() { 
	var delDiv = document.getElementById("_layer_");     delDiv.parentNode.removeChild(delDiv); 
}

//隐藏遮罩层
loan.LayerHide = function() { 
    $("#_MaskLayer_").hide(); 
    $("#_wait_").hide(); 
    loan.del(); 
}

/**
 * 功能说明: 交易提示信息
 * @author ljf <liangjf@hundsun.com>
 * @date 2015-2-26 下午4:14:49
 * @version V1.0
 * @param msg 信息文本
 */
loan.tooltip = function(msg,variety,time) {
	$("#m_tip_con",top.document).remove();
	var time = time || 5000;
	var kind = null;
	if(variety == "succeed"){
		kind = 'm-tip-succeed';	
	}else if(variety == "error"){
		kind = 'm-tip-error';	
	}
	var str = ''
		str += '<div id="m_tip_con" class="m-tip-con '+ kind +'">'+ msg +'</div>';
	$('body',top.document).append(str);
	window.top.setTimeout('$("#m_tip_con",top.document).remove()',time);
};


/**
 * 功能说明: grid请求成功统一处理函数
 * @author ljf <liangjf@hundsun.com>
 * @date 2015-2-26 下午4:14:49
 * @version V1.0
 * @param data 数据
 * @param status 状态
 * @param xhr xhr信息
 */
loan.grid.ajaxSuccessFn = function(data, status, xhr) {
	var ts = this;
	if(!data) {
		var msg = "平台未知错误";
		loan.tooltip(msg,"error");
		return;
	}else if(!data.response) {
		var msg = "平台未知错误";
		loan.tooltip(msg,"error");
		return;
	}
	var response = data.response;//响应信息
	if(response.timeout) {//超时
		return;
	}else if(response.unAuth) {//越权
		return;
	}else if(response.xss) {//XSS攻击
		return;
	}else if(response.forceLogout) {//强制退出
		return;
	}else if(response.success) { //交易成功
		if(ts.p.successTip) {
			var msg = "交易成功";
			if(typeof(response.errMsg) != "undefined" && response.errMsg!="") {
				msg = response.errMsg;
			}
			loan.tooltip(msg,"succeed");
		}
		if(ts.p.successCallback && $.isFunction(ts.p.successCallback)) {//是否存在回调函数
			ts.p.successCallback.call(ts, data, status, xhr);
		}
	}else if(!response.success) { //交易失败
		if(ts.p.bizErrTip || typeof(ts.p.bizErrTip)=="undefined" || ts.p.bizErrTip=="") {
			var msg = "交易失败";
			if(typeof(response.errMsg) != "undefined" && response.errMsg!="") {
				msg = response.errMsg;
			}
			loan.tooltip(msg,"error");
		}
		if(ts.p.bizErrCallback && $.isFunction(ts.p.bizErrCallback)) {//是否存在回调函数
			return ts.p.bizErrCallback.call(ts, response, status, xhr);
		}
	}else {
		loan.tooltip(response.errMsg,"error");
	}
};

/**
 * 功能说明: grid请求失败统一处理函数
 * @author ljf <liangjf@hundsun.com>
 * @date 2015-2-26 下午4:14:49
 * @version V1.0
 * @param xhr xhr信息
 * @param status 状态
 * @param error 错误信息
 */
loan.grid.ajaxErrorFn = function(xhr, status, error) {
	var ts = this;
	var msg = "请求失败";
	loan.tooltip(msg,"error");
	if(ts.p.errorCallback && $.isFunction(ts.p.errorCallback)) {
		ts.p.errorCallback.call(ts, xhr, status, error);
	}
};

/*
*调用方法（例云融易贷的注册判断用户名是否存在）
*  loan.ajaxDo({
		url:ntcUrl,
		params:ntcParams,
		successCallback:validate_adminNoSuccessFn,
		errorCallback:validate_ErrorFn,
		chainPar:this,
		async:null,
		bizErrCallback:validate_adminNoBizErrorFn
	})
*
*/
(function ($) {
	var opts ;
	var artDialog = function (options) {
		opts = $.extend({}, artDialog.defaults, options); 		
		return new ajaxDo(opts);
	};
	function ajaxDo (opts){
		this.defaults=opts;		
		this._init();
	};
	ajaxDo.prototype = {
		_init:function(){
			var ts=this,config=this.defaults;
			if(config.isMask) {
				loan.LayerShow("正在加载中...");
			}			
			if(config.async == null){
				config.async = true;
			}
			this._ajax();	
		},
		_succ:function(data, status, xhr){
			var ts=this,
				isMask=opts.isMask,
				successCallback=opts.successCallback,
				successTip=opts.successTip,
				chainPar=opts.chainPar,
				bizErrTip=opts.bizErrTip,
				bizErrCallback=opts.bizErrCallback;
								
			if(isMask) {
				loan.LayerHide();  //回调函数去掉遮罩层
			}
			if(!data) {
				var msg = "平台未知错误";
				loan.tooltip(msg,"error");
				return;
			}else if(!data.response) {
				var msg = "平台未知错误";
				loan.tooltip(msg,"error");
				return;
			}
			var response = data.response;//响应信息
			
			if(response.timeout) {//超时
				return;
			}else if(response.unAuth) {//越权
				return;
			}else if(response.xss) {//XSS攻击
				return;
			}else if(response.forceLogout) {//强制退出
				return;
			}else if(response.success) { //交易成功
				if(successTip) {
					var msg = "交易成功";
					if(typeof(response.errMsg) != "undefined" && response.errMsg!="") {
						msg = response.errMsg;
					}
					loan.tooltip(msg,"succeed");
				}
				if(successCallback && $.isFunction(successCallback)) {//是否存在回调函数
					return successCallback.call(ts, response, status, xhr,chainPar);
				}
			}else if(!response.success) { //交易失败
				if(bizErrTip) {
					var msg = "交易失败";
					if(typeof(response.errMsg) != "undefined" && response.errMsg!="") {
						msg = response.errMsg;
					}
					loan.tooltip(msg,"error");
				}
				if(bizErrCallback && $.isFunction(bizErrCallback)) {//是否存在回调函数
					return bizErrCallback.call(ts, response, status, xhr,chainPar);
				}
			}else { //交易失败
				loan.tooltip(response.errMsg,"error");
			}
			
		},
		_err:function(xhr, status, error){
			var	ts=this,
				isMask=opts.isMask,
				chainPar=opts.chainPar,
				errorCallback=opts.errorCallback;
				
			if(isMask) {
				loan.LayerHide();  //回调函数去掉遮罩层
			}
			var msg = "请求失败";
			loan.tooltip(msg,"error");
			if(errorCallback && $.isFunction(errorCallback)) {
				errorCallback.call(ts, xhr, status, error,chainPar)
			}
		},
		_ajax:function(){
			var config=this.defaults;	
			var params = $.extend({},config.params,{'format':'json'});
			$.ajax({
				url: config.url,
				type: 'POST',
				data: params,
				dataType: 'json',
				timeout: loan.ajaxTimeout,
				error: this._err,
				success: this._succ,
				async:config.async
			});
		}
	}
	/**
	 * 默认配置
	 * auth:chenliang
	 * time:2015-2-11
	 * @param  url 请求地址
	 * @param params 请求参数
	 * @param successCallback 成功回调函数
	 * @param errorCallback 失败回调函数
	 * @param successTip 是否提示成功信息 true-提示 false-不提示
	 * @param chainPar 链参数 会传递到回调方法里
	 * @param async 是否异步
	 * @param bizErrTip 是否错误提示(默认或者true的时候提示，false的时候不提示)
	 * @param bizErrCallback 错误回调函数
	 * @param isMask 是否需要遮罩层,默认不需要
	 */
	artDialog.defaults = {								
		url:"",
		params:"",
		successCallback:function(){},
		errorCallback:function(){},
		successTip:false,
		chainPar:"",
		async:false,
		bizErrTip:true,
		bizErrCallback:function(){},
		isMask:false
	};
	loan.ajaxDo = artDialog;	
})(jQuery);

/*
*调用方法（例云融易贷的注册）
*  loan.ajaxFormDo({
		formId:"iform",
		beforeSubmitFn:beforeSubmitFn,
		successCallback:successFn,
		errorCallback:errorRegisterFn,
		bizErrCallback:registerBizErrCallback
	})
*
*/
(function ($) {
	var opts;
	var artDialog = function (options) {
		opts = $.extend({}, artDialog.defaults, options); 		
		return new ajaxDo(opts);
	};
	function ajaxDo (opts){
		this.defaults=opts;		
		this._init();
	};
	ajaxDo.prototype = {
		_init:function(){
			var ts=this,config=this.defaults;
			if(config.isMask) {
				loan.LayerShow("正在加载中...");
			}
			this._ajax();	
		},
		_succ:function(data, status, xhr){
			var ts=this,
				isMask=opts.isMask,
				successCallback=opts.successCallback,
				successTip=opts.successTip,
				chainPar=opts.chainPar,
				bizErrTip=opts.bizErrTip,
				bizErrCallback=opts.bizErrCallback;
								
			if(isMask) {
				loan.LayerHide();  //回调函数去掉遮罩层
			}
			if(!data) {
				var msg = "平台未知错误";
				loan.tooltip(msg,"error");
				return;
			}else if(!data.response) {
				var msg = "平台未知错误"
				loan.tooltip(msg,"error");
				return;
			}
			var response = data.response;//响应信息
			
			if(response.timeout) {//超时
				return;
			}else if(response.unAuth) {//越权
				return;
			}else if(response.xss) {//XSS攻击
				return;
			}else if(response.forceLogout) {//强制退出
				return;
			}else if(response.success) {
				if(successTip){
					var msg = "交易成功";
					if(typeof(response.errMsg) != "undefined" && response.errMsg!="") {
						msg = response.errMsg;
					}
					loan.tooltip(msg,"succeed");
				}
				if(successCallback && $.isFunction(successCallback)) {
					return successCallback.call(ts, response, status, xhr);
				}
			}else if(!response.success) { //交易失败
				if(bizErrTip) {
					var msg = "交易失败";
					if(typeof(response.errMsg) != "undefined" && response.errMsg!="") {
						msg = response.errMsg;
					}
					loan.tooltip(msg,"error");
				}
				if(bizErrCallback && $.isFunction(bizErrCallback)) {//是否存在回调函数
					return bizErrCallback.call(ts, response, status, xhr);
				}
			}else {// 交易失败
				loan.tooltip(response.errMsg,"error");
			}
			
		},
		_err:function(xhr, status, error){
			var	ts=this,
				isMask=opts.isMask,
				errorCallback=opts.errorCallback;
				
			if(isMask) {
				loan.LayerHide();  //回调函数去掉遮罩层
			}
			var msg = "请求失败";
			loan.tooltip(msg,"error");
			if(errorCallback && $.isFunction(errorCallback)) {
				errorCallback.call(ts, xhr, status, error);
			}
		},
		_ajax:function(){
			var config=this.defaults;						
			var options = {
			   beforeSubmit: config.beforeSubmitFn, //提交前的回调函数  
			   success: this._succ,               //提交成功的回调函数  
			   error:this._err,                   //提交失败的回调函数
			   type: "POST",                 //默认是form的method（get or post），如果申明，则会覆盖  
			   dataType: "json",             //html(默认), xml, script, json...接受服务端返回的类型  
			   timeout: loan.ajaxTimeout  //限制请求的时间，当请求大于3秒后，跳出请求  
			};
			
			$('#'+config.formId).ajaxSubmit(options);
			return false;
		}
	}
	/**
 * ajax form通用提交(封装jquery from插件)
 * auth:chenliang
 * time:2015-2-11
 * 
 * 参数:1.formId:form的id
 * 		2.beforeSubmitFn(formData, jqForm, options):提交前用于验证数据和组装自定义数据的自定义回调函数
 * 				formData: 数组对象，提交表单时，Form插件会以Ajax方式自动提交这些数据，格式如：[{name:user,value:val },{name:pwd,value:pwd}]  
 *			    jqForm:   jQuery对象，封装了表单的元素     
 *			    options:  options对象  
 * 		3.successCallback(data,status,xhr)：ajax访问成功后回调函数
 *      4.errorCallback(xhr,status,error)：ajax访问失败后回调函数
 *      5.successTip：是否提示成功信息 true-提示 false-不提示
 *      6.@param async 是否异步
 * 		7.@param bizErrTip 是否错误提示(默认或者true的时候提示，false的时候不提示)
 *      8.@param bizErrCallback 错误回调函数
 *      9.@param isMask 是否加遮罩层
 * 
*/
	artDialog.defaults = {	
		formId:"",
		beforeSubmitFn:function(){},
		successCallback:function(){},
		errorCallback:function(){},
		successTip:false,
		bizErrTip:true,
		bizErrCallback:function(){},
		isMask:false
	};
	loan.ajaxFormDo = artDialog;	
})(jQuery);