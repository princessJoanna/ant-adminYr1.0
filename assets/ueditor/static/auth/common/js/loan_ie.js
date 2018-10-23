$(function() {
	loan.ie.setMaxlength();
});

loan.ie = loan.ie || {
	/**
	 * 解决ie中
	 */
	setMaxlength:function() {
		//IE也能用textarea
		$("textarea[maxlength]").keyup(function() {
			var area = $(this);
			var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值
			if (max > 0) {
				if (area.val().length > max) { //textarea的文本长度大于maxlength
					area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值
				}
			}
		});
		//复制的字符处理问题
		$("textarea[maxlength]").blur(function() {
			var area = $(this);
			var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值
			if (max > 0) {
				if (area.val().length > max) { //textarea的文本长度大于maxlength
					area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值
				}
			}
		});
	}
}