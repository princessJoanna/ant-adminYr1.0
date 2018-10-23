/**
 * loan 公用方法
 * auth:zhanghx13855@hundsun.com
 * time:2015-08-10
 * 
*/
var isIE8=false,isIE7=false;
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i)=="7.") isIE7=true;
if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8.") isIE8=true;
var loan=loan || {};

loan.dropDown = function(){	
	if($(".open").text()=="收起高级搜索") $(".open").text("展开高级搜索");
	$(".dropDownList[name=canvasDiv]").css("visibility","hidden");
	$(".dropDownList[name!=canvasDiv]").slideUp();	
	$(".open").removeClass("open");	
};
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
				c= $(this).attr("class") ? $(this).attr("class") : "",
				str='<b class="'+c+'" onClick="$(this).prev().show().focus();$(this).remove();" style="margin:0;display: inline-block;float:left;font-weight:normal;color:#888;height:'+h+'px;line-height:'+h+'px;">'+oldText+'</b>';
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

/**************tab切换*****************/
loan.tabLiclick = function(className){
	$(".m-tab-con li").click(function(){
		var i=$(this).index();
		$(this).addClass("on").siblings("li").removeClass("on");
		$("."+className).eq(i).show().siblings("."+className).hide();
	})	
};

loan.selFun = function(id,time){
	/*----------- 下拉操作 展开高级搜索-----------*/
	/*
	 * 调用示例
	 * 1、给点击的div一个ID
	 * 2、给隐藏的元素一个dropDownList样式
	 * 1、 2为必填项。在页面加载时调用函数：loan.selFun('ID');
	 * 3、默认的隐藏元素所在的位置是id.parent().parent().next()
	 * 根据现有的项目备用的有入库单所放位置为id.parent().next()
	 * 同时有两个dropDownList的销售收款第二个：id.parent().parent().next().next()
	 * 以及头部菜单的:id.parent().find();
	 * 需要注意的是：由于先前的下拉太多，所以根据他重新定义了，其他页面的下拉也一样将ID写在a标签上
	 * 页面html格式示例
	 * <ul>
	 * 		<li><a id="adv"></a></li>	
	 * </ul>
	 * <div class="dropDownList"></div>
	 */		
	var time = time || 200;
	var $this = $('#'+id);
	var isCon=$this.text().indexOf("高级搜索")==-1?false :true;
	$this.unbind("click").bind("click",function(){	
		var obj=$(this),
			$next=obj.parent().parent().next(".dropDownList");			
		if(!$next.hasClass("dropDownList")) $next=obj.parent().next(".dropDownList");//入库单		
		if($this.text()=="统计") $next=obj.parent().parent().next().next(".dropDownList");//判断销售收款中的应收排名和统计
		if(!$next.hasClass("dropDownList"))
		{
			if(obj.find("i").attr("class")=="ico-sel") obj=$(this).parent();//下拉框重新定义了obj
			$next=obj.parent().find(".dropDownList");//头部用户信息	
		}
		var bool=$next.is(":visible");	
		if($next.attr("name")=="canvasDiv") 
		{	
			bool=$next.css("visibility")=="hidden" ? false : true;
			var isCan=true;
		}
		loan.dropDown();
		if(bool){			
			if(isCan) $next.css("visibility","hidden");
			else $next.slideUp();	
			obj.removeClass('open'); 			
			if(isCon) $this.text("展开高级搜索");
		}
		else {
			if(isCan) $next.css("visibility","visible");
			else $next.slideDown();			
			obj.addClass('open'); 
			if(isCon) $this.text("收起高级搜索");
		}
		$next.unbind("click").click("click",function(e){
			var ev = e || window.event;
			if(ev.stopPropagation) ev.stopPropagation();
			else if(window.event) window.event.cancelBubble = true;//兼容IE			
		})
		$(document).unbind("click").bind("click",function(e){
			loan.dropDown();	
		})
		return false;
	})
};

/*$(document).unbind("click").bind("click",function(e){ //点击iframe 父窗口的悬浮消失
	parent.loan.dropDown();	
})
$(parent.document).unbind("click").bind("click",function(e){//点击父窗口，子窗口悬浮消失        	
	loan.dropDown();	
});*/
/* ---------------  弹出层 begin -------------------------*/
//参数说明----vTitle:标题，vURL：指向的url，triggerId：id,vWidth:宽度，vHeight:高度，vp:绝对定位的position值
//vp:{isRefresh:true,isChild:true,isChangeClose:true,position:relative}
//isRefresh----是否刷新父页面
//isChild----是否是主页面
//isChangeClose---是否重写方法
//position--弹出层定位方式：relative/fixed/static/inherit
loan.s_addPop = function(vTitle,vURL,triggerId,vWidth,vHeight,vp,vtop){
	var isRefresh=( vp ? vp.isRefresh : false )|| false;
	var isChild=( vp ? vp.isChild : false )|| false;	
	var p = vp ? vp.position : "absolute";
	var isChangeClose=( vp ? vp.isChangeClose : false )|| false;	
	var creatPop = function(vWidth,vHeight,vtop){
		var width = vWidth || 820;
		var height = vHeight || 460;
		Top = vtop||Topsize(height,p);
		var conHeight = height - 36;
		var windowWidth = $(window).width();
		var s_popHtml = ''; //弹出框内容开始创建
		s_popHtml += '<div class="m-sPopBg" id="popBg"></div>' //创建遮罩层
		s_popHtml += '<div class="m-sPopCon" id="popCon" style="width:' + width + 'px;position:'+p+'; height:'+ height +'px; left:'+ (windowWidth-width) / 2 +'px; top:'+ Top +'px;"><div class="m-sPopTitle"><strong>';
		s_popHtml += vTitle;//标题
		s_popHtml += '</strong>';
		s_popHtml += '<b id="sPopClose" class="m-sPopClose">' + '×' + '</b>'
		s_popHtml += '</div><div id="iframeDiv" class="m-sPopContent" style="height:' + conHeight + 'px;">';
		s_popHtml += ''//导入内容
		s_popHtml += '</div></div>';
		if (!triggerId || triggerId == '') {
			$('body').append(s_popHtml); //父级显示弹出窗口
			$("#popBg,#popCon").show();
			//alert(vURL);
			$('#iframeDiv').append('<iframe scrolling="auto" frameborder="0" class="m-frameCon"></iframe>');
			$('.m-sPopContent .m-frameCon').attr('src', vURL); //兼容IE6下iframe调不进去问题
			Resize(vtop); //上下高度自适应
			if(!isChangeClose)
			{
				$('#sPopClose').unbind("click").bind("click",function () {
					loan.s_Pop_closedParent(isRefresh,isChild);
				});
			}
		}
		return s_popHtml;
	}
	function Topsize(height,p){	
		var windowHeight = $(window).height();//当前窗口高度
		var scrollTop = $(document).scrollTop();/*垂直方向滚动的值*/
		var offsetHeight  = (windowHeight - height) / 5;
		return p=="fixed" ? offsetHeight : scrollTop + offsetHeight;
	}
	function Resize(vtop){
		$(window).resize(function(){
			var height = $("#popCon").height();
			Top = vtop||Topsize(height);
			$('#popCon').css({"top":Top+"px"});
		});
	}
	if(triggerId) {
		$('#' + triggerId).click(function(){
			$("#popCon,#popBg").remove();
			//$('html').addClass("scroll");
			var popWin = creatPop(vWidth,vHeight);
			$('body').append(popWin);//父级显示弹出窗口
			$("#popBg,#popCon").show();
			$('#iframeDiv').append('<iframe scrolling="auto" frameborder="0" class="m-frameCon"></iframe>');	
			$('.m-frameCon').attr('src',vURL);  //兼容IE6下iframe调不进去问题
			Resize(); //上下高度自适应
			if(!isChangeClose)
			{
				$('#sPopClose').unbind("click").bind("click",function () {
					loan.s_Pop_closedParent(isRefresh,isChild);
				});
			}
		})
	} else {
		creatPop(vWidth, vHeight,vtop);
	};
}
//参数说明----isRefresh：是否刷新页面。isChild：要刷新的页面是否是子页面（可参考ebusi的订单发货，弹出层在在父页面上）
loan.s_Pop_closedChild = function (isRefresh,isChild){
	if(isRefresh)
	{		
		if(isChild) {
			parent.window.frames[0].history.go(0); 
		}
		else parent.window.location.reload();
	}
	$("#popCon,#popBg",parent.document).remove();	
};
loan.s_Pop_closedParent = function (isRefresh,isChild){
	if(isRefresh)
	{		
		if(isChild) {
			window.frames[0].history.go(0); 
		}
		else window.location.reload();
	}				
	$("#popCon,#popBg").remove();
};
/*----------- 金额转换为大写金额 -----------*/
loan.numberToDX=function(n){
	 if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
         return "数据非法";
     var unit = "仟佰拾亿仟佰拾万仟佰拾圆角分", str = "";
         n += "00";
     if(n==0){
    	 return "零圆整";
     }
     var p = n.indexOf('.');
     if (p >= 0)
         n = n.substring(0, p) + n.substr(p+1, 2);
         unit = unit.substr(unit.length - n.length);
     for (var i=0; i < n.length; i++)
         str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
     return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|圆)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^圆零?|零分/g, "").replace(/圆$/g, "圆整");
};
/*----------- 省市区选择 begin -----------*/
function AdrInputPopDiv(){
	this.init=function(inpuId, isAbsolute) {
		var dizhiDiv = null;
		var initInput = null;
		initInput = $("#" + inpuId);
		var _wrap = $('<span style="position:relative;padding:0;z-index:995"></span>');
		var _sep= isAbsolute && isAbsolute.sep ? isAbsolute.sep : "";
		initInput.wrap(_wrap);
		initInput.parent().append($(provinceObjectDiv).html()).closest('div').css('overflow','visible');
		dizhiDiv = initInput.parent().children(".dizhi_t");
		initInput.click(function(e){			
			var dizhiClsDiv = initInput.closest(".dizhi");
			if (dizhiClsDiv.length > 0){
				var dizhiPar = $("#consignee", dizhiClsDiv).parent();
				if (dizhiPar.hasClass("errorWrap")){
					dizhiPar.css("z-index", 996);
				}
				dizhiPar = $("#consignAdr", dizhiClsDiv).parent();
				if (dizhiPar.hasClass("errorWrap")){
					dizhiPar.css("z-index", 994);
				}
				
				dizhiPar = $("#consignPhone", dizhiClsDiv).parent();
				if (dizhiPar.hasClass("errorWrap")){
					dizhiPar.css("z-index", 993);
				}		
			}
			dizhiDiv.toggle();//.css("display", "block");
		});
		dizhiDiv.on('click', '.dizhi_t_1 p', function(e){
			var idx = $(this).attr("idx");
			$(this).parent().find("p").removeClass("hover");
			dizhiDiv.find(".province").css("display", "none");
			dizhiDiv.find(".city").css("display", "none");
			dizhiDiv.find(".area").css("display", "none");
			if (idx == 1){
				$(this).addClass("hover");
				dizhiDiv.find(".province").css("display", "block");
			}else if(idx == 2){
				$(this).addClass("hover");
				dizhiDiv.find(".city").css("display", "block");
			}else if(idx == 3){
				$(this).addClass("hover");
				dizhiDiv.find(".area").css("display", "block");
			}else if(idx == 4){
				$(this).addClass("hover");
				initInput.val("请选择城市");
				initInput.attr("title","请选择城市").attr("provinceid","").attr("cityid","").attr("areaid","");
				initInput.trigger("click");				
				dizhiDiv.find('.dizhi_t_1 p[idx=1]').trigger("click");
			}
		});
		
		var selPro = "";
		var selCity = "";
		var proFullName = {"北京":"北京市", "天津":"天津市", "内蒙古":"内蒙古自治区", "上海":"上海市"
			, "广西":"广西壮族自治区", "重庆":"重庆市", "西藏":"西藏自治区", "宁夏":"宁夏回族自治区"
			, "新疆":"新疆维吾尔自治区", "香港":"香港特别行政区", "澳门":"澳门特别行政区"};
		dizhiDiv.on('click', '.province .dizhi_t_2_2 p', function(e){
			var pro = $(this).text();
			if (proFullName[pro]){
				pro = proFullName[pro];
			}else{
				pro += "省";
			}
			selPro = pro;
			var city = "";				
			$.each(provinceObject[pro], function(v,name){
				city += "<p style='width:auto;padding:0 6px;' data-id='"+name.id+"'>" + v + "</p>";
			});
			var cityDiv = dizhiDiv.find(".city .dizhi_t_2 .dizhi_t_2_2");
			cityDiv.html("");
			$(city).appendTo(cityDiv);
			
			dizhiDiv.find('.dizhi_t_1 p[idx=2]').trigger("click");
			initInput.val(selPro + _sep);
			initInput.attr("title", initInput.val());
			initInput.attr("provinceID",$(this).attr("data-id")).attr('cityid','').attr('areaid','');
		});
		
		dizhiDiv.on('click', '.city .dizhi_t_2_2 p', function(e){
			var city = $(this).text();
			selCity = city;
			var area = "";
			if(provinceObject[selPro][city].length!=0){
				$.each(provinceObject[selPro][city], function(idx, v){
					if(idx==="value"){
						$.each(v,function(name, val){
							area += "<p style='width:auto;padding:0 6px;' data-id='"+val[1]+"'>" + val[4] + "</p>";
						})						
					}					
					
				});
				var areaDiv = dizhiDiv.find(".area .dizhi_t_2 .dizhi_t_2_2");
				areaDiv.html("");			
				$(area).appendTo(areaDiv);
				dizhiDiv.find('.dizhi_t_1 p[idx=3]').trigger("click");
				initInput.val(selPro + _sep + selCity + _sep);
				initInput.attr("title", initInput.val());
				initInput.attr("cityID",$(this).attr("data-id")).attr('areaid','');
			}else{//一些省市区只有两级没有区县（比如澳门）
				initInput.val(selPro + _sep + selCity);
				initInput.attr("title", initInput.val());
				initInput.attr("cityID",$(this).attr("data-id")).attr('areaid','');
				initInput.trigger("click");	
				AdrInputPopDivAfter(initInput);
			}
		});
		
		dizhiDiv.on('click', '.area .dizhi_t_2_2 p', function(e){
			var area = $(this).text();
			$(this).addClass("hover").siblings().removeClass("hover");
			initInput.val(selPro + _sep + selCity + _sep + area);
			initInput.attr("title", initInput.val());
			initInput.attr("areaID",$(this).attr("data-id"));
			initInput.trigger("click");	
			AdrInputPopDivAfter(initInput);	
		});
		
		$(document).on('click',function(e){			
			var target  = e.target || e.srcElement;				
			if (target.id == inpuId || target.name == 'locationAreaForInputTextarea'){
				e.preventDefault();
				return;
			}			
			$('.dizhi_t').each(function(){
				if($(target).closest(this).length == 0 
					&& $(this).parent().find("input[id='" + inpuId + "']").attr("id") == inpuId
				    && $(this).is(':visible')){
					getTextErea(initInput.val(),initInput);
					AdrInputPopDivAfter(initInput);	
					$(this).hide();
				}
			});
		});
	};
};
function AdrInputPopDivAfter(obj){};
/*根据区域编码获取对应的值*/
loan.getArea=function(number){
	var value="";
	var proFullName = {"北京":"北京市", "天津":"天津市", "内蒙古":"内蒙古自治区", "上海":"上海市"
			, "广西":"广西壮族自治区", "重庆":"重庆市", "西藏":"西藏自治区", "宁夏":"宁夏回族自治区"
			, "新疆":"新疆维吾尔自治区", "香港":"香港特别行政区", "澳门":"澳门特别行政区"};
	var a=$(provinceObjectDiv).find("[data-id="+number+"]").text();	
	if(a){
		if(proFullName[a]) value=proFullName[a];			
		else value=a+"省";
		return value;
	}	
	for(var key in provinceObject){  
		 $.each(provinceObject[key], function(v,name){
			if(name.id==number){							
				value=v;
				return false;
			}else{				
				 $.each(provinceObject[key][v], function(idx, v){
					if(idx=="value"){
						$.each(v,function(name, val){
							if(val[1]==number){
								value=val[4];
								return false;	
							}						
						})						
					}
				});	
			}
		});
	}	
	return value;	
};
//改变input的显示方式为texterea
function getTextErea(text,obj){	
	var _w=getTextWidth(text),
		parentTarget=obj.parent(),
		w=obj.width();
	if(_w > w)
	{
		var h=Math.ceil(_w / w),
			a= h * 20 + h,
			c=obj.attr("class"),
			_html="<textarea name='locationAreaForInputTextarea' style='width:"+w+"px;height:"+a+"px;line-height:20px;resize: none;text-indent:0px;border-width:0;background:inherit' readonly>"+text+"</textarea>";		
		parentTarget.find("textarea").remove();
		obj.after(_html);
		obj.hide();
	};	
	parentTarget.find("textarea").click(function(){		
		$(this).remove();
		obj.show();
		parentTarget.find(".dizhi_t").attr("style","display:block");
		
	})
};
//返回input文字的宽度
function getTextWidth(text){
	var sensor = $('<pre>'+ text +'</pre>').css({display: 'none'}); 
	$('body').append(sensor); 
	var width = sensor.width();
	sensor.remove();	
	return width;	
};
loan.grid=loan.grid||{
	/**
	 * jqgrid在窗口改变时更改宽度
	 * 
	 * mdetailconWidth,根据.m-detail-con来计算宽度
	 * windowWidth，根据window来计算宽度
	*/
	mdetailconWidth:function(id){
		if($('.m-detail-con').hasClass('m-detail-con')){
			if($('.m-detail-con').width() == null){
				$("#"+id).setGridWidth($(window).width());
			}else{
				$("#"+id).setGridWidth($('.m-detail-con').width());
			}
		}else{
			$("#"+id).setGridWidth($(window).width());
		}
	},
	windowWidth:function(id){
		$("#"+id).setGridWidth($(window).width());	
	}
}
//针对ztree多写的方法,li长度增加
loan.changeTreeLi=function(){	
	$(".ztree li a").each(function(){
		$(this).removeAttr("style");
		var ztree=$(this).parents(".ztree"),
			w=$(this).offset().left - ztree.offset().left;
		$(this).css({"margin-left":-w+"px","padding-left":w+"px","width":ztree.find("li:first").width()+"px"});
		var ul=$(this).parent("li").parent("ul");			
		if(ul.css("overflow") === "hidden") 
			ul.removeAttr("style");
	});
}
/*********************************企业认证所用到的弹出层插件*******************************/
function addApplyOutContent(options){
	this.defaults={
		isTitle:true,
		addClass:'',
		title:"标题",
		src:"images/flyfish/close.jpg",
		isTips:false,
		tipsContent:" 我们将在1个工作日内完成资料审核，如您上传的资料不符合要求将被退回。",
		isContent:false,
		isConDefind:false,
		content:
		{
			c_title:{show:true,txt:"请确认您上传的资料："},
			c_content:[
				'<i></i>营业执照是否为<span class="c-orange">正本</span>复印件？',
				'<i></i>证件内容是否清晰可辨？',
				'<i></i>是否已<span class="c-orange">加盖企业红色公章</span>？',
				'<i></i>公章内容是否清晰可辨？',
				'<i></i>营业执照名称是否与融生意的企业名称一致？',
				'<i></i>营业执照是否在有效期内？'],
			c_btn:{
				ok:{show:true,title:"确定",nclass:"f-mr20"},
				cancal:{show:false,title:"取消",nclass:"f-mr20"}
			}
		},
		okClick:function(obj){},
		cancalClick:function(obj){} 
	};
	this.init(options);
};
addApplyOutContent.prototype={
	init:function(options){
		this.defaults = $.extend(this.defaults, options || {});		
	    this.appHtml();
	},
	appHtml:function(){
		var root = this,			
            defaults = root.defaults;
		var a=$('<div class="apply_outBg"></div>'),
		b=$('<div class="apply_up_box '+defaults.addClass+'" style="overflow:scroll;"></div>'),
		b_1=$('<div class="apply_up_title">'+defaults.title+'<a href="javascript:;" class="apply_up_close"></a></div>'),
		b_2=$('<div class="apply_up_content"></div>'),		
		b_2_1,b_2_3,b_2_2;
		var isIE=!+[1,]?true:false,
			isbase=defaults.src.substr(0,5)==="data:" || defaults.src.substr(0,4)==="http" ? true : false,
			isdiv= isIE && !isbase ? true : false;
		var ie='<div class="adddivs" style="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src='+defaults.src+');';
		if(!defaults.isConDefind){
			if(isdiv) b_2_2=$('<div>'+ie+'width:600px;height:440px;"/><img src="'+defaults.src+'" style="width:300px;height:300px;display:none" /></div>');
			else
			b_2_2=$('<div><img style="width:300px;height:300px;" src="'+defaults.src+'"></div>');
		}
		if(defaults.isTips) b_2_1=$('<div class="tit_box">'+defaults.tipsContent+'</div>');	
		if(defaults.isContent) 
		{
			if(!defaults.isConDefind)
			{
				if(isdiv)
					b_2_2=$('<div class="up_img f-fl">'+ie+'width:238px;height:238px;"/></div>');
				else
					b_2_2=$('<div class="up_img f-fl"><img src="'+defaults.src+'"></div>');
				b_2_3=$('<div class="right_text"></div>');
			}
			else
				b_2_3=$('<div class="f-ptb10"></div>');
			var op=defaults.content;
			var p="";
			if(op.c_title.show)
			p+='<b>'+op.c_title.txt+'</b><br />';
			for(var i=0;i<op.c_content.length;i++)
			{			
				p+='<p>'+op.c_content[i]+'</p>';		
			}	
			p+="<p>";
			for(j in op.c_btn)
			{		
				for(k in op.c_btn[j])
				{
					var t=op.c_btn[j];
					if(k=="show" && t[k])
					{
						p+='<a class="'+j+' apply_btn '+t.nclass+'" name="'+j+'" href="javascript:;">'+t.title+'</a>';	
					}
				}
			}
			p+="</p>";
			b_2_3.append(p);
		}
		b_2.append(b_2_1).append(b_2_2).append(b_2_3);
		b.append(b_1).append(b_2);
		$('body').append(a).append(b);  	
		setTimeout(function(){
			$(".apply_outBg").show();
			$(".apply_up_box").show();
			var _left=($(window).width() - 638 ) / 2,
				_top=($(window).height()-$(".apply_up_box").height() - 12) / 2 ;
			_top=_top<0 ? 0:"10px";
			$(".apply_up_box").css({"top":_top,"left":_left , "bottom" : "100px"});
		},200);
		$(window).resize(function(){
			var _left=($(window).width() - 638 ) / 2,
				_top=($(window).height()-$(".apply_up_box").height() - 12) / 2 ;
			_top=_top<0?0:"10px";
			$(".apply_up_box").css({"top":_top,"left":_left, "bottom" : "100px"});	
		});
		$(".ok").click(function(){
			$(".apply_outBg").remove();
			$(".apply_up_box").remove();			
			defaults.okClick($(this));
		});
		$(".cancal").click(function(){
			$(".apply_outBg").remove();
			$(".apply_up_box").remove();	
		});
		$(".apply_up_close").click(function(){
			$(".apply_outBg").remove();
			$(".apply_up_box").remove();	
		});
	}
}

/**
* 统一解决jqgrid表格设置大于10条每页记录时页面高度不够的问题
* 由于使用iframe方式，需要动态引入js文件
* add 2016-05-24 11:37:02
* 
**/
$(document).ready(function(){
	var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = loan.basePath + "/static/auth/common/js/pagefix.js";
    document.getElementsByTagName('body')[0].appendChild(oScript); 
    // $(function(){ $('input,textarea').placeholder(); });
});

/**
 * 金额 用逗号隔开。金额格式化
 */
function fmoney(s,n) {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ ) {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r + " 元";
} 

/**
 * 金额 用逗号隔开。金额格式化
 */
function fmoneyNotcurrency(s,n) {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ ) {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;
} 

/** 
* 判断是否null 
* @param data 
*/
function isNull(data){ 
	return (data == "" || data == undefined || data == null); 
}