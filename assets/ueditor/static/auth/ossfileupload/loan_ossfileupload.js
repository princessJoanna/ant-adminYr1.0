loan.ossfileupload = loan.ossfileupload || {

	/**
	 * OSS上传文件
	 */
	ossFileUpload: function() {
		var _$upload_Comp = $ ( "#ossFilesUpload" );
		var _$button = $ ( "#upload_submit_button" );

		if(!_$upload_Comp.val()) {
			loan.tooltip("请选择上传文件","error");
			return;
		}
		//灰掉上传按钮
		_$button.attr("disabled","disabled");

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
				 $ ( "#oss_returned_url" ).val ( result['imageOSSUrl'] );

				 loan.tooltip("图片[" + result['oriFIleName'] + "]上传成功","succeed");

				 _$upload_Comp.after(_$upload_Comp.clone().val(""));
				 _$upload_Comp.remove();
				 //恢复上传与提交按钮
				 _$button.removeAttr("disabled");
			 }
		 });
		_$upload_Comp.upload("ajaxSubmit");
	}
};

$(function(){
	/*变更上传文件后清空“返回oss url”输入框*/
	$("#ossFilesUpload").change(function () {
		$('#oss_returned_url').val("");
	});

});