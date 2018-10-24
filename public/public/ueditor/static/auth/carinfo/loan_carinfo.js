loan.carinfo = loan.carinfo || {

	/**
	 * 刷新 jqgrid
	 */
	freshGrid : function () {
		$ ( "#carinfoGridId" ).jqGrid ( "setGridParam", {
			postData : { 'menuId' : '3004', 'format' : 'json' }
		} ).trigger ( 'reloadGrid' );
	},

	/**
	 * 确认提示框
	 */
	confirmDialog:function(dtitle,dcontent,callBackFunc) {
		$.artDialog({
			title:dtitle,
			content:dcontent,
			ok:callBackFunc,
			cancel:function(){
				return false;
			}
		});
	},

	/**
	 * 关闭子框架
	 */
	closeChildFrame : function () {
		loan.tabcut.childClosedIframe ( true );
	},

	/** 选中行的触发事件*/
	selectRowFunc : function ( rowid ) {
		$ ( "#rowid" ).attr ( "value", rowid );//记录当前选中的行的rowid
	},

	photoBtnFunc : function( menuId, rowid ) {
		$ ( "#rowid" ).val ( rowid );
		var carInfo = $ ( "#carinfoGridId" ).jqGrid ( 'getRowData', rowid );
		var url = loan.basePath +"/carinfo/photo?menuId=" + menuId  + "&carName=" + carInfo.carName + "&carId=" + carInfo.carId;
		parent.loan.tabcut.childAddIframe ( "车辆照片", encodeURI(url), "carPhotosManagement", true, true );
	},

	carLogo : function( menuId, rowid ) {
		$ ( "#rowid" ).val ( rowid );
		var carInfo = $ ( "#carinfoGridId" ).jqGrid ( 'getRowData', rowid );
		var url = loan.basePath +"/car/carlogo?menuId=" + menuId  + "&carId=" + carInfo.carId;
		parent.loan.tabcut.childAddIframe ( "车辆图标", encodeURI(url), "catLogo", true, true );
	}
};