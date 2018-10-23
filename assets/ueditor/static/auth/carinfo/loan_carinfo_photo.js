loan.carphoto = loan.carphoto || {

	freshGrid : function () {
		var iframe = $('#carPhotosManagementCon',parent.document).find(".m-frameCon")[0];
		iframe.contentWindow.location.reload(true);
	},

	/**
	 * 关闭子框架
	 */
	closeChildFrame : function () {
		loan.tabcut.childClosedIframe ( true );
	},

	/**
	 * 排序
	 */
	eidtPhotoIndex : function () {
		$ ( "#index,#close,#addnew" ).hide ();
		$ ( "#previewForm" ).find ( "p[name='description']" ).hide ()
			.end().find ( "p[name='indexs']" ).show ();
		$ ( "#save,#cancel" ).show ();
	},

	/**
	 * 保存排序
	 */
	saveEidtPhotoIndex : function () {
		loan.carphoto.enableCancelButton ( false );
		var datas = [];
		$("#photoUL li.img_item").each(function ( index, item_li ) {
			datas.push({
				pictureId: $(item_li).find("img").attr("pictureId"),
				subIndex: $(item_li).find("input[name='index']").val()
		    })
		});
		loan.carphoto.submitIndexCarPhoto ( datas/*{ datas : JSON.stringify(datas), carId : $("#carId").val() }*/);
	},
	enableCancelButton : function ( flag ) {
		var _$cancel = $("#cancel");
		_$cancel.attr('disabled', flag + '');
		if(flag) {
			_$cancel.attr('href', _$cancel.attr("datahref"));
			_$cancel.removeAttr('datahref');
		}else{
			_$cancel.attr('datahref', _$cancel.attr("href"));
			_$cancel.removeAttr('href');
		}
	},
	/**
	 * 排序提交按钮
	 */
	submitIndexCarPhoto : function (datas) {
		$.ajax({
			url: loan.basePath + "/carinfo/reorder?carId="+ $("#carId").val(),
			data: JSON.stringify(datas),
			contentType: 'application/json',
			type: "POST",
			dataType: "json",
			success:function(data){
			   if(data && data.success){
				   loan.tooltip("预览图重排序成功","succeed");
				   loan.carphoto.freshGrid ( );
			   }else{
				   console.log ( data );
				   loan.tooltip( data.errMsg || "预览图重排序失败","error");
				   loan.carphoto.enableCancelButton ( true );
			   }
			},
			error: function(data){
			   console.log ( data );
			   loan.tooltip( "预览图重排序失败，网络异常！","error");
			},
			complete: function(XMLHttpRequest, textStatus){

			}
		});
	},
	/**
	 * 取消排序
	 */
	cancelEidtPhotoIndex : function () {
		$ ( "#save,#cancel" ).hide ();
		$ ( "#previewForm" ).find ( "p[name='indexs']" ).hide ()
			.end().find ( "p[name='description']" ).show ()
			.end()[0].reset();
		$ ( "#index,#close,#addnew" ).show ();
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

	/**
	 * 新增提交按钮
	 */
	submitAddCarPhoto : function (params) {
		loan.ajaxDo ({
			 url : loan.basePath + "/carinfo/crud",
			 params : {
				 'menuId' : '3004', 'menuLog' : '1', 'format' : 'json', 'uri' : params.url,
				 'url' : params.url, 'carId' : params.carId, 'description' : params.fileName
			 },
			 successCallback : function(){
				 loan.tooltip("图片[" + params.fileName + "]上传成功","succeed");
				 loan.carphoto.freshGrid ( );
			 },
			 successTip : true, //提示
			 bizErrTip : true,  //提示
			 chainPar : this
		 });
	},

	/**
	 * 删除照片
	 */
	submitDeleteCarPhoto : function ( params ) {
		var pictureId = $("#dialog img").attr ( "pictureId" );
		if( pictureId ) {
			loan.ajaxDo({
				url:loan.basePath + "/carinfo/crud",
				params:{'menuId': 3004 ,'menuLog':'1','format':'json','pictureId':pictureId},
				successCallback : function(){
					loan.tooltip("图片[" + params.fileName + "]删除成功","succeed");
					loan.carphoto.freshGrid ( );
				},
				successTip:true, //提示
				bizErrTip:true,  //提示
				chainPar:this
			});
		}else{
			console.log ( "找不到pictureId" );
		}
	}

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
			 params.url =  result['imageOSSUrl'];
			 params.carId =  $("#carId").val();
			 params.fileName = _$upload_Comp.val().replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");

			 loan.carphoto.submitAddCarPhoto (params);
		 }
	 });
	_$upload_Comp.upload("ajaxSubmit");
});