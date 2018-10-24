(function($){
var snakerflow = $.snakerflow;

$.extend(true, snakerflow.editors, {
	inputEditor : function(){
		var _props,_k,_div,_src,_r;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r;
			
			$('<input style="width:98%;"/>').val(props[_k].value).change(function(){
				props[_k].value = $(this).val();
			}).appendTo('#'+_div);
			
			$('#'+_div).data('editor', this);
		}
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		}
	},
	selectEditor : function(arg){
		var _props,_k,_div,_src,_r , chooseSelect;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r;
			if(props[_k].value){
				chooseSelect = props[_k].value;
			}
			var sle = $('<select  style="width:98%;"/>').val(props[_k].value).change(function(){
				var vl = $(this).val();
				if(!vl){
					loan.tooltip("请选择流程表单！","error");
					return;
				}
				props[_k].value = vl;
			}).appendTo('#'+_div);
			// 2016-06-20 修改为ajax查询流程表单列表数据 if(typeof arg === 'string' && arg === 'flowForm') 才去查询
			if(typeof arg === 'string' && arg == 'flowForm'){
				// 发送ajax请求
				loan.ajaxDo({
  					url : loan.basePath+"/process/formList",
  					params : {format : 'json',"menuId":"610402"},
  					chainPar:this,
  					successTip:false,
  					successCallback:function(result){
  						if(result && result.success){
  							var list = result.formList;
  							if(list.length > 0 ){
  								for(var i = 0;i < list.length;i++){
  									if(list[i].url == chooseSelect){
  										sle.append('<option value="'+list[i].url+'" selected="selected">'+list[i].name+'</option>');
  									}else{
  										sle.append('<option value="'+list[i].url+'">'+list[i].name+'</option>');
  									}
  								}
  								sle.prepend('<option value="">--请选择流程表单--</option>');
  							}else{
  								//  已经存在的值重新展示在页面上
  								if(chooseSelect){
  									sle.append('<option value="' + chooseSelect + '">' + chooseSelect + '</option>');
  								}
  							}
  						}
  					}
  				});
			}else {
				for(var idx=0; idx<arg.length; idx++){
					sle.append('<option value="'+arg[idx].value+'">'+arg[idx].name+'</option>');
				}
				sle.val(_props[_k].value);
			}
			$('#'+_div).data('editor', this);
		};
		this.destroy = function(){
			$('#'+_div+' input').each(function(){
				_props[_k].value = $(this).val();
			});
		};
	},
	/**
	 * 参与者 2016-01-19修改
	 * @param arg  此arg参数是在snaker.model.js传过来的JSP的url地址，需要修改
	 */
	assigneeEditor : function(arg){
		var _props,_k,_div,_src,_r;
		this.init = function(props, k, div, src, r){
			_props=props; _k=k; _div=div; _src=src; _r=r;
			
			$('<input style="width:88%;" readonly="true" id="dialogEditorName"/>').val(props[_k].value).appendTo('#'+_div);
			$('<input style="display:none;" readonly="true" id="dialogEditor"/>').val(props[_k].value).appendTo('#'+_div);
			$('<input style="width:10%;" type="button" value="选择"/>').click(function(){
				// bug:谷歌浏览器该方法无法使用window.showModalDialog
				//var iWidth = 800,iHeight = 540;
				//var iTop = (window.screen.availHeight - 30 - iHeight)/2 ;
				//var iLeft = (window.screen.avaiWidth - 10 - iWidth)/2;
				//var win = window.open(snakerflow.config.ctxPath + arg , "窗口" , "width=" + iWidth + ", height=" + iHeight + ",top=" + iTop + ",left=" + iLeft + ",toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,alwaysRaised=yes,depended=yes");
				//  window.open有问题，会多次显示页面
				//var l  = window.showModalDialog(snakerflow.config.ctxPath + arg," ","dialogWidth:800px;dialogHeight:540px;center:yes;scrolling:yes");
				//if (l == null ){
				//	return;
				//}
				// 取已经选择的数据，将已经选择的用户ID传到页面上，用于回显
				//console.log(props['assignee'].value);
				var actors = props['assignee'].value ? props['assignee'].value  : "";
				loan.s_addPop("选择角色或者用户",loan.basePath+"/common/toRoleOrUser?menuId=600101&rectId="+src.getId() + "&actors=" + actors,"",650,430,{isRefresh:false});
			}).appendTo('#'+_div);
			
			$('#'+_div).data('editor', this);
		}
		this.destroy = function(){
			
		}
	}
});

})(jQuery);