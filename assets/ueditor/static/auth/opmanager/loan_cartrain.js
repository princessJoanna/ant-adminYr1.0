loan.cartrain = loan.cartrain || {


    /** 查看*/
    displayTrainFn : function(menuId,rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#carTrainGridId").jqGrid('getRowData',rowid);
        var carTrainId = rowData.carTrainId;
        parent.loan.tabcut.childAddIframe("车系详情",loan.basePath+"/carTrain/cartraindetailquery?menuId=50010202&carTrainId="+carTrainId,"",true, true);
    },

    addTrainFn : function () {
        var carTrainId = document.getElementById("carTrainId").value;
        var carTrainPictureUrl = document.getElementById("oss_returned_url").value;
        loan.ajaxDo({
            url:loan.basePath+"/carTrain/cartrainmodify",
            params:{'menuId':'900102','carTrainId':carTrainId,'carTrainPictureUrl':carTrainPictureUrl},
            successCallback:loan.tooltip("图片上传成功","succeed"),
            successTip:true
        });
    },
	searchFn : function(){
		var searchContent = $("#searchContent").val();
		$("#carTrainGridId").jqGrid("setGridParam", {
			postData:{'menuId':'2004','format':'json',"searchContent":searchContent},
			page:1
	    }).trigger('reloadGrid');
	},

};


selectCarTrainGridIdRowFunc = function(rowid){
    $("#rowid").attr("value",rowid);//记录当前选中的行的rowid
}





