loan.car = loan.car || {

	freshGrid : function () {
		var iframe = $('#catLogoCon',parent.document).find(".m-frameCon")[0];
		iframe.contentWindow.location.reload(true);
	},

	/**
	 * 关闭子框架
	 */
	closeChildFrame : function () {
		loan.tabcut.childClosedIframe ( true );
	},


	/**
	 * 确认提示框
	 */
	confirmDialog : function ( dtitle, dcontent, callBackFunc) {
		$.artDialog ( {
			  title : dtitle,
			  content : dcontent,
			  ok : callBackFunc,
			  cancel : function () {
				return false;
			  }
		} );
	},
	
	saveLogo : function () {
		var carId  = $("#carId").val();
		var logo = $("#newLogo").attr('src');
		if(logo == null || logo == ""){
			loan.tooltip("请添加修改图","error");
			loan.car.freshGrid();
		}else{
			loan.ajaxDo({
                url: loan.basePath + "/car/carlogoupd",
                params: {
                    'carId': carId,
                    'logo': logo
                },
                successCallback: loan.car.freshGrid(),
                successTip: true, //提示
                bizErrTip: true,  //提示
                chainPar: this
            });
		}
	},
};



$("#ossFilesUpload").bind("change", function(){
	var _$upload_Comp = $ (this);

	if(!_$upload_Comp.val()) {
		return;
	}
	_$upload_Comp.upload({
		 url:  loan.basePath+ "/OSSFileUpload/image",
		 type: 'POST',
		 // 其他表单数据
		 params: { 'format' : 'json' },
		 dataType: 'text',
		 onSend: function (obj, str) {  return true; },
		 // 上传之后回调
		 onComplate: function (data) {
			 if(!data) {
				 loan.tooltip("上传失败，通讯异常",'error');
				 return;
			 }
			 var result = $.parseJSON(data);
			 if(!result['success']){
				 loan.tooltip( result['errMsg'] || "未知异常" ,'error');
				 return;
			 }

			 var params = {};
			 var newLogo =  result['imageOSSUrl'];
			 $("#newLogo").attr('src', newLogo);
			 $("#newLogo").attr('pictureId', newLogo);
			 $("#addnew").hide();
			 $("#logo").show();
		 }
	 });
	_$upload_Comp.upload("ajaxSubmit");
});