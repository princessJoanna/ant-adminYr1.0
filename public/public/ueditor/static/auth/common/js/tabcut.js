/**
 * loan 框架操作方法
 * auth:zhanghx13855@hundsun.com
 * time:2015-08-10
 * 
*/
var loan=loan||{};
var idArray=[];
loan.tabcut=loan.tabcut||{	
	/*******************动态绑定左侧菜单栏*******************/
	_getMenu:function(data){
		var wrap = $('<div class="m-nav"></div>');
		var ul = $('<ul></ul>');
		$(data).each(function(i){
			var strLi = $('<li><i class="'+data[i].icon+'"></i><span>'+ data[i].text +'</span></li>');
			var strDl = $('<dl></dl>');
			$(data[i].items).each(function(j){
				var strDd = '<dd><a id="'+ data[i].items[j].id +'" href="' + loan.basePath + data[i].items[j].href +'">'+ data[i].items[j].text +'</a>';	
				strDl.append(strDd);
			})
			strLi.append(strDl);
			ul.append(strLi);
		})
		wrap.append(ul);
		$('.m-container').prepend(wrap);	
		return this;
	},
	/** 2016-03-07 新版菜单栏 */
	_getNewMenu : function(data){
		var wrap = $('<div class="m-nav-l"></div>');// 整个左侧菜单
		var ul = $('<ul class="m-nav-outer f-clearfix"></ul>');// 底层的UL
		var ulChild = $('<ul class="m-nav-inner f-clearfix"></ul>');// 有子列表的UL，紧挨着有hasChild的li下面
		$(data).each(function(i){
			// 有子元素的
			if($(data[i].items)){
				var li = "<li class='haschild'><a href='#' target='_self'>"+data[i].text+"</a></li>";
				ul.append(li);
				$(data[i].items).each(function(j){
					var childLi = '<li><a id="'+ data[i].items[j].id +'" href="' + loan.basePath + data[i].items[j].href +'">'+ data[i].items[j].text +'</a></li>';	
					ulChild.append(childLi);
					ul.append(ulChild);
				});
				wrap.append(ul);
			}else{// 没有子元素的
				var li = "<li><a href='#' target='_self'>"+data[i].text+"</a></li>";
				ul.append(li);
			}
		});
		wrap.append(ul);
		$('.m-container').prepend(wrap);
		return this;
	},
	/** 新版菜单的点击事件处理 */
	_mentNewHover : function(){
		var menuLi = $('.m-nav-outer li');
		for(var i = 0;i < menuLi.length;i++){
			menuLi.eq(i).click(function(){
				var getUrl = $(this).find('a').attr('href');
				var getTitle = $(this).find('a').text();
				var getId = $(this).find('a').attr('id');		
				var height = $(window).height() - 96;
				if(!getId) //如果没有给ID，表明不可点击
				{
					$(this).find('a').attr("href","javascript:;")
					return;
				}
				if(jQuery.inArray(getId, idArray) == -1){	
					$('#tabCon').append(loan.tabcut.strIframe(getId,getUrl,height));
					$('#tabList').append(loan.tabcut.strTablist(getId,getTitle));				
					idArray.push(getId);
					$('#'+ getId +'list').addClass('on').siblings().removeClass('on');
					$('#'+ getId +'Con').siblings('div').hide();
					if($('#'+ getId +'list').prev("li").attr("id")=="0list")
					{
						$("#0list em").hide();
						$("#0list").css("padding-right","15px");
					}
					else {
						$("#0list em").show();
						$("#0list").css("padding-right","0px");
					}
					
				}else{
					$('#'+ getId +'list').addClass('on').siblings().removeClass('on');
					$('#'+ getId +'Con').show().siblings('div').hide();
					if($('#'+ getId +'list').prev("li").attr("id")=="0list")
					{
						$("#0list em").hide();
						$("#0list").css("padding-right","15px");
					}
					else {
						$("#0list em").show();
						$("#0list").css("padding-right","0px");
					}
				}
				return false;
				
			})
		}
	},
	/*******************左侧菜单栏hover效果*****************/
	_mentHover:function(){		
		var getLi = $('.m-nav ul').find('li');	
		getLi.hover(function(){
			var obj=$(this).children('dl'),
				_h=$(window).height()-($(this).offset().top + obj.height());
			if(_h<0) obj.css({"margin-top":_h+"px"});		
			obj.fadeIn(300);
		},function(){
			$(this).children('dl').fadeOut(0);
		});	
		/*绑定nav上的链接打开*/
		for(var i=0; i<getLi.length; i++){
			getLi.eq(i).find('dd').click(function(){
				var getUrl = $(this).find('a').attr('href');
				var getTitle = $(this).find('a').text();
				var getId = $(this).find('a').attr('id');		
				var height = $(window).height() - 96;
				if(!getId) //如果没有给ID，表明不可点击
				{
					$(this).find('a').attr("href","javascript:;")
					return;
				}
				if(jQuery.inArray(getId, idArray) == -1){	
					$('#tabCon').append(loan.tabcut.strIframe(getId,getUrl,height));
					$('#tabList').append(loan.tabcut.strTablist(getId,getTitle));				
					idArray.push(getId);
					$('#'+ getId +'list').addClass('on').siblings().removeClass('on');
					$('#'+ getId +'Con').siblings('div').hide();
					if($('#'+ getId +'list').prev("li").attr("id")=="0list")
					{
						$("#0list em").hide();
						$("#0list").css("padding-right","15px");
					}
					else {
						$("#0list em").show();
						$("#0list").css("padding-right","0px");
					}
					
				}else{
					$('#'+ getId +'list').addClass('on').siblings().removeClass('on');
					$('#'+ getId +'Con').show().siblings('div').hide();
					if($('#'+ getId +'list').prev("li").attr("id")=="0list")
					{
						$("#0list em").hide();
						$("#0list").css("padding-right","15px");
					}
					else {
						$("#0list em").show();
						$("#0list").css("padding-right","0px");
					}
				}
				return false;
			})
		}	
	},
	/*************************绑定右键菜单事件*********************/
	tabCloseEven:function() {	
		//刷新
		$('#mm-tabupdate').click(function() {
			var getListId = $('#tabList').find('li').filter('.on').attr('id');
			var i = getListId.indexOf('list');
			var getIframeId = getListId.substring(0,i);	
			$('#'+ getIframeId + 'Con').find(".m-frameCon")[0].contentWindow.location.reload();	
			$('#mm').hide();	
		})
		//关闭当前
		$('#mm-tabclose').click(function() {
			var getListId = $('#tabList').find('li').filter('.on').attr('id');
			var i = getListId.indexOf('list');
			var getIframeId = getListId.substring(0,i);
			var j = jQuery.inArray(getIframeId, idArray);
			idArray.splice(j,1);
			$('#'+ getIframeId +'list').prev().addClass('on');
			$('#'+ getIframeId +'Con').prev().show();
			if($('#'+ getIframeId +'list').prev("li").prev("li").attr("id")=="0list" || $('#'+ getIframeId +'list').prev("li").attr("id")=="0list")
			{
				$("#0list em").hide();
				$("#0list").css("padding-right","15px");
			}
			else {
				$("#0list em").show();
				$("#0list").css("padding-right","0px");
			}
			$('#'+ getIframeId +'list').remove();
			$('#'+ getIframeId +'Con').remove();
			$('#mm').hide();
		})
		//全部关闭
		$('#mm-tabcloseall').click(function() {
			$('#tabList').children('li').each(function(i){
				if(i==0){
					//do something...	
				}else{
					$(this).remove();
				}
			})
			$('#tabCon').children('div').each(function(i){
				if(i==0){
					//do something...	
				}else{
					$(this).remove();
				}
			})
			$('#tabList').find('li').eq(0).addClass('on');
			$("#0list em").hide();
			$("#0list").css("padding-right","15px");
			$('#tabCon').find('div').eq(0).show();
			idArray = [];
			$('#mm').hide();
		});
		//关闭除当前之外的TAB
		$('#mm-tabcloseother').click(function() {
			var getListId = $('#tabList').find('li').filter('.on').attr('id');
			var i = getListId.indexOf('list');
			var getIframeId = getListId.substring(0,i);
			var index = $('#tabList').find('li').filter('.on').index();
			$('#tabList').children('li').each(function(i){
				if(i==0 || i==index){
					//do something...	
				}else{
					$(this).remove();
				}
			})
			$('#tabCon').children('div').each(function(i){
				if(i==0 || i==index){
					//do something...	
				}else{
					$(this).remove();
				}
			})
			idArray = [];
			idArray.push(getIframeId);
			$('#mm').hide();
		});
	},
	/*********************iframe内容生成**************************/
	strIframe:function(id,url,height){
		var str = '';
			str += '<div id="'+ id +'Con" style="height:' + height + 'px;" class="m-tab-content"><iframe scrolling="auto" src="'+ url +'" frameborder="0" class="m-frameCon"></iframe></div>';
		return str;
	},
	/*********************li标签生成**************************/
	strTablist:function(id,titText){
		var str = '';
			str += '<li id="'+ id +'list"><span>'+ titText +'</span><a href="javascript:" onclick="loan.tabcut.closeIframe(this)" class="m-tab-close"></a></li>';
		return str;
	},
	/*********************关闭tab页**************************/
	closeIframe:function(myself){
		var getListId = $(myself).parent().attr('id');
		var i = getListId.indexOf('list');
		var getIframeId = getListId.substring(0,i);
		var j = jQuery.inArray(getIframeId, idArray);
		idArray.splice(j,1);
		if($(myself).parent().hasClass('on')){
			$('#'+ getIframeId +'list',parent.document).prev().addClass('on');
			if($('#'+ getIframeId +'list',parent.document).prev("li").prev("li").attr("id")=="0list" || $('#'+ getIframeId +'list',parent.document).prev("li").attr("id")=="0list")
			{
				$("#0list em",parent.document).hide();
				$("#0list",parent.document).css("padding-right","15px");
			}
			else {
				$("#0list em",parent.document).show();
				$("#0list",parent.document).css("padding-right","0px");
			}
			$('#'+ getIframeId +'Con',parent.document).prev().show();
			$('#'+ getIframeId +'list').remove();
			$('#'+ getIframeId +'Con').remove();
		}else{		
			$('#'+ getIframeId +'list').remove();
			$('#'+ getIframeId +'Con').remove();
		}
	},
	/**********************iframe中新增或者修改窗口***************************/
	childAddIframe:function(title,url,id,isRefresh,isReturn){	
		var isReturn = isReturn || false;
		var height = $(window).height();
		if($('.m-header').children().eq(3).is('h4') || $('.m-header').children().eq(2).is('h4')){			
			height = height - 96;
		};	
		if(jQuery.inArray(id, parent.idArray) == -1){
			if(isReturn){
				var iframeId = $('#tabList',parent.document).find('li').filter('.on').attr('id');
				url = url+ '#isReturn='+ iframeId +'';
			}
			$('#tabCon',parent.document).append(loan.tabcut.strIframe(id,url,height));
			$('#tabList',parent.document).append(loan.tabcut.strTablist(id,title));
			parent.idArray.push(id);
			$('#'+ id +'list',parent.document).addClass('on').siblings().removeClass('on');
			$('#'+ id +'Con',parent.document).siblings('div').hide();
			if($('#'+ id +'list',parent.document).prev("li").attr("id")=="0list"){
				$("#0list em",parent.document).hide();
				$("#0list",parent.document).css("padding-right","15px");
			}
			else {
				$("#0list em",parent.document).show();
				$("#0list",parent.document).css("padding-right","0px");
			}
		}else{
			if(isRefresh){
				$('#'+ id +'list',parent.document).addClass('on').siblings().removeClass('on');
				$('#'+ id +'Con',parent.document).show().siblings('div').hide();
				$('#'+ id +'Con',parent.document).find(".m-frameCon")[0].contentWindow.location.href = url;
				if($('#'+ id +'list',parent.document).prev("li").attr("id")=="0list"){
					$("#0list em",parent.document).hide();
					$("#0list",parent.document).css("padding-right","15px");
				}
				else {
					$("#0list em",parent.document).show();
					$("#0list",parent.document).css("padding-right","0px");
				}
			}else{
				$('#'+ id +'list',parent.document).addClass('on').siblings().removeClass('on');
				$('#'+ id +'Con',parent.document).show().siblings('div').hide();
				if($('#'+ id +'list',parent.document).prev("li").attr("id")=="0list"){
					$("#0list em",parent.document).hide();
					$("#0list",parent.document).css("padding-right","15px");
				}
				else {
					$("#0list em",parent.document).show();
					$("#0list",parent.document).css("padding-right","0px");
				}
			}
		}
	},
	/*********************iframe中关闭当前窗口**************************/
	childClosedIframe:function(isRefresh){
		var isRefresh = isRefresh || false;
		var getLi = $('#tabList',parent.document).find('li').filter('.on');
		var getListId = getLi.attr('id');
		if(!getListId){
			return
		};
		var i = getListId.indexOf('list');
		var getIframeId = getListId.substring(0,i);
		
		var getUrl = $('#'+ getIframeId + 'Con',parent.document).find(".m-frameCon")[0].contentWindow.location.href;
		var showListId = loan.tabcut.parseQueryString(getUrl)['isReturn'];
		var j = jQuery.inArray(getIframeId, parent.idArray);
		parent.idArray.splice(j,1);
		if(showListId){		
			var i = showListId.indexOf('list');
			var getId = showListId.substring(0,i);
			$('#'+ showListId,parent.document).addClass('on');
			if(isRefresh){
				$('#'+ getId + 'Con',parent.document).find(".m-frameCon")[0].contentWindow.location.reload();
			}
			$('#'+ getId +'Con',parent.document).show();
			if($('#'+ getId +'list',parent.document).prev("li").attr("id")=="0list"){
				$("#0list em",parent.document).hide();
				$("#0list",parent.document).css("padding-right","15px");
			}
			else {
				$("#0list em",parent.document).show();
				$("#0list",parent.document).css("padding-right","0px");
			}
		}else{	
			$('#'+ getIframeId +'list',parent.document).prev().addClass('on');
			$('#'+ getIframeId +'Con',parent.document).prev().show();
		}
		$('#'+ getIframeId +'list',parent.document).remove();
		$('#'+ getIframeId +'Con',parent.document).remove();
	},
	/*********************获取url中指定参数**************************/
	parseQueryString:function(url) {
	  var params = {};
	  var arr = url.split("#");
	  if (arr.length <= 1){
		return params; 
	  } 
	  for (var i = 0, l = arr.length; i < l; i++) {
		var a = arr[i].split("=");
		params[a[0]] = a[1];
	  }
	  return params;
	}
}
$(function(){
	loan.tabcut.tabCloseEven();
	/*nav效果*/
	var getLi = $('#navCon ul').find('li');
	getLi.hover(function(){
		$(this).children('dl').fadeIn(300);	
	},function(){
		$(this).children('dl').fadeOut(0);
	});
	/*绑定li的click事件*/
	$('#tabList').delegate('li','click',function(){
		if($(this).prev("li").attr("id")=="0list" || $(this).attr("id")=="0list"){
			$("#0list em").hide();
			$("#0list").css("padding-right","15px");
		}
		else {
			$("#0list em").show();
			$("#0list").css("padding-right","0px");
		}
		var getListId = $(this).attr('id');
		var i = getListId.indexOf('list');
		var getIframeId = getListId.substring(0,i);
		$(this).addClass('on').siblings().removeClass('on');
		$('#'+ getIframeId + 'Con').show().siblings('div').hide();	
	});
	/*绑定li的双击事件*/	
	$('#tabList li').bind("dblckick").bind("dblclick",function(){
		var $this=$(this).find(".m-tab-close");
		loan.tabcut.closeIframe($this);
	})
	/*绑定li的右键事件*/	
	$('#tabList').delegate('li','contextmenu',function(e) {
		var getListId = $(this).attr('id');
		var i = getListId.indexOf('list');
		var getIframeId = getListId.substring(0,i);
		$(this).addClass('on').siblings().removeClass('on');
		$('#'+ getIframeId + 'Con').show().siblings('div').hide();
		
		var getIndex_id = $('#tabList').find('li').eq(0).attr('id');
		if(getIndex_id == getListId){
			return false;
		}else{
			$('#mm').show().css({'top':e.pageY-2,'left':e.pageX-4});
			return false;
		}
    });
	
	$('#mm').find('.menu-item').hover(function(){
		$(this).addClass('menu-active');
	},function(){
		$(this).removeClass('menu-active');
	});
	$('#mm').bind('mouseleave',function(){
		$(this).hide();	
	})
	
	var left = 0;
	var v_wid = 120;
	$('#tabLeft').on('click',function(){
		var getConWidth = $('#tabList').parent().innerWidth();
		var getUlWidth = 0;
		var getLi = $('#tabList').find('li');
		for(var i=0;  i< getLi.length; i++){
			getUlWidth = getUlWidth + getLi.eq(i).outerWidth(true);
		}
		if(left >= 0){
			return false;
		}else{
			$('#tabList').animate({"left": left + v_wid});
			left = left + v_wid;
		}
	});
	
	$('#tabRight').on('click',function(){
		var getConWidth = $('#tabList').parent().innerWidth();
		var getUlWidth = 0;
		var getLi = $('#tabList').find('li');
		for(var i=0;  i< getLi.length; i++){
			getUlWidth = getUlWidth + getLi.eq(i).outerWidth(true);
		};
		if(getUlWidth<=getConWidth){
			return false;
		}else if((getUlWidth - Math.abs(left))<=getConWidth){
			return false;	
		}else{
			$('#tabList').animate({"left": left - v_wid});
			left = left - v_wid;
		};
	});
});
/*高度自适应*/
$(window).resize(function(){
	var height = $(window).height() - 94;
	$('#tabCon').children('div').height(height);
});
