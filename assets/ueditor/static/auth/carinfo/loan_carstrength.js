loan.carstrength = loan.carstrength || {

    /**确认通过 */
    pass: function() {
        var addNewList = document.getElementsByClassName("ipt-file");
        var pictureList;
        if($('#openConnection').val()==1&&!$('#linkUrl').val()){
            return loan.tooltip("请填写自定义链接地址", "error");
        }
        for(var i = 0 ; i < addNewList.length ; i++ ) {
            if (document.getElementsByClassName("pictureUrl")[i].value == null || document.getElementsByClassName("pictureUrl")[i].value == '') {
                loan.tooltip("有亮点图没上传呀", "error");

            }
            var pictureUrl = "";
            pictureUrl = document.getElementsByClassName("pictureUrl")[i].value;
            if(i == 0){
            	pictureList = pictureUrl;
            }else{
            	pictureList = pictureList+";"+pictureUrl;
            }
        }
        loan.ajaxDo({
            url: loan.basePath + "contentmanagement/openscreenpageconfig",
            params: {
                'residenceTime': $("#residenceTime").val(),
                'linkUrl': $("#linkUrl").val(),
                'openConnection': $("#openConnection").val(),
                'linkUrl': pictureList,
                'operator':$('#userValue').val(),
                'contentId':$('#content').data('id'),
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

    pass1: function() {
    	var datas = [];
		$("#photoUL li.addnew").each(function ( index, item_li ) {
			datas.push({
				pictureUrl: $(item_li).find("input[id='pictureUrl']").val(),
				subIndex: $(item_li).find("input[id='subIndex']").val(),
				linkUrl: $(item_li).find("input[id='linkUrl']").val(),
				openConnection: $(item_li).find("select[id='openConnection']").val()
		    })
		});
        loan.ajaxDo({
            url: loan.basePath + "/updateLunBo",
            params: datas,
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
    }


   

};
