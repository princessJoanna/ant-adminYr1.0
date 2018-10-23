/**
 * 说明:登陆模块
 * @author ljf <liangjf@hundsun.com>
 * @date 2015-8-9 上午12:46:34 
 * @version V1.0
 */
loan.login = loan.login || {
	
	/** 
	 *动态生成验证码 
	 */ 
	changeCode : function() {
	    $("#randomCode")[0].src = loan.basePath + "/randomCode?t="+new Date().getTime();  
	},
	
	beforeSubmitFn : function() {
		$('#tipPop').text('');
		var user = $('#loginName').val();
		var password = $('#password').val();
		var randCode = $('#randCode').val();
		if(user == ''){
			$('#tipPop').text('用户名不能为空').show();
			return false;
		}else if(password == ''){
			$('#tipPop').text('密码不能为空').show();
			return false;
		}else if(randCode == ''){
			$('#tipPop').text('验证码不能为空').show();
			return false;
		}
		$('#tipPop').hide();
		return true;
	},
	
	successCallback : function(data, status, xhr, chainPar) {
		window.location.replace (loan.basePath + data.href);
	},
	
	bizErrCallback : function(data, status, xhr, chainPar) {
		$('#tipPop').text(data.errMsg).show();
		loan.login.changeCode();
	},
	
	/**
	 * 登陆提交事件
	 */
	loginFn : function() {
		if(!loan.login.beforeSubmitFn()) {
			return false;
		}
		var user = $('#loginName').val();
		var password = $('#password').val();
		var randCode = $('#randCode').val();
	    // RSA加密
	    password =loan.encrypt.encrypt(password);
	    
		var params = {
				"opCode" : user,
				"opPassword" : password,
				"randCode" : randCode,
		};
		loan.ajaxDo({
            url:loan.basePath+"/loginIn",
            params:params,
            successCallback:loan.login.successCallback,
            bizErrTip:false,  //自定义错误提示
            bizErrCallback:loan.login.bizErrCallback
        });
	}
};
var isIE8=false,isIE7=false;
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i)=="7.") isIE7=true;
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") isIE8=true;
/*
 *IE8以下浏览器的input支持placeholder，
 *引用方法：在需要的Input上添加placeText属性，如<input type="text" class="u-ipt u-ipt-nm" value="" placeText/>
 *需要注意的是，仅支持u-ipt样式的input,特殊的样式不支持
 */
function placeholderText(){
	if(isIE8){
	var $text=$("input[placeText]");
	$text.each(function(){		
		$(this).val("");
		var oldText=$(this).attr("placeholder"),
			w=$(this).width(),
			h=$(this).height(),
			c=$(this).attr("class") ? $(this).attr("class") : "",
			str='<b class="'+c+'" onClick="$(this).prev().show().focus();$(this).remove();" style="margin:0;padding:0 0 20px 30px;display: inline-block;float: left;font-weight:normal;color:#888;height:34px;line-height:34px;">'+oldText+'</b>';
		$(this).hide();
		$(this).after(str);
		$(this).blur(function(){
			if($(this).val()=="")
			{
				$(this).after(str);
				$(this).hide();
			}
			else
			$(this).next("b").remove();
		});	
	});
	}
};

$(function(){
	if(window != top) {
		top.location.href = location.href;
	}
	
	$('.banner').slides({
		play: 7000, //自动播放幻灯片，一个正数将设置为true ，并是幻灯片动画以毫秒为单位的时间间隔。
		hoverPause: true, //设置真正的上空盘旋幻灯片将暂停
		effect: 'fade',
		container: 'slides-container', //幻灯片容器的类名
		paginationClass: 'pagination', //分页的类名。
		crossfade: true
	});
	
	$(".showpwd").click(function(){	
 		togglePwd(this);//参数this必填
	});
});

