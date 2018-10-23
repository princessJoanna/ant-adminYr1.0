loan.settemplate = loan.settemplate || {
		/**
		 * 普通方式提交表单
		 * @private
		 */
		submit:function() {
			var me = {};
			me._form=$("#iform");
			var _5 = "sui_frame_" + (new Date().getTime());
			var _6 = $("<iframe id=" + _5 + " name=" + _5 + "></iframe>").attr(
				"src",
				window.ActiveXObject ? "javascript:false" : "about:blank").css(
				{
					position : "absolute",
					top : -1000,
					left : -1000
				});
			me._form.attr("target", _5);
			try {
				_6.appendTo("body");
				_6.bind("load", cb);
				me._form[0].submit();
			} finally {
				me._form.removeAttr("action");
				me._form.removeAttr("target");
			}
			var _7 = 10;
			function cb() {
				_6.unbind();
				var _8 = $("#" + _5).contents().find("body");
				var _9 = _8.html();
				if (_9 == "") {
					if (--_7) {
						setTimeout(cb, 100);
						return;
					}
					return;
				}
				var ta = _8.find(">textarea");
				if (ta.length) {
					_9 = ta.val();
				} else {
					var _a = _8.find(">pre");
					if (_a.length) {
						_9 = _a.html();
					}
				}
				try{
					var _json = $.parseJSON(_9);
					if(_json.success){
						parent.$('#focus').focus();
						parent.loan.template.freshGrid();
						loan.s_Pop_closedChild();

					}else{
						loan.tooltip("上传出错,请联系管理员","error");
					}
				}catch(e){

				}
				setTimeout(function() {
					_6.unbind();
					_6.remove();
				}, 100);
			};
		}
};

	