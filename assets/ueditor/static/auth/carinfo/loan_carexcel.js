loan.carexcel = loan.carexcel || {

    carInfoAnalysis: function (carDetailJson) {
        //?carDetailJson=" + encodeURI(JSON.stringify(carDetailJson))
        var url = loan.basePath +"/carExcel/toAddCar" ;
        var bigData = encodeURI(JSON.stringify(carDetailJson)) ;
        loan.tabcut.childAddIframe("车辆添加",encodeURI(url),"hzkAddCar",false,true);

        //tODO
        url = loan.basePath+"/carExcel/showAddCar";

        var html = '<form action="'+url+'" method="post" target="_self" id="postData_form">'+
            '<input id="carDetailJson" name="carDetailJson" type="hidden" value="'+bigData+'"/>'+
            '</form>';
        console.log("1 :");
        console.log(document.getElementById('hzkAddCarCon'));
        console.log(parent.document.getElementById('hzkAddCarCon'));
        parent.document.getElementById('hzkAddCarCon').getElementsByTagName('iframe')[0].contentWindow.document.write(html);
        parent.document.getElementById('hzkAddCarCon').getElementsByTagName('iframe')[0].contentWindow.document.getElementById('postData_form').submit();
        //document.getElementsByTagName('p');

    },
    /**确认通过 */
    pass: function() {
        var addNewList = document.getElementsByClassName("ipt-file");
        var carPicturePojoList = [];
        for(var i = 0 ; i < addNewList.length ; i++ ) {
            if (document.getElementsByClassName("url")[i].value == null || document.getElementsByClassName("url")[i].value == '') {
                loan.tooltip("亮点图需要全部上传", "error");
                return
            }
            var carPicturePojo = {};
            carPicturePojo.url = document.getElementsByClassName("url")[i].value;
            carPicturePojo.linkUrl = document.getElementsByClassName("linkUrl")[i].value;
            carPicturePojo.description = document.getElementsByClassName("description")[i].value;
            carPicturePojo.subIndex = document.getElementsByClassName("subIndex")[i].value;
            carPicturePojoList.push(carPicturePojo);
        }
        loan.ajaxDo({
            url: loan.basePath + "/carExcel/carInfoAdd",
            params: {
                'carDetailJson': $("#carDetailJson").val(),
                'carPictureListJson': encodeURI(JSON.stringify(carPicturePojoList))
            },
            // successCallback: loan.carexcel.closeChildFrame(),
            successTip: true, //提示
            bizErrTip: true,  //提示
            chainPar: this
        });
        loan.tabcut.childClosedIframe ( true );
        },
    /**确认退回 */
    return: function() {
        loan.tabcut.childClosedIframe ( true );
    },

    /**
     * 关闭子框架
     */
    closeChildFrame : function () {
        loan.tabcut.childClosedIframe ( true );
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

    //
    // /**
    //  * 确认提示框
    //  */
    // confirmDialog : function ( dtitle, dcontent, callBackFunc) {
    //     $.artDialog ( {
    //         title : dtitle,
    //         content : dcontent,
    //         ok : callBackFunc,
    //         cancel : function () {
    //             return false;
    //         }
    //     } );
    // },



};

