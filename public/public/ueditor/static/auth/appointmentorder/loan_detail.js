$(function(){
	var appointmentOrderId = $ ( "#appointmentOrderId" ).val ();
	loan.appointmentorder.queryAppointmentOrderById(appointmentOrderId);
	var point = 0;
	$("#userImageInfoForm ul").on("click", "img", function(){
		var _$img = $ ( this );
		var ori = _$img.attr ( "ori" ),downloadName = _$img.attr ( "downloadName" ),down = _$img.attr ( "down" );
		var dialog = $ ( "#dialog" );
		dialog.html("<img src='" + ori + "' down='" + down + "'/>");
		dialog.dialog("option", "title", downloadName).dialog( "open" );
	});
	$( "#dialog" ).dialog({
		modal:true,
		autoOpen:false,
		width: 600,
		height: 550,
		buttons:{
		  '顺时针90°旋转':function () {
			  point += 90;
			  $( "#dialog img" ).css('transform', 'rotate(' + point + 'deg)');
		  },
		  '下载':function () {
		  	  var url = $( "#dialog img" ).attr ( "down" );
			  url = url + (url.indexOf("?") > 0 ? "&" : "?" ) + "downloadName="+ $("#dialog").dialog('option', "title");
			  window.open ( url);
		  }
		},
		position:["center",100]
	});
	$(window).scroll(function(){
		var top = $(document).scrollTop();          //定义变量，获取滚动条的高度
		var menu = $("#menu");                      //定义变量，抓取#menu
		var items = $("#content").find(".item");    //定义变量，查找.item
		var curId = "";                             //定义变量，当前所在的楼层item #id
		items.each(function(){
			var m = $(this);                        //定义变量，获取当前类
			var itemsTop = m.offset().top;        //定义变量，获取当前类的top偏移量
			if(top > itemsTop-100){
				curId = "#" + m.attr("id");
			}else{
				return false;
			}
		});
		//给相应的楼层设置cur,取消其他楼层的cur
		var curLink = menu.find(".cur");
		if( curId && curLink.attr("href") != curId ){
			curLink.removeClass("cur");
			menu.find( "[href=" + curId + "]" ).addClass("cur");
		}
	});
});