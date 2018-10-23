loan.brand = loan.brand || {

    delBrandFn : function(menuId,rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#brandGridId").jqGrid('getRowData',rowid);
        var carBrandId = rowData.carBrandId;
        $.artDialog({
            title:'提示',
            content:"是否确认删除该品牌？",
            ok:function(){
                loan.ajaxDo({
                    url:loan.basePath+"/brandManagement/brandCancel?menuId=50010103",
                    params:{'menuId':'50010103','carBrandId':carBrandId},
                    successCallback:loan.brand.delOrderSucFn,
                    successTip:true
                });
            },
            cancel:function(){
                return false;
            }
        })
    },


    /**新增*/
    addBrandFn : function() {
        loan.s_addPop("新增品牌",loan.basePath+"/brandManagement/addBrand?menuId=50010101","",720,430,{isRefresh:false});
    },

    /** 查看*/
    displayBrandFn : function(menuId,rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#brandGridId").jqGrid('getRowData',rowid);
        var carBrandId = rowData.carBrandId;
        parent.loan.tabcut.childAddIframe("查看品牌",loan.basePath+"/brandManagement/toinfo?menuId=900102&carBrandId="+carBrandId,"",true, true);
    },

    addBrand : function () {
        var carBrand = document.getElementById("carBrand").value;
        var nation = document.getElementById("nation").value;
        var english = document.getElementById("english").value;
        var logoUrl = document.getElementById("oss_returned_url").value;
        loan.ajaxDo({
            url:loan.basePath+"/brandManagement/addBrandInfo?menuId=50010101",
            params:{'menuId':'900102','carBrand':carBrand,'nation':nation,'english':english,'logoUrl':logoUrl},
            successCallback:loan.brand.submitSuccFun,
            successTip:true
        });
    },
    /**交易成功后关闭页面*/
    submitSuccFun : function(){
        parent.$('#focus').focus();
        loan.s_Pop_closedChild()
    },

    /**添加图片 */
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
                $("#imageId").attr("src",result['imageOSSUrl']);
                loan.tooltip("图片[" + result['oriFIleName'] + "]上传成功","succeed");

                _$upload_Comp.after(_$upload_Comp.clone().val(""));
                _$upload_Comp.remove();
                //恢复上传与提交按钮
                _$button.removeAttr("disabled");
            }
        });
        _$upload_Comp.upload("ajaxSubmit");
    },



    /**删除成功翻页的处理*/
    delOrderSucFn : function(){
        var rows = $("#brandGridId").jqGrid('getRowData').length;
        var page = $("#brandGridId").jqGrid('getGridParam','page');
        if(rows < 2){
            if(page > 1){
                page = page -1;
            }
        }
        var orgId = $("#orgId").val();
        $("#brandGridId").jqGrid("setGridParam", {
            'postData':{'format':'json','orgId':orgId,'menuId':'9001'},
            'page':page
        }).trigger('reloadGrid');
        $("#rowid").attr("value","");
    },

	searchFn : function(){
		var searchContent = $("#searchContent").val();
		$("#brandGridId").jqGrid("setGridParam", {
			postData:{'menuId':'2004','format':'json',"searchContent":searchContent},
			page:1
	    }).trigger('reloadGrid');
	},

};


selectBrandRowFunc = function(rowid){
    $("#rowid").attr("value",rowid);//记录当前选中的行的rowid
}





