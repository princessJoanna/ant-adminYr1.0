/**
* 功能说明:		显示隐藏密码
* @author:		vivy <zhanghx13855@hundsun.com>
* @time:		2015-10-27 20:30:30
* @version:		V1.1.0
* @页面调用方法：
* <span class="showpwd" data-id="password" data-class="hidePwd" onClick="togglePwd(this)"></span>
* @data-id:		要验证的密码输入框id
* @data-class:	隐藏状态时点击的元素要添加的样式，只支持一个
* @js调用方法：
* $(".showpwd").click(function(){	<点击显示/隐藏元素的点击方法。>
* 	togglePwd(this)					<参数只有一个为this，且必填>
* });
*
*/
(function ($) {
	var opt;
	var togglePwd=function(obj){
		opt=$(obj);	
		//config=$.extend(require.defaults,obj||{});		
		//opt=config;						
		return (new require())._init();		
	};
	function require(options){};
	require.prototype={
		_init:function(){
			var id=opt.attr("data-id"),
				addCls = opt.attr("data-class") ? opt.attr("data-class") : "",
				obj=$("#"+id),
				cls=!obj.attr("class") ? "" : obj.attr("class"),
				value=!obj.val() ? "" : obj.val(),				
				type=obj.attr("type")==="password" ? "text" : "password",				
				na=!obj.attr("name") ? "" : obj.attr("name"),
				placeholder=!obj.attr("placeholder") ? "" : obj.attr("placeholder");
				maxLen = obj.attr('maxlength') ? "maxlength=" + obj.attr('maxlength') : "" ;// 最大长度
			var str='<input type="'+type+'" class="'+cls+'" value="'+value+'" placeholder="'+placeholder+'" id="'+id+'" name="'+na+'" ' + maxLen + ' placeText />';
			obj.next('b').remove();
			if(type==="text"){
				obj.removeAttr("id").hide();
				obj.after(str);
				opt.addClass(addCls);
			}else{
				obj.prev("input").attr("id",id).val(value).show();
				obj.remove();
				opt.removeClass(addCls);		
			}
		}
	};
	require.defaults = {}
	window.togglePwd = $.togglePwd= togglePwd;
})(jQuery);