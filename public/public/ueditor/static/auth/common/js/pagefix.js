/**
* 统一解决jqgrid表格设置大于10条每页记录时页面高度不够的问题
* 
* add 2016-05-24 11:37:02
**/
$(document).ready(function(){
	if($('.ui-pg-selbox')){
		var height = document.body.scrollHeight,height2 = height + (2 * 360) , height3 = height + (3 * 360);
		$('.ui-pg-selbox').change(function(){
			var val = $('.ui-pg-selbox :selected').val();
			var obj = document.getElementsByTagName('body')[0];
			if(val == 10){
				obj.style.height = height + 'px';
			}else if(val == 20){
				obj.style.height = height2 + 'px';
			}else if(val == 30){
				obj.style.height = height3 + 'px';
			}
			$('html,body').animate({scrollTop:0}, 'slow');
		});
	}
});