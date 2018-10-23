loan.cartype = loan.cartype || {


    /** 查看*/
    displayTypeFn : function(menuId,rowid) {
        $("#rowid").attr("value",rowid);
        var rowData = $("#carTypeGridId").jqGrid('getRowData',rowid);
        var carModelId = rowData.carModelId;
        parent.loan.tabcut.childAddIframe("车辆信息",loan.basePath+"/carType/carmodeldetailquery?menuId=50010302&carModelId="+carModelId,"carInfo",true, true);
    },

	searchFn : function(){
		var searchContent = $("#searchContent").val();
		$("#carTypeGridId").jqGrid("setGridParam", {
			postData:{'menuId':'2004','format':'json',"searchContent":searchContent},
			page:1
	    }).trigger('reloadGrid');
	},

    addMeritsFn : function () {
        var carModelId = document.getElementById("carModelId").value;
        var carMeritsPictureUrl = document.getElementById("oss_returned_merits_url").value;
        loan.ajaxDo({
            url:loan.basePath+"/carType/carstrengthmodify",
            params:{'menuId':'900102','carModelId':carModelId,'carStrength':carMeritsPictureUrl},
            successCallback:function () {
                loan.tooltip("车亮点修改成功","succeed");
                loan.cartype.freshGrid();
            },
            successTip:true
        });
    },

    freshGrid : function () {
        var iframe = $('#carInfoCon',parent.document).find(".m-frameCon")[0];
        iframe.contentWindow.location.reload(true);
    },

    addImgFn : function () {
        $ ( "#index,#close,#addImg,#save,#savepaixu,#cancel" ).hide ();
        $("#addnew,#saveyulan,#cancelyulan" ) . show();
    },

    /**
     * 保存排序
     */
    saveEidtPhotoIndex : function () {
        loan.cartype.enableCancelButton ( false );
        var datas = [];
        $("#photoUL li.img_item").each(function ( index, item_li ) {
            datas.push({
                pictureId: $(item_li).find("img").attr("pictureId"),
                subIndex: $(item_li).find("input[name='index']").val()
            })
        });
        loan.cartype.submitIndexCarPhoto ( datas/*{ datas : JSON.stringify(datas), carId : $("#carId").val() }*/);
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
     * 排序
     */
    eidtPhotoIndex : function () {
        $ ( "#index,#close,#addImg,#save,#addnew,#saveyulan,#cancelyulan" ).hide ();
        $ ( "#previewForm" ).find ( "p[name='description']" ).hide ()
            .end().find ( "p[name='indexs']" ).show ();
        $ ( "#savepaixu,#cancel" ).show ();
    },

    /**
     * 取消排序
     */
    cancelEidtPhotoIndex : function () {
        $ ( "#savepaixu,#cancel,#saveyulan,#cancelyulan" ).hide ();
        $ ( "#previewForm" ).find ( "p[name='indexs']" ).hide ()
            .end().find ( "p[name='description']" ).show ()
            .end()[0].reset();
        $ ( "#index,#close,#addImg,#save" ).show ();
    },


    /**
     * 新增
     */
    addPhotoIndex : function () {
        var carModelId = document.getElementById("carModelId").value;
        var linkUrl = document.getElementById("oss_returned_url").value;
        if(null == linkUrl || "" == linkUrl){
            loan.tooltip("图片不存在，保存失败","error");
            return;
        }
        var description = null;
        loan.ajaxDo({
            url:loan.basePath+"/carType/previewpicturemodify",
            params:{'menuId':'900102','carModelId':carModelId,'linkUrl':linkUrl,'description':description},
            successCallback:function () {
                loan.tooltip("预览图修改成功","succeed");
                loan.cartype.freshGrid();
            },
            successTip:true
        });
    },

    /**
     * 取消新增
     */
    cancelPhotoIndex : function () {
        $ ( "#saveyulan,#cancelyulan,#savepaixu,#cancel,#addnew" ).hide ();
        $ ( "#index,#close,#addImg,#save" ).show ();
        loan.cartype.freshGrid();
    },


    submitDeleteCarPhoto : function ( params ) {
        var pictureId = $("#dialog img").attr ( "pictureId" );
        if( pictureId ) {
            loan.ajaxDo({
                url:loan.basePath + "/carType/previewpicturedelete",
                params:{'menuId': 3004 ,'menuLog':'1','format':'json','pictureId':pictureId},
                successCallback : function(){
                    loan.tooltip("图片[" + params.fileName + "]删除成功","succeed");
                    loan.cartype.freshGrid ( );
                },
                successTip:true, //提示
                bizErrTip:true,  //提示
                chainPar:this
            });
        }else{
            console.log ( "找不到pictureId" );
        }
    },

    /**
     * 排序提交按钮
     */
    submitIndexCarPhoto : function (datas) {
        var str = JSON.stringify(datas);
        loan.ajaxDo({
               url: loan.basePath + "/carType/previewpicturesortmodify?carModelId="+ $("#carModelId").val(),
               params: {'data': str},
               successCallback : function(){
                   loan.tooltip("排序成功","succeed");
                   loan.cartype.freshGrid ( );
               },
               successTip:true, //提示
               bizErrTip:true,  //提示
               chainPar:this,
               // error: function(data){
               //     console.log ( data );
               //     loan.tooltip( "预览图重排序失败，网络异常！","error");
               // },
               complete: function(XMLHttpRequest, textStatus){

               }
           });
    },

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
                $("#dialog img").attr("src",result['imageOSSUrl']+"?t=" +new Date().getTime());
                loan.tooltip("图片[" + result['oriFIleName'] + "]上传成功","succeed");

                _$upload_Comp.after(_$upload_Comp.clone().val(""));
                _$upload_Comp.remove();
                //恢复上传与提交按钮
                _$button.removeAttr("disabled");
            }
        });
        _$upload_Comp.upload("ajaxSubmit");
    },

    replaceType : function () {
        var pictureId = document.getElementById("pictureId").value;
        var carModelId = document.getElementById("carModelId").value;
        var linkUrl = document.getElementById("oss_returned_url").value;
        $.ajax({
            url:loan.basePath+"/carType/previewpicturereplace",
            type: 'POST',
            data:{'pictureId':pictureId,'carModelId':carModelId,'linkUrl':linkUrl},
            success: function (responseStr) {
                loan.tooltip("替换预览图成功后刷新","succeed");
                loan.s_Pop_closedChild(true, false);
            }
        });
    },


};

selectCarModelRowFunc = function(rowid){
    $("#rowid").attr("value",rowid);//记录当前选中的行的rowid
};





